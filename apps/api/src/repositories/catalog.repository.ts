import { getDriver } from "../database/driver.js";
import type {
  CatalogKind,
  DashboardStats,
  PaginatedResult,
  PaginationInput,
  PersonDetail,
  RoleDetail,
  SkillDetail,
} from "../types/catalog.types.js";
import { asNumber, asProperties } from "../utils/neo4j-values.js";

interface CatalogConfiguration {
  label: string;
  searchProperty: "name" | "title";
}

const catalogConfiguration: Record<CatalogKind, CatalogConfiguration> = {
  companies: { label: "Company", searchProperty: "name" },
  people: { label: "Person", searchProperty: "name" },
  projects: { label: "Project", searchProperty: "name" },
  resources: { label: "LearningResource", searchProperty: "title" },
  roles: { label: "JobRole", searchProperty: "title" },
  skills: { label: "Skill", searchProperty: "name" },
  technologies: { label: "Technology", searchProperty: "name" },
};

export class CatalogRepository {
  public async getStats(): Promise<DashboardStats> {
    const result = await getDriver().executeQuery(
      `
        MATCH (node)
        UNWIND labels(node) AS label
        WITH label, count(node) AS total
        WHERE label IN $labels
        RETURN label, total
      `,
      { labels: ["Person", "Skill", "Technology", "Project", "JobRole"] },
    );

    const counts = Object.fromEntries(
      result.records.map((record) => [
        record.get("label") as string,
        asNumber(record.get("total")),
      ]),
    );

    return {
      people: counts.Person ?? 0,
      skills: counts.Skill ?? 0,
      technologies: counts.Technology ?? 0,
      projects: counts.Project ?? 0,
      roles: counts.JobRole ?? 0,
    };
  }

  public async list(
    kind: CatalogKind,
    input: PaginationInput,
  ): Promise<PaginatedResult> {
    const configuration = catalogConfiguration[kind];
    const offset = (input.page - 1) * input.limit;
    const parameters = {
      query: input.query,
      offset,
      limit: input.limit,
    };
    const whereClause = `
      WHERE $query = ''
         OR toLower(entity.${configuration.searchProperty})
            CONTAINS toLower($query)
    `;

    const [itemsResult, countResult] = await Promise.all([
      getDriver().executeQuery(
        `
          MATCH (entity:${configuration.label})
          ${whereClause}
          RETURN properties(entity) AS entity
          ORDER BY entity.${configuration.searchProperty}
          SKIP $offset
          LIMIT $limit
        `,
        parameters,
      ),
      getDriver().executeQuery(
        `
          MATCH (entity:${configuration.label})
          ${whereClause}
          RETURN count(entity) AS total
        `,
        { query: input.query },
      ),
    ]);

    const total = asNumber(countResult.records[0]?.get("total"));

    return {
      items: itemsResult.records.map((record) =>
        asProperties(record.get("entity")),
      ),
      page: input.page,
      limit: input.limit,
      total,
      totalPages: total === 0 ? 0 : Math.ceil(total / input.limit),
    };
  }

  public async getPerson(id: string): Promise<PersonDetail | null> {
    const [baseResult, skillsResult, projectsResult] = await Promise.all([
      getDriver().executeQuery(
        `
          MATCH (person:Person {id: $id})
          OPTIONAL MATCH (person)-[employment:WORKS_AT]->(company:Company)
          RETURN properties(person) AS person,
                 properties(company) AS company,
                 properties(employment) AS employment
        `,
        { id },
      ),
      getDriver().executeQuery(
        `
          MATCH (:Person {id: $id})-[relationship:HAS_SKILL]->(skill:Skill)
          RETURN properties(skill) AS skill,
                 properties(relationship) AS relationship
          ORDER BY skill.name
        `,
        { id },
      ),
      getDriver().executeQuery(
        `
          MATCH (:Person {id: $id})-[workedOn:WORKED_ON]->(project:Project)
          OPTIONAL MATCH (project)-[:USES_TECHNOLOGY]->(technology:Technology)
          RETURN properties(project) AS project,
                 properties(workedOn) AS relationship,
                 properties(technology) AS technology
          ORDER BY project.name, technology.name
        `,
        { id },
      ),
    ]);

    const baseRecord = baseResult.records[0];
    if (!baseRecord) return null;

    const projectsById = new Map<string, PersonDetail["projects"][number]>();
    for (const record of projectsResult.records) {
      const project = asProperties(record.get("project"));
      const projectId = project.id;
      if (typeof projectId !== "string") continue;

      const current = projectsById.get(projectId) ?? {
        ...project,
        relationship: asProperties(record.get("relationship")),
        technologies: [],
      };
      const technology = asProperties(record.get("technology"));
      if (typeof technology.id === "string")
        current.technologies.push(technology);
      projectsById.set(projectId, current);
    }

    const company = asProperties(baseRecord.get("company"));
    return {
      person: asProperties(baseRecord.get("person")),
      company:
        typeof company.id === "string"
          ? {
              ...company,
              relationship: asProperties(baseRecord.get("employment")),
            }
          : null,
      skills: skillsResult.records.map((record) => ({
        ...asProperties(record.get("skill")),
        relationship: asProperties(record.get("relationship")),
      })),
      projects: [...projectsById.values()],
    };
  }

  public async getSkill(id: string): Promise<SkillDetail | null> {
    const [
      base,
      peopleResult,
      projectsResult,
      rolesResult,
      technologiesResult,
    ] = await Promise.all([
      getDriver().executeQuery(
        "MATCH (skill:Skill {id: $id}) RETURN properties(skill) AS skill",
        { id },
      ),
      getDriver().executeQuery(
        `MATCH (person:Person)-[relationship:HAS_SKILL]->(:Skill {id: $id})
           RETURN properties(person) AS entity, properties(relationship) AS relationship
           ORDER BY person.name`,
        { id },
      ),
      getDriver().executeQuery(
        `MATCH (project:Project)-[relationship:REQUIRES_SKILL]->(:Skill {id: $id})
           RETURN properties(project) AS entity, properties(relationship) AS relationship
           ORDER BY project.name`,
        { id },
      ),
      getDriver().executeQuery(
        `MATCH (role:JobRole)-[relationship:REQUIRES_SKILL]->(:Skill {id: $id})
           RETURN properties(role) AS entity, properties(relationship) AS relationship
           ORDER BY role.title`,
        { id },
      ),
      getDriver().executeQuery(
        `MATCH (:Skill {id: $id})<-[:REQUIRES_SKILL]-(source)-[:USES_TECHNOLOGY]->(technology:Technology)
           RETURN DISTINCT properties(technology) AS technology
           ORDER BY technology.name`,
        { id },
      ),
    ]);

    const baseRecord = base.records[0];
    if (!baseRecord) return null;

    const mapRelated = (records: typeof peopleResult.records) =>
      records.map((record) => ({
        ...asProperties(record.get("entity")),
        relationship: asProperties(record.get("relationship")),
      }));

    return {
      skill: asProperties(baseRecord.get("skill")),
      people: mapRelated(peopleResult.records),
      projects: mapRelated(projectsResult.records),
      roles: mapRelated(rolesResult.records),
      technologies: technologiesResult.records.map((record) =>
        asProperties(record.get("technology")),
      ),
    };
  }

  public async getRole(id: string): Promise<RoleDetail | null> {
    const [base, skillsResult, technologiesResult] = await Promise.all([
      getDriver().executeQuery(
        "MATCH (role:JobRole {id: $id}) RETURN properties(role) AS role",
        {
          id,
        },
      ),
      getDriver().executeQuery(
        `MATCH (:JobRole {id: $id})-[relationship:REQUIRES_SKILL]->(skill:Skill)
         RETURN properties(skill) AS entity, properties(relationship) AS relationship
         ORDER BY skill.name`,
        { id },
      ),
      getDriver().executeQuery(
        `MATCH (:JobRole {id: $id})-[relationship:USES_TECHNOLOGY]->(technology:Technology)
         RETURN properties(technology) AS entity, properties(relationship) AS relationship
         ORDER BY technology.name`,
        { id },
      ),
    ]);

    const baseRecord = base.records[0];
    if (!baseRecord) return null;

    const mapRelated = (records: typeof skillsResult.records) =>
      records.map((record) => ({
        ...asProperties(record.get("entity")),
        relationship: asProperties(record.get("relationship")),
      }));

    return {
      role: asProperties(baseRecord.get("role")),
      skills: mapRelated(skillsResult.records),
      technologies: mapRelated(technologiesResult.records),
    };
  }
}
