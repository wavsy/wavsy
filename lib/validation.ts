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
} | null;
