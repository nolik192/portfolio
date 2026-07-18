import { BlogPostPreview } from "./BlogPostPreview";
import type { PostPreview } from "@/lib/sanity/queries";

export function BlogPostList({
  posts,
  emptyMessage,
}: {
  posts: PostPreview[];
  emptyMessage: string;
}) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted font-mono">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.slug}>
          <BlogPostPreview post={post} />
        </li>
      ))}
    </ul>
  );
}
