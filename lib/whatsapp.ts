import "server-only";

import type { InquiryInput } from "@/lib/validation";

export type ChatChannel = "whatsapp" | "viber";

export function getContactDigits(): string | null {
  const raw = process.env.WHATSAPP_E164 || process.env.CONTACT_E164;
  if (!raw) {
    return null;
  }

  const digits = raw.replace(/\D/g, "");
  return digits.length >= 8 ? digits : null;
}

export function buildChatUrl(channel: ChatChannel, text = ""): string | null {
  const digits = getContactDigits();
  if (!digits) {
    return null;
  }

  if (channel === "viber") {
    return `viber://chat?number=${digits}`;
  }

  const encoded = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${encoded}`;
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
