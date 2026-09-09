import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";
import { pathFor } from "@/lib/routes";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await parseLocale(params);
  return pageMetadata(locale, "portfolio");
}

export default async function PortfolioPage({ params }: PageProps) {
  const locale = await parseLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");

  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={t("title")} lead={t("lead")} />
      <Container>
        {projects.length === 0 ? (
          <div className="max-w-[42ch] border border-mist bg-white p-6 sm:p-10">
            <p className="text-[1.0625rem] leading-7 text-ink/80">{t("empty")}</p>
            <div className="mt-8">
              <Button href={pathFor(locale, "contact")}>{t("cta")}</Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <PortfolioCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
