import { verifyDatabaseConnectivity } from "./driver.js";

export interface DatabaseHealth {
  status: "connected" | "unavailable";
  responseTimeMs: number;
}

function getSafeErrorCode(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }

  return "UNKNOWN_DATABASE_ERROR";
}

export async function checkDatabaseHealth(): Promise<DatabaseHealth> {
  const startedAt = performance.now();

  try {
    await verifyDatabaseConnectivity();

    return {
      status: "connected",
      responseTimeMs: Math.round(performance.now() - startedAt),
    };
  } catch (error) {
    const errorCode = getSafeErrorCode(error);

    process.stderr.write(`CognoDB health check failed: ${errorCode}\n`);

    return {
      status: "unavailable",
      responseTimeMs: Math.round(performance.now() - startedAt),
    };
  }
}
