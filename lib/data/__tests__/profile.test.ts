import { describe, expect, it } from "vitest";
import { profile } from "../profile";

describe("profile data", () => {
  it("has a name, role, location, and bio", () => {
    expect(profile.name).toBe("Yury Bortsov");
    expect(profile.role).toBe("Junior Software Engineer");
    expect(profile.location).toBe("Gdańsk, Poland");
    expect(profile.bio.length).toBeGreaterThan(0);
  });

  it("has at least one skill group with items", () => {
    expect(profile.skills.length).toBeGreaterThan(0);
    for (const group of profile.skills) {
      expect(group.category.length).toBeGreaterThan(0);
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it("has at least one experience entry", () => {
    expect(profile.experience.length).toBeGreaterThan(0);
  });

  it("has three languages", () => {
    expect(profile.languages).toHaveLength(3);
  });
});
