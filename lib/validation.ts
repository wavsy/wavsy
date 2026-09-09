import { z } from "zod";
import { contact } from "@/content/bg/contact";

const projectTypeValues: string[] = contact.projectTypes
  .map((item) => item.value)
  .filter((value) => value.length > 0);

export const inquirySchema = z
  .object({
    name: z.string().trim().min(2, contact.errors.name).max(80),
    company: z.string().trim().max(80).optional(),
    email: z.string().trim().max(120).optional(),
    phone: z.string().trim().max(40).optional(),
    projectType: z.string().min(1, contact.errors.projectType),
    message: z.string().trim().min(8, contact.errors.message).max(2000),
    website: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.email && !value.phone) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: contact.errors.contact,
      });
    }

    if (value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: contact.errors.email,
      });
    }

    if (!projectTypeValues.includes(value.projectType)) {
      ctx.addIssue({
        code: "custom",
        path: ["projectType"],
        message: contact.errors.projectType,
      });
    }
  });

export type InquiryInput = z.infer<typeof inquirySchema>;
export type InquiryState = {
  error?: string;
  fieldErrors?: Partial<Record<keyof InquiryInput, string>>;
} | null;
