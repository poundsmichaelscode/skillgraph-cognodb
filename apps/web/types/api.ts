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
  projects: Array<RelatedEntity & { technologies: TechnologySummary[] }>;
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

export interface CareerSkill {
  id: string;
  name: string;
  category?: string;
  requiredLevel?: string;
  currentLevel?: string;
}

export interface LearningRecommendation {
  id: string;
  title: string;
  provider?: string;
  url?: string;
  format?: string;
  teachesSkillIds: string[];
}

export interface CareerPathResult {
  person: PersonSummary;
  role: RoleSummary;
  readinessPercentage: number;
  existingSkills: CareerSkill[];
  missingSkills: CareerSkill[];
  technologies: TechnologySummary[];
  recommendations: LearningRecommendation[];
}

export type GraphEntityType =
  | "person"
  | "skill"
  | "technology"
  | "project"
  | "role"
  | "company"
  | "resource";

export interface GraphNode {
  id: string;
  type: GraphEntityType;
  label: string;
  properties: Record<string, unknown>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  properties: Record<string, unknown>;
}

export interface GraphResult {
  center: GraphNode;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
  };
}
