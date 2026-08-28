# Important Graph Queries

## Basic retrieval

```cypher
MATCH (person:Person)
RETURN properties(person) AS person
ORDER BY person.name
SKIP $offset
LIMIT $limit
```

## Direct traversal

```cypher
MATCH (person:Person {id: $personId})
OPTIONAL MATCH (person)-[:WORKS_AT]->(company:Company)
OPTIONAL MATCH (person)-[:WORKED_ON]->(project:Project)
RETURN person, company, collect(DISTINCT project) AS projects
```

## Multi-hop technology discovery

```cypher
MATCH (technology:Technology {id: $technologyId})
MATCH (person:Person)-[:WORKED_ON]->(project:Project)-[:USES_TECHNOLOGY]->(technology)
OPTIONAL MATCH (project)-[:USES_TECHNOLOGY]->(related:Technology)
WHERE related.id <> technology.id
RETURN person, collect(DISTINCT project) AS projects,
       collect(DISTINCT related) AS relatedTechnologies
```

This repeatedly traverses project-technology relationships. A relational version needs multiple association-table joins, grouping, and deduplication.

## Career gap and recommendations

```cypher
MATCH (person:Person {id: $personId})
MATCH (role:JobRole {id: $roleId})-[requirement:REQUIRES_SKILL]->(skill:Skill)
OPTIONAL MATCH (person)-[ability:HAS_SKILL]->(skill)
OPTIONAL MATCH (resource:LearningResource)-[:TEACHES]->(skill)
RETURN person, role, skill, requirement, ability,
       collect(DISTINCT resource) AS learningResources
ORDER BY skill.name
```

An `ability` relationship means the requirement is matched; its absence means the skill is missing. Resources connected to missing skills become explainable recommendations.

## Neighborhood exploration

```cypher
MATCH (center:Person {id: $id})
OPTIONAL MATCH (center)-[relationship]-(neighbor)
RETURN center, relationship, neighbor
LIMIT 51
```

Labels cannot be Cypher parameters, so the repository chooses them from a typed server-side allowlist. Raw request text is never inserted as a label. All values use `$parameters`.
