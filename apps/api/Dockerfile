FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/types/package.json ./packages/types/package.json

RUN npm ci --workspace=@skillgraph/api --include-workspace-root

FROM dependencies AS builder

COPY tsconfig.json ./tsconfig.json
COPY apps/api ./apps/api

RUN npm run build --workspace=@skillgraph/api

FROM dependencies AS production-dependencies

RUN npm prune --omit=dev --workspace=@skillgraph/api --include-workspace-root

FROM node:22-alpine AS runner

ENV NODE_ENV=production
ENV API_PORT=4000

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs skillgraph

COPY --from=production-dependencies --chown=skillgraph:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=skillgraph:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=skillgraph:nodejs /app/apps/api/package.json ./apps/api/package.json

USER skillgraph

EXPOSE 4000

CMD ["node", "apps/api/dist/server.js"]
