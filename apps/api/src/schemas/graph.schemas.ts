import { z } from "zod";

import { graphEntityTypes } from "../types/graph.types.js";
import { idParamsSchema } from "./catalog.schemas.js";

export const searchQuerySchema = z.object({
  q: z.string().trim().min(2).max(100),
  limit: z.coerce.number().int().positive().max(30).default(12),
});

export const careerPathParamsSchema = z.object({
  personId: idParamsSchema.shape.id,
  roleId: idParamsSchema.shape.id,
});

export const graphParamsSchema = z.object({
  type: z.enum(graphEntityTypes),
  id: idParamsSchema.shape.id,
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;
export type CareerPathParams = z.infer<typeof careerPathParamsSchema>;
export type GraphParams = z.infer<typeof graphParamsSchema>;
