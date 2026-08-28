import { z } from "zod";

export const listQuerySchema = z.object({
  q: z.string().trim().max(100).default(""),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(12),
});

export const idParamsSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "ID must be a lowercase slug"),
});

export type ListQuery = z.infer<typeof listQuerySchema>;
export type IdParams = z.infer<typeof idParamsSchema>;
