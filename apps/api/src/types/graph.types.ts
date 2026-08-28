export const graphEntityTypes = [
  "company",
  "person",
  "project",
  "resource",
  "role",
  "skill",
  "technology",
] as const;

export type GraphEntityType = (typeof graphEntityTypes)[number];

export interface SearchResult {
  id: string;
  type: GraphEntityType;
  label: string;
  description: string;
}

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

export interface GraphNeighborhood {
  center: GraphNode;
  nodes: GraphNode[];
  edges: GraphEdge[];
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
  person: Record<string, unknown>;
  role: Record<string, unknown>;
  readinessPercentage: number;
  existingSkills: CareerSkill[];
  missingSkills: CareerSkill[];
  technologies: Array<Record<string, unknown>>;
  recommendations: LearningRecommendation[];
}

export interface TechnologyDiscoveryResult {
  technology: Record<string, unknown>;
  people: Array<{
    person: Record<string, unknown>;
    projects: Array<Record<string, unknown>>;
    relatedTechnologies: Array<Record<string, unknown>>;
  }>;
}
