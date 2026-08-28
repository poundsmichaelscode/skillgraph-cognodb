import { afterAll, describe, expect, it } from "vitest";

const integrationEnabled = process.env.RUN_COGNODB_INTEGRATION === "true";
const integrationSuite = integrationEnabled ? describe : describe.skip;

integrationSuite("CognoDB seeded graph integration", () => {
  afterAll(async () => {
    const { closeDriver } = await import("../src/database/driver.js");
    await closeDriver();
  });

  it("connects to the configured CognoDB instance", async () => {
    const { checkDatabaseHealth } = await import("../src/database/health.js");

    await expect(checkDatabaseHealth()).resolves.toMatchObject({
      status: "connected",
    });
  }, 20_000);

  it("searches the seeded graph across entity labels", async () => {
    const { GraphRepository } =
      await import("../src/repositories/graph.repository.js");
    const repository = new GraphRepository();

    const results = await repository.search("API", 12);

    expect(results.length).toBeGreaterThan(0);
    expect(results).toContainEqual(
      expect.objectContaining({
        id: "skill-api-design",
        type: "skill",
        label: "API Design",
      }),
    );
  }, 20_000);

  it("retrieves typed relationships around a seeded person", async () => {
    const { GraphRepository } =
      await import("../src/repositories/graph.repository.js");
    const repository = new GraphRepository();

    const graph = await repository.getNeighborhood(
      "person",
      "person-adeleke-olaniyi",
    );

    expect(graph?.center).toMatchObject({
      id: "person-adeleke-olaniyi",
      type: "person",
      label: "Adeleke Olaniyi",
    });
    expect(graph?.nodes.length).toBeGreaterThan(1);
    expect(graph?.edges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "person-adeleke-olaniyi",
          type: "HAS_SKILL",
        }),
        expect.objectContaining({
          source: "person-adeleke-olaniyi",
          type: "WORKED_ON",
        }),
      ]),
    );
  }, 20_000);

  it("calculates the seeded career gap and learning recommendations", async () => {
    const { GraphRepository } =
      await import("../src/repositories/graph.repository.js");
    const repository = new GraphRepository();

    const result = await repository.getCareerPath(
      "person-adeleke-olaniyi",
      "role-backend-engineer",
    );

    expect(result).not.toBeNull();
    expect(result?.readinessPercentage).toBe(0);
    expect(result?.existingSkills).toHaveLength(0);
    expect(result?.missingSkills.map((skill) => skill.name).sort()).toEqual([
      "API Design",
      "Backend Development",
      "Cache Design",
      "Data Modeling",
      "Software Testing",
    ]);
    expect(result?.technologies.length).toBeGreaterThan(0);
    expect(result?.recommendations.length).toBeGreaterThan(0);
    expect(
      result?.recommendations.every(
        (resource) => resource.teachesSkillIds.length > 0,
      ),
    ).toBe(true);
  }, 20_000);
});
