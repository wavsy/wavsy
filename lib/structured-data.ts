import { getTranslations } from "next-intl/server";
import { serviceKeys } from "@/lib/llms";
import { projects } from "@/lib/projects";
import type { Locale } from "@/lib/routes";
import { PUBLIC_EMAIL, SITE_URL, SOCIAL_LINKS, absoluteUrl } from "@/lib/site";
import { teamMembers } from "@/lib/team";

// No telephone: the phone number is not published (DECISIONS.md), and
// structured data must match what the site shows.
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const provider = { "@id": ORGANIZATION_ID };

type ServiceText = { title: string; sentence: string; audience: string };
type AiProduct = { title: string; body: string };

/** The services as the services page lists them, as schema.org offers. */
async function serviceOffers(locale: Locale) {
  const t = await getTranslations({ locale });
  const general = serviceKeys.map((key) => {
    const item = t.raw(`services.items.${key}`) as ServiceText;
    return {
      name: item.title,
      description: `${item.sentence} ${item.audience}`,
      url: absoluteUrl(locale, key === "automation" ? "ai" : "services"),
    };
  });
  return general.map((service) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", ...service, provider },
  }));
}

/** The AI page: one service with its three forms (assistant, agent, automation). */
export async function aiServiceJsonLd(locale: Locale) {
  const t = await getTranslations({ locale });
  const products = t.raw("ai.products.items") as AiProduct[];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(locale, "ai")}#service`,
    name: t("nav.ai"),
    serviceType: t("nav.ai"),
    description: t("meta.aiDescription"),
    url: absoluteUrl(locale, "ai"),
    provider,
    areaServed: "BG",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t("ai.products.title"),
      itemListElement: products.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.title, description: item.body, provider },
      })),
    },
  };
}

/** The portfolio page: every project shown there, in the same order. */
export async function portfolioJsonLd(locale: Locale) {
  const t = await getTranslations({ locale });
  const works = projects.flatMap((project) => {
    const base = `portfolio.projects.${project.slug}`;
    if (project.group) {
      return project.group.map((item) => ({
        name: t(`${base}.items.${item.key}.name`),
        url: item.url,
        description: t(`${base}.summary`),
        genre: t(`${base}.name`),
      }));
    }
    return [
      {
        name: t(`${base}.name`),
        url: project.url,
        description: t(`${base}.summary`),
        genre: t(`${base}.industry`),
      },
    ];
  });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("meta.portfolioTitle"),
    url: absoluteUrl(locale, "portfolio"),
    itemListElement: works.map((work, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@type": "WebSite", ...work, creator: provider },
    })),
  };
}

export async function organizationJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "meta" });
  const all = await getTranslations({ locale });

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: "Wavsy",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/wavsy-logo-512.png`,
    image: `${SITE_URL}/brand/wavsy-logo-512.png`,
    description: t("homeDescription"),
    email: PUBLIC_EMAIL,
    areaServed: "BG",
    knowsLanguage: ["bg", "en", "de"],
    knowsAbout: [
      ...serviceKeys.map((key) => all(`services.items.${key}.title`)),
      ...(all.raw("ai.products.items") as AiProduct[]).map((item) => item.title),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: all("nav.services"),
      itemListElement: await serviceOffers(locale),
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "София",
      addressCountry: "BG",
    },
    founder: [
      {
        "@type": "Person",
        name: "Димитър Барев",
        sameAs: [teamMembers.dimitar.linkedin],
      },
      {
        "@type": "Person",
        name: "Николай Тодоров",
        sameAs: [teamMembers.nikolay.linkedin],
      },
    ],
    sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.linkedin],
  };
}
