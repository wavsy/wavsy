import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

function encodedSources(source: string) {
  const encoded = encodeURI(source);
  const lower = encoded.replace(/%[0-9A-F]{2}/gi, (match) =>
    match.toLowerCase(),
  );
  return [...new Set([source, encoded, lower])];
}

const publicToInternal = [
  ["/", "/bg"],
  ["/услуги", "/bg/uslugi"],
  ["/портфолио", "/bg/portfolio"],
  ["/проекти", "/bg/portfolio"],
  ["/за-нас", "/bg/za-nas"],
  ["/контакти", "/bg/kontakti"],
  ["/поверителност", "/bg/poveritelnost"],
  ["/бисквитки", "/bg/biskvitki"],
  ["/en/services", "/en/uslugi"],
  ["/en/about", "/en/za-nas"],
  ["/en/contact", "/en/kontakti"],
  ["/en/privacy", "/en/poveritelnost"],
  ["/en/cookies", "/en/biskvitki"],
  ["/de/leistungen", "/de/uslugi"],
  ["/de/ueber-uns", "/de/za-nas"],
  ["/de/kontakt", "/de/kontakti"],
  ["/de/datenschutz", "/de/poveritelnost"],
  ["/de/cookies", "/de/biskvitki"],
] as const;

const calculatorRedirects = [
  ...encodedSources("/калкулатор").map((source) => ({
    source,
    destination: "/контакти",
    permanent: true,
  })),
  { source: "/en/calculator", destination: "/en/contact", permanent: true },
  { source: "/de/rechner", destination: "/de/kontakt", permanent: true },
  { source: "/bg/kalkulator", destination: "/контакти", permanent: true },
  { source: "/en/kalkulator", destination: "/en/contact", permanent: true },
  { source: "/de/kalkulator", destination: "/de/kontakt", permanent: true },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/bg", destination: "/", permanent: true },
      { source: "/uslugi", destination: "/услуги", permanent: true },
      { source: "/proekti", destination: "/портфолио", permanent: true },
      { source: "/za-nas", destination: "/за-нас", permanent: true },
      { source: "/kontakti", destination: "/контакти", permanent: true },
      { source: "/poveritelnost", destination: "/поверителност", permanent: true },
      { source: "/biskvitki", destination: "/бисквитки", permanent: true },
      ...calculatorRedirects,
    ];
  },
  async rewrites() {
    return publicToInternal.flatMap(([source, destination]) =>
      encodedSources(source).map((entry) => ({
        source: entry,
        destination,
      })),
    );
  },
};

export default withNextIntl(nextConfig);
