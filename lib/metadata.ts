import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale, RouteKey } from "@/lib/routes";
import { locales, pathFor } from "@/lib/routes";

const metaKey: Record<RouteKey, { title: string; description: string }> = {
  home: { title: "homeTitle", description: "homeDescription" },
  services: { title: "servicesTitle", description: "servicesDescription" },
  portfolio: { title: "portfolioTitle", description: "portfolioDescription" },
  about: { title: "aboutTitle", description: "aboutDescription" },
  contact: { title: "contactTitle", description: "contactDescription" },
  privacy: { title: "privacyTitle", description: "privacyDescription" },
  cookies: { title: "cookiesTitle", description: "cookiesDescription" },
};

const ogLocale: Record<Locale, string> = {
  bg: "bg_BG",
  en: "en_US",
  de: "de_DE",
};

export const ogImageSize = { width: 1200, height: 630 };

export async function pageMetadata(
  locale: Locale,
  route: RouteKey,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const keys = metaKey[route];
  const title = t(keys.title);
  const description = t(keys.description);

  return {
    title,
    description,
    alternates: {
      canonical: pathFor(locale, route),
      languages: {
        bg: pathFor("bg", route),
        en: pathFor("en", route),
        de: pathFor("de", route),
        "x-default": pathFor("bg", route),
      },
    },
    // A page's openGraph replaces its parents' openGraph as a whole, including
    // the image from app/[locale]/opengraph-image.tsx. So every field is set
    // here and the image is referenced by its route.
    openGraph: {
      type: "website",
      siteName: "Wavsy",
      url: pathFor(locale, route),
      locale: ogLocale[locale],
      alternateLocale: locales
        .filter((other) => other !== locale)
        .map((other) => ogLocale[other]),
      title,
      description,
      images: [
        {
          url: `/${locale}/opengraph-image`,
          ...ogImageSize,
          type: "image/png",
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}
