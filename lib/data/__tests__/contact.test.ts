import { describe, expect, it } from "vitest";
import { contactLinks } from "../contact";

describe("contact data", () => {
  it("has exactly five contact links", () => {
    expect(contactLinks).toHaveLength(5);
  });

  it("includes a mailto email link", () => {
    const email = contactLinks.find((link) => link.label === "Email");
    expect(email?.href).toBe("mailto:lagepik@gmail.com");
    expect(email?.external).toBe(false);
  });

  it("includes GitHub, LinkedIn, YouTube, and Twitch as external links", () => {
    for (const label of ["GitHub", "LinkedIn", "YouTube", "Twitch"]) {
      const link = contactLinks.find((entry) => entry.label === label);
      expect(link).toBeDefined();
      expect(link?.external).toBe(true);
      expect(link?.href.startsWith("https://")).toBe(true);
    }
  });
});
