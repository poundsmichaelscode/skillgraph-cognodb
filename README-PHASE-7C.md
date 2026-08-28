# Phase 7C — Career Skill Gap Explorer

This merge-safe update adds `/career`, SkillGraph's primary graph-powered workflow.

## Features

- Person and target-role selection
- Readiness percentage
- Existing and missing skill comparison
- Associated technologies
- Learning-resource recommendations
- Loading and safe error feedback
- Responsive, accessible results

## Merge and verify

```bash
cp -R /path/to/phase7c/. .
npx prettier --write apps/web
npm run typecheck
npm run lint
npm run build
```

Run the API and frontend in separate terminals, then open `http://localhost:3000/career`.
