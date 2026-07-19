import Link from "next/link";
import { SanityImage } from "./SanityImage";
import type { PostPreview } from "@/lib/sanity/queries";

export function BlogPostPreview({ post }: { post: PostPreview }) {
  return (
    <article className="py-6 border-b border-border">
      {post.coverImage && (
        <SanityImage
          value={post.coverImage}
          width={640}
          className="w-full h-auto rounded mb-4 object-cover"
        />
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Link
          href={`/blog/${post.slug}`}
          className="text-xl font-bold text-foreground hover:text-accent transition-colors duration-200"
        >
          {post.title}
        </Link>
        <span className="text-xs text-muted whitespace-nowrap">
          {new Date(post.publishedAt).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <p className="text-foreground-dim mt-2">{post.excerpt}</p>
    </article>
  );
}
