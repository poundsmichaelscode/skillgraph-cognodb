import { AppError } from "../errors/app-error.js";
import { GraphRepository } from "../repositories/graph.repository.js";
import type { GraphEntityType } from "../types/graph.types.js";

export class GraphService {
  public constructor(private readonly repository = new GraphRepository()) {}

  public search(query: string, limit: number) {
    return this.repository.search(query, limit);
  }

  public async getCareerPath(personId: string, roleId: string) {
    const result = await this.repository.getCareerPath(personId, roleId);
    if (!result) {
      throw new AppError(
        404,
        "CAREER_PATH_NOT_FOUND",
        "The requested person or target role was not found.",
      );
    }
    return result;
  }

  public async getNeighborhood(type: GraphEntityType, id: string) {
    const result = await this.repository.getNeighborhood(type, id);
    if (!result) {
      throw new AppError(
        404,
        "ENTITY_NOT_FOUND",
        "The requested graph entity was not found.",
      );
    }
    return result;
  }

  public async discoverPeopleByTechnology(id: string) {
    const result = await this.repository.discoverPeopleByTechnology(id);
    if (!result) {
      throw new AppError(
        404,
        "TECHNOLOGY_NOT_FOUND",
        "The requested technology was not found.",
      );
    }
    return result;
  }
}
