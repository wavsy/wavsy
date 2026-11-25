import { getTranslations } from "next-intl/server";
import { projects } from "@/lib/projects";
import { locales, routeKeys, type Locale, type RouteKey } from "@/lib/routes";
import { PUBLIC_EMAIL, SITE_URL, SOCIAL_LINKS, absoluteUrl } from "@/lib/site";

// https://llmstxt.org — plain-text maps of the site for AI assistants.
// /llms.txt is the short map: pages, services and projects.
// /llms-full.txt adds the questions and answers from the site.
// Everything is read from lib/routes.ts, lib/projects.ts and the translations,
// so a new page, service or project lands here without touching this file.

const languageHeading: Record<Locale, string> = {
  bg: "Български",
  en: "English",
  de: "Deutsch",
};

const metaKey: Record<RouteKey, { label: string; description: string }> = {
  home: { label: "nav.home", description: "meta.homeDescription" },
  services: { label: "nav.services", description: "meta.servicesDescription" },
  ai: { label: "nav.ai", description: "meta.aiDescription" },
  portfolio: { label: "nav.portfolio", description: "meta.portfolioDescription" },
  about: { label: "nav.about", description: "meta.aboutDescription" },
  contact: { label: "nav.contact", description: "meta.contactDescription" },
  privacy: { label: "footer.privacy", description: "meta.privacyDescription" },
  cookies: { label: "footer.cookies", description: "meta.cookiesDescription" },
  careers: { label: "footer.careers", description: "meta.careersDescription" },
};

export const serviceKeys = ["websites", "apps", "maintenance", "automation"] as const;

type ServiceText = { title: string; sentence: string; audience: string };
type AiProduct = { title: string; body: string };
type FaqItem = { q: string; a: string };

function intro(full: boolean) {
  return [
    "# Wavsy",
    "",
    "> Wavsy е студио от София, България. Двама души правят сайтове, онлайн магазини,",
    "> уеб приложения и AI системи по мярка (асистенти, агенти и автоматизации) за бизнеси.",
    "> Wavsy is a two-person studio from Sofia, Bulgaria. It builds websites, online shops,",
    "> web apps and made-to-fit AI systems (assistants, agents and automations) for businesses.",
    "",
    `Контакт / Contact: ${PUBLIC_EMAIL}`,
    `Facebook: ${SOCIAL_LINKS.facebook}`,
    `LinkedIn: ${SOCIAL_LINKS.linkedin}`,
    full
      ? `Кратка версия / Short version: ${SITE_URL}/llms.txt`
      : `Пълна версия с въпроси и отговори / Full version with questions and answers: ${SITE_URL}/llms-full.txt`,
  ];
}

async function languageSection(locale: Locale, full: boolean) {
  const t = await getTranslations({ locale });

  const pages = routeKeys.map((route) => {
    const keys = metaKey[route];
    return `- [${t(keys.label)}](${absoluteUrl(locale, route)}): ${t(keys.description)}`;
  });

  const services = serviceKeys.map((key) => {
    const item = t.raw(`services.items.${key}`) as ServiceText;
    return `- ${item.title}: ${item.sentence} ${item.audience}`;
  });

  const aiProducts = (t.raw("ai.products.items") as AiProduct[]).map(
    (item) => `- ${item.title}: ${item.body}`,
  );

  const work = projects.flatMap((project) => {
    const base = `portfolio.projects.${project.slug}`;
    const line = `- [${t(`${base}.name`)}](${project.url}) (${t(`${base}.industry`)}): ${t(`${base}.summary`)}`;
    const parts = (project.group ?? []).map(
      (item) =>
        `  - [${t(`${base}.items.${item.key}.name`)}](${item.url}): ${t(`${base}.items.${item.key}.note`)}`,
    );
    return [line, ...parts];
  });

  const blocks = [
    [`## ${languageHeading[locale]}`, ...pages],
    [`### ${t("nav.services")}`, ...services],
    [`### ${t("nav.ai")}`, ...aiProducts],
    [`### ${t("nav.portfolio")}`, ...work],
  ];

  if (full) {
    const answers = (items: FaqItem[]) => items.flatMap((item) => ["", `**${item.q}**`, item.a]);
    blocks.push(
      [`### ${t("faq.title")}`, ...answers(t.raw("faq.items") as FaqItem[])],
      [`### ${t("ai.faq.title")}`, ...answers(t.raw("ai.faq.items") as FaqItem[])],
    );
  }

  return blocks.map((block) => block.join("\n")).join("\n\n");
}

export async function llmsText(full: boolean) {
  const sections = await Promise.all(locales.map((locale) => languageSection(locale, full)));
  return `${[intro(full).join("\n"), ...sections].join("\n\n")}\n`;
}
