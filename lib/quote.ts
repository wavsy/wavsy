export const SITE_TYPES = ["card", "company", "shop", "unsure"] as const;
export type SiteType = (typeof SITE_TYPES)[number];

export const FEATURES = [
  "blog",
  "booking",
  "payments",
  "crm",
  "i18n",
  "none",
] as const;
export type Feature = (typeof FEATURES)[number];

export const AUTOMATIONS = ["one", "three", "no"] as const;
export type Automations = (typeof AUTOMATIONS)[number];

export const MAINTENANCE = ["basic", "standard", "none"] as const;
export type Maintenance = (typeof MAINTENANCE)[number];

export type QuoteAnswers = {
  siteType: SiteType | null;
  pages: number;
  features: Feature[];
  assistant: boolean | null;
  automations: Automations | null;
  maintenance: Maintenance | null;
};

export const defaultAnswers: QuoteAnswers = {
  siteType: null,
  pages: 5,
  features: [],
  assistant: null,
  automations: null,
  maintenance: null,
};

const BASE: Record<SiteType, number> = {
  card: 900,
  company: 2400,
  shop: 4200,
  unsure: 2400,
};

const INCLUDED_PAGES: Record<SiteType, number> = {
  card: 3,
  company: 8,
  shop: 8,
  unsure: 8,
};

const FEATURE_FEE: Record<Exclude<Feature, "i18n" | "none">, number> = {
  blog: 250,
  booking: 400,
  payments: 500,
  crm: 400,
};

function roundUp100(value: number) {
  return Math.ceil(value / 100) * 100;
}

export function includedPages(type: SiteType) {
  return INCLUDED_PAGES[type];
}

export function computeQuote(answers: QuoteAnswers) {
  const type = answers.siteType ?? "company";
  let oneOff = BASE[type];
  const extraPages = Math.max(0, answers.pages - INCLUDED_PAGES[type]);
  oneOff += extraPages * 200;

  const features = answers.features.includes("none") ? [] : answers.features;
  for (const feature of features) {
    if (feature === "blog" || feature === "booking" || feature === "payments" || feature === "crm") {
      oneOff += FEATURE_FEE[feature];
    }
  }

  if (features.includes("i18n")) {
    oneOff *= 1.25;
  }

  if (answers.assistant) {
    oneOff += 900;
  }

  if (answers.automations === "one") {
    oneOff += 400;
  }
  if (answers.automations === "three") {
    oneOff += 1000;
  }

  oneOff = Math.max(900, oneOff);

  let monthly = 0;
  if (answers.assistant) {
    monthly += 69;
  }
  if (answers.maintenance === "basic") {
    monthly += 79;
  }
  if (answers.maintenance === "standard") {
    monthly += 149;
  }

  return {
    oneOff,
    low: roundUp100(oneOff),
    high: roundUp100(oneOff * 1.35),
    monthly,
    extraPages,
    unsure: type === "unsure",
  };
}
