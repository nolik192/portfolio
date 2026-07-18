import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/sanity/queries", () => {
  const allPosts = Array.from({ length: 12 }, (_, index) => ({
    title: `Post ${index + 1}`,
    slug: `post-${index + 1}`,
    excerpt: `Excerpt ${index + 1}`,
    publishedAt: `2026-01-${String(index + 1).padStart(2, "0")}T00:00:00.000Z`,
  }));
  return {
    getAllPosts: vi.fn().mockResolvedValue(allPosts),
  };
});

import BlogPage from "../page";

describe("BlogPage", () => {
  it("renders the first 10 posts and an Older link on page 1", async () => {
    render(await BlogPage({ searchParams: Promise.resolve({}) }));
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 10")).toBeInTheDocument();
    expect(screen.queryByText("Post 11")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /older/i })).toHaveAttribute("href", "/blog?page=2");
    expect(screen.queryByRole("link", { name: /newer/i })).not.toBeInTheDocument();
  });

  it("renders the remaining posts and a Newer link on page 2", async () => {
    render(await BlogPage({ searchParams: Promise.resolve({ page: "2" }) }));
    expect(screen.getByText("Post 11")).toBeInTheDocument();
    expect(screen.getByText("Post 12")).toBeInTheDocument();
    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /newer/i })).toHaveAttribute("href", "/blog?page=1");
    expect(screen.queryByRole("link", { name: /older/i })).not.toBeInTheDocument();
  });
});
