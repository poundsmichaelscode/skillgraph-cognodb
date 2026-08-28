# Phase 10B — CognoDB Integration Tests

Adds an opt-in suite that verifies connectivity, cross-label search, graph-neighborhood traversal, and the seeded Adeleke-to-Backend career-gap calculation against the real CognoDB instance.

Ordinary `npm test` skips the live suite. Run it explicitly with:

```bash
RUN_COGNODB_INTEGRATION=true npm test --workspace=@skillgraph/api
```

The suite reads credentials through the existing backend environment module and never prints them.
