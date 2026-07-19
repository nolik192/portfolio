import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Nav } from "../Nav";

describe("Nav", () => {
  it("links to all five pages", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: "Index" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });
});
