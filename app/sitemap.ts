import type { MetadataRoute } from "next";

const base = "https://wavsy.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/услуги",
    "/проекти",
    "/за-нас",
    "/контакти",
    "/поверителност",
    "/бисквитки",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
