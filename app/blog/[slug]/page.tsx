import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { SanityImage } from "@/components/SanityImage";
import { getAllPosts, getPostBySlug } from "@/lib/sanity/queries";
import type { SanityImageValue } from "@/lib/sanity/queries";

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <SanityImage
        value={value as SanityImageValue}
        width={800}
        className="w-full h-auto rounded-md"
      />
    ),
  },
};

export const revalidate = 60;

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
    <article className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-2">{post.title}</h1>
      <p className="text-xs text-muted mb-8">
        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {post.coverImage && (
        <SanityImage
          value={post.coverImage}
          width={768}
          className="w-full h-auto rounded-md mb-8"
          priority
        />
      )}
      <div className="text-foreground-dim leading-relaxed space-y-4">
        <PortableText value={post.body as never} components={portableTextComponents} />
      </div>
    </article>
  );
}
