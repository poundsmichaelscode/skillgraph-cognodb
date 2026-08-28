import type { RequestHandler } from "express";
import type { ZodType } from "zod";

import { AppError } from "../errors/app-error.js";

type RequestSource = "params" | "query";

export function validateRequest(
  source: RequestSource,
  schema: ZodType,
): RequestHandler {
  return (request, response, next) => {
    const result = schema.safeParse(request[source]);

    if (!result.success) {
      next(
        new AppError(400, "VALIDATION_ERROR", "The request is invalid.", {
          issues: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        }),
      );
      return;
    }

    response.locals[source] = result.data;
    next();
  };
}
