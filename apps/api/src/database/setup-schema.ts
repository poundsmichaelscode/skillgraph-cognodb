import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { closeDriver, getDriver } from "./driver.js";

const schemaFile = fileURLToPath(
  new URL("../../../../database/schema/schema.cypher", import.meta.url),
);

function extractStatements(source: string): string[] {
  const withoutComments = source
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("//"))
    .join("\n");

  return withoutComments
    .split(";")
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0);
}

async function applySchema(): Promise<void> {
  const schemaSource = await readFile(schemaFile, "utf8");
  const statements = extractStatements(schemaSource);
  const driver = getDriver();

  process.stdout.write(
    `Applying ${statements.length} SkillGraph schema statements\n`,
  );

  for (const [index, statement] of statements.entries()) {
    await driver.executeQuery(statement);

    process.stdout.write(
      `Applied schema statement ${index + 1}/${statements.length}\n`,
    );
  }

  process.stdout.write("SkillGraph schema applied successfully\n");
}

try {
  await applySchema();
} catch (error) {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : "UNKNOWN_SCHEMA_ERROR";

  process.stderr.write(`Schema setup failed: ${code}\n`);
  process.exitCode = 1;
} finally {
  await closeDriver();
}
