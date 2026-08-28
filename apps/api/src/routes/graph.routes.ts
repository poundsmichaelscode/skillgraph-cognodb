import { Router } from "express";

import {
  discoverPeopleByTechnology,
  getCareerPath,
  getNeighborhood,
  search,
} from "../controllers/graph.controller.js";
import { validateRequest } from "../middleware/validate-request.js";
import { idParamsSchema } from "../schemas/catalog.schemas.js";
import {
  careerPathParamsSchema,
  graphParamsSchema,
  searchQuerySchema,
} from "../schemas/graph.schemas.js";

export const graphRouter = Router();

graphRouter.get("/search", validateRequest("query", searchQuerySchema), search);
graphRouter.get(
  "/career-path/:personId/:roleId",
  validateRequest("params", careerPathParamsSchema),
  getCareerPath,
);
graphRouter.get(
  "/graph/:type/:id",
  validateRequest("params", graphParamsSchema),
  getNeighborhood,
);
graphRouter.get(
  "/discover/technology/:id/people",
  validateRequest("params", idParamsSchema),
  discoverPeopleByTechnology,
);
