import Link from "next/link";
import type { PostPreview } from "@/lib/sanity/queries";

export function BlogPostPreview({ post }: { post: PostPreview }) {
  return (
    <article className="border border-border rounded-md p-5">
      <Link
        href={`/blog/${post.slug}`}
        className="text-lg font-bold text-foreground font-mono hover:text-accent transition-colors duration-200"
      >
        {post.title}
      </Link>
      <p className="text-xs text-muted font-mono mt-1 mb-2">
        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="text-sm text-foreground-dim">{post.excerpt}</p>
    </article>
  );
}
