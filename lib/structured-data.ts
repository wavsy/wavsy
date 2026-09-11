import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/routes";
import { PUBLIC_EMAIL, SITE_URL, SOCIAL_LINKS } from "@/lib/site";
import { teamMembers } from "@/lib/team";

// No telephone: the phone number is not published (DECISIONS.md), and
// structured data must match what the site shows.
export async function organizationJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "Wavsy",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/wavsy-logo-512.png`,
    image: `${SITE_URL}/brand/wavsy-logo-512.png`,
    description: t("homeDescription"),
    email: PUBLIC_EMAIL,
    areaServed: "BG",
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
