# Phase 6 — Cypher Queries

This folder is a merge-safe update for the existing SkillGraph repository. It does not replace the repository.

## Merge

From the repository root, replace `/path/to/skillgraph-phase-6` with the actual unzipped folder path:

```bash
cp -R /path/to/skillgraph-phase-6/. .
```

The only existing file replaced is `apps/api/src/routes/index.ts`. All other files are new.

## Files

New:

- `apps/api/src/controllers/graph.controller.ts`
- `apps/api/src/repositories/graph.repository.ts`
- `apps/api/src/routes/graph.routes.ts`
- `apps/api/src/schemas/graph.schemas.ts`
- `apps/api/src/services/graph.service.ts`
- `apps/api/src/types/graph.types.ts`
- `database/queries/skillgraph.cypher`

Modified:

- `apps/api/src/routes/index.ts`

## Endpoints

- `GET /api/v1/search?q=node&limit=12`
- `GET /api/v1/career-path/:personId/:roleId`
- `GET /api/v1/graph/:type/:id`
- `GET /api/v1/discover/technology/:id/people`

Allowed graph types: `company`, `person`, `project`, `resource`, `role`, `skill`, `technology`.

## Verification

```bash
npx prettier --write apps/api/src
npm run typecheck
npm run lint
npm run build
npm run dev:api
```

Use IDs returned by the list endpoints rather than guessing IDs.

## Test requests

```bash
curl -s "http://127.0.0.1:4000/api/v1/search?q=node&limit=12" | python3 -m json.tool
curl -s "http://127.0.0.1:4000/api/v1/career-path/person-adeleke-olaniyi/role-devops-engineer" | python3 -m json.tool
curl -s "http://127.0.0.1:4000/api/v1/graph/person/person-adeleke-olaniyi" | python3 -m json.tool
```

If a role ID differs, retrieve a valid one from `/api/v1/roles?limit=50`.
