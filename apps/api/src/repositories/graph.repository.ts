import { getDriver } from "../database/driver.js";
import type {
  CareerPathResult,
  CareerSkill,
  GraphEdge,
  GraphEntityType,
  GraphNeighborhood,
  GraphNode,
  LearningRecommendation,
  SearchResult,
  TechnologyDiscoveryResult,
} from "../types/graph.types.js";
import { asProperties } from "../utils/neo4j-values.js";

interface EntityConfiguration {
  label: string;
  displayProperty: "name" | "title";
}

const entityConfiguration: Record<GraphEntityType, EntityConfiguration> = {
  company: { label: "Company", displayProperty: "name" },
  person: { label: "Person", displayProperty: "name" },
  project: { label: "Project", displayProperty: "name" },
  resource: { label: "LearningResource", displayProperty: "title" },
  role: { label: "JobRole", displayProperty: "title" },
  skill: { label: "Skill", displayProperty: "name" },
  technology: { label: "Technology", displayProperty: "name" },
};

const labelToType = new Map<string, GraphEntityType>(
  Object.entries(entityConfiguration).map(([type, configuration]) => [
    configuration.label,
    type as GraphEntityType,
  ]),
);

function stringProperty(
  properties: Record<string, unknown>,
  key: string,
): string {
  const value = properties[key];
  return typeof value === "string" ? value : "";
}

function nodeFromProperties(
  type: GraphEntityType,
  properties: Record<string, unknown>,
): GraphNode {
  const configuration = entityConfiguration[type];
  return {
    id: stringProperty(properties, "id"),
    type,
    label: stringProperty(properties, configuration.displayProperty),
    properties,
  };
}

function typeFromLabels(labels: unknown): GraphEntityType | null {
  if (!Array.isArray(labels)) return null;
  for (const label of labels) {
    if (typeof label === "string") {
      const type = labelToType.get(label);
      if (type) return type;
    }
  }
  return null;
}

export class GraphRepository {
  public async search(query: string, limit: number): Promise<SearchResult[]> {
    const result = await getDriver().executeQuery(
      `
        MATCH (entity)
        WHERE labels(entity)[0] IN $labels
          AND toLower(coalesce(entity.name, entity.title, '')) CONTAINS toLower($query)
        WITH entity, labels(entity)[0] AS entityLabel
        RETURN entity.id AS id,
               CASE entityLabel
                 WHEN 'Person' THEN 'person'
                 WHEN 'Skill' THEN 'skill'
                 WHEN 'Technology' THEN 'technology'
                 WHEN 'Project' THEN 'project'
                 WHEN 'JobRole' THEN 'role'
                 ELSE 'company'
               END AS type,
               coalesce(entity.name, entity.title) AS label,
               coalesce(entity.category, entity.level, entity.industry,
                        entity.summary, entity.description, entity.title, '') AS description
        ORDER BY label
        LIMIT $limit
      `,
      {
        query,
        limit,
        labels: [
          "Person",
          "Skill",
          "Technology",
          "Project",
          "JobRole",
          "Company",
        ],
      },
    );

    return result.records.map((record) => ({
      id: record.get("id") as string,
      type: record.get("type") as GraphEntityType,
      label: record.get("label") as string,
      description: record.get("description") as string,
    }));
  }

  public async getCareerPath(
    personId: string,
    roleId: string,
  ): Promise<CareerPathResult | null> {
    const [baseResult, requirementResult, abilityResult] = await Promise.all([
      getDriver().executeQuery(
        `
          MATCH (person:Person {id: $personId})
          MATCH (role:JobRole {id: $roleId})
          RETURN properties(person) AS person, properties(role) AS role
        `,
        { personId, roleId },
      ),
      getDriver().executeQuery(
        `
          MATCH (:JobRole {id: $roleId})-[requirement:REQUIRES_SKILL]->(skill:Skill)
          OPTIONAL MATCH (resource:LearningResource)-[:TEACHES]->(skill)
          OPTIONAL MATCH (source)-[:REQUIRES_SKILL]->(skill)
          OPTIONAL MATCH (source)-[:USES_TECHNOLOGY]->(technology:Technology)
          RETURN properties(skill) AS skill,
                 properties(requirement) AS requirement,
                 properties(resource) AS resource,
                 properties(technology) AS technology
          ORDER BY skill.name, resource.title, technology.name
        `,
        { roleId },
      ),
      getDriver().executeQuery(
        `
          MATCH (:Person {id: $personId})-[ability:HAS_SKILL]->(skill:Skill)
          RETURN skill.id AS skillId, properties(ability) AS ability
        `,
        { personId },
      ),
    ]);

    const baseRecord = baseResult.records[0];
    if (!baseRecord) return null;

    const abilities = new Map<string, Record<string, unknown>>();
    for (const record of abilityResult.records) {
      const skillId: unknown = record.get("skillId");
      if (typeof skillId === "string") {
        abilities.set(skillId, asProperties(record.get("ability")));
      }
    }

    const existing = new Map<string, CareerSkill>();
    const missing = new Map<string, CareerSkill>();
    const technologies = new Map<string, Record<string, unknown>>();
    const recommendations = new Map<string, LearningRecommendation>();

    for (const record of requirementResult.records) {
      const skill = asProperties(record.get("skill"));
      const skillId = stringProperty(skill, "id");
      if (!skillId) continue;

      const requirement = asProperties(record.get("requirement"));
      const ability = abilities.get(skillId);
      const category = stringProperty(skill, "category");
      const requiredLevel = stringProperty(requirement, "minimumProficiency");
      const currentLevel = ability
        ? stringProperty(ability, "proficiency")
        : "";
      const item: CareerSkill = {
        id: skillId,
        name: stringProperty(skill, "name"),
        ...(category ? { category } : {}),
        ...(requiredLevel ? { requiredLevel } : {}),
        ...(currentLevel ? { currentLevel } : {}),
      };

      if (ability) {
        existing.set(skillId, item);
        continue;
      }

      missing.set(skillId, item);
      const technology = asProperties(record.get("technology"));
      const technologyId = stringProperty(technology, "id");
      if (technologyId) technologies.set(technologyId, technology);

      const resource = asProperties(record.get("resource"));
      const resourceId = stringProperty(resource, "id");
      if (resourceId) {
        let current = recommendations.get(resourceId);
        if (!current) {
          const provider = stringProperty(resource, "provider");
          const url = stringProperty(resource, "url");
          const format = stringProperty(resource, "type");
          current = {
            id: resourceId,
            title: stringProperty(resource, "title"),
            teachesSkillIds: [],
            ...(provider ? { provider } : {}),
            ...(url ? { url } : {}),
            ...(format ? { format } : {}),
          };
        }
        if (!current.teachesSkillIds.includes(skillId)) {
          current.teachesSkillIds.push(skillId);
        }
        recommendations.set(resourceId, current);
      }
    }

    const requiredCount = existing.size + missing.size;
    return {
      person: asProperties(baseRecord.get("person")),
      role: asProperties(baseRecord.get("role")),
      readinessPercentage:
        requiredCount === 0
          ? 100
          : Math.round((existing.size / requiredCount) * 100),
      existingSkills: [...existing.values()],
      missingSkills: [...missing.values()],
      technologies: [...technologies.values()],
      recommendations: [...recommendations.values()],
    };
  }

  public async getNeighborhood(
    type: GraphEntityType,
    id: string,
  ): Promise<GraphNeighborhood | null> {
    const configuration = entityConfiguration[type];
    const result = await getDriver().executeQuery(
      `
        MATCH (center:${configuration.label} {id: $id})
        OPTIONAL MATCH (center)-[relationship]-(neighbor)
        RETURN properties(center) AS center,
               labels(neighbor) AS neighborLabels,
               properties(neighbor) AS neighbor,
               type(relationship) AS relationshipType,
               properties(relationship) AS relationship,
               startNode(relationship).id AS source,
               endNode(relationship).id AS target
        ORDER BY relationshipType
        LIMIT 51
      `,
      { id },
    );

    const first = result.records[0];
    if (!first) return null;
    const center = nodeFromProperties(type, asProperties(first.get("center")));
    const nodes = new Map<string, GraphNode>([[center.id, center]]);
    const edges: GraphEdge[] = [];

    for (const [index, record] of result.records.entries()) {
      const neighborType = typeFromLabels(record.get("neighborLabels"));
      const neighborProperties = asProperties(record.get("neighbor"));
      const neighborId = stringProperty(neighborProperties, "id");
      const relationshipType: unknown = record.get("relationshipType");
      if (!neighborType || !neighborId || typeof relationshipType !== "string")
        continue;

      nodes.set(
        neighborId,
        nodeFromProperties(neighborType, neighborProperties),
      );
      edges.push({
        id: `${stringProperty(asProperties(record.get("center")), "id")}-${relationshipType}-${neighborId}-${index}`,
        source: record.get("source") as string,
        target: record.get("target") as string,
        type: relationshipType,
        properties: asProperties(record.get("relationship")),
      });
    }

    return { center, nodes: [...nodes.values()], edges };
  }

  public async discoverPeopleByTechnology(
    id: string,
  ): Promise<TechnologyDiscoveryResult | null> {
    const result = await getDriver().executeQuery(
      `
        MATCH (technology:Technology {id: $id})
        OPTIONAL MATCH (person:Person)-[:WORKED_ON]->(project:Project)-[:USES_TECHNOLOGY]->(technology)
        OPTIONAL MATCH (project)-[:USES_TECHNOLOGY]->(related:Technology)
        WHERE related.id <> technology.id
        RETURN properties(technology) AS technology,
               properties(person) AS person,
               properties(project) AS project,
               collect(DISTINCT properties(related)) AS relatedTechnologies
        ORDER BY person.name, project.name
      `,
      { id },
    );

    const first = result.records[0];
    if (!first) return null;
    const people = new Map<
      string,
      TechnologyDiscoveryResult["people"][number]
    >();

    for (const record of result.records) {
      const person = asProperties(record.get("person"));
      const personId = stringProperty(person, "id");
      if (!personId) continue;
      const current = people.get(personId) ?? {
        person,
        projects: [],
        relatedTechnologies: [],
      };
      const project = asProperties(record.get("project"));
      const projectId = stringProperty(project, "id");
      if (
        projectId &&
        !current.projects.some((item) => item.id === projectId)
      ) {
        current.projects.push(project);
      }
      const related: unknown = record.get("relatedTechnologies");
      if (Array.isArray(related)) {
        for (const value of related) {
          const item = asProperties(value);
          const relatedId = stringProperty(item, "id");
          if (
            relatedId &&
            !current.relatedTechnologies.some((entry) => entry.id === relatedId)
          ) {
            current.relatedTechnologies.push(item);
          }
        }
      }
      people.set(personId, current);
    }

    return {
      technology: asProperties(first.get("technology")),
      people: [...people.values()],
    };
  }
}
