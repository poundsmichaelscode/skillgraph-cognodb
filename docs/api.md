# API Reference

Local base URL: `http://localhost:4000/api/v1`.

## Envelopes

Single result: `{ "data": {} }`

Paginated result:

```json
{
  "data": [],
  "meta": { "page": 1, "limit": 12, "total": 24, "totalPages": 2 }
}
```

Error:

```json
{
  "error": { "code": "VALIDATION_ERROR", "message": "The request is invalid." }
}
```

Internal errors are generic and exclude stack traces, Cypher, and connection details.

## Routes

| Method and path                       | Description                                              |
| ------------------------------------- | -------------------------------------------------------- |
| `GET /health`                         | API and CognoDB readiness; returns 503 when degraded     |
| `GET /stats`                          | Counts people, skills, technologies, projects, and roles |
| `GET /people`                         | People catalog                                           |
| `GET /people/:id`                     | Person, company, skills, projects, and technologies      |
| `GET /skills`                         | Skills catalog                                           |
| `GET /skills/:id`                     | Related people, projects, roles, and technologies        |
| `GET /technologies`                   | Technologies catalog                                     |
| `GET /projects`                       | Projects catalog                                         |
| `GET /roles`                          | Roles catalog                                            |
| `GET /roles/:id`                      | Required skills and technologies                         |
| `GET /companies`                      | Companies catalog                                        |
| `GET /resources`                      | Learning resources catalog                               |
| `GET /search?q=&limit=`               | Cross-label search                                       |
| `GET /career-path/:personId/:roleId`  | Readiness, missing skills, technologies, resources       |
| `GET /graph/:type/:id`                | Bounded one-hop neighborhood                             |
| `GET /discover/technology/:id/people` | Multi-hop people and project discovery                   |

Catalogs accept `q`, `page`, and `limit`. Search requires 2–100 characters and supports a maximum limit of 30.

Graph types are `company`, `person`, `project`, `resource`, `role`, `skill`, and `technology`.

## Status codes

| Status | Meaning                    |
| -----: | -------------------------- |
|    200 | Success                    |
|    400 | Validation failure         |
|    404 | Route or entity not found  |
|    429 | Rate limit exceeded        |
|    500 | Sanitized unexpected error |
|    503 | Database unavailable       |
