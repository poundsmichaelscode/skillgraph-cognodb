import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { env } from "./config/env.js";
import { checkDatabaseHealth } from "./database/health.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { apiRouter } from "./routes/index.js";

export function createApp(): express.Express {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(
    cors({
      origin: env.WEB_ORIGIN,
      methods: ["GET"],
    }),
  );
  app.use(express.json({ limit: "100kb" }));
  app.use(
    "/api/v1",
    rateLimit({
      windowMs: 15 * 60 * 1_000,
      limit: 300,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      message: {
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many requests. Please try again later.",
        },
      },
    }),
  );

  app.get("/api/v1/health", async (_request, response) => {
    const database = await checkDatabaseHealth();
    const isReady = database.status === "connected";

    response.status(isReady ? 200 : 503).json({
      data: {
        status: isReady ? "ok" : "degraded",
        service: "skillgraph-api",
        database,
      },
    });
  });

  app.use("/api/v1", apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
