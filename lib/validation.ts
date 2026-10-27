import { z } from "zod";

export const PROJECT_TYPES = [
  "website",
  "app",
  "maintenance",
  "automation",
  "unsure",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const inquirySchema = z
  .object({
    name: z.string().trim().min(2, "name").max(80),
    company: z.string().trim().max(80).optional(),
    email: z.string().trim().max(120).optional(),
    phone: z.string().trim().max(40).optional(),
    projectType: z.string().min(1, "projectType"),
    message: z.string().trim().min(8, "message").max(2000),
    website: z.string().optional(),
    locale: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.email && !value.phone) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "contact",
      });
    }

    if (value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "email",
      });
    }

    if (!PROJECT_TYPES.includes(value.projectType as ProjectType)) {
      ctx.addIssue({
        code: "custom",
        path: ["projectType"],
        message: "projectType",
      });
    }
  });

export type InquiryInput = z.infer<typeof inquirySchema>;
export type InquiryState = {
  error?: "config" | "fields" | "generic";
  fieldErrors?: Partial<Record<keyof InquiryInput, string>>;
  url?: string;
} | null;

export const APPLICATION_ROLES = ["sales", "open"] as const;
export type ApplicationRole = (typeof APPLICATION_ROLES)[number];

export const APPLICATION_SCHEDULES = ["full", "part", "flex"] as const;
export type ApplicationSchedule = (typeof APPLICATION_SCHEDULES)[number];

export function isApplicationRole(value: string): value is ApplicationRole {
  return (APPLICATION_ROLES as readonly string[]).includes(value);
}

export function isApplicationSchedule(value: string): value is ApplicationSchedule {
  return (APPLICATION_SCHEDULES as readonly string[]).includes(value);
}

export function linkedInUrl(value: string) {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isLinkedIn(value: string) {
  try {
    const host = new URL(linkedInUrl(value)).hostname.toLowerCase();
    return host === "linkedin.com" || host.endsWith(".linkedin.com") || host === "lnkd.in";
  } catch {
    return false;
  }
}

export const applicationSchema = z
  .object({
    role: z.string().min(1, "role"),
    name: z.string().trim().min(2, "name").max(80, "name"),
    email: z.string().trim().max(120, "email"),
    phone: z.string().trim().max(40, "phone").optional(),
    place: z.string().trim().max(80, "place").optional(),
    linkedin: z.string().trim().max(200, "linkedin").optional(),
    schedule: z.string().trim().max(20).optional(),
    story: z.string().trim().max(4000, "story"),
    website: z.string().optional(),
    locale: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (!isApplicationRole(value.role)) {
      ctx.addIssue({ code: "custom", path: ["role"], message: "role" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "email" });
    }

    if (value.phone && (value.phone.match(/\d/g)?.length ?? 0) < 6) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "phone" });
    }

    if (value.linkedin && !isLinkedIn(value.linkedin)) {
      ctx.addIssue({
        code: "custom",
        path: ["linkedin"],
        message: "linkedin",
      });
    }

    if (
      value.role === "sales" &&
      (!value.schedule || !isApplicationSchedule(value.schedule))
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["schedule"],
        message: "schedule",
      });
    }
  });

export type ApplicationInput = z.infer<typeof applicationSchema>;
export type ApplicationField =
  | "name"
  | "email"
  | "phone"
  | "place"
  | "linkedin"
  | "schedule"
  | "story";
export type ApplicationState = {
  error?: "config" | "fields" | "generic" | "activate";
  fieldErrors?: Partial<Record<ApplicationField, string>>;
  ok?: boolean;
} | null;
