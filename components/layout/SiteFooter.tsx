import { footer } from "@/content/bg/footer";
import { nav } from "@/content/bg/nav";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-mist bg-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.3fr_0.8fr_0.8fr] md:py-20">
        <div>
          <Logo />
          <p className="mt-8 max-w-[18ch] font-display text-3xl leading-[1.1] tracking-[-0.04em] text-ink sm:text-4xl">
            {footer.tagline}
          </p>
          <p className="mt-4 text-sm text-muted">{footer.studio}</p>
          <a
            href={`mailto:${footer.email}`}
            className="mt-8 inline-block text-ink underline decoration-mist underline-offset-4 transition-colors hover:decoration-navy"
          >
            {footer.email}
          </a>
          <p className="mt-2 text-sm text-muted">{footer.response}</p>
        </div>
        <nav className="flex flex-col gap-3" aria-label="Футър">
          <p className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">
            {footer.navLabel}
          </p>
          <Link href={nav.home.href} className="text-ink/80 hover:text-ink">
            {nav.home.label}
          </Link>
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink/80 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="flex flex-col gap-3" aria-label="Правна информация">
          <p className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">
            {footer.legalLabel}
          </p>
          {footer.legal.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink/80 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="border-t border-mist py-6 text-sm text-muted">
        <p>
          © {year} {footer.copyright}
        </p>
      </Container>
      <p
        aria-hidden
        className="pointer-events-none -mb-10 select-none px-5 font-display text-[22vw] leading-[0.7] tracking-[-0.06em] text-mist/80"
      >
        wavsy
      </p>
    </footer>
  );
}
