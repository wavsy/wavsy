"use server";

import { inquirySchema, type InquiryState } from "@/lib/validation";
import { buildChatUrl, buildInquiryMessage } from "@/lib/whatsapp";

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
    locale: read(formData, "locale") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: NonNullable<InquiryState>["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as keyof typeof fieldErrors] = issue.message;
      }
    }

    return { error: "fields", fieldErrors };
  }

  if (parsed.data.website) {
    return {};
  }

  const url = buildChatUrl("whatsapp", buildInquiryMessage(parsed.data));
  if (!url) {
    return { error: "config" };
  }

  return { url };
}
