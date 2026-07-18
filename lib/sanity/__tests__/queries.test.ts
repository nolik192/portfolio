import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../client", () => ({
  sanityClient: { fetch: vi.fn() as any },
}));

import { sanityClient } from "../client";
import { getAllPosts, getLatestPosts, getPostBySlug } from "../queries";

describe("sanity queries", () => {
  beforeEach(() => {
    vi.mocked(sanityClient.fetch as any).mockReset();
  });

  it("returns posts from getLatestPosts", async () => {
    vi.mocked(sanityClient.fetch as any).mockResolvedValueOnce([
      { title: "A", slug: "a", excerpt: "e", publishedAt: "2026-01-01" },
    ]);
    const posts = await getLatestPosts(3);
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe("A");
  });

  it("returns an empty array when getLatestPosts fetch fails", async () => {
    vi.mocked(sanityClient.fetch as any).mockRejectedValueOnce(new Error("network error"));
    const posts = await getLatestPosts(3);
    expect(posts).toEqual([]);
  });

  it("returns posts from getAllPosts", async () => {
    vi.mocked(sanityClient.fetch as any).mockResolvedValueOnce([
      { title: "A", slug: "a", excerpt: "e", publishedAt: "2026-01-01" },
      { title: "B", slug: "b", excerpt: "e", publishedAt: "2026-01-02" },
    ]);
    const posts = await getAllPosts();
    expect(posts).toHaveLength(2);
  });

  it("returns an empty array when getAllPosts fetch fails", async () => {
    vi.mocked(sanityClient.fetch as any).mockRejectedValueOnce(new Error("network error"));
    const posts = await getAllPosts();
    expect(posts).toEqual([]);
  });

  it("returns a post from getPostBySlug", async () => {
    vi.mocked(sanityClient.fetch as any).mockResolvedValueOnce({
      title: "A",
      slug: "a",
      excerpt: "e",
      publishedAt: "2026-01-01",
      body: [],
    });
    const post = await getPostBySlug("a");
    expect(post?.title).toBe("A");
  });

  it("returns null when getPostBySlug fetch fails", async () => {
    vi.mocked(sanityClient.fetch as any).mockRejectedValueOnce(new Error("network error"));
    const post = await getPostBySlug("missing");
    expect(post).toBeNull();
  });

  it("returns null when getPostBySlug finds nothing", async () => {
    vi.mocked(sanityClient.fetch as any).mockResolvedValueOnce(null);
    const post = await getPostBySlug("missing");
    expect(post).toBeNull();
  });
});
