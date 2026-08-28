export type CatalogKind =
  | "companies"
  | "people"
  | "projects"
  | "resources"
  | "roles"
  | "skills"
  | "technologies";

export interface PaginationInput {
  query: string;
  page: number;
  limit: number;
}

export interface PaginatedResult {
  items: Array<Record<string, unknown>>;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DashboardStats {
  people: number;
  skills: number;
  technologies: number;
  projects: number;
  roles: number;
}

export interface PersonDetail {
  person: Record<string, unknown>;
  company:
    | (Record<string, unknown> & { relationship?: Record<string, unknown> })
    | null;
  skills: Array<
    Record<string, unknown> & { relationship: Record<string, unknown> }
  >;
  projects: Array<
    Record<string, unknown> & {
      relationship: Record<string, unknown>;
      technologies: Array<Record<string, unknown>>;
    }
  >;
}

export interface SkillDetail {
  skill: Record<string, unknown>;
  people: Array<
    Record<string, unknown> & { relationship: Record<string, unknown> }
  >;
  projects: Array<
    Record<string, unknown> & { relationship: Record<string, unknown> }
  >;
  roles: Array<
    Record<string, unknown> & { relationship: Record<string, unknown> }
  >;
  technologies: Array<Record<string, unknown>>;
}

export interface RoleDetail {
  role: Record<string, unknown>;
  skills: Array<
    Record<string, unknown> & { relationship: Record<string, unknown> }
  >;
  technologies: Array<
    Record<string, unknown> & { relationship: Record<string, unknown> }
  >;
}
