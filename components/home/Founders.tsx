import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TeamPhoto } from "@/components/team/TeamPhoto";
import { teamIds, teamPhotos } from "@/lib/team";

export async function Founders() {
  const t = await getTranslations("team");

  return (
    <Section>
      <Container>
        <Reveal>
          <h2 className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">
            {t("lead")}
          </p>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {teamIds.map((id, index) => (
            <Reveal key={id} delay={index * 0.06}>
              <article>
                <TeamPhoto
                  src={teamPhotos[id]}
                  name={t(`people.${id}.name`)}
                  label={t(`people.${id}.photoLabel`)}
                />
                <h3 className="mt-6 font-display text-3xl tracking-[-0.04em]">
                  {t(`people.${id}.name`)}
                </h3>
                <p className="mt-2 text-sm text-muted">{t(`people.${id}.role`)}</p>
                <p className="mt-4 max-w-[36ch] leading-7 text-ink/80">
                  {t(`people.${id}.bio`)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
