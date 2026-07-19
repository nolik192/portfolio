import Link from "next/link";
import type { Metadata } from "next";
import { BlogPostList } from "@/components/BlogPostList";
import { getAllPosts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Blog",
};

export const revalidate = 60;

const PAGE_SIZE = 10;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const posts = await getAllPosts();
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagePosts = posts.slice(start, start + PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black text-foreground mb-8">Blog</h1>
      <BlogPostList posts={pagePosts} emptyMessage="No posts yet — check back soon." />
      {totalPages > 1 && (
        <nav className="flex gap-4 mt-10 text-sm font-bold" aria-label="Blog pagination">
          {currentPage > 1 && (
            <Link href={`/blog?page=${currentPage - 1}`} className="text-accent hover:underline">
              &larr; Newer
            </Link>
          )}
          <span className="text-muted">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link href={`/blog?page=${currentPage + 1}`} className="text-accent hover:underline">
              Older &rarr;
            </Link>
          )}
        </nav>
      )}
    </section>
  );
}
