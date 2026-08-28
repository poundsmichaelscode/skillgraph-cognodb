# Testing

## Deterministic API tests

Vitest and Supertest exercise Express while mocking repository and health boundaries. Coverage includes health states, validation, search, graph neighborhoods, career responses, not-found behavior, unknown routes, and sanitized 500 errors.

```bash
npm test
```

## Live CognoDB tests

The opt-in suite verifies real connectivity, cross-label search, person relationship traversal, and the seeded Adeleke-to-Backend career gap.

```bash
RUN_COGNODB_INTEGRATION=true npm test --workspace=@skillgraph/api
```

The suite reads backend environment variables and never prints them.

## Quality gates

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Docker verification

```bash
docker compose up --build --detach
docker compose ps
curl -s http://127.0.0.1:4000/api/v1/health
curl -I http://127.0.0.1:3000
docker compose down
```

## Manual checks

- Browse and search people, skills, and roles.
- Open representative details.
- Run Adeleke Olaniyi to Backend Engineer and confirm five missing skills.
- Change the graph's starting person and expand a connected node.
- Stop the API and verify safe error states.
- Check mobile widths for overflow.
