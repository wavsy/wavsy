import { getTranslations } from "next-intl/server";
import { umamiEvent } from "@/lib/analytics";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { HeadingReveal } from "@/components/motion/HeadingReveal";
import { Button } from "@/components/ui/Button";
import { ServiceRows } from "@/components/services/ServiceRows";
import { currentLocale } from "@/lib/locale";
import { pathFor } from "@/lib/routes";

export async function ServicesIndex() {
  const t = await getTranslations("services");
  const locale = await currentLocale();

  return (
    <Section>
      <Container>
        <HeadingReveal
          lines={[t("title")]}
          className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]"
        />
        <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">{t("lead")}</p>
        <div className="mt-12 md:mt-16">
          <ServiceRows heading="h3" />
        </div>
        <Reveal>
          <p className="mt-10 max-w-[46ch] text-ink/80">{t("priceNote")}</p>
          <div className="mt-8">
            <Button href={pathFor(locale, "contact")} track={umamiEvent("cta-quote", { location: "home-services" })}>
              {t("cta")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
