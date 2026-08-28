import type { ErrorRequestHandler } from "express";

import { AppError } from "../errors/app-error.js";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  _next,
) => {
  void _next;

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details === undefined ? {} : { details: error.details }),
      },
    });
    return;
  }

  process.stderr.write("Unhandled API error\n");
  response.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "The request could not be completed.",
    },
  });
};
