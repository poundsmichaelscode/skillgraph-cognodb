# SkillGraph Database

SkillGraph uses CognoDB through the official Neo4j JavaScript driver, encrypted Bolt connections, and openCypher.

```text
database/
├── queries/skillgraph.cypher
└── schema/schema.cypher
```

Executable schema and seed scripts live in `apps/api/src/database` so they reuse validated environment configuration and the shared driver lifecycle.

## Apply schema

```bash
npm run db:schema --workspace=@skillgraph/api
```

## Seed

```bash
npm run db:seed --workspace=@skillgraph/api
```

The idempotent seed uses stable IDs and `MERGE`. Expected totals are 125 nodes and 517 relationships. All people, companies, projects, and resources are fictional.

`queries/skillgraph.cypher` demonstrates basic retrieval, direct traversal, multi-hop discovery, career recommendations, and neighborhood exploration. Request values must always be parameters; labels may only come from server-owned allowlists.
