import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { EngagementModels } from "@/components/services/EngagementModels";
import { FaqList } from "@/components/services/FaqList";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { pathFor } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

const serviceIds = ["websites", "apps", "maintenance", "automation"] as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

type FaqItem = { q: string; a: string };

export async function generateMetadata({ params }: PageProps) {
  const locale = await parseLocale(params);
  return pageMetadata(locale, "services");
}

export default async function ServicesPage({ params }: PageProps) {
  const locale = await parseLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const engagement = await getTranslations("engagement");
  const faq = await getTranslations("faq");
  const items = faq.raw("items") as FaqItem[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
    url: `${SITE_URL}${pathFor(locale, "services")}`,
  };

  return (
    <main id="content" className="bg-paper pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader title={t("pageTitle")} lead={t("lead")} />
      <Container>
        <ul>
          {serviceIds.map((id, index) => (
            <li key={id} className="border-t border-mist last:border-b">
              <Reveal delay={index * 0.06}>
                <article className="grid gap-4 py-8 md:grid-cols-[5rem_1fr_1.1fr] md:items-start md:gap-10 md:py-10">
                  <p className="font-display text-sm tracking-[0.12em] text-navy">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display text-3xl tracking-[-0.04em] md:text-4xl">
                    {t(`items.${id}.title`)}
                  </h2>
                  <div>
                    <p className="text-[1.0625rem] leading-7">
                      {t(`items.${id}.sentence`)}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {t(`items.${id}.audience`)}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[46ch] text-ink/80">{t("priceNote")}</p>
        <div className="mt-8">
          <Button href={pathFor(locale, "calculator")}>{t("cta")}</Button>
        </div>
        <div className="mt-20 md:mt-28">
          <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]">
            {engagement("title")}
          </h2>
          <div className="mt-10">
            <EngagementModels />
          </div>
        </div>
        <div className="mt-20 md:mt-28">
          <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]">
            {faq("title")}
          </h2>
          <div className="mt-10">
            <FaqList />
          </div>
        </div>
      </Container>
    </main>
  );
}
