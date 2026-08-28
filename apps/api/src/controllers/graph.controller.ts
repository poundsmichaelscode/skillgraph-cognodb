import type { RequestHandler } from "express";

import type {
  CareerPathParams,
  GraphParams,
  SearchQuery,
} from "../schemas/graph.schemas.js";
import { GraphService } from "../services/graph.service.js";

const service = new GraphService();

export const search: RequestHandler = async (_request, response) => {
  const { q, limit } = response.locals.query as SearchQuery;
  response.status(200).json({ data: await service.search(q, limit) });
};

export const getCareerPath: RequestHandler = async (_request, response) => {
  const { personId, roleId } = response.locals.params as CareerPathParams;
  response
    .status(200)
    .json({ data: await service.getCareerPath(personId, roleId) });
};

export const getNeighborhood: RequestHandler = async (_request, response) => {
  const { type, id } = response.locals.params as GraphParams;
  response.status(200).json({ data: await service.getNeighborhood(type, id) });
};

export const discoverPeopleByTechnology: RequestHandler = async (
  _request,
  response,
) => {
  const { id } = response.locals.params as { id: string };
  response
    .status(200)
    .json({ data: await service.discoverPeopleByTechnology(id) });
};
