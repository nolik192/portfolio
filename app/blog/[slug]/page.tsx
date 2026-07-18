import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { getAllPosts, getPostBySlug } from "@/lib/sanity/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
      <TerminalPrompt command={`cat blog/${post.slug}.md`} />
      <h1 className="text-3xl font-bold text-foreground font-mono mb-2">{post.title}</h1>
      <p className="text-xs text-muted font-mono mb-8">
        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="text-foreground-dim leading-relaxed space-y-4">
        <PortableText value={post.body as never} />
      </div>
    </article>
  );
}
