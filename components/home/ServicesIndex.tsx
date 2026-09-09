import { services } from "@/content/bg/services";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function ServicesIndex() {
  return (
    <Section>
      <Container>
        <Reveal>
          <h2 className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]">
            {services.title}
          </h2>
          <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">
            {services.lead}
          </p>
        </Reveal>
        <ul className="mt-14">
          {services.items.map((item) => (
            <li key={item.id} className="border-t border-mist last:border-b">
              <Reveal>
                <article className="grid gap-4 py-8 md:grid-cols-[5rem_1fr_1.1fr] md:items-start md:gap-10 md:py-10">
                  <p className="font-display text-sm tracking-[0.12em] text-navy">
                    {item.number}
                  </p>
                  <h3 className="font-display text-3xl tracking-[-0.04em] md:text-4xl">
                    {item.title}
                  </h3>
                  <div>
                    <p className="text-[1.0625rem] leading-7">{item.sentence}</p>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {item.audience}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal>
          <p className="mt-10 max-w-[46ch] text-ink/80">{services.priceNote}</p>
          <div className="mt-8">
            <Button href={services.cta.href}>{services.cta.label}</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
