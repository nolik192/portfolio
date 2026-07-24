import { describe, expect, it } from "vitest";
import { majorProjects, otherProjects } from "../projects";

describe("projects data", () => {
  it("has exactly three major projects", () => {
    expect(majorProjects).toHaveLength(3);
  });

  it("gives every major project a unique slug, name, role, period, description, and stack", () => {
    const slugs = new Set<string>();
    for (const project of majorProjects) {
      expect(project.slug.length).toBeGreaterThan(0);
      expect(slugs.has(project.slug)).toBe(false);
      slugs.add(project.slug);
      expect(project.name.length).toBeGreaterThan(0);
      expect(project.role.length).toBeGreaterThan(0);
      expect(project.period.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(0);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it("includes the gift-helper project with a link and multiple screenshots", () => {
    const giftHelper = majorProjects.find((project) => project.slug === "gift-helper");
    expect(giftHelper).toBeDefined();
    expect(giftHelper?.link).toBe("https://gift-helper.com");
    expect(giftHelper?.screenshots?.length).toBeGreaterThan(1);
  });

  it("has exactly three other projects", () => {
    expect(otherProjects).toHaveLength(3);
    for (const project of otherProjects) {
      expect(project.name.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(0);
    }
  });
});
