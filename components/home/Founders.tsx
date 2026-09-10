import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TeamCard } from "@/components/team/TeamCard";
import { teamIds } from "@/lib/team";

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
              <TeamCard id={id} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
