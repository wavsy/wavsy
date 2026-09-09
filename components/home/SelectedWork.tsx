import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { currentLocale } from "@/lib/locale";
import { projects } from "@/lib/projects";
import { pathFor } from "@/lib/routes";

export async function SelectedWork() {
  const t = await getTranslations("work");
  const locale = await currentLocale();
  const items =
    projects.length > 0 ? projects : Array.from({ length: 2 }, () => null);

  return (
    <Section tone="white">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]">
              {t("title")}
            </h2>
            <Button href={pathFor(locale, "portfolio")} variant="ghost">
              {t("cta")}
            </Button>
          </div>
          <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">
            {t("lead")}
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((project, index) => (
            <Reveal key={project?.slug ?? `slot-${index}`} delay={index * 0.06}>
              <PortfolioCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
