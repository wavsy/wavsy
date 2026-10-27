"use server";

import { isLocale } from "@/lib/routes";
import { sendApplicationEmail } from "@/lib/mail";
import {
  applicationSchema,
  isApplicationRole,
  isApplicationSchedule,
  linkedInUrl,
  type ApplicationRole,
  type ApplicationSchedule,
  type ApplicationState,
} from "@/lib/validation";

const roleLabel: Record<ApplicationRole, string> = {
  sales: "Продажби и развитие на бизнеса",
  open: "Свободна кандидатура",
};

const scheduleLabel: Record<ApplicationSchedule, string> = {
  full: "Пълно работно време",
  part: "Непълно работно време",
  flex: "Гъвкаво време",
};

function read(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function blankToUndefined(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export async function submitApplication(
  _prev: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  const parsed = applicationSchema.safeParse({
    role: read(formData, "role"),
    name: read(formData, "name"),
    email: read(formData, "email"),
    phone: blankToUndefined(read(formData, "phone")),
    place: blankToUndefined(read(formData, "place")),
    linkedin: blankToUndefined(read(formData, "linkedin")),
    schedule: blankToUndefined(read(formData, "schedule")),
    story: read(formData, "story"),
    website: read(formData, "website"),
    locale: blankToUndefined(read(formData, "locale")),
  });

  if (!parsed.success) {
    const fieldErrors: NonNullable<ApplicationState>["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        if (
          key === "name" ||
          key === "email" ||
          key === "phone" ||
          key === "place" ||
          key === "linkedin" ||
          key === "schedule" ||
          key === "story"
        ) {
          fieldErrors[key] = issue.message;
        }
      }
    }

    return Object.keys(fieldErrors).length > 0
      ? { error: "fields", fieldErrors }
      : { error: "generic" };
  }

  if (parsed.data.website) {
    return { ok: true };
  }

  if (!isApplicationRole(parsed.data.role)) {
    return { error: "generic" };
  }

  const role = parsed.data.role;
  const locale = parsed.data.locale && isLocale(parsed.data.locale) ? parsed.data.locale : "bg";
  const schedule =
    role === "sales" && parsed.data.schedule && isApplicationSchedule(parsed.data.schedule)
      ? scheduleLabel[parsed.data.schedule]
      : undefined;

  const lines = [
    "Нова кандидатура от wavsy.dev",
    "",
    `Позиция: ${roleLabel[role]}`,
    `Език на страницата: ${locale}`,
    `Име: ${oneLine(parsed.data.name)}`,
    `Имейл: ${oneLine(parsed.data.email)}`,
    parsed.data.phone ? `Телефон: ${oneLine(parsed.data.phone)}` : undefined,
    parsed.data.place ? `Откъде: ${oneLine(parsed.data.place)}` : undefined,
    parsed.data.linkedin ? `LinkedIn: ${linkedInUrl(oneLine(parsed.data.linkedin))}` : undefined,
    schedule ? `Работно време: ${schedule}` : undefined,
    "",
    "История:",
    parsed.data.story.trim(),
  ].filter((line) => line !== undefined);

  const result = await sendApplicationEmail({
    subject: `Кандидатура · ${roleLabel[role]} · ${oneLine(parsed.data.name).slice(0, 80)}`,
    text: lines.join("\n"),
    replyTo: oneLine(parsed.data.email),
  });

  if (result === "activate") return { error: "activate" };
  if (result === "failed") return { error: "generic" };
  return { ok: true };
}
