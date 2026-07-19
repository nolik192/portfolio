import Link from "next/link";
import { Hero } from "@/components/Hero";
import { BlogPostList } from "@/components/BlogPostList";
import { profile } from "@/lib/data/profile";
import { getLatestPosts } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      <Hero profile={profile} />
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex items-baseline justify-between border-b-2 border-foreground pb-2 mb-2">
          <h2 className="text-xs uppercase tracking-wide font-bold text-foreground">
            Latest from the Blog
          </h2>
          <Link href="/blog" className="text-xs font-bold text-accent hover:underline">
            View all posts &rarr;
          </Link>
        </div>
        <BlogPostList posts={latestPosts} emptyMessage="No posts yet — check back soon." />
      </section>
    </>
  );
}
