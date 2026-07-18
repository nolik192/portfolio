import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { BlogPostList } from "@/components/BlogPostList";
import { profile } from "@/lib/data/profile";
import { getLatestPosts } from "@/lib/sanity/queries";

export const revalidate = 3600;

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      <Hero profile={profile} />
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <TerminalPrompt command="tail -n 3 blog/*.md" />
        <h2 className="text-xl font-bold text-foreground font-mono mb-6">Latest from the blog</h2>
        <BlogPostList posts={latestPosts} emptyMessage="No posts yet — check back soon." />
        <Link
          href="/blog"
          className="inline-block mt-6 text-sm text-accent hover:underline font-mono"
        >
          View all posts &rarr;
        </Link>
      </section>
    </>
  );
}
