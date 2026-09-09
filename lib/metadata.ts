import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale, RouteKey } from "@/lib/routes";
import { pathFor } from "@/lib/routes";

const metaKey: Record<RouteKey, { title: string; description: string }> = {
  home: { title: "homeTitle", description: "homeDescription" },
  services: { title: "servicesTitle", description: "servicesDescription" },
  portfolio: { title: "portfolioTitle", description: "portfolioDescription" },
  calculator: { title: "calculatorTitle", description: "calculatorDescription" },
  about: { title: "aboutTitle", description: "aboutDescription" },
  contact: { title: "contactTitle", description: "contactDescription" },
  privacy: { title: "privacyTitle", description: "privacyDescription" },
  cookies: { title: "cookiesTitle", description: "cookiesDescription" },
};

export async function pageMetadata(
  locale: Locale,
  route: RouteKey,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const keys = metaKey[route];

  return {
    title: t(keys.title),
    description: t(keys.description),
    alternates: {
      canonical: pathFor(locale, route),
      languages: {
        bg: pathFor("bg", route),
        en: pathFor("en", route),
        de: pathFor("de", route),
        "x-default": pathFor("bg", route),
      },
    },
    openGraph: {
      locale: locale === "bg" ? "bg_BG" : locale === "de" ? "de_DE" : "en_GB",
      title: t(keys.title),
      description: t(keys.description),
    },
  };
}
