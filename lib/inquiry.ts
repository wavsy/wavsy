"use server";

import { redirect } from "next/navigation";
import { contact } from "@/content/bg/contact";
import { inquirySchema, type InquiryState } from "@/lib/validation";
import { buildInquiryMessage, getWhatsAppDigits } from "@/lib/whatsapp";

function read(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const parsed = inquirySchema.safeParse({
    name: read(formData, "name"),
    company: read(formData, "company") || undefined,
    email: read(formData, "email") || undefined,
    phone: read(formData, "phone") || undefined,
    projectType: read(formData, "projectType"),
    message: read(formData, "message"),
    website: read(formData, "website"),
  });

  if (!parsed.success) {
    const fieldErrors: NonNullable<InquiryState>["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as keyof typeof fieldErrors] = issue.message;
      }
    }

    return {
      error: fieldErrors.email ?? parsed.error.issues[0]?.message,
      fieldErrors,
    };
  }

  if (parsed.data.website) {
    return {};
  }

  const digits = getWhatsAppDigits();
  if (!digits) {
    return { error: contact.errors.config };
  }

  const text = encodeURIComponent(buildInquiryMessage(parsed.data));
  redirect(`https://wa.me/${digits}?text=${text}`);
}
