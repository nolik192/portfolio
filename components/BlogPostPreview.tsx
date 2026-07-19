import Link from "next/link";
import { SanityImage } from "./SanityImage";
import type { PostPreview } from "@/lib/sanity/queries";

export function BlogPostPreview({ post }: { post: PostPreview }) {
  return (
    <article className="py-6 border-b border-border flex flex-col sm:flex-row sm:items-start justify-between gap-6">
      <div className="min-w-0">
        <Link
          href={`/blog/${post.slug}`}
          className="text-xl font-bold text-foreground hover:text-accent transition-colors duration-200"
        >
          {post.title}
        </Link>
        <p className="text-xs text-muted mt-1">
          {new Date(post.publishedAt).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-foreground-dim mt-2">{post.excerpt}</p>
      </div>
      {post.coverImage && (
        <SanityImage
          value={post.coverImage}
          width={120}
          aspectRatio={1}
          className="rounded-md border border-border object-cover shrink-0"
        />
      )}
    </article>
  );
}
