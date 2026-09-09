import type { MetadataRoute } from "next";
import { locales, pathFor, routeKeys } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routeKeys.map((route) => ({
      url: `${SITE_URL}${pathFor(locale, route)}`,
      lastModified: new Date(),
      changeFrequency: route === "home" ? "weekly" : "monthly",
      priority: route === "home" ? 1 : 0.7,
      alternates: {
        languages: {
          bg: `${SITE_URL}${pathFor("bg", route)}`,
          en: `${SITE_URL}${pathFor("en", route)}`,
          de: `${SITE_URL}${pathFor("de", route)}`,
          "x-default": `${SITE_URL}${pathFor("bg", route)}`,
        },
      },
    })),
  );
}
