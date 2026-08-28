import { Router } from "express";

import {
  getPerson,
  getRole,
  getSkill,
  getStats,
  listCatalog,
} from "../controllers/catalog.controller.js";
import { validateRequest } from "../middleware/validate-request.js";
import { idParamsSchema, listQuerySchema } from "../schemas/catalog.schemas.js";

export const catalogRouter = Router();

catalogRouter.get("/stats", getStats);

catalogRouter.get(
  "/people",
  validateRequest("query", listQuerySchema),
  listCatalog("people"),
);
catalogRouter.get(
  "/people/:id",
  validateRequest("params", idParamsSchema),
  getPerson,
);

catalogRouter.get(
  "/skills",
  validateRequest("query", listQuerySchema),
  listCatalog("skills"),
);
catalogRouter.get(
  "/skills/:id",
  validateRequest("params", idParamsSchema),
  getSkill,
);

catalogRouter.get(
  "/technologies",
  validateRequest("query", listQuerySchema),
  listCatalog("technologies"),
);
catalogRouter.get(
  "/projects",
  validateRequest("query", listQuerySchema),
  listCatalog("projects"),
);

catalogRouter.get(
  "/roles",
  validateRequest("query", listQuerySchema),
  listCatalog("roles"),
);
catalogRouter.get(
  "/roles/:id",
  validateRequest("params", idParamsSchema),
  getRole,
);

catalogRouter.get(
  "/companies",
  validateRequest("query", listQuerySchema),
  listCatalog("companies"),
);
catalogRouter.get(
  "/resources",
  validateRequest("query", listQuerySchema),
  listCatalog("resources"),
);
