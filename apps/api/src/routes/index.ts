import { Router } from "express";

import { catalogRouter } from "./catalog.routes.js";

export const apiRouter = Router();

apiRouter.use(catalogRouter);
