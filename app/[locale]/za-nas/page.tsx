import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { TeamPhoto } from "@/components/team/TeamPhoto";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { teamIds, teamPhotos } from "@/lib/team";

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
            <article key={id}>
              <TeamPhoto
                src={teamPhotos[id]}
                name={t(`people.${id}.name`)}
                label={t(`people.${id}.photoLabel`)}
              />
              <h2 className="mt-6 font-display text-3xl tracking-[-0.04em]">
                {t(`people.${id}.name`)}
              </h2>
              <p className="mt-2 text-sm text-muted">{t(`people.${id}.role`)}</p>
              <p className="mt-4 max-w-[36ch] leading-7 text-ink/80">
                {t(`people.${id}.bio`)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
