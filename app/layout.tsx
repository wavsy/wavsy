import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import { seo } from "@/content/bg/seo";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteAssistant } from "@/components/assistant/SiteAssistant";
import { AnalyticsSlot } from "@/components/analytics/AnalyticsSlot";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-inter",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: seo.home.title,
  description: seo.home.description,
  metadataBase: new URL("https://wavsy.dev"),
  openGraph: {
    locale: "bg_BG",
    type: "website",
    siteName: "Wavsy",
    title: seo.home.title,
    description: seo.home.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className={`${inter.variable} ${unbounded.variable} antialiased`}>
        <SkipLink />
        <SiteHeader />
        {children}
        <SiteFooter />
        <SiteAssistant />
        <AnalyticsSlot />
      </body>
    </html>
  );
}
