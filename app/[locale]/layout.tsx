import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteAssistant } from "@/components/assistant/SiteAssistant";
import { AnalyticsSlot } from "@/components/analytics/AnalyticsSlot";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageFade } from "@/components/motion/PageFade";
import { fontClassName } from "@/lib/fonts";
import { isLocale, locales, type Locale } from "@/lib/routes";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }
  const locale: Locale = raw;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={fontClassName}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll />
          <SkipLink />
          <SiteHeader locale={locale} />
          <PageFade>{children}</PageFade>
          <SiteFooter locale={locale} />
          <SiteAssistant />
          <AnalyticsSlot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
