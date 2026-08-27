import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { checkDatabaseHealth } from "./database/health.js";
export function createApp() {
    const app = express();
    app.disable("x-powered-by");
    app.use(helmet());
    app.use(cors({
        origin: env.WEB_ORIGIN,
        methods: ["GET"],
    }));
    app.use(express.json({ limit: "100kb" }));
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
    return app;
}
//# sourceMappingURL=app.js.map