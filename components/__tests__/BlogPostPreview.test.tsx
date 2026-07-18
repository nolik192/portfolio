import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlogPostPreview } from "../BlogPostPreview";
import type { PostPreview } from "@/lib/sanity/queries";

const post: PostPreview = {
  title: "Building a Discord bot for Tryton",
  slug: "building-a-discord-bot-for-tryton",
  excerpt: "How I integrated a Discord bot into a school platform.",
  publishedAt: "2026-03-15T10:00:00.000Z",
};

describe("BlogPostPreview", () => {
  it("renders the title, date, and excerpt, linking to the post", () => {
    render(<BlogPostPreview post={post} />);
    const link = screen.getByRole("link", { name: post.title });
    expect(link).toHaveAttribute("href", `/blog/${post.slug}`);
    expect(screen.getByText(post.excerpt)).toBeInTheDocument();
    expect(screen.getByText(/15 March 2026/)).toBeInTheDocument();
  });
});
