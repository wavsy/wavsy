import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Clip, type ClipName } from "@/components/clips/Clip";
import { Reveal } from "@/components/motion/Reveal";
import { HeadingReveal } from "@/components/motion/HeadingReveal";

type WhyItem = { display: string; body: string };

// One clip per reason, in the order the reasons are written.
const clips: ClipName[] = ["weeks", "offer", "after", "contact"];

export async function WhyWavsy() {
  const t = await getTranslations("why");
  const items = t.raw("items") as WhyItem[];

  return (
    <section className="relative overflow-hidden bg-deep py-20 text-white md:py-28 lg:py-32">
      <div className="ai-aurora ai-aurora-soft pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative">
        <HeadingReveal
          lines={[t("title")]}
          className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 md:mt-16">
          {items.map((item, index) => (
            <li key={item.display} className="@container group bg-deep p-7 transition-colors duration-500 hover:bg-[#0d1a33] md:p-10">
              <Reveal delay={index * 0.06}>
                {clips[index] ? (
                  <Clip name={clips[index]} play="always" className="mb-7 w-20 text-cyan md:w-24" />
                ) : null}
                <p className="ai-gradient-text font-display text-[clamp(1.75rem,10cqi,3rem)] leading-[1.05] tracking-[-0.04em]">
                  {item.display}
                </p>
                <p className="mt-4 max-w-[34ch] leading-7 text-white/70">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
