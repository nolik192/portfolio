import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "../page";
import { profile } from "@/lib/data/profile";

describe("AboutPage", () => {
  it("renders the bio, skill categories, experience, and languages", () => {
    render(<AboutPage />);
    expect(screen.getByText(profile.bio)).toBeInTheDocument();
    for (const group of profile.skills) {
      expect(screen.getByText(group.category)).toBeInTheDocument();
    }
    for (const entry of profile.experience) {
      expect(screen.getByText(new RegExp(entry.title))).toBeInTheDocument();
    }
    expect(screen.getByText(/Russian \(Native\)/)).toBeInTheDocument();
  });
});
