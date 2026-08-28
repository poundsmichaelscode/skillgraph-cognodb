# Phase 7B — Catalog explorers

This merge-safe update adds searchable and paginated People, Skills and Job Role explorers.

## New routes

- `/people`
- `/people/[id]`
- `/skills`
- `/skills/[id]`
- `/roles`
- `/roles/[id]`

## Merge

From the SkillGraph repository root:

```bash
cp -R /path/to/phase7b/. .
npx prettier --write apps/web
npm run typecheck
npm run lint
npm run build
```

Run the API and web application in separate terminals before testing the routes.
