import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HeadingReveal } from "@/components/motion/HeadingReveal";
import { ProcessSteps } from "@/components/ai/ProcessSteps";

type Step = { title: string; body: string };

export async function Process() {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <Section tone="white">
      <Container>
        <HeadingReveal
          lines={[t("title")]}
          className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
        />
        <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">{t("lead")}</p>
        <ProcessSteps steps={steps} columns="md:grid-cols-4" />
      </Container>
    </Section>
  );
}
