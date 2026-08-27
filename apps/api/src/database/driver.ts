import neo4j, { type Driver } from "neo4j-driver";

import { env } from "../config/env.js";

const CONNECTION_TIMEOUT_MS = 10_000;
const MAX_CONNECTION_POOL_SIZE = 20;
const MAX_CONNECTION_LIFETIME_MS = 30 * 60 * 1_000;

let driver: Driver | undefined;

export function getDriver(): Driver {
  if (driver) {
    return driver;
  }

  driver = neo4j.driver(
    env.COGNODB_URI,
    neo4j.auth.basic(env.COGNODB_USERNAME, env.COGNODB_PASSWORD),
    {
      connectionTimeout: CONNECTION_TIMEOUT_MS,
      maxConnectionPoolSize: MAX_CONNECTION_POOL_SIZE,
      maxConnectionLifetime: MAX_CONNECTION_LIFETIME_MS,
      telemetryDisabled: true,
    },
  );

  return driver;
}

export async function verifyDatabaseConnectivity(): Promise<void> {
  await getDriver().verifyConnectivity();
}

export async function closeDriver(): Promise<void> {
  if (!driver) {
    return;
  }

  await driver.close();
  driver = undefined;
}
