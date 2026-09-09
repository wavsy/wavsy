"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getWhatsAppDigits } from "@/lib/whatsapp";
import {
  computeQuote,
  defaultAnswers,
  SITE_TYPES,
  FEATURES,
  AUTOMATIONS,
  MAINTENANCE,
  type QuoteAnswers,
} from "@/lib/quote";

export type QuoteSubmitState = {
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "phone", string>>;
} | null;

const answersSchema = z.object({
  siteType: z.enum(SITE_TYPES).nullable(),
  pages: z.number().int().min(1).max(15),
  features: z.array(z.enum(FEATURES)),
  assistant: z.boolean().nullable(),
  automations: z.enum(AUTOMATIONS).nullable(),
  maintenance: z.enum(MAINTENANCE).nullable(),
});

function read(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function parseAnswers(raw: string): QuoteAnswers {
  try {
    const parsed = answersSchema.parse(JSON.parse(raw));
    return parsed;
  } catch {
    return defaultAnswers;
  }
}

function buildQuoteMessage(input: {
  locale: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  answers: QuoteAnswers;
}) {
  const quote = computeQuote(input.answers);
  const features = input.answers.features.join(", ") || "—";

  return [
    "Wavsy calculator enquiry",
    "",
    input.name ? `Name: ${input.name}` : null,
    input.company ? `Company: ${input.company}` : null,
    input.email ? `Email: ${input.email}` : null,
    input.phone ? `Phone: ${input.phone}` : null,
    input.name || input.email || input.phone ? "" : null,
    `Locale: ${input.locale}`,
    `Site type: ${input.answers.siteType ?? "—"}`,
    `Pages: ${input.answers.pages}`,
    `Features: ${features}`,
    `Assistant: ${input.answers.assistant === true ? "yes" : input.answers.assistant === false ? "no" : "—"}`,
    `Automations: ${input.answers.automations ?? "—"}`,
    `Maintenance: ${input.answers.maintenance ?? "—"}`,
    input.answers.siteType === "unsure" ? "Flag: not sure about site type" : null,
    "",
    `Range: ${quote.low} – ${quote.high} EUR`,
    quote.monthly ? `Monthly: ${quote.monthly} EUR` : "Monthly: 0",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function openWhatsApp(text: string) {
  const digits = getWhatsAppDigits();
  if (!digits) {
    return { error: "config" } satisfies NonNullable<QuoteSubmitState>;
  }
  redirect(`https://wa.me/${digits}?text=${encodeURIComponent(text)}`);
}

export async function submitQuoteWhatsApp(
  _prev: QuoteSubmitState,
  formData: FormData,
): Promise<QuoteSubmitState> {
  if (read(formData, "website")) {
    return {};
  }

  const requireContact = read(formData, "requireContact") === "1";
  const name = read(formData, "name").trim();
  const company = read(formData, "company").trim();
  const email = read(formData, "email").trim();
  const phone = read(formData, "phone").trim();
  const locale = read(formData, "locale") || "bg";
  const answers = parseAnswers(read(formData, "answers"));

  if (requireContact) {
    const fieldErrors: NonNullable<QuoteSubmitState>["fieldErrors"] = {};
    if (name.length < 2) {
      fieldErrors.name = "name";
    }
    if (!phone) {
      fieldErrors.phone = "phone";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldErrors.email = "email";
    }
    if (!email) {
      fieldErrors.email = "email";
    }
    if (fieldErrors.name || fieldErrors.phone || fieldErrors.email) {
      return { fieldErrors, error: "fields" };
    }
  }

  return openWhatsApp(
    buildQuoteMessage({
      locale,
      name: name || undefined,
      company: company || undefined,
      email: email || undefined,
      phone: phone || undefined,
      answers,
    }),
  );
}
