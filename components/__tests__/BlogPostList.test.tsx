import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlogPostList } from "../BlogPostList";
import type { PostPreview } from "@/lib/sanity/queries";

const posts: PostPreview[] = [
  { title: "Post One", slug: "post-one", excerpt: "Excerpt one", publishedAt: "2026-01-01T00:00:00.000Z" },
  { title: "Post Two", slug: "post-two", excerpt: "Excerpt two", publishedAt: "2026-01-02T00:00:00.000Z" },
];

describe("BlogPostList", () => {
  it("renders every post", () => {
    render(<BlogPostList posts={posts} emptyMessage="No posts yet." />);
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();
  });

  it("renders the empty message when there are no posts", () => {
    render(<BlogPostList posts={[]} emptyMessage="No posts yet." />);
    expect(screen.getByText("No posts yet.")).toBeInTheDocument();
  });
});
