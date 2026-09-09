import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

type WhyItem = { display: string; body: string };

export async function WhyWavsy() {
  const t = await getTranslations("why");
  const items = t.raw("items") as WhyItem[];

  return (
    <Section tone="deep">
      <Container>
        <Reveal>
          <h2 className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]">
            {t("title")}
          </h2>
        </Reveal>
        <ul className="mt-16 grid gap-12 md:grid-cols-2">
          {items.map((item, index) => (
            <li key={item.display} className="border-t border-white/15 pt-8">
              <Reveal delay={index * 0.06}>
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
