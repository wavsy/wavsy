import "server-only";

import { contact } from "@/content/bg/contact";
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
  const typeLabel =
    contact.projectTypes.find((item) => item.value === data.projectType)
      ?.label ?? data.projectType;

  const lines = [
    "Ново запитване от wavsy.dev",
    "",
    `Име: ${data.name}`,
    `Фирма: ${data.company || "—"}`,
    `Имейл: ${data.email || "—"}`,
    `Телефон: ${data.phone || "—"}`,
    `Тип: ${typeLabel}`,
    "",
    data.message,
  ];

  return lines.join("\n");
}
