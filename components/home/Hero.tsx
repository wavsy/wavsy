import { home } from "@/content/bg/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WaveField } from "@/components/motion/WaveField";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-paper">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 sm:opacity-100 md:w-[58%]">
        <WaveField className="h-full min-h-[280px]" />
      </div>
      <div className="absolute inset-y-0 right-0 hidden w-[58%] bg-gradient-to-l from-transparent via-transparent to-paper md:block" />
      <Container className="relative flex min-h-[100dvh] items-end pb-16 pt-[calc(var(--header-h)+3rem)] md:items-center md:pb-24 md:pt-[var(--header-h)]">
        <div className="hero-copy max-w-[16ch] md:max-w-[18ch]">
          <p className="mb-6 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-muted">
            {home.hero.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2.75rem,11vw,6.75rem)] leading-[0.92] tracking-[-0.05em] text-ink">
            {home.hero.title}
          </h1>
          <p className="mt-8 max-w-[38ch] text-[1.0625rem] leading-7 text-ink/80">
            {home.hero.body}
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Button href={home.hero.primary.href}>{home.hero.primary.label}</Button>
            <Button href={home.hero.secondary.href} variant="ghost">
              {home.hero.secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
