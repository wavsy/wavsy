import { home } from "@/content/bg/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function Process() {
  return (
    <Section tone="white">
      <Container>
        <Reveal>
          <h2 className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]">
            {home.process.title}
          </h2>
          <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">
            {home.process.lead}
          </p>
        </Reveal>
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {home.process.steps.map((step) => (
            <li key={step.number}>
              <Reveal>
                <p className="font-display text-sm tracking-[0.14em] text-navy">
                  {step.number}
                </p>
                <h3 className="mt-4 font-display text-2xl tracking-[-0.04em]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[28ch] leading-7 text-ink/75">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
