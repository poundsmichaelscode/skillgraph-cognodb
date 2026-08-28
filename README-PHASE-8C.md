# Phase 8C — Interactive Graph Explorer

This overlay adds the `/graph` page and interactive React Flow visualization.

## Merge

From the SkillGraph repository root:

```bash
cp -R /path/to/extracted/phase8c/. .
```

Then add `@import '@xyflow/react/dist/style.css';` immediately after the Tailwind import in `apps/web/app/globals.css`.

Add `Network` to the Lucide imports in `apps/web/components/layout/navigation.tsx`, then add this item after Career gap:

```ts
{ href: '/graph', label: 'Graph explorer', icon: Network },
```

The Phase 8B `GraphResult` types and `getGraph` API function must already be installed.

## Validate

```bash
npx prettier --write apps/web README-PHASE-8C.md
npm run typecheck
npm run lint
npm run build
```

Expected build output includes `ƒ /graph`.
