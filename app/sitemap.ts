import type { MetadataRoute } from "next";
import { locales, routeKeys, type Locale, type RouteKey } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

function languages(route: RouteKey): Record<Locale | "x-default", string> {
  return {
    bg: absoluteUrl("bg", route),
    en: absoluteUrl("en", route),
    de: absoluteUrl("de", route),
    "x-default": absoluteUrl("bg", route),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routeKeys.map((route) => ({
      url: absoluteUrl(locale, route),
      lastModified: new Date(),
      changeFrequency: route === "home" ? "weekly" : "monthly",
      priority: route === "home" ? 1 : 0.7,
      alternates: {
        languages: languages(route),
      },
    })),
  );
}
