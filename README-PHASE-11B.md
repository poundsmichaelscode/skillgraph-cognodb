# Phase 11B — Docker Compose

Runs the production API and standalone Next.js images together. CognoDB credentials are injected only into the API at runtime through the ignored root `.env` file. The web image receives only the public REST API URL at build time.

The API health check verifies CognoDB connectivity. The web service waits for the API to become healthy before starting.

## Start

```bash
docker compose up --build --detach
```

## Stop

```bash
docker compose down
```
