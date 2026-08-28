# SkillGraph Phase 4 files

Copy the two files into the matching paths in the repository, then add this API workspace script:

```json
"db:seed": "tsx src/database/seed.ts"
```

Run:

```bash
npm run format
npm run typecheck
npm run lint
npm run db:seed --workspace=@skillgraph/api
```

The seed is fictional, parameterized and idempotent. Re-running it updates matching nodes and relationships without uncontrolled duplication.
