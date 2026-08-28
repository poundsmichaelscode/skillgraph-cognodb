# Phase 11A — Production Docker Images

Adds multi-stage, non-root Docker images for the Express API and standalone Next.js frontend, plus repository-wide Docker ignore rules. The backend now accepts runtime environment variables when no local `.env` file exists, which is required in containers and hosted environments.
