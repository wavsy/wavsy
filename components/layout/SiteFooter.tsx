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
    { href: pathFor(locale, "ai"), label: nav("ai") },
    { href: pathFor(locale, "portfolio"), label: nav("portfolio") },
    { href: pathFor(locale, "about"), label: nav("about") },
    { href: pathFor(locale, "contact"), label: nav("contact") },
  ];

  const socials = [
    { href: SOCIAL_LINKS.facebook, label: t("facebookAria"), Icon: FacebookMark },
    { href: SOCIAL_LINKS.linkedin, label: t("linkedinAria"), Icon: LinkedInMark },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-deep text-white">
      <div className="ai-aurora ai-aurora-soft pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative grid items-start gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.2fr] md:py-20">
        <div>
          <Logo href={pathFor(locale, "home")} onDark />
          <p className="mt-6 max-w-[14ch] font-display text-xl leading-[1.15] tracking-[-0.04em] text-white md:text-[1.375rem]">
            {t("tagline")}
          </p>
          <p className="mt-4 text-sm text-white/55">{t("studio")}</p>
        </div>
        <nav className="flex flex-col gap-3" aria-label={t("navLabel")}>
          <p className="text-[0.75rem] uppercase tracking-[0.14em] text-white/50">
            {t("navLabel")}
          </p>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/75 transition-colors duration-150 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="flex flex-col gap-3" aria-label={t("legalLabel")}>
          <p className="text-[0.75rem] uppercase tracking-[0.14em] text-white/50">
            {t("legalLabel")}
          </p>
          <Link
            href={pathFor(locale, "privacy")}
            className="text-white/75 transition-colors duration-150 hover:text-white"
          >
            {t("privacy")}
          </Link>
          <Link
            href={pathFor(locale, "careers")}
            className="text-white/75 transition-colors duration-150 hover:text-white"
          >
            {t("careers")}
          </Link>
        </nav>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-[0.75rem] uppercase tracking-[0.14em] text-white/50">
              {t("contactLabel")}
            </p>
            <a
              href={`mailto:${PUBLIC_EMAIL}`}
              className="mt-3 inline-block break-all text-white underline decoration-white/25 underline-offset-4 transition-colors duration-150 hover:decoration-cyan"
            >
              {PUBLIC_EMAIL}
            </a>
            <p className="mt-2 text-sm text-white/55">{t("response")}</p>
          </div>
          <ul className="flex gap-3" aria-label={t("socialLabel")}>
            {socials.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors duration-150 hover:border-cyan hover:text-cyan"
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
      <Container className="relative border-t border-white/10 py-6 text-sm text-white/50">
        <p>
          © {year} {t("copyright")}
        </p>
      </Container>
      <p
        aria-hidden
        className="footer-wordmark pointer-events-none relative -mb-10 select-none px-5 font-display text-[22vw] leading-[0.7] tracking-[-0.06em]"
      >
        wavsy
      </p>
    </footer>
  );
}
