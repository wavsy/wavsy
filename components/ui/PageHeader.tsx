import { Container } from "@/components/ui/Container";
import { ScrambleText } from "@/components/ai/ScrambleText";

type PageHeaderProps = {
  title: string;
  lead: string;
  eyebrow?: string;
  children?: React.ReactNode;
};

// The dark opening of every inner page, in the style of the AI page: aurora,
// dot grid, gradient title. Nothing here starts hidden, so the title is the
// first thing painted.
export function PageHeader({ title, lead, eyebrow = "Wavsy", children }: PageHeaderProps) {
  return (
    <section className="relative isolate mb-16 overflow-hidden bg-deep text-white md:mb-24">
      <div className="ai-aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="ai-dot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <Container className="flex min-h-[56dvh] flex-col justify-end pb-14 pt-[calc(var(--header-h)+4rem)] md:min-h-[62dvh] md:pb-20">
        <div className="hero-copy min-w-0">
          <p className="mb-6 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-cyan">
            <ScrambleText text={eyebrow} />
          </p>
          <h1 className="ai-gradient-text max-w-[14ch] hyphens-auto break-words font-display text-[clamp(2.75rem,9vw,7rem)] leading-[0.92] tracking-[-0.05em]">
            {title}
          </h1>
          <p className="mt-8 max-w-[46ch] text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-8 text-white/80">
            {lead}
          </p>
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
