export interface ApiEnvelope<T> {
  data: T;
}

export interface PaginatedEnvelope<T> extends ApiEnvelope<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DashboardStats {
  people: number;
  skills: number;
  technologies: number;
  projects: number;
  roles: number;
}

export interface PersonSummary {
  id: string;
  name: string;
  title: string;
  location: string;
  bio: string;
}

export interface SkillSummary {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface RoleSummary {
  id: string;
  title: string;
  level: string;
  description: string;
}

export interface TechnologySummary {
  id: string;
  name: string;
  category: string;
  description: string;
}

export type EntityRecord = Record<string, unknown> & { id: string };
export type RelatedEntity = EntityRecord & {
  relationship: Record<string, unknown>;
};

export interface PersonDetail {
  person: PersonSummary;
  company: (EntityRecord & { relationship?: Record<string, unknown> }) | null;
  skills: RelatedEntity[];
  projects: Array<
    RelatedEntity & {
      technologies: TechnologySummary[];
    }
  >;
}

export interface SkillDetail {
  skill: SkillSummary;
  people: RelatedEntity[];
  projects: RelatedEntity[];
  roles: RelatedEntity[];
  technologies: TechnologySummary[];
}

export interface RoleDetail {
  role: RoleSummary;
  skills: RelatedEntity[];
  technologies: RelatedEntity[];
}

export interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
  };
}
