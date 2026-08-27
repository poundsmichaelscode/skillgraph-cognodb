import { fileURLToPath } from "node:url";

import { config } from "dotenv";
import { z } from "zod";

const environmentFile = fileURLToPath(
  new URL("../../../../.env", import.meta.url),
);

const dotenvResult = config({
  path: environmentFile,
  quiet: true,
});

if (dotenvResult.error) {
  throw new Error(
    "Unable to load the root .env file. Confirm that it exists in the repository root.",
  );
}

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  API_PORT: z.coerce.number().int().positive().max(65_535).default(4000),

  WEB_ORIGIN: z.string().url().default("http://localhost:3000"),

  COGNODB_URI: z
    .string()
    .trim()
    .min(1, "COGNODB_URI is required")
    .refine(
      (value) =>
        value.startsWith("bolt+s://") ||
        value.startsWith("bolt+ssc://") ||
        value.startsWith("bolt://"),
      "COGNODB_URI must use a supported Bolt URI scheme",
    ),

  COGNODB_USERNAME: z.string().trim().min(1, "COGNODB_USERNAME is required"),

  COGNODB_PASSWORD: z.string().min(1, "COGNODB_PASSWORD is required"),
});

const parsedEnvironment = environmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
  const invalidVariables = [
    ...new Set(
      parsedEnvironment.error.issues
        .map((issue) => issue.path.join("."))
        .filter(Boolean),
    ),
  ].join(", ");

  throw new Error(
    `Invalid server configuration. Check the following environment variables: ${invalidVariables}`,
  );
}

export const env = Object.freeze(parsedEnvironment.data);

export type Environment = z.infer<typeof environmentSchema>;
