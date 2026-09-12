import { pathFor, type Locale, type RouteKey } from "@/lib/routes";

export const PUBLIC_EMAIL = "mitkobarev@gmail.com";
// Listed in llms.txt only; the site itself still shows PUBLIC_EMAIL.
export const SECOND_EMAIL = "nikolai.todorov.dev@gmail.com";
export const SITE_URL = "https://wavsy.dev";

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/wavsy",
  linkedin: "https://www.linkedin.com/company/wavsy",
} as const;

/** Absolute, percent-encoded URL of a page, e.g. for the sitemap and JSON-LD. */
export function absoluteUrl(locale: Locale, route: RouteKey) {
  return `${SITE_URL}${encodeURI(pathFor(locale, route))}`;
}
