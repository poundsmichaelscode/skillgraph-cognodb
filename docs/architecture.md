# Architecture

## System context

```mermaid
flowchart LR
    User -->|HTTPS| Web[Next.js Web]
    Web -->|HTTPS REST| API[Express API]
    API -->|Bolt TLS| DB[(CognoDB Cloud)]
```

The frontend contains no database driver or CognoDB credentials.

## Backend layers

```mermaid
flowchart TD
    Request --> Routes --> Validation[Zod validation]
    Validation --> Controllers --> Services --> Repositories
    Repositories --> Driver[Neo4j JavaScript driver] --> CognoDB[(CognoDB)]
    Controllers --> Errors[Central error handler]
```

- **Routes** declare URLs, middleware, and handlers.
- **Controllers** translate validated HTTP input into service calls and envelopes.
- **Services** enforce domain behavior and typed not-found errors.
- **Repositories** own openCypher and convert Neo4j values to JSON-safe values.
- **Database module** owns the shared driver, connectivity checks, and graceful close.

## Frontend rendering

Directory and detail routes are Server Components. Career analysis and graph interaction are focused Client Components. This keeps database fetching server-controlled while shipping client state only for actual interaction.

## Failure flow

```mermaid
sequenceDiagram
    participant Browser
    participant Web as Next.js
    participant API as Express
    participant DB as CognoDB
    Browser->>Web: Request page
    Web->>API: GET /api/v1/...
    API->>DB: Parameterized openCypher
    alt Connected
      DB-->>API: Records
      API-->>Web: Typed JSON
      Web-->>Browser: Rendered content
    else Unavailable
      DB--xAPI: Connection failure
      API-->>Web: Sanitized error
      Web-->>Browser: Safe error state
    end
```

## Containers

Compose runs a standalone Next.js container and a compiled Express container. The API health check includes CognoDB connectivity; the web service waits for API health. Both containers run as non-root users.

## Environment boundaries

| Variable              | Consumer        | Browser-visible |
| --------------------- | --------------- | --------------- |
| `NEXT_PUBLIC_API_URL` | Next.js build   | Yes             |
| `WEB_ORIGIN`          | Express runtime | No              |
| `API_PORT`            | Express runtime | No              |
| `COGNODB_URI`         | Express runtime | No              |
| `COGNODB_USERNAME`    | Express runtime | No              |
| `COGNODB_PASSWORD`    | Express runtime | No              |
