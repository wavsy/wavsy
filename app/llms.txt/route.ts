import { getTranslations } from "next-intl/server";
import { locales, routeKeys, type Locale, type RouteKey } from "@/lib/routes";
import { PUBLIC_EMAIL, SECOND_EMAIL, SOCIAL_LINKS, absoluteUrl } from "@/lib/site";

// https://llmstxt.org — a plain-text map of the site for AI crawlers.
// Built from lib/routes.ts and the translations, so a new page lands here
// the same way it lands in the sitemap.

export const dynamic = "force-static";

const languageHeading: Record<Locale, string> = {
  bg: "Български",
  en: "English",
  de: "Deutsch",
};

const metaKey: Record<RouteKey, { label: string; description: string }> = {
  home: { label: "nav.home", description: "meta.homeDescription" },
  services: { label: "nav.services", description: "meta.servicesDescription" },
  portfolio: { label: "nav.portfolio", description: "meta.portfolioDescription" },
  about: { label: "nav.about", description: "meta.aboutDescription" },
  contact: { label: "nav.contact", description: "meta.contactDescription" },
  privacy: { label: "footer.privacy", description: "meta.privacyDescription" },
  cookies: { label: "footer.cookies", description: "meta.cookiesDescription" },
};

const intro = [
  "# Wavsy",
  "",
  "> Wavsy е уеб студио от София. Двама души правят сайтове и уеб приложения",
  "> за бизнеси. Сайтът е на български, английски и немски.",
  "",
  `Контакт: ${PUBLIC_EMAIL}, ${SECOND_EMAIL}`,
  `Facebook: ${SOCIAL_LINKS.facebook}`,
  `LinkedIn: ${SOCIAL_LINKS.linkedin}`,
];

async function languageSection(locale: Locale) {
  const t = await getTranslations({ locale });
  const lines = routeKeys.map((route) => {
    const keys = metaKey[route];
    return `- [${t(keys.label)}](${absoluteUrl(locale, route)}): ${t(keys.description)}`;
  });
  return [`## ${languageHeading[locale]}`, ...lines];
}

export async function GET() {
  const sections = await Promise.all(locales.map(languageSection));
  const body = [intro, ...sections].map((block) => block.join("\n")).join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
