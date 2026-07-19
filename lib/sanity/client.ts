import { createClient } from "@sanity/client";

// @sanity/client throws synchronously at construction time if projectId is empty,
// which would crash the build (e.g. generateStaticParams) in any environment without
// the env var set — a Docker build context, CI, etc. Fall back to a syntactically valid
// placeholder so construction always succeeds; the actual fetch then fails at request
// time and is caught by the try/catch in queries.ts, degrading to an empty result.
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "unconfigured",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-01-01",
  useCdn: true,
});
