# Phase 7A — Frontend foundation and dashboard

This is a merge-safe update for the existing SkillGraph repository.

## Merge

From the repository root:

```bash
cp -R /path/to/skillgraph-phase-7a/. .
npm install lucide-react --workspace=@skillgraph/web
npx prettier --write apps/web
npm run typecheck
npm run lint
npm run build
```

## Replaced files

- `apps/web/app/layout.tsx`
- `apps/web/app/page.tsx`
- `apps/web/app/globals.css`

## New files

- `apps/web/components/dashboard/dashboard.tsx`
- `apps/web/components/layout/app-shell.tsx`
- `apps/web/components/layout/navigation.tsx`
- `apps/web/components/ui/data-unavailable.tsx`
- `apps/web/components/ui/stat-card.tsx`
- `apps/web/lib/api.ts`
- `apps/web/types/api.ts`

Keep the Express API running on port 4000 while testing the dashboard.
