import { sanityClient } from "./client";

export interface PostPreview {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: string;
}

export interface Post extends PostPreview {
  body: unknown;
}

const PREVIEW_PROJECTION = `{
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, pt::text(body)[0...160]),
  publishedAt,
  "coverImage": coverImage.asset->url
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
        "coverImage": coverImage.asset->url,
        body
      }`,
      { slug }
    );
    return post ?? null;
  } catch {
    return null;
  }
}
