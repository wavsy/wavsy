import "server-only";

import type { InquiryInput } from "@/lib/validation";

export function getWhatsAppDigits(): string | null {
  const raw = process.env.WHATSAPP_E164;
  if (!raw) {
    return null;
  }

  const digits = raw.replace(/\D/g, "");
  return digits.length >= 8 ? digits : null;
}

export function buildInquiryMessage(data: InquiryInput): string {
  return [
    "New enquiry from wavsy.dev",
    "",
    `Name: ${data.name}`,
    `Company: ${data.company || "—"}`,
    `Email: ${data.email || "—"}`,
    `Phone: ${data.phone || "—"}`,
    `Type: ${data.projectType}`,
    data.locale ? `Locale: ${data.locale}` : null,
    "",
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
