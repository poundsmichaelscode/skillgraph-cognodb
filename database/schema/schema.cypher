// ============================================================
// SkillGraph uniqueness constraints
// Each entity receives a stable application-generated ID.
// IF NOT EXISTS makes this schema safe to apply repeatedly.
// ============================================================

CREATE CONSTRAINT person_id_unique IF NOT EXISTS
FOR (person:Person)
REQUIRE person.id IS UNIQUE;

CREATE CONSTRAINT skill_id_unique IF NOT EXISTS
FOR (skill:Skill)
REQUIRE skill.id IS UNIQUE;

CREATE CONSTRAINT technology_id_unique IF NOT EXISTS
FOR (technology:Technology)
REQUIRE technology.id IS UNIQUE;

CREATE CONSTRAINT project_id_unique IF NOT EXISTS
FOR (project:Project)
REQUIRE project.id IS UNIQUE;

CREATE CONSTRAINT job_role_id_unique IF NOT EXISTS
FOR (jobRole:JobRole)
REQUIRE jobRole.id IS UNIQUE;

CREATE CONSTRAINT company_id_unique IF NOT EXISTS
FOR (company:Company)
REQUIRE company.id IS UNIQUE;

CREATE CONSTRAINT learning_resource_id_unique IF NOT EXISTS
FOR (resource:LearningResource)
REQUIRE resource.id IS UNIQUE;


// ============================================================
// Search indexes
// ID properties are already indexed by their uniqueness
// constraints. These additional indexes support browse/search.
// ============================================================

CREATE INDEX person_name_index IF NOT EXISTS
FOR (person:Person)
ON (person.name);

CREATE INDEX skill_name_index IF NOT EXISTS
FOR (skill:Skill)
ON (skill.name);

CREATE INDEX technology_name_index IF NOT EXISTS
FOR (technology:Technology)
ON (technology.name);

CREATE INDEX project_name_index IF NOT EXISTS
FOR (project:Project)
ON (project.name);

CREATE INDEX job_role_title_index IF NOT EXISTS
FOR (jobRole:JobRole)
ON (jobRole.title);

CREATE INDEX company_name_index IF NOT EXISTS
FOR (company:Company)
ON (company.name);

CREATE INDEX learning_resource_title_index IF NOT EXISTS
FOR (resource:LearningResource)
ON (resource.title);
