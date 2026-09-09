import { legal } from "@/content/bg/legal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main id="content" className="bg-paper pt-[calc(var(--header-h)+4rem)] pb-24">
      <Container>
        <h1 className="max-w-[12ch] font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] tracking-[-0.05em] text-ink">
          {legal.notFound.title}
        </h1>
        <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">
          {legal.notFound.note}
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Button href="/">{legal.notFound.home}</Button>
          <Button href="/контакти" variant="ghost">
            {legal.notFound.contact}
          </Button>
        </div>
      </Container>
    </main>
  );
}
