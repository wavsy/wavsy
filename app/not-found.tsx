import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fontClassName } from "@/lib/fonts";

export default function NotFound() {
  return (
    <html lang="bg" className={fontClassName}>
      <body className="antialiased">
        <main id="content" className="bg-paper pt-24 pb-24">
          <Container>
            <h1 className="max-w-[12ch] font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] tracking-[-0.05em] text-ink">
              Няма такава страница.
            </h1>
            <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">
              Връщане към началото или пиши ни, ако търсиш нещо конкретно.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
              <Button href="/">Към началото</Button>
              <Button href="/контакти" variant="ghost">
                Контакти
              </Button>
            </div>
          </Container>
        </main>
      </body>
    </html>
  );
}
