import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "../Hero";
import { profile } from "@/lib/data/profile";

describe("Hero", () => {
  it("renders the profile name and role", () => {
    render(<Hero profile={profile} />);
    expect(screen.getByRole("heading", { name: /yury bortsov/i })).toBeInTheDocument();
    expect(screen.getByText(profile.role)).toBeInTheDocument();
  });

  it("links to /projects and /blog", () => {
    render(<Hero profile={profile} />);
    expect(screen.getByRole("link", { name: /view projects/i })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: /read the blog/i })).toHaveAttribute("href", "/blog");
  });
});
