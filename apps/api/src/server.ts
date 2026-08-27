import type { Server } from "node:http";

import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { closeDriver, verifyDatabaseConnectivity } from "./database/driver.js";

const app = createApp();

let server: Server | undefined;
let isShuttingDown = false;

async function startServer(): Promise<void> {
  try {
    await verifyDatabaseConnectivity();
    process.stdout.write("CognoDB connection verified\n");
  } catch {
    process.stderr.write(
      "CognoDB is currently unavailable; the API will report degraded health\n",
    );
  }

  server = app.listen(env.API_PORT, () => {
    process.stdout.write(`SkillGraph API listening on port ${env.API_PORT}\n`);
  });
}

async function closeHttpServer(): Promise<void> {
  if (!server) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    server?.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });

    server?.closeIdleConnections();
  });
}

async function shutdown(signal: NodeJS.Signals): Promise<void> {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  process.stdout.write(`${signal} received; shutting down SkillGraph API\n`);

  await closeHttpServer();
  await closeDriver();

  process.stdout.write("SkillGraph API shut down cleanly\n");
}

function handleShutdown(signal: NodeJS.Signals): void {
  void shutdown(signal).catch(() => {
    process.stderr.write("SkillGraph API did not shut down cleanly\n");
    process.exitCode = 1;
  });
}

process.once("SIGINT", handleShutdown);
process.once("SIGTERM", handleShutdown);

void startServer().catch(() => {
  process.stderr.write("SkillGraph API failed to start\n");
  process.exitCode = 1;
});
