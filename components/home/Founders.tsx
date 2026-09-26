import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { HeadingReveal } from "@/components/motion/HeadingReveal";
import { FounderCard } from "@/components/about/FounderCard";
import { teamIds } from "@/lib/team";

export async function Founders() {
  const t = await getTranslations("team");

  return (
    <Section>
      <Container>
        <HeadingReveal
          lines={[t("title")]}
          className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
        />
        <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">{t("lead")}</p>
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {teamIds.map((id, index) => (
            <Reveal key={id} delay={index * 0.08} className="h-full">
              <FounderCard id={id} heading="h3" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
