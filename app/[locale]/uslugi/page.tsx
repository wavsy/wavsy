import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ServiceRows } from "@/components/services/ServiceRows";
import { EngagementModels } from "@/components/services/EngagementModels";
import { FaqList } from "@/components/services/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { pathFor } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

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
    url: absoluteUrl(locale, "services"),
  };

  return (
    <main id="content" className="bg-paper pb-24 md:pb-32">
      <JsonLd data={jsonLd} />
      <PageHeader title={t("pageTitle")} lead={t("lead")} />
      <Container>
        <ServiceRows />
        <p className="mt-10 max-w-[46ch] text-ink/80">{t("priceNote")}</p>
        <div className="mt-8">
          <Button href={pathFor(locale, "contact")}>{t("cta")}</Button>
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
