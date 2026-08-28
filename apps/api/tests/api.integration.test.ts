import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const healthMock = vi.hoisted(() => vi.fn());
const catalogMocks = vi.hoisted(() => ({
  getStats: vi.fn(),
  list: vi.fn(),
  getPerson: vi.fn(),
  getSkill: vi.fn(),
  getRole: vi.fn(),
}));
const graphMocks = vi.hoisted(() => ({
  search: vi.fn(),
  getCareerPath: vi.fn(),
  getNeighborhood: vi.fn(),
  discoverPeopleByTechnology: vi.fn(),
}));

vi.mock("../src/config/env.js", () => ({
  env: {
    NODE_ENV: "test",
    API_PORT: 4000,
    WEB_ORIGIN: "http://localhost:3000",
  },
}));

vi.mock("../src/database/health.js", () => ({
  checkDatabaseHealth: healthMock,
}));

vi.mock("../src/repositories/catalog.repository.js", () => ({
  CatalogRepository: class {
    public getStats = catalogMocks.getStats;
    public list = catalogMocks.list;
    public getPerson = catalogMocks.getPerson;
    public getSkill = catalogMocks.getSkill;
    public getRole = catalogMocks.getRole;
  },
}));

vi.mock("../src/repositories/graph.repository.js", () => ({
  GraphRepository: class {
    public search = graphMocks.search;
    public getCareerPath = graphMocks.getCareerPath;
    public getNeighborhood = graphMocks.getNeighborhood;
    public discoverPeopleByTechnology = graphMocks.discoverPeopleByTechnology;
  },
}));

import { createApp } from "../src/app.js";

const app = createApp();

beforeEach(() => {
  vi.clearAllMocks();
  healthMock.mockResolvedValue({ status: "connected", responseTimeMs: 3 });
});

describe("GET /api/v1/health", () => {
  it("returns healthy status when CognoDB is connected", async () => {
    const response = await request(app).get("/api/v1/health").expect(200);

    expect(response.body).toEqual({
      data: {
        status: "ok",
        service: "skillgraph-api",
        database: { status: "connected", responseTimeMs: 3 },
      },
    });
  });

  it("returns a safe degraded response when CognoDB is unavailable", async () => {
    healthMock.mockResolvedValue({ status: "unavailable", responseTimeMs: 25 });

    const response = await request(app).get("/api/v1/health").expect(503);

    expect(response.body).toEqual({
      data: {
        status: "degraded",
        service: "skillgraph-api",
        database: { status: "unavailable", responseTimeMs: 25 },
      },
    });
    expect(JSON.stringify(response.body)).not.toMatch(/password|bolt|cypher/i);
  });
});

describe("search API", () => {
  it("returns grouped graph search results", async () => {
    graphMocks.search.mockResolvedValue([
      {
        id: "skill-api-design",
        type: "skill",
        label: "API Design",
        description: "Designing stable service contracts.",
      },
    ]);

    const response = await request(app)
      .get("/api/v1/search?q=api&limit=10")
      .expect(200);

    expect(graphMocks.search).toHaveBeenCalledWith("api", 10);
    expect(response.body).toEqual({
      data: [
        {
          id: "skill-api-design",
          type: "skill",
          label: "API Design",
          description: "Designing stable service contracts.",
        },
      ],
    });
  });

  it("rejects an invalid search without calling the repository", async () => {
    const response = await request(app).get("/api/v1/search?q=a").expect(400);

    expect(response.body).toMatchObject({
      error: { code: "VALIDATION_ERROR" },
    });
    expect(graphMocks.search).not.toHaveBeenCalled();
  });
});

describe("graph traversal API", () => {
  it("returns nodes and typed relationships for a neighborhood", async () => {
    const neighborhood = {
      center: {
        id: "person-adeleke-olaniyi",
        type: "person",
        label: "Adeleke Olaniyi",
        properties: { title: "DevOps Engineer" },
      },
      nodes: [
        {
          id: "person-adeleke-olaniyi",
          type: "person",
          label: "Adeleke Olaniyi",
          properties: { title: "DevOps Engineer" },
        },
        {
          id: "skill-devops",
          type: "skill",
          label: "DevOps Practices",
          properties: { category: "Operations" },
        },
      ],
      edges: [
        {
          id: "person-skill-1",
          source: "person-adeleke-olaniyi",
          target: "skill-devops",
          type: "HAS_SKILL",
          properties: { proficiency: "advanced" },
        },
      ],
    };
    graphMocks.getNeighborhood.mockResolvedValue(neighborhood);

    const response = await request(app)
      .get("/api/v1/graph/person/person-adeleke-olaniyi")
      .expect(200);

    expect(graphMocks.getNeighborhood).toHaveBeenCalledWith(
      "person",
      "person-adeleke-olaniyi",
    );
    expect(response.body).toEqual({ data: neighborhood });
  });

  it("returns 404 when the graph entity does not exist", async () => {
    graphMocks.getNeighborhood.mockResolvedValue(null);

    const response = await request(app)
      .get("/api/v1/graph/person/person-does-not-exist")
      .expect(404);

    expect(response.body).toEqual({
      error: {
        code: "ENTITY_NOT_FOUND",
        message: "The requested graph entity was not found.",
      },
    });
  });
});

describe("career skill-gap API", () => {
  it("returns readiness, missing skills and graph-derived recommendations", async () => {
    graphMocks.getCareerPath.mockResolvedValue({
      person: { id: "person-adeleke-olaniyi", name: "Adeleke Olaniyi" },
      role: { id: "role-backend-engineer", title: "Backend Engineer" },
      readinessPercentage: 40,
      existingSkills: [
        {
          id: "skill-typescript",
          name: "TypeScript",
          currentLevel: "advanced",
        },
        {
          id: "skill-testing",
          name: "Software Testing",
          currentLevel: "intermediate",
        },
      ],
      missingSkills: [
        {
          id: "skill-api-design",
          name: "API Design",
          requiredLevel: "intermediate",
        },
        {
          id: "skill-data-modeling",
          name: "Data Modeling",
          requiredLevel: "intermediate",
        },
        {
          id: "skill-cache-design",
          name: "Cache Design",
          requiredLevel: "beginner",
        },
      ],
      technologies: [{ id: "technology-redis", name: "Redis" }],
      recommendations: [
        {
          id: "resource-api-contracts",
          title: "Practical API Contracts",
          teachesSkillIds: ["skill-api-design"],
        },
      ],
    });

    const response = await request(app)
      .get("/api/v1/career-path/person-adeleke-olaniyi/role-backend-engineer")
      .expect(200);

    expect(graphMocks.getCareerPath).toHaveBeenCalledWith(
      "person-adeleke-olaniyi",
      "role-backend-engineer",
    );
    expect(response.body).toMatchObject({
      data: {
        readinessPercentage: 40,
        missingSkills: [
          { id: "skill-api-design" },
          { id: "skill-data-modeling" },
          { id: "skill-cache-design" },
        ],
        recommendations: [{ teachesSkillIds: ["skill-api-design"] }],
      },
    });
  });
});

describe("safe errors", () => {
  it("returns a sanitized 500 response for an unexpected repository error", async () => {
    catalogMocks.getStats.mockRejectedValue(
      new Error("bolt+s://private-host secret-password"),
    );

    const response = await request(app).get("/api/v1/stats").expect(500);

    expect(response.body).toEqual({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "The request could not be completed.",
      },
    });
    expect(JSON.stringify(response.body)).not.toMatch(
      /private-host|password|bolt/i,
    );
  });

  it("returns a structured response for an unknown route", async () => {
    const response = await request(app).get("/api/v1/not-a-route").expect(404);

    expect(response.body).toMatchObject({
      error: { code: "ROUTE_NOT_FOUND" },
    });
  });
});
