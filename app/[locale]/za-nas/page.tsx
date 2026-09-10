import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { TeamCard } from "@/components/team/TeamCard";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { teamIds } from "@/lib/team";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await parseLocale(params);
  return pageMetadata(locale, "about");
}

export default async function AboutPage({ params }: PageProps) {
  const locale = await parseLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("team");

  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={t("pageTitle")} lead={t("lead")} />
      <Container>
        <p className="max-w-[46ch] text-[1.0625rem] leading-7 text-ink/80">
          {t("body")}
        </p>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {teamIds.map((id) => (
            <TeamCard key={id} id={id} heading="h2" />
          ))}
        </div>
      </Container>
    </main>
  );
}
