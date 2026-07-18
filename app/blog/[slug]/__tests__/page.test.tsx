import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const post = {
  title: "Building a Discord bot for Tryton",
  slug: "building-a-discord-bot-for-tryton",
  excerpt: "How I integrated a Discord bot into a school platform.",
  publishedAt: "2026-03-15T10:00:00.000Z",
  body: [
    {
      _type: "block",
      _key: "b1",
      style: "normal",
      children: [{ _type: "span", _key: "s1", text: "It started with a simple Discord bot." }],
    },
  ],
};

vi.mock("@/lib/sanity/queries", () => ({
  getPostBySlug: vi.fn(),
  getAllPosts: vi.fn(),
}));

import { getPostBySlug } from "@/lib/sanity/queries";
import BlogPostPage from "../page";

describe("BlogPostPage", () => {
  it("renders the post title, date, and body", async () => {
    vi.mocked(getPostBySlug).mockResolvedValueOnce(post);
    render(await BlogPostPage({ params: Promise.resolve({ slug: post.slug }) }));
    expect(screen.getByRole("heading", { name: post.title })).toBeInTheDocument();
    expect(screen.getByText(/15 March 2026/)).toBeInTheDocument();
    expect(screen.getByText("It started with a simple Discord bot.")).toBeInTheDocument();
  });

  it("calls notFound when the post does not exist", async () => {
    vi.mocked(getPostBySlug).mockResolvedValueOnce(null);
    await expect(
      BlogPostPage({ params: Promise.resolve({ slug: "missing" }) })
    ).rejects.toThrow();
  });
});
