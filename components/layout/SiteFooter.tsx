import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { GdprBadge } from "@/components/ui/GdprBadge";
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
      <Container className="grid items-start gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.2fr] md:py-20">
        <div>
          <Logo href={pathFor(locale, "home")} />
          <p className="mt-6 max-w-[14ch] font-display text-xl leading-[1.15] tracking-[-0.04em] text-ink md:text-[1.375rem]">
            {t("tagline")}
          </p>
          <p className="mt-4 text-sm text-muted">{t("studio")}</p>
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
            href={pathFor(locale, "careers")}
            className="text-ink/80 transition-colors duration-150 hover:text-ink"
          >
            {t("careers")}
          </Link>
        </nav>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">
              {t("contactLabel")}
            </p>
            <a
              href={`mailto:${PUBLIC_EMAIL}`}
              className="mt-3 inline-block break-all text-ink underline decoration-mist underline-offset-4 transition-colors duration-150 hover:decoration-navy"
            >
              {PUBLIC_EMAIL}
            </a>
            <p className="mt-2 text-sm text-muted">{t("response")}</p>
          </div>
          <ul className="flex gap-3" aria-label={t("socialLabel")}>
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
          <Link
            href={pathFor(locale, "privacy")}
            aria-label={t("gdprAria")}
            className="inline-flex w-fit transition-opacity duration-150 hover:opacity-85"
          >
            <GdprBadge />
          </Link>
        </div>
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
