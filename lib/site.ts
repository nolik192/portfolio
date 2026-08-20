export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bortsov.cc";

/** JSON.stringify does not escape "<", so a value containing "</script>" could
 * break out of the tag when embedded via dangerouslySetInnerHTML. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
