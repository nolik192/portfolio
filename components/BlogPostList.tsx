import { BlogPostPreview } from "./BlogPostPreview";
import { Reveal } from "./Reveal";
import type { PostPreview } from "@/lib/sanity/queries";

export function BlogPostList({
  posts,
  emptyMessage,
}: {
  posts: PostPreview[];
  emptyMessage: string;
}) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted">{emptyMessage}</p>;
  }

  return (
    <ul>
      {posts.map((post, index) => (
        <li key={post.slug}>
          <Reveal delay={index * 0.08}>
            <BlogPostPreview post={post} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
