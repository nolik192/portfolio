import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { usePathname } from "next/navigation";
import { Nav } from "../Nav";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("Nav", () => {
  it("links to all five pages", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<Nav />);
    expect(screen.getByRole("link", { name: "Index" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });

  it("marks the current page as active via aria-current", () => {
    vi.mocked(usePathname).mockReturnValue("/projects");
    render(<Nav />);
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Index" })).not.toHaveAttribute("aria-current");
  });
});
