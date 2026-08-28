import { AppError } from "../errors/app-error.js";
import { CatalogRepository } from "../repositories/catalog.repository.js";
import type { CatalogKind, PaginationInput } from "../types/catalog.types.js";

export class CatalogService {
  public constructor(private readonly repository = new CatalogRepository()) {}

  public getStats() {
    return this.repository.getStats();
  }

  public list(kind: CatalogKind, input: PaginationInput) {
    return this.repository.list(kind, input);
  }

  public async getPerson(id: string) {
    const person = await this.repository.getPerson(id);
    if (!person) {
      throw new AppError(
        404,
        "PERSON_NOT_FOUND",
        "The requested person was not found.",
      );
    }
    return person;
  }

  public async getSkill(id: string) {
    const skill = await this.repository.getSkill(id);
    if (!skill) {
      throw new AppError(
        404,
        "SKILL_NOT_FOUND",
        "The requested skill was not found.",
      );
    }
    return skill;
  }

  public async getRole(id: string) {
    const role = await this.repository.getRole(id);
    if (!role) {
      throw new AppError(
        404,
        "ROLE_NOT_FOUND",
        "The requested role was not found.",
      );
    }
    return role;
  }
}
