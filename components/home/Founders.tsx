import { about } from "@/content/bg/about";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function Founders() {
  return (
    <Section>
      <Container>
        <Reveal>
          <h2 className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]">
            {about.title}
          </h2>
          <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">
            {about.lead}
          </p>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {about.people.map((person) => (
            <Reveal key={person.name}>
              <article>
                <div className="flex aspect-[4/5] items-end border border-mist bg-mist/60 p-5">
                  <p className="text-sm tracking-[0.04em] text-muted">
                    {person.photoLabel}
                  </p>
                </div>
                <h3 className="mt-6 font-display text-3xl tracking-[-0.04em]">
                  {person.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{person.role}</p>
                <p className="mt-4 max-w-[36ch] leading-7 text-ink/80">
                  {person.bio}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
