import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { QuoteCalculator } from "@/components/calculator/QuoteCalculator";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await parseLocale(params);
  return pageMetadata(locale, "calculator");
}

export default async function CalculatorPage({ params }: PageProps) {
  const locale = await parseLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("calculator");

  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={t("title")} lead={t("lead")} />
      <Container>
        <QuoteCalculator />
      </Container>
    </main>
  );
}
