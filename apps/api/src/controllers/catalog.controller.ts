import type { RequestHandler } from "express";

import type { IdParams, ListQuery } from "../schemas/catalog.schemas.js";
import { CatalogService } from "../services/catalog.service.js";
import type { CatalogKind } from "../types/catalog.types.js";

const service = new CatalogService();

function getListQuery(locals: Record<string, unknown>): ListQuery {
  return locals.query as ListQuery;
}

function getIdParams(locals: Record<string, unknown>): IdParams {
  return locals.params as IdParams;
}

export const getStats: RequestHandler = async (_request, response) => {
  const data = await service.getStats();
  response.status(200).json({ data });
};

export function listCatalog(kind: CatalogKind): RequestHandler {
  return async (_request, response) => {
    const query = getListQuery(response.locals);
    const result = await service.list(kind, {
      query: query.q,
      page: query.page,
      limit: query.limit,
    });

    response.status(200).json({
      data: result.items,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  };
}

export const getPerson: RequestHandler = async (_request, response) => {
  const { id } = getIdParams(response.locals);
  response.status(200).json({ data: await service.getPerson(id) });
};

export const getSkill: RequestHandler = async (_request, response) => {
  const { id } = getIdParams(response.locals);
  response.status(200).json({ data: await service.getSkill(id) });
};

export const getRole: RequestHandler = async (_request, response) => {
  const { id } = getIdParams(response.locals);
  response.status(200).json({ data: await service.getRole(id) });
};
