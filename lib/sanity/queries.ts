import { sanityClient } from "./client";

export interface SanityImageValue {
  asset: { _ref: string; _type: "reference" };
  hotspot?: unknown;
  crop?: unknown;
  alt?: string;
  dimensions?: { width: number; height: number };
}

export interface PostPreview {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: SanityImageValue;
}

export interface Post extends PostPreview {
  body: unknown;
}

const COVER_IMAGE_PROJECTION = `coverImage{
  ...,
  "dimensions": asset->metadata.dimensions
}`;

const PREVIEW_PROJECTION = `{
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, pt::text(body)[0...160]),
  publishedAt,
  "coverImage": ${COVER_IMAGE_PROJECTION}
}`;

export async function getLatestPosts(limit: number): Promise<PostPreview[]> {
  try {
    const posts = await sanityClient.fetch<PostPreview[]>(
      `*[_type == "post"] | order(publishedAt desc)[0...$limit]${PREVIEW_PROJECTION}`,
      { limit }
    );
    return posts ?? [];
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<PostPreview[]> {
  try {
    const posts = await sanityClient.fetch<PostPreview[]>(
      `*[_type == "post"] | order(publishedAt desc)${PREVIEW_PROJECTION}`
    );
    return posts ?? [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await sanityClient.fetch<Post | null>(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        "slug": slug.current,
        "excerpt": coalesce(excerpt, pt::text(body)[0...160]),
        publishedAt,
        "coverImage": ${COVER_IMAGE_PROJECTION},
        body[]{
          ...,
          _type == "image" => {
            ...,
            "dimensions": asset->metadata.dimensions
          }
        }
      }`,
      { slug }
    );
    return post ?? null;
  } catch {
    return null;
  }
}
