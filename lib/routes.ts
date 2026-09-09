export const locales = ["bg", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bg";

export const routeKeys = [
  "home",
  "services",
  "portfolio",
  "calculator",
  "about",
  "contact",
  "privacy",
  "cookies",
] as const;
export type RouteKey = (typeof routeKeys)[number];

export const paths: Record<Locale, Record<RouteKey, string>> = {
  bg: {
    home: "/",
    services: "/услуги",
    portfolio: "/портфолио",
    calculator: "/калкулатор",
    about: "/за-нас",
    contact: "/контакти",
    privacy: "/поверителност",
    cookies: "/бисквитки",
  },
  en: {
    home: "/en",
    services: "/en/services",
    portfolio: "/en/portfolio",
    calculator: "/en/calculator",
    about: "/en/about",
    contact: "/en/contact",
    privacy: "/en/privacy",
    cookies: "/en/cookies",
  },
  de: {
    home: "/de",
    services: "/de/leistungen",
    portfolio: "/de/portfolio",
    calculator: "/de/rechner",
    about: "/de/ueber-uns",
    contact: "/de/kontakt",
    privacy: "/de/datenschutz",
    cookies: "/de/cookies",
  },
};

const internalFolders: Record<string, RouteKey> = {
  "": "home",
  uslugi: "services",
  kalkulator: "calculator",
  portfolio: "portfolio",
  "za-nas": "about",
  kontakti: "contact",
  poveritelnost: "privacy",
  biskvitki: "cookies",
};

export function pathFor(locale: Locale, key: RouteKey) {
  return paths[locale][key];
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizePathname(pathname: string) {
  try {
    const decoded = decodeURI(pathname);
    if (decoded.length > 1 && decoded.endsWith("/")) {
      return decoded.slice(0, -1);
    }
    return decoded || "/";
  } catch {
    return pathname || "/";
  }
}

export function localeFromPathname(pathname: string): Locale {
  const path = normalizePathname(pathname);
  if (path === "/en" || path.startsWith("/en/")) {
    return "en";
  }
  if (path === "/de" || path.startsWith("/de/")) {
    return "de";
  }
  return "bg";
}

export function routeKeyFromPathname(pathname: string): RouteKey {
  const path = normalizePathname(pathname);
  const locale = localeFromPathname(path);

  const publicMatch = (Object.keys(paths[locale]) as RouteKey[]).find(
    (key) => paths[locale][key] === path,
  );
  if (publicMatch) {
    return publicMatch;
  }

  const stripped = path.replace(/^\/(bg|en|de)(?=\/|$)/, "");
  const folder = stripped.replace(/^\//, "");
  return internalFolders[folder] ?? "home";
}
