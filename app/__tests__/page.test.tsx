import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/sanity/queries", () => ({
  getLatestPosts: vi.fn().mockResolvedValue([
    { title: "Post One", slug: "post-one", excerpt: "Excerpt one", publishedAt: "2026-01-01T00:00:00.000Z" },
  ]),
}));

import HomePage from "../page";

describe("HomePage", () => {
  it("renders the hero and the latest blog posts", async () => {
    render(await HomePage());
    expect(screen.getByRole("heading", { name: /yury bortsov/i })).toBeInTheDocument();
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view all posts/i })).toHaveAttribute("href", "/blog");
  });
});
