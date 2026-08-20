import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { SanityImage } from "@/components/SanityImage";
import { ImageGallery } from "@/components/ImageGallery";
import { getAllPosts, getPostBySlug } from "@/lib/sanity/queries";
import type { GalleryValue, SanityImageValue } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { SITE_URL, jsonLdScript } from "@/lib/site";

const IMAGE_SIZE_WIDTH: Record<"small" | "medium" | "large", number> = {
  small: 320,
  medium: 512,
  large: 768,
};

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const image = value as SanityImageValue;
      const size = image.size ?? "large";
      const width = IMAGE_SIZE_WIDTH[size];

      return (
        <SanityImage
          value={image}
          width={width}
          className={`h-auto rounded-md ${size === "large" ? "w-full" : "mx-auto"}`}
        />
      );
    },
    gallery: ({ value }) => <ImageGallery images={(value as GalleryValue).images} />,
  },
};

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const url = `${SITE_URL}/blog/${slug}`;
  const coverImageUrl = post.coverImage ? urlFor(post.coverImage).width(1200).height(630).fit("crop").url() : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      images: coverImageUrl ? [{ url: coverImageUrl, width: 1200, height: 630 }] : undefined,
    },
  };
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

  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    url: `${SITE_URL}/blog/${slug}`,
    image: coverImageUrl,
    author: { "@type": "Person", name: "Yury Bortsov", url: SITE_URL },
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(blogPostingJsonLd) }}
      />
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8 pb-8 border-b border-border">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-2">{post.title}</h1>
          <p className="text-xs text-muted">
            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        {post.coverImage && (
          <SanityImage
            value={post.coverImage}
            width={160}
            aspectRatio={1}
            fallbackAlt={post.title}
            className="rounded-md border border-border object-cover shrink-0"
            priority
          />
        )}
      </div>
      <div className="text-foreground-dim leading-relaxed space-y-4">
        <PortableText value={post.body as never} components={portableTextComponents} />
      </div>
    </article>
  );
}
