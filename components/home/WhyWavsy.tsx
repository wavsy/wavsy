import { home } from "@/content/bg/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function WhyWavsy() {
  return (
    <Section tone="deep">
      <Container>
        <Reveal>
          <h2 className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]">
            {home.why.title}
          </h2>
        </Reveal>
        <ul className="mt-16 grid gap-12 md:grid-cols-2">
          {home.why.items.map((item) => (
            <li key={item.display} className="border-t border-white/15 pt-8">
              <Reveal>
                <p className="font-display text-[clamp(1.75rem,3vw,3rem)] leading-[1.05] tracking-[-0.04em]">
                  {item.display}
                </p>
                <p className="mt-4 max-w-[34ch] leading-7 text-white/70">
                  {item.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
