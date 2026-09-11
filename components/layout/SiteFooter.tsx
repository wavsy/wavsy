import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { FacebookMark, LinkedInMark } from "@/components/ui/SocialIcons";
import Link from "next/link";
import { pathFor, type Locale } from "@/lib/routes";
import { PUBLIC_EMAIL, SOCIAL_LINKS } from "@/lib/site";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  const items = [
    { href: pathFor(locale, "home"), label: nav("home") },
    { href: pathFor(locale, "services"), label: nav("services") },
    { href: pathFor(locale, "portfolio"), label: nav("portfolio") },
    { href: pathFor(locale, "about"), label: nav("about") },
    { href: pathFor(locale, "contact"), label: nav("contact") },
  ];

  const socials = [
    { href: SOCIAL_LINKS.facebook, label: t("facebookAria"), Icon: FacebookMark },
    { href: SOCIAL_LINKS.linkedin, label: t("linkedinAria"), Icon: LinkedInMark },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-mist bg-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.3fr_0.8fr_0.8fr] md:py-20">
        <div>
          <Logo href={pathFor(locale, "home")} />
          <p className="mt-8 max-w-[18ch] font-display text-3xl leading-[1.1] tracking-[-0.04em] text-ink sm:text-4xl">
            {t("tagline")}
          </p>
          <p className="mt-4 text-sm text-muted">{t("studio")}</p>
          <a
            href={`mailto:${PUBLIC_EMAIL}`}
            className="mt-8 inline-block text-ink underline decoration-mist underline-offset-4 transition-colors duration-150 hover:decoration-navy"
          >
            {PUBLIC_EMAIL}
          </a>
          <p className="mt-2 text-sm text-muted">{t("response")}</p>
          <ul className="mt-8 flex gap-3" aria-label={t("socialLabel")}>
            {socials.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center border border-mist text-ink/70 transition-colors duration-150 hover:border-navy hover:text-navy"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav className="flex flex-col gap-3" aria-label={t("navLabel")}>
          <p className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">
            {t("navLabel")}
          </p>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink/80 transition-colors duration-150 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="flex flex-col gap-3" aria-label={t("legalLabel")}>
          <p className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">
            {t("legalLabel")}
          </p>
          <Link
            href={pathFor(locale, "privacy")}
            className="text-ink/80 transition-colors duration-150 hover:text-ink"
          >
            {t("privacy")}
          </Link>
          <Link
            href={pathFor(locale, "cookies")}
            className="text-ink/80 transition-colors duration-150 hover:text-ink"
          >
            {t("cookies")}
          </Link>
        </nav>
      </Container>
      <Container className="border-t border-mist py-6 text-sm text-muted">
        <p>
          © {year} {t("copyright")}
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
