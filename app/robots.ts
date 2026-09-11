import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Vercel sets VERCEL_ENV at build time. Anything that is not the production
// deployment (previews, local builds) is closed to crawlers.
const isProduction = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
