import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Nav } from "../Nav";

describe("Nav", () => {
  it("links to all five pages", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: "home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "about" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "contact" })).toHaveAttribute("href", "/contact");
  });
});
