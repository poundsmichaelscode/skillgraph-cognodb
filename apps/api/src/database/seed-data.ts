export interface EntityNode {
  id: string;
}

export interface SkillLink {
  id: string;
  importance?: "core" | "supporting";
  minimumProficiency?: "beginner" | "intermediate" | "advanced";
  proficiency?: "beginner" | "intermediate" | "advanced" | "expert";
  years?: number;
}

export interface TechnologyLink {
  id: string;
  importance: "core" | "supporting";
}

export interface Company extends EntityNode {
  name: string;
  industry: string;
  location: string;
  description: string;
}

export interface Skill extends EntityNode {
  name: string;
  category: string;
  description: string;
}

export interface Technology extends EntityNode {
  name: string;
  category: string;
  description: string;
}

export interface JobRole extends EntityNode {
  title: string;
  level: string;
  description: string;
  skills: SkillLink[];
  technologies: TechnologyLink[];
}

export interface Project extends EntityNode {
  name: string;
  summary: string;
  status: "active" | "completed" | "maintained";
  year: number;
  companyId: string;
  skills: SkillLink[];
  technologies: TechnologyLink[];
  roles: Array<{ id: string; relevance: "primary" | "secondary" }>;
}

export interface Person extends EntityNode {
  name: string;
  title: string;
  location: string;
  bio: string;
  companyId: string;
  sinceYear: number;
  employmentType: "full-time" | "contract" | "internship";
  skills: SkillLink[];
  projects: Array<{ id: string; role: string; contribution: string }>;
}

export interface LearningResource extends EntityNode {
  title: string;
  type: "course" | "guide" | "lab" | "book";
  level: "beginner" | "intermediate" | "advanced";
  url: string;
  description: string;
  skills: Array<{
    id: string;
    depth: "introductory" | "practical" | "comprehensive";
  }>;
  technologies: Array<{
    id: string;
    depth: "introductory" | "practical" | "comprehensive";
  }>;
}

export const companies: Company[] = [
  {
    id: "company-atlas-pay",
    name: "AtlasPay Systems",
    industry: "Fintech",
    location: "Lagos, Nigeria",
    description:
      "Builds reliable payment infrastructure for growing African businesses.",
  },
  {
    id: "company-kora-health",
    name: "Kora Health Labs",
    industry: "Health technology",
    location: "Nairobi, Kenya",
    description:
      "Develops connected clinical operations software for regional care providers.",
  },
  {
    id: "company-northstar-logistics",
    name: "Northstar Logistics",
    industry: "Logistics",
    location: "Accra, Ghana",
    description: "Coordinates last-mile fulfillment for independent retailers.",
  },
  {
    id: "company-civicstack",
    name: "CivicStack",
    industry: "Civic technology",
    location: "Kigali, Rwanda",
    description: "Creates accessible digital public-service platforms.",
  },
  {
    id: "company-bluepeak-cloud",
    name: "BluePeak Cloud",
    industry: "Cloud services",
    location: "Cape Town, South Africa",
    description:
      "Provides cloud modernization and reliability engineering services.",
  },
  {
    id: "company-ember-commerce",
    name: "Ember Commerce",
    industry: "E-commerce",
    location: "Cairo, Egypt",
    description: "Operates commerce infrastructure for multi-market merchants.",
  },
  {
    id: "company-lumen-learning",
    name: "Lumen Learning Works",
    industry: "Education technology",
    location: "Lagos, Nigeria",
    description: "Builds learning and school-operations products.",
  },
  {
    id: "company-verde-energy",
    name: "Verde Energy Analytics",
    industry: "Clean energy",
    location: "Dakar, Senegal",
    description: "Turns distributed energy data into operational decisions.",
  },
  {
    id: "company-orbit-data",
    name: "Orbit Data Collective",
    industry: "Data services",
    location: "Remote",
    description: "Designs trustworthy data platforms and analytical products.",
  },
  {
    id: "company-harbor-security",
    name: "Harbor Security",
    industry: "Cybersecurity",
    location: "Johannesburg, South Africa",
    description:
      "Helps product teams build secure software delivery practices.",
  },
];

const skillRows: Array<[string, string, string, string]> = [
  [
    "api-design",
    "API Design",
    "Backend",
    "Designing stable, usable and evolvable service interfaces.",
  ],
  [
    "backend-development",
    "Backend Development",
    "Engineering",
    "Building reliable server-side application logic.",
  ],
  [
    "frontend-development",
    "Frontend Development",
    "Engineering",
    "Building interactive browser-based product experiences.",
  ],
  [
    "system-design",
    "System Design",
    "Architecture",
    "Designing scalable components and their operational boundaries.",
  ],
  [
    "data-modeling",
    "Data Modeling",
    "Data",
    "Representing domain concepts for reliable storage and retrieval.",
  ],
  [
    "graph-modeling",
    "Graph Modeling",
    "Data",
    "Modeling connected domains with purposeful nodes and relationships.",
  ],
  [
    "testing",
    "Software Testing",
    "Quality",
    "Verifying behavior through focused automated tests.",
  ],
  [
    "devops",
    "DevOps Practices",
    "Operations",
    "Improving software delivery through collaboration and automation.",
  ],
  [
    "cloud-architecture",
    "Cloud Architecture",
    "Cloud",
    "Designing secure and resilient cloud systems.",
  ],
  [
    "containerization",
    "Containerization",
    "Operations",
    "Packaging applications into reproducible runtime units.",
  ],
  [
    "orchestration",
    "Container Orchestration",
    "Operations",
    "Operating containerized workloads across a cluster.",
  ],
  [
    "cicd",
    "CI/CD",
    "Delivery",
    "Automating integration, testing and deployment workflows.",
  ],
  [
    "observability",
    "Observability",
    "Reliability",
    "Understanding systems through metrics, logs and traces.",
  ],
  [
    "security",
    "Application Security",
    "Security",
    "Reducing software and infrastructure security risk.",
  ],
  [
    "linux-administration",
    "Linux Administration",
    "Operations",
    "Operating and troubleshooting Linux systems.",
  ],
  [
    "database-administration",
    "Database Administration",
    "Data",
    "Maintaining database reliability, access and recovery.",
  ],
  [
    "cache-design",
    "Cache Design",
    "Architecture",
    "Using caches safely to improve latency and capacity.",
  ],
  [
    "messaging",
    "Asynchronous Messaging",
    "Architecture",
    "Designing reliable event and message-driven workflows.",
  ],
  [
    "accessibility",
    "Web Accessibility",
    "Product",
    "Creating inclusive interfaces for diverse users.",
  ],
  [
    "ui-engineering",
    "UI Engineering",
    "Product",
    "Implementing consistent and maintainable interface systems.",
  ],
  [
    "product-thinking",
    "Product Thinking",
    "Product",
    "Connecting engineering decisions to user outcomes.",
  ],
  [
    "data-engineering",
    "Data Engineering",
    "Data",
    "Building dependable data ingestion and transformation systems.",
  ],
  [
    "machine-learning",
    "Machine Learning",
    "Data",
    "Developing and evaluating predictive models.",
  ],
  [
    "technical-writing",
    "Technical Writing",
    "Communication",
    "Explaining systems and decisions clearly.",
  ],
  [
    "team-leadership",
    "Engineering Leadership",
    "Leadership",
    "Guiding teams, delivery and technical decisions.",
  ],
];

export const skills: Skill[] = skillRows.map(
  ([id, name, category, description]) => ({
    id: `skill-${id}`,
    name,
    category,
    description,
  }),
);

const technologyRows: Array<[string, string, string, string]> = [
  [
    "typescript",
    "TypeScript",
    "Language",
    "Typed JavaScript for maintainable applications.",
  ],
  [
    "javascript",
    "JavaScript",
    "Language",
    "The programming language of the web platform.",
  ],
  ["nodejs", "Node.js", "Runtime", "Server-side JavaScript runtime."],
  ["express", "Express", "Framework", "Minimal Node.js web framework."],
  [
    "nextjs",
    "Next.js",
    "Framework",
    "React framework for production web applications.",
  ],
  ["react", "React", "Library", "Component-based user interface library."],
  ["tailwind", "Tailwind CSS", "Styling", "Utility-first CSS framework."],
  [
    "python",
    "Python",
    "Language",
    "General-purpose language widely used for APIs and data.",
  ],
  ["fastapi", "FastAPI", "Framework", "Typed Python framework for web APIs."],
  [
    "postgresql",
    "PostgreSQL",
    "Database",
    "Relational database for transactional applications.",
  ],
  [
    "cognodb",
    "CognoDB",
    "Database",
    "Managed Cypher graph database accessed over Bolt.",
  ],
  [
    "redis",
    "Redis",
    "Database",
    "In-memory data store for caching and coordination.",
  ],
  ["docker", "Docker", "Platform", "Container build and runtime platform."],
  ["kubernetes", "Kubernetes", "Platform", "Container orchestration platform."],
  [
    "terraform",
    "Terraform",
    "Infrastructure",
    "Declarative infrastructure provisioning tool.",
  ],
  ["aws", "AWS", "Cloud", "Cloud computing platform."],
  [
    "github-actions",
    "GitHub Actions",
    "Delivery",
    "Repository-native automation platform.",
  ],
  [
    "grafana",
    "Grafana",
    "Observability",
    "Operational dashboards and visualization platform.",
  ],
];

export const technologies: Technology[] = technologyRows.map(
  ([id, name, category, description]) => ({
    id: `technology-${id}`,
    name,
    category,
    description,
  }),
);

const core = (
  id: string,
  minimumProficiency: SkillLink["minimumProficiency"] = "intermediate",
): SkillLink => ({ id: `skill-${id}`, importance: "core", minimumProficiency });
const supporting = (id: string): SkillLink => ({
  id: `skill-${id}`,
  importance: "supporting",
  minimumProficiency: "beginner",
});
const tech = (
  id: string,
  importance: TechnologyLink["importance"] = "core",
): TechnologyLink => ({ id: `technology-${id}`, importance });

export const roles: JobRole[] = [
  {
    id: "role-backend-engineer",
    title: "Backend Engineer",
    level: "Mid-level",
    description: "Builds reliable APIs, services and data integrations.",
    skills: [
      core("backend-development"),
      core("api-design"),
      core("data-modeling"),
      supporting("testing"),
      supporting("cache-design"),
    ],
    technologies: [
      tech("typescript"),
      tech("nodejs"),
      tech("express"),
      tech("postgresql"),
      tech("redis", "supporting"),
    ],
  },
  {
    id: "role-frontend-engineer",
    title: "Frontend Engineer",
    level: "Mid-level",
    description: "Builds responsive, accessible product interfaces.",
    skills: [
      core("frontend-development"),
      core("ui-engineering"),
      core("accessibility"),
      supporting("testing"),
      supporting("product-thinking"),
    ],
    technologies: [
      tech("typescript"),
      tech("react"),
      tech("nextjs"),
      tech("tailwind"),
    ],
  },
  {
    id: "role-fullstack-engineer",
    title: "Full-Stack Engineer",
    level: "Mid-level",
    description:
      "Delivers features across web interfaces and backend services.",
    skills: [
      core("frontend-development"),
      core("backend-development"),
      core("api-design"),
      core("data-modeling"),
      supporting("devops"),
    ],
    technologies: [
      tech("typescript"),
      tech("nextjs"),
      tech("express"),
      tech("postgresql"),
      tech("docker", "supporting"),
    ],
  },
  {
    id: "role-devops-engineer",
    title: "DevOps Engineer",
    level: "Mid-level",
    description: "Automates reliable infrastructure and software delivery.",
    skills: [
      core("devops"),
      core("cicd"),
      core("containerization"),
      core("linux-administration"),
      supporting("observability"),
    ],
    technologies: [
      tech("docker"),
      tech("github-actions"),
      tech("terraform"),
      tech("aws"),
      tech("kubernetes", "supporting"),
    ],
  },
  {
    id: "role-cloud-engineer",
    title: "Cloud Engineer",
    level: "Mid-level",
    description: "Builds and operates secure cloud environments.",
    skills: [
      core("cloud-architecture"),
      core("linux-administration"),
      core("security"),
      core("containerization"),
      supporting("cicd"),
    ],
    technologies: [
      tech("aws"),
      tech("terraform"),
      tech("docker"),
      tech("kubernetes", "supporting"),
    ],
  },
  {
    id: "role-platform-engineer",
    title: "Platform Engineer",
    level: "Senior",
    description:
      "Creates internal platforms that improve developer delivery and reliability.",
    skills: [
      core("system-design", "advanced"),
      core("orchestration", "advanced"),
      core("observability"),
      core("cicd"),
      core("team-leadership"),
    ],
    technologies: [
      tech("kubernetes"),
      tech("terraform"),
      tech("aws"),
      tech("grafana"),
      tech("github-actions"),
    ],
  },
  {
    id: "role-data-engineer",
    title: "Data Engineer",
    level: "Mid-level",
    description: "Builds trustworthy data pipelines and storage systems.",
    skills: [
      core("data-engineering"),
      core("data-modeling"),
      core("database-administration"),
      supporting("testing"),
      supporting("cloud-architecture"),
    ],
    technologies: [
      tech("python"),
      tech("postgresql"),
      tech("aws"),
      tech("docker", "supporting"),
    ],
  },
  {
    id: "role-graph-engineer",
    title: "Graph Database Engineer",
    level: "Mid-level",
    description: "Models connected domains and builds graph-backed services.",
    skills: [
      core("graph-modeling"),
      core("data-modeling"),
      core("api-design"),
      supporting("database-administration"),
      supporting("system-design"),
    ],
    technologies: [
      tech("cognodb"),
      tech("typescript"),
      tech("nodejs"),
      tech("python", "supporting"),
    ],
  },
  {
    id: "role-site-reliability-engineer",
    title: "Site Reliability Engineer",
    level: "Senior",
    description:
      "Improves production reliability through engineering and operational discipline.",
    skills: [
      core("observability", "advanced"),
      core("system-design", "advanced"),
      core("linux-administration"),
      core("orchestration"),
      supporting("security"),
    ],
    technologies: [
      tech("kubernetes"),
      tech("grafana"),
      tech("aws"),
      tech("docker"),
      tech("terraform"),
    ],
  },
  {
    id: "role-security-engineer",
    title: "Application Security Engineer",
    level: "Senior",
    description: "Helps teams design, test and operate secure applications.",
    skills: [
      core("security", "advanced"),
      core("system-design"),
      core("testing"),
      supporting("devops"),
      supporting("technical-writing"),
    ],
    technologies: [
      tech("github-actions"),
      tech("docker"),
      tech("aws"),
      tech("typescript", "supporting"),
    ],
  },
  {
    id: "role-ml-engineer",
    title: "Machine Learning Engineer",
    level: "Mid-level",
    description:
      "Productionizes machine-learning models and supporting data workflows.",
    skills: [
      core("machine-learning"),
      core("data-engineering"),
      core("testing"),
      supporting("api-design"),
      supporting("cloud-architecture"),
    ],
    technologies: [
      tech("python"),
      tech("fastapi"),
      tech("docker"),
      tech("aws"),
      tech("postgresql", "supporting"),
    ],
  },
  {
    id: "role-engineering-lead",
    title: "Engineering Lead",
    level: "Lead",
    description: "Guides teams and owns delivery and architectural outcomes.",
    skills: [
      core("team-leadership", "advanced"),
      core("system-design", "advanced"),
      core("product-thinking"),
      core("technical-writing"),
      supporting("security"),
    ],
    technologies: [
      tech("typescript", "supporting"),
      tech("aws", "supporting"),
      tech("github-actions", "supporting"),
    ],
  },
];

export const projects: Project[] = [
  {
    id: "project-ledger-api",
    name: "Ledger API",
    summary: "Transaction service for merchant settlements and reconciliation.",
    status: "maintained",
    year: 2026,
    companyId: "company-atlas-pay",
    skills: [
      core("backend-development"),
      core("api-design"),
      core("data-modeling"),
      supporting("testing"),
    ],
    technologies: [
      tech("typescript"),
      tech("nodejs"),
      tech("express"),
      tech("postgresql"),
    ],
    roles: [
      { id: "role-backend-engineer", relevance: "primary" },
      { id: "role-fullstack-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-fraud-link-map",
    name: "Fraud Link Map",
    summary: "Graph exploration tool for connected payment-risk signals.",
    status: "active",
    year: 2026,
    companyId: "company-atlas-pay",
    skills: [
      core("graph-modeling"),
      core("data-modeling"),
      supporting("security"),
    ],
    technologies: [tech("cognodb"), tech("typescript"), tech("nextjs")],
    roles: [
      { id: "role-graph-engineer", relevance: "primary" },
      { id: "role-security-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-care-network",
    name: "Care Network",
    summary:
      "Referral coordination platform connecting clinics and specialist services.",
    status: "completed",
    year: 2025,
    companyId: "company-kora-health",
    skills: [
      core("system-design"),
      core("backend-development"),
      supporting("accessibility"),
    ],
    technologies: [
      tech("python"),
      tech("fastapi"),
      tech("postgresql"),
      tech("react"),
    ],
    roles: [{ id: "role-fullstack-engineer", relevance: "primary" }],
  },
  {
    id: "project-clinical-observability",
    name: "Clinical Observability",
    summary:
      "Operational dashboards for service reliability and referral throughput.",
    status: "maintained",
    year: 2026,
    companyId: "company-kora-health",
    skills: [
      core("observability"),
      core("data-engineering"),
      supporting("technical-writing"),
    ],
    technologies: [tech("grafana"), tech("postgresql"), tech("docker")],
    roles: [
      { id: "role-site-reliability-engineer", relevance: "primary" },
      { id: "role-data-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-dispatch-control",
    name: "Dispatch Control",
    summary: "Assignment and status platform for last-mile delivery teams.",
    status: "active",
    year: 2026,
    companyId: "company-northstar-logistics",
    skills: [
      core("backend-development"),
      core("frontend-development"),
      core("messaging"),
    ],
    technologies: [
      tech("typescript"),
      tech("nextjs"),
      tech("express"),
      tech("redis"),
    ],
    roles: [
      { id: "role-fullstack-engineer", relevance: "primary" },
      { id: "role-backend-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-route-events",
    name: "Route Events Pipeline",
    summary:
      "Event-driven pipeline for delivery status and proof-of-delivery updates.",
    status: "completed",
    year: 2025,
    companyId: "company-northstar-logistics",
    skills: [
      core("messaging"),
      core("data-engineering"),
      core("observability"),
    ],
    technologies: [
      tech("nodejs"),
      tech("redis"),
      tech("postgresql"),
      tech("grafana"),
    ],
    roles: [
      { id: "role-data-engineer", relevance: "primary" },
      { id: "role-backend-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-citizen-services",
    name: "Citizen Services Portal",
    summary: "Accessible portal for common municipal service requests.",
    status: "maintained",
    year: 2025,
    companyId: "company-civicstack",
    skills: [
      core("frontend-development"),
      core("accessibility"),
      core("ui-engineering"),
    ],
    technologies: [
      tech("nextjs"),
      tech("react"),
      tech("tailwind"),
      tech("typescript"),
    ],
    roles: [{ id: "role-frontend-engineer", relevance: "primary" }],
  },
  {
    id: "project-permit-api",
    name: "Permit Integration API",
    summary: "Standards-based integration layer for permit processing systems.",
    status: "completed",
    year: 2025,
    companyId: "company-civicstack",
    skills: [
      core("api-design"),
      core("security"),
      supporting("technical-writing"),
    ],
    technologies: [tech("typescript"), tech("express"), tech("postgresql")],
    roles: [
      { id: "role-backend-engineer", relevance: "primary" },
      { id: "role-security-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-cloud-foundation",
    name: "Cloud Foundation",
    summary: "Reusable secure cloud baseline for product engineering teams.",
    status: "maintained",
    year: 2026,
    companyId: "company-bluepeak-cloud",
    skills: [core("cloud-architecture"), core("security"), core("devops")],
    technologies: [tech("aws"), tech("terraform"), tech("github-actions")],
    roles: [
      { id: "role-cloud-engineer", relevance: "primary" },
      { id: "role-devops-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-developer-platform",
    name: "Developer Platform",
    summary:
      "Self-service deployment platform with standardized observability.",
    status: "active",
    year: 2026,
    companyId: "company-bluepeak-cloud",
    skills: [
      core("orchestration"),
      core("cicd"),
      core("observability"),
      core("system-design"),
    ],
    technologies: [
      tech("kubernetes"),
      tech("docker"),
      tech("grafana"),
      tech("github-actions"),
    ],
    roles: [
      { id: "role-platform-engineer", relevance: "primary" },
      { id: "role-site-reliability-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-merchant-console",
    name: "Merchant Console",
    summary:
      "Responsive commerce operations dashboard for multi-market sellers.",
    status: "active",
    year: 2026,
    companyId: "company-ember-commerce",
    skills: [
      core("frontend-development"),
      core("ui-engineering"),
      supporting("product-thinking"),
    ],
    technologies: [
      tech("nextjs"),
      tech("react"),
      tech("tailwind"),
      tech("typescript"),
    ],
    roles: [
      { id: "role-frontend-engineer", relevance: "primary" },
      { id: "role-fullstack-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-catalog-cache",
    name: "Catalog Cache",
    summary:
      "Low-latency catalog delivery service for high-traffic storefronts.",
    status: "maintained",
    year: 2025,
    companyId: "company-ember-commerce",
    skills: [
      core("cache-design"),
      core("backend-development"),
      supporting("observability"),
    ],
    technologies: [
      tech("redis"),
      tech("nodejs"),
      tech("express"),
      tech("grafana"),
    ],
    roles: [
      { id: "role-backend-engineer", relevance: "primary" },
      { id: "role-site-reliability-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-school-operations",
    name: "School Operations Hub",
    summary: "Attendance, fees and reporting workflow for growing schools.",
    status: "active",
    year: 2026,
    companyId: "company-lumen-learning",
    skills: [
      core("product-thinking"),
      core("backend-development"),
      core("data-modeling"),
    ],
    technologies: [
      tech("typescript"),
      tech("nextjs"),
      tech("express"),
      tech("postgresql"),
    ],
    roles: [{ id: "role-fullstack-engineer", relevance: "primary" }],
  },
  {
    id: "project-learning-paths",
    name: "Learning Paths",
    summary: "Personalized course pathway and progress experience.",
    status: "completed",
    year: 2025,
    companyId: "company-lumen-learning",
    skills: [
      core("product-thinking"),
      core("frontend-development"),
      supporting("machine-learning"),
    ],
    technologies: [tech("react"), tech("python"), tech("fastapi")],
    roles: [
      { id: "role-ml-engineer", relevance: "primary" },
      { id: "role-frontend-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-grid-insights",
    name: "Grid Insights",
    summary: "Energy performance analytics for distributed solar operators.",
    status: "active",
    year: 2026,
    companyId: "company-verde-energy",
    skills: [
      core("data-engineering"),
      core("machine-learning"),
      core("data-modeling"),
    ],
    technologies: [tech("python"), tech("postgresql"), tech("aws")],
    roles: [
      { id: "role-data-engineer", relevance: "primary" },
      { id: "role-ml-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-asset-monitor",
    name: "Asset Monitor",
    summary: "Reliability monitoring for field energy assets.",
    status: "maintained",
    year: 2025,
    companyId: "company-verde-energy",
    skills: [
      core("observability"),
      core("cloud-architecture"),
      supporting("linux-administration"),
    ],
    technologies: [tech("grafana"), tech("aws"), tech("docker")],
    roles: [
      { id: "role-site-reliability-engineer", relevance: "primary" },
      { id: "role-cloud-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-trusted-pipelines",
    name: "Trusted Data Pipelines",
    summary:
      "Governed ingestion and transformation platform for analytical teams.",
    status: "active",
    year: 2026,
    companyId: "company-orbit-data",
    skills: [
      core("data-engineering"),
      core("testing"),
      core("database-administration"),
    ],
    technologies: [
      tech("python"),
      tech("postgresql"),
      tech("docker"),
      tech("github-actions"),
    ],
    roles: [
      { id: "role-data-engineer", relevance: "primary" },
      { id: "role-devops-engineer", relevance: "secondary" },
    ],
  },
  {
    id: "project-secure-delivery",
    name: "Secure Delivery Guardrails",
    summary:
      "Automated security checks and deployment controls for product teams.",
    status: "completed",
    year: 2026,
    companyId: "company-harbor-security",
    skills: [core("security"), core("cicd"), core("technical-writing")],
    technologies: [tech("github-actions"), tech("docker"), tech("typescript")],
    roles: [
      { id: "role-security-engineer", relevance: "primary" },
      { id: "role-devops-engineer", relevance: "secondary" },
    ],
  },
];

const personSkill = (
  id: string,
  proficiency: NonNullable<SkillLink["proficiency"]>,
  years: number,
): SkillLink => ({ id: `skill-${id}`, proficiency, years });
const worked = (id: string, role: string, contribution: string) => ({
  id: `project-${id}`,
  role,
  contribution,
});

type PersonSeedTuple = [
  string,
  string,
  string,
  string,
  string,
  string,
  number,
  SkillLink[],
  Array<{ id: string; role: string; contribution: string }>,
];

const personRows: PersonSeedTuple[] = [
  [
    "amara-okafor",
    "Amara Okafor",
    "Backend Engineer",
    "Lagos, Nigeria",
    "Builds dependable payment and integration services.",
    "company-atlas-pay",
    2023,
    [
      personSkill("backend-development", "advanced", 5),
      personSkill("api-design", "advanced", 4),
      personSkill("data-modeling", "intermediate", 4),
      personSkill("testing", "intermediate", 3),
    ],
    [
      worked(
        "ledger-api",
        "Backend Engineer",
        "Designed settlement endpoints and reconciliation workflows.",
      ),
      worked(
        "fraud-link-map",
        "API Contributor",
        "Built graph-query API boundaries.",
      ),
    ],
  ],
  [
    "daniel-mwangi",
    "Daniel Mwangi",
    "Graph Engineer",
    "Nairobi, Kenya",
    "Models connected risk and operational domains.",
    "company-atlas-pay",
    2024,
    [
      personSkill("graph-modeling", "advanced", 4),
      personSkill("data-modeling", "advanced", 5),
      personSkill("api-design", "intermediate", 3),
      personSkill("technical-writing", "intermediate", 3),
    ],
    [
      worked(
        "fraud-link-map",
        "Graph Engineer",
        "Designed graph entities and multi-hop investigation queries.",
      ),
      worked(
        "ledger-api",
        "Data Model Reviewer",
        "Reviewed transaction domain boundaries.",
      ),
    ],
  ],
  [
    "zainab-bello",
    "Zainab Bello",
    "Full-Stack Engineer",
    "Abuja, Nigeria",
    "Delivers accessible operational software across the stack.",
    "company-kora-health",
    2022,
    [
      personSkill("frontend-development", "advanced", 5),
      personSkill("backend-development", "intermediate", 4),
      personSkill("accessibility", "advanced", 3),
      personSkill("product-thinking", "intermediate", 4),
    ],
    [
      worked(
        "care-network",
        "Full-Stack Engineer",
        "Implemented referral workflows and accessible interfaces.",
      ),
      worked(
        "clinical-observability",
        "Dashboard Contributor",
        "Built operational reporting views.",
      ),
    ],
  ],
  [
    "samuel-kimani",
    "Samuel Kimani",
    "Data Engineer",
    "Nairobi, Kenya",
    "Builds reliable healthcare data pipelines and metrics.",
    "company-kora-health",
    2023,
    [
      personSkill("data-engineering", "advanced", 5),
      personSkill("data-modeling", "advanced", 5),
      personSkill("observability", "intermediate", 3),
      personSkill("testing", "intermediate", 4),
    ],
    [
      worked(
        "clinical-observability",
        "Data Engineer",
        "Created service-quality datasets and dashboard metrics.",
      ),
      worked(
        "care-network",
        "Data Contributor",
        "Designed referral reporting data flows.",
      ),
    ],
  ],
  [
    "efua-mensah",
    "Efua Mensah",
    "Product Engineer",
    "Accra, Ghana",
    "Builds practical delivery tools for retail operations.",
    "company-northstar-logistics",
    2024,
    [
      personSkill("frontend-development", "advanced", 4),
      personSkill("backend-development", "intermediate", 3),
      personSkill("product-thinking", "advanced", 4),
      personSkill("ui-engineering", "advanced", 4),
    ],
    [
      worked(
        "dispatch-control",
        "Product Engineer",
        "Built dispatcher and rider workflows.",
      ),
      worked(
        "route-events",
        "Interface Contributor",
        "Implemented delivery-event visibility.",
      ),
    ],
  ],
  [
    "kwame-asare",
    "Kwame Asare",
    "Backend Engineer",
    "Accra, Ghana",
    "Specializes in event-driven operational services.",
    "company-northstar-logistics",
    2022,
    [
      personSkill("backend-development", "advanced", 6),
      personSkill("messaging", "advanced", 5),
      personSkill("cache-design", "advanced", 4),
      personSkill("observability", "intermediate", 4),
    ],
    [
      worked(
        "route-events",
        "Backend Engineer",
        "Designed event processing and delivery-state transitions.",
      ),
      worked(
        "dispatch-control",
        "API Engineer",
        "Implemented assignment APIs and caching.",
      ),
    ],
  ],
  [
    "aline-uwase",
    "Aline Uwase",
    "Frontend Engineer",
    "Kigali, Rwanda",
    "Creates inclusive public-service interfaces.",
    "company-civicstack",
    2023,
    [
      personSkill("frontend-development", "advanced", 5),
      personSkill("accessibility", "expert", 5),
      personSkill("ui-engineering", "advanced", 5),
      personSkill("testing", "intermediate", 3),
    ],
    [
      worked(
        "citizen-services",
        "Frontend Engineer",
        "Led accessible interface implementation.",
      ),
      worked(
        "permit-api",
        "API Consumer",
        "Defined frontend integration contracts.",
      ),
    ],
  ],
  [
    "patrick-habimana",
    "Patrick Habimana",
    "Application Security Engineer",
    "Kigali, Rwanda",
    "Improves security through practical engineering controls.",
    "company-civicstack",
    2021,
    [
      personSkill("security", "advanced", 6),
      personSkill("api-design", "advanced", 5),
      personSkill("testing", "advanced", 5),
      personSkill("technical-writing", "advanced", 4),
    ],
    [
      worked(
        "permit-api",
        "Security Engineer",
        "Designed authorization and integration-security controls.",
      ),
      worked(
        "citizen-services",
        "Security Reviewer",
        "Reviewed browser security and privacy risks.",
      ),
    ],
  ],
  [
    "thandi-ndlovu",
    "Thandi Ndlovu",
    "Cloud Engineer",
    "Cape Town, South Africa",
    "Builds secure, repeatable cloud foundations.",
    "company-bluepeak-cloud",
    2022,
    [
      personSkill("cloud-architecture", "advanced", 6),
      personSkill("security", "advanced", 5),
      personSkill("devops", "advanced", 6),
      personSkill("linux-administration", "advanced", 7),
    ],
    [
      worked(
        "cloud-foundation",
        "Cloud Engineer",
        "Implemented reusable infrastructure modules.",
      ),
      worked(
        "developer-platform",
        "Platform Contributor",
        "Integrated cloud accounts with platform services.",
      ),
    ],
  ],
  [
    "lwazi-mokoena",
    "Lwazi Mokoena",
    "Platform Engineer",
    "Johannesburg, South Africa",
    "Designs internal platforms for reliable software delivery.",
    "company-bluepeak-cloud",
    2021,
    [
      personSkill("orchestration", "advanced", 6),
      personSkill("system-design", "advanced", 7),
      personSkill("cicd", "advanced", 6),
      personSkill("observability", "advanced", 5),
    ],
    [
      worked(
        "developer-platform",
        "Platform Engineer",
        "Built deployment and observability platform capabilities.",
      ),
      worked(
        "cloud-foundation",
        "Reliability Reviewer",
        "Defined operational platform requirements.",
      ),
    ],
  ],
  [
    "mariam-el-sayed",
    "Mariam El-Sayed",
    "Frontend Engineer",
    "Cairo, Egypt",
    "Builds fast, understandable merchant experiences.",
    "company-ember-commerce",
    2023,
    [
      personSkill("frontend-development", "advanced", 5),
      personSkill("ui-engineering", "advanced", 5),
      personSkill("accessibility", "intermediate", 3),
      personSkill("product-thinking", "advanced", 4),
    ],
    [
      worked(
        "merchant-console",
        "Frontend Engineer",
        "Built responsive catalog and fulfillment workflows.",
      ),
      worked(
        "catalog-cache",
        "Performance Partner",
        "Measured frontend cache outcomes.",
      ),
    ],
  ],
  [
    "youssef-hassan",
    "Youssef Hassan",
    "Backend Engineer",
    "Cairo, Egypt",
    "Builds low-latency commerce services.",
    "company-ember-commerce",
    2022,
    [
      personSkill("backend-development", "advanced", 6),
      personSkill("cache-design", "expert", 5),
      personSkill("api-design", "advanced", 5),
      personSkill("observability", "intermediate", 4),
    ],
    [
      worked(
        "catalog-cache",
        "Backend Engineer",
        "Designed cache invalidation and fallback behavior.",
      ),
      worked(
        "merchant-console",
        "API Engineer",
        "Created merchant operations endpoints.",
      ),
    ],
  ],
  [
    "chidinma-eze",
    "Chidinma Eze",
    "Full-Stack Engineer",
    "Lagos, Nigeria",
    "Builds education products with clear operational workflows.",
    "company-lumen-learning",
    2023,
    [
      personSkill("frontend-development", "advanced", 4),
      personSkill("backend-development", "advanced", 4),
      personSkill("data-modeling", "intermediate", 3),
      personSkill("product-thinking", "advanced", 4),
    ],
    [
      worked(
        "school-operations",
        "Full-Stack Engineer",
        "Implemented attendance and fee workflows.",
      ),
      worked(
        "learning-paths",
        "Frontend Contributor",
        "Built learning progress views.",
      ),
    ],
  ],
  [
    "tobi-adebayo",
    "Tobi Adebayo",
    "Machine Learning Engineer",
    "Lagos, Nigeria",
    "Turns learning data into responsible product recommendations.",
    "company-lumen-learning",
    2024,
    [
      personSkill("machine-learning", "advanced", 4),
      personSkill("data-engineering", "intermediate", 3),
      personSkill("testing", "intermediate", 3),
      personSkill("api-design", "intermediate", 2),
    ],
    [
      worked(
        "learning-paths",
        "ML Engineer",
        "Developed pathway ranking and evaluation workflows.",
      ),
      worked(
        "school-operations",
        "Analytics Contributor",
        "Defined operational learning metrics.",
      ),
    ],
  ],
  [
    "fatou-diop",
    "Fatou Diop",
    "Data Engineer",
    "Dakar, Senegal",
    "Builds dependable clean-energy data products.",
    "company-verde-energy",
    2022,
    [
      personSkill("data-engineering", "advanced", 6),
      personSkill("data-modeling", "advanced", 5),
      personSkill("machine-learning", "intermediate", 3),
      personSkill("cloud-architecture", "intermediate", 4),
    ],
    [
      worked(
        "grid-insights",
        "Data Engineer",
        "Built ingestion and transformation pipelines.",
      ),
      worked(
        "asset-monitor",
        "Telemetry Contributor",
        "Designed operational telemetry storage.",
      ),
    ],
  ],
  [
    "ibrahima-fall",
    "Ibrahima Fall",
    "Site Reliability Engineer",
    "Dakar, Senegal",
    "Improves reliability of distributed energy services.",
    "company-verde-energy",
    2021,
    [
      personSkill("observability", "advanced", 6),
      personSkill("linux-administration", "advanced", 7),
      personSkill("cloud-architecture", "advanced", 5),
      personSkill("containerization", "advanced", 6),
    ],
    [
      worked(
        "asset-monitor",
        "Site Reliability Engineer",
        "Implemented monitoring and incident dashboards.",
      ),
      worked(
        "grid-insights",
        "Reliability Engineer",
        "Defined pipeline service objectives.",
      ),
    ],
  ],
  [
    "nia-roberts",
    "Nia Roberts",
    "Data Platform Engineer",
    "Remote",
    "Builds tested and governable analytical platforms.",
    "company-orbit-data",
    2022,
    [
      personSkill("data-engineering", "advanced", 6),
      personSkill("database-administration", "advanced", 5),
      personSkill("testing", "advanced", 5),
      personSkill("cicd", "intermediate", 4),
    ],
    [
      worked(
        "trusted-pipelines",
        "Data Platform Engineer",
        "Built tested ingestion and transformation workflows.",
      ),
      worked(
        "grid-insights",
        "Platform Consultant",
        "Reviewed energy data architecture.",
      ),
    ],
  ],
  [
    "victor-chen",
    "Victor Chen",
    "DevOps Engineer",
    "Remote",
    "Automates secure and repeatable delivery workflows.",
    "company-orbit-data",
    2023,
    [
      personSkill("devops", "advanced", 6),
      personSkill("cicd", "advanced", 6),
      personSkill("containerization", "advanced", 5),
      personSkill("security", "intermediate", 4),
    ],
    [
      worked(
        "trusted-pipelines",
        "DevOps Engineer",
        "Automated pipeline testing and deployment.",
      ),
      worked(
        "secure-delivery",
        "Delivery Contributor",
        "Implemented reusable CI controls.",
      ),
    ],
  ],
  [
    "lerato-khumalo",
    "Lerato Khumalo",
    "Security Engineer",
    "Johannesburg, South Africa",
    "Builds security controls that product teams can adopt.",
    "company-harbor-security",
    2021,
    [
      personSkill("security", "expert", 7),
      personSkill("cicd", "advanced", 5),
      personSkill("testing", "advanced", 6),
      personSkill("technical-writing", "advanced", 5),
    ],
    [
      worked(
        "secure-delivery",
        "Security Engineer",
        "Designed automated security guardrails.",
      ),
      worked(
        "cloud-foundation",
        "Security Advisor",
        "Reviewed cloud identity and network controls.",
      ),
    ],
  ],
  [
    "adeleke-olaniyi",
    "Adeleke Olaniyi",
    "DevOps Engineer",
    "Lagos, Nigeria",
    "Improves delivery reliability through automation and clear runbooks.",
    "company-harbor-security",
    2024,
    [
      personSkill("devops", "advanced", 4),
      personSkill("containerization", "advanced", 4),
      personSkill("cicd", "advanced", 4),
      personSkill("linux-administration", "advanced", 5),
    ],
    [
      worked(
        "secure-delivery",
        "DevOps Engineer",
        "Integrated controls into reusable delivery pipelines.",
      ),
      worked(
        "developer-platform",
        "Delivery Consultant",
        "Reviewed deployment workflow ergonomics.",
      ),
    ],
  ],
  [
    "sofia-martins",
    "Sofia Martins",
    "Engineering Lead",
    "Cape Town, South Africa",
    "Leads teams building cloud and platform capabilities.",
    "company-bluepeak-cloud",
    2020,
    [
      personSkill("team-leadership", "advanced", 7),
      personSkill("system-design", "expert", 8),
      personSkill("product-thinking", "advanced", 6),
      personSkill("technical-writing", "advanced", 6),
    ],
    [
      worked(
        "developer-platform",
        "Engineering Lead",
        "Led platform scope and architecture.",
      ),
      worked(
        "cloud-foundation",
        "Technical Lead",
        "Directed foundation standards and adoption.",
      ),
    ],
  ],
  [
    "mina-farouk",
    "Mina Farouk",
    "Product Engineer",
    "Cairo, Egypt",
    "Connects merchant needs to maintainable full-stack delivery.",
    "company-ember-commerce",
    2024,
    [
      personSkill("product-thinking", "advanced", 4),
      personSkill("frontend-development", "advanced", 4),
      personSkill("backend-development", "intermediate", 3),
      personSkill("testing", "intermediate", 3),
    ],
    [
      worked(
        "merchant-console",
        "Product Engineer",
        "Delivered merchant fulfillment features.",
      ),
      worked(
        "catalog-cache",
        "Integration Contributor",
        "Integrated cached catalog APIs.",
      ),
    ],
  ],
  [
    "grace-namukasa",
    "Grace Namukasa",
    "Backend Engineer",
    "Kampala, Uganda",
    "Builds clear APIs for public and operational services.",
    "company-civicstack",
    2024,
    [
      personSkill("backend-development", "advanced", 4),
      personSkill("api-design", "advanced", 4),
      personSkill("security", "intermediate", 3),
      personSkill("technical-writing", "advanced", 4),
    ],
    [
      worked(
        "permit-api",
        "Backend Engineer",
        "Implemented standards-based permit integrations.",
      ),
      worked(
        "citizen-services",
        "API Engineer",
        "Created citizen-service backend endpoints.",
      ),
    ],
  ],
  [
    "noah-williams",
    "Noah Williams",
    "Cloud Security Engineer",
    "Remote",
    "Combines cloud engineering with practical application security.",
    "company-harbor-security",
    2023,
    [
      personSkill("security", "advanced", 6),
      personSkill("cloud-architecture", "advanced", 5),
      personSkill("devops", "advanced", 5),
      personSkill("system-design", "advanced", 5),
    ],
    [
      worked(
        "secure-delivery",
        "Cloud Security Engineer",
        "Defined secure deployment reference patterns.",
      ),
      worked(
        "cloud-foundation",
        "Security Engineer",
        "Implemented preventive cloud controls.",
      ),
    ],
  ],
];

export const people: Person[] = personRows.map(
  ([
    id,
    name,
    title,
    location,
    bio,
    companyId,
    sinceYear,
    personSkills,
    personProjects,
  ]) => ({
    id: `person-${id}`,
    name,
    title,
    location,
    bio,
    companyId,
    sinceYear,
    employmentType: "full-time",
    skills: personSkills,
    projects: personProjects,
  }),
);

type ResourceSeedTuple = [
  string,
  string,
  LearningResource["type"],
  LearningResource["level"],
  string,
  string[],
  string[],
];

const resourceRows: ResourceSeedTuple[] = [
  [
    "resource-api-contracts",
    "Practical API Contracts",
    "course",
    "intermediate",
    "API design through versioning, validation and consumer-focused examples.",
    ["api-design"],
    ["express", "fastapi"],
  ],
  [
    "resource-node-services",
    "Reliable Node Services",
    "lab",
    "intermediate",
    "Build and test production-oriented Node.js services.",
    ["backend-development", "testing"],
    ["nodejs", "express", "typescript"],
  ],
  [
    "resource-accessible-react",
    "Accessible React Interfaces",
    "course",
    "intermediate",
    "Apply semantic HTML, keyboard support and accessible component patterns.",
    ["accessibility", "ui-engineering"],
    ["react", "nextjs"],
  ],
  [
    "resource-system-design",
    "System Design Field Guide",
    "book",
    "advanced",
    "Reason about boundaries, failure modes and scaling tradeoffs.",
    ["system-design", "technical-writing"],
    ["aws"],
  ],
  [
    "resource-graph-foundations",
    "Connected Data with Cypher",
    "course",
    "beginner",
    "Model nodes and relationships and query useful paths.",
    ["graph-modeling", "data-modeling"],
    ["cognodb"],
  ],
  [
    "resource-cypher-lab",
    "Multi-Hop Cypher Lab",
    "lab",
    "intermediate",
    "Practice parameterized traversal, aggregation and recommendations.",
    ["graph-modeling", "api-design"],
    ["cognodb", "typescript"],
  ],
  [
    "resource-docker-practice",
    "Docker Delivery Workshop",
    "lab",
    "beginner",
    "Package applications with reproducible multi-stage container builds.",
    ["containerization", "devops"],
    ["docker"],
  ],
  [
    "resource-kubernetes-operations",
    "Kubernetes Operations Path",
    "course",
    "advanced",
    "Operate workloads, deployments and service health on Kubernetes.",
    ["orchestration", "observability"],
    ["kubernetes", "grafana"],
  ],
  [
    "resource-terraform-cloud",
    "Terraform Cloud Foundations",
    "lab",
    "intermediate",
    "Provision secure cloud foundations with reviewed infrastructure code.",
    ["cloud-architecture", "devops"],
    ["terraform", "aws"],
  ],
  [
    "resource-ci-pipelines",
    "Dependable CI/CD Pipelines",
    "guide",
    "intermediate",
    "Design quality gates and repeatable deployment workflows.",
    ["cicd", "testing"],
    ["github-actions", "docker"],
  ],
  [
    "resource-observability",
    "Observability in Practice",
    "course",
    "intermediate",
    "Use service indicators, logs and dashboards to understand production behavior.",
    ["observability"],
    ["grafana", "aws"],
  ],
  [
    "resource-linux-operations",
    "Linux Operations Handbook",
    "book",
    "intermediate",
    "Troubleshoot services, processes, networking and storage safely.",
    ["linux-administration"],
    ["docker"],
  ],
  [
    "resource-secure-services",
    "Secure Service Engineering",
    "course",
    "advanced",
    "Apply threat modeling and secure delivery controls to web services.",
    ["security", "testing"],
    ["github-actions", "aws"],
  ],
  [
    "resource-data-pipelines",
    "Tested Data Pipelines",
    "lab",
    "intermediate",
    "Build dependable data transformations with validation and recovery.",
    ["data-engineering", "testing"],
    ["python", "postgresql"],
  ],
  [
    "resource-postgres-modeling",
    "PostgreSQL Data Modeling",
    "guide",
    "intermediate",
    "Design transactional schemas and operational database practices.",
    ["data-modeling", "database-administration"],
    ["postgresql"],
  ],
  [
    "resource-redis-patterns",
    "Redis Caching Patterns",
    "guide",
    "intermediate",
    "Use cache-aside, invalidation and bounded expiration patterns.",
    ["cache-design", "system-design"],
    ["redis"],
  ],
  [
    "resource-ml-production",
    "Production Machine Learning",
    "course",
    "advanced",
    "Package, evaluate and operate predictive services.",
    ["machine-learning", "data-engineering"],
    ["python", "fastapi", "docker"],
  ],
  [
    "resource-engineering-leadership",
    "Engineering Leadership Notes",
    "book",
    "advanced",
    "Guide technical decisions, delivery and team communication.",
    ["team-leadership", "product-thinking", "technical-writing"],
    ["github-actions"],
  ],
];

export const resources: LearningResource[] = resourceRows.map(
  ([id, title, type, level, description, skillIds, technologyIds]) => ({
    id,
    title,
    type,
    level,
    url: `https://learning.skillgraph.example/${id.replace("resource-", "")}`,
    description,
    skills: skillIds.map((skillId) => ({
      id: `skill-${skillId}`,
      depth: level === "advanced" ? "comprehensive" : "practical",
    })),
    technologies: technologyIds.map((technologyId) => ({
      id: `technology-${technologyId}`,
      depth: level === "advanced" ? "comprehensive" : "practical",
    })),
  }),
);
