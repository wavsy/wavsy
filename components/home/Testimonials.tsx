import { testimonials } from "@/content/bg/testimonials";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function Testimonials() {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Section tone="white">
      <Container>
        <h2 className="font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]">
          Отзиви
        </h2>
        <ul className="mt-14 grid gap-10 md:grid-cols-2">
          {testimonials.map((item) => (
            <li key={`${item.clientName}-${item.company}`}>
              <blockquote className="max-w-[36ch] text-xl leading-8">
                {item.quote}
              </blockquote>
              <p className="mt-4 text-sm text-muted">
                {item.clientName}, {item.role}, {item.company}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
