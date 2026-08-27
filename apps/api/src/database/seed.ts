import type { ManagedTransaction } from "neo4j-driver";

import {
  companies,
  people,
  projects,
  resources,
  roles,
  skills,
  technologies,
  type EntityNode,
} from "./seed-data.js";
import { closeDriver, getDriver } from "./driver.js";

type NodeLabel =
  | "Company"
  | "JobRole"
  | "LearningResource"
  | "Person"
  | "Project"
  | "Skill"
  | "Technology";

interface RelationshipRow {
  fromId: string;
  toId: string;
  properties: Record<string, string | number>;
}

interface RelationshipSeed {
  name: string;
  query: string;
  rows: RelationshipRow[];
}

const nodeGroups: Array<{
  label: NodeLabel;
  rows: Array<EntityNode & object>;
}> = [
  { label: "Company", rows: companies },
  { label: "Skill", rows: skills },
  { label: "Technology", rows: technologies },
  { label: "JobRole", rows: roles },
  { label: "Project", rows: projects },
  { label: "Person", rows: people },
  { label: "LearningResource", rows: resources },
];

// function publicProperties(
//   row: EntityNode & object,
// ): Record<string, string | number> {
//   return Object.fromEntries(
//     Object.entries(row).filter(([, value]) => !Array.isArray(value)),
//   );
// }

function publicProperties(
  row: EntityNode & object,
): Record<string, string | number> {
  return Object.fromEntries(
    Object.entries(row).filter(([, value]) => !Array.isArray(value)),
  );
}

function assertUniqueIds(label: string, rows: EntityNode[]): void {
  const ids = rows.map(({ id }) => id);
  if (new Set(ids).size !== ids.length) {
    throw new Error(`Duplicate ${label} IDs found in seed data`);
  }
}

function assertReferencesExist(
  relationship: string,
  rows: RelationshipRow[],
  fromIds: Set<string>,
  toIds: Set<string>,
): void {
  for (const row of rows) {
    if (!fromIds.has(row.fromId) || !toIds.has(row.toId)) {
      throw new Error(`Invalid ${relationship} seed reference`);
    }
  }
}

const idSets = {
  companies: new Set(companies.map(({ id }) => id)),
  people: new Set(people.map(({ id }) => id)),
  projects: new Set(projects.map(({ id }) => id)),
  resources: new Set(resources.map(({ id }) => id)),
  roles: new Set(roles.map(({ id }) => id)),
  skills: new Set(skills.map(({ id }) => id)),
  technologies: new Set(technologies.map(({ id }) => id)),
};

const relationships: RelationshipSeed[] = [
  {
    name: "HAS_SKILL",
    query:
      "UNWIND $rows AS row MATCH (a:Person {id: row.fromId}) MATCH (b:Skill {id: row.toId}) MERGE (a)-[r:HAS_SKILL]->(b) SET r += row.properties",
    rows: people.flatMap((person) =>
      person.skills.map(({ id, ...properties }) => ({
        fromId: person.id,
        toId: id,
        properties,
      })),
    ),
  },
  {
    name: "WORKED_ON",
    query:
      "UNWIND $rows AS row MATCH (a:Person {id: row.fromId}) MATCH (b:Project {id: row.toId}) MERGE (a)-[r:WORKED_ON]->(b) SET r += row.properties",
    rows: people.flatMap((person) =>
      person.projects.map(({ id, ...properties }) => ({
        fromId: person.id,
        toId: id,
        properties,
      })),
    ),
  },
  {
    name: "WORKS_AT",
    query:
      "UNWIND $rows AS row MATCH (a:Person {id: row.fromId}) MATCH (b:Company {id: row.toId}) MERGE (a)-[r:WORKS_AT]->(b) SET r += row.properties",
    rows: people.map((person) => ({
      fromId: person.id,
      toId: person.companyId,
      properties: {
        sinceYear: person.sinceYear,
        employmentType: person.employmentType,
      },
    })),
  },
  {
    name: "BUILT_FOR",
    query:
      "UNWIND $rows AS row MATCH (a:Project {id: row.fromId}) MATCH (b:Company {id: row.toId}) MERGE (a)-[r:BUILT_FOR]->(b) SET r += row.properties",
    rows: projects.map((project) => ({
      fromId: project.id,
      toId: project.companyId,
      properties: {},
    })),
  },
  {
    name: "PROJECT_USES_TECHNOLOGY",
    query:
      "UNWIND $rows AS row MATCH (a:Project {id: row.fromId}) MATCH (b:Technology {id: row.toId}) MERGE (a)-[r:USES_TECHNOLOGY]->(b) SET r += row.properties",
    rows: projects.flatMap((project) =>
      project.technologies.map(({ id, ...properties }) => ({
        fromId: project.id,
        toId: id,
        properties,
      })),
    ),
  },
  {
    name: "PROJECT_REQUIRES_SKILL",
    query:
      "UNWIND $rows AS row MATCH (a:Project {id: row.fromId}) MATCH (b:Skill {id: row.toId}) MERGE (a)-[r:REQUIRES_SKILL]->(b) SET r += row.properties",
    rows: projects.flatMap((project) =>
      project.skills.map(({ id, ...properties }) => ({
        fromId: project.id,
        toId: id,
        properties,
      })),
    ),
  },
  {
    name: "RELATES_TO_ROLE",
    query:
      "UNWIND $rows AS row MATCH (a:Project {id: row.fromId}) MATCH (b:JobRole {id: row.toId}) MERGE (a)-[r:RELATES_TO_ROLE]->(b) SET r += row.properties",
    rows: projects.flatMap((project) =>
      project.roles.map(({ id, ...properties }) => ({
        fromId: project.id,
        toId: id,
        properties,
      })),
    ),
  },
  {
    name: "ROLE_REQUIRES_SKILL",
    query:
      "UNWIND $rows AS row MATCH (a:JobRole {id: row.fromId}) MATCH (b:Skill {id: row.toId}) MERGE (a)-[r:REQUIRES_SKILL]->(b) SET r += row.properties",
    rows: roles.flatMap((role) =>
      role.skills.map(({ id, ...properties }) => ({
        fromId: role.id,
        toId: id,
        properties,
      })),
    ),
  },
  {
    name: "ROLE_USES_TECHNOLOGY",
    query:
      "UNWIND $rows AS row MATCH (a:JobRole {id: row.fromId}) MATCH (b:Technology {id: row.toId}) MERGE (a)-[r:USES_TECHNOLOGY]->(b) SET r += row.properties",
    rows: roles.flatMap((role) =>
      role.technologies.map(({ id, ...properties }) => ({
        fromId: role.id,
        toId: id,
        properties,
      })),
    ),
  },
  {
    name: "TEACHES",
    query:
      "UNWIND $rows AS row MATCH (a:LearningResource {id: row.fromId}) MATCH (b:Skill {id: row.toId}) MERGE (a)-[r:TEACHES]->(b) SET r += row.properties",
    rows: resources.flatMap((resource) =>
      resource.skills.map(({ id, ...properties }) => ({
        fromId: resource.id,
        toId: id,
        properties,
      })),
    ),
  },
  {
    name: "COVERS",
    query:
      "UNWIND $rows AS row MATCH (a:LearningResource {id: row.fromId}) MATCH (b:Technology {id: row.toId}) MERGE (a)-[r:COVERS]->(b) SET r += row.properties",
    rows: resources.flatMap((resource) =>
      resource.technologies.map(({ id, ...properties }) => ({
        fromId: resource.id,
        toId: id,
        properties,
      })),
    ),
  },
];

function validateSeedData(): void {
  for (const group of nodeGroups) assertUniqueIds(group.label, group.rows);
  assertReferencesExist(
    "HAS_SKILL",
    relationships[0]?.rows ?? [],
    idSets.people,
    idSets.skills,
  );
  assertReferencesExist(
    "WORKED_ON",
    relationships[1]?.rows ?? [],
    idSets.people,
    idSets.projects,
  );
  assertReferencesExist(
    "WORKS_AT",
    relationships[2]?.rows ?? [],
    idSets.people,
    idSets.companies,
  );
  assertReferencesExist(
    "BUILT_FOR",
    relationships[3]?.rows ?? [],
    idSets.projects,
    idSets.companies,
  );
  assertReferencesExist(
    "PROJECT_USES_TECHNOLOGY",
    relationships[4]?.rows ?? [],
    idSets.projects,
    idSets.technologies,
  );
  assertReferencesExist(
    "PROJECT_REQUIRES_SKILL",
    relationships[5]?.rows ?? [],
    idSets.projects,
    idSets.skills,
  );
  assertReferencesExist(
    "RELATES_TO_ROLE",
    relationships[6]?.rows ?? [],
    idSets.projects,
    idSets.roles,
  );
  assertReferencesExist(
    "ROLE_REQUIRES_SKILL",
    relationships[7]?.rows ?? [],
    idSets.roles,
    idSets.skills,
  );
  assertReferencesExist(
    "ROLE_USES_TECHNOLOGY",
    relationships[8]?.rows ?? [],
    idSets.roles,
    idSets.technologies,
  );
  assertReferencesExist(
    "TEACHES",
    relationships[9]?.rows ?? [],
    idSets.resources,
    idSets.skills,
  );
  assertReferencesExist(
    "COVERS",
    relationships[10]?.rows ?? [],
    idSets.resources,
    idSets.technologies,
  );
}

async function seedNodes(transaction: ManagedTransaction): Promise<void> {
  for (const { label, rows } of nodeGroups) {
    const query = `UNWIND $rows AS row MERGE (node:${label} {id: row.id}) SET node += row`;
    await transaction.run(query, { rows: rows.map(publicProperties) });
    process.stdout.write(`Seeded ${rows.length} ${label} nodes\n`);
  }
}

async function seedRelationships(
  transaction: ManagedTransaction,
): Promise<void> {
  for (const relationship of relationships) {
    await transaction.run(relationship.query, { rows: relationship.rows });
    process.stdout.write(
      `Seeded ${relationship.rows.length} ${relationship.name} relationships\n`,
    );
  }
}

async function seedDatabase(): Promise<void> {
  validateSeedData();
  const session = getDriver().session();
  try {
    await session.executeWrite(async (transaction) => {
      await seedNodes(transaction);
      await seedRelationships(transaction);
    });
  } finally {
    await session.close();
  }

  const nodeCount = nodeGroups.reduce(
    (total, group) => total + group.rows.length,
    0,
  );
  const relationshipCount = relationships.reduce(
    (total, relationship) => total + relationship.rows.length,
    0,
  );
  process.stdout.write(
    `SkillGraph seed complete: ${nodeCount} nodes and ${relationshipCount} relationships defined\n`,
  );
}

try {
  await seedDatabase();
} catch (error) {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : "SEED_VALIDATION_ERROR";
  process.stderr.write(`SkillGraph seed failed: ${code}\n`);
  process.exitCode = 1;
} finally {
  await closeDriver();
}
