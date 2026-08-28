// 1. Basic retrieval with pagination.
MATCH (person:Person)
RETURN person
ORDER BY person.name
SKIP $offset
LIMIT $limit;

// 2. Relationship traversal: person, employer and projects.
MATCH (person:Person {id: $personId})
OPTIONAL MATCH (person)-[:WORKS_AT]->(company:Company)
OPTIONAL MATCH (person)-[:WORKED_ON]->(project:Project)
RETURN person, company, collect(DISTINCT project) AS projects;

// 3. Multi-hop technology discovery.
MATCH (technology:Technology {id: $technologyId})
MATCH (person:Person)-[:WORKED_ON]->(project:Project)-[:USES_TECHNOLOGY]->(technology)
OPTIONAL MATCH (project)-[:USES_TECHNOLOGY]->(related:Technology)
WHERE related.id <> technology.id
RETURN person, collect(DISTINCT project) AS projects,
       collect(DISTINCT related) AS relatedTechnologies;

// 4. Career gap and recommendation path.
// This crosses Person -> Skill <- JobRole and then LearningResource -> Skill.
MATCH (person:Person {id: $personId})
MATCH (role:JobRole {id: $roleId})-[requirement:REQUIRES_SKILL]->(skill:Skill)
OPTIONAL MATCH (person)-[ability:HAS_SKILL]->(skill)
OPTIONAL MATCH (resource:LearningResource)-[:TEACHES]->(skill)
RETURN person, role, skill, requirement, ability,
       collect(DISTINCT resource) AS learningResources
ORDER BY skill.name;

// 5. Neighborhood query used by the graph explorer.
// Replace the allow-listed label in backend code; never accept a raw label from users.
MATCH (center:Person {id: $id})
OPTIONAL MATCH (center)-[relationship]-(neighbor)
RETURN center, relationship, neighbor
LIMIT 51;
