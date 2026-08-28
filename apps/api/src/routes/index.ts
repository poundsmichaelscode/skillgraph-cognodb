import { Router } from "express";

import { catalogRouter } from "./catalog.routes.js";
import { graphRouter } from "./graph.routes.js";

export const apiRouter = Router();

apiRouter.use(catalogRouter);
apiRouter.use(graphRouter);
