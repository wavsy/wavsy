"use client";

import { useActionState } from "react";
import { contact } from "@/content/bg/contact";
import { Button } from "@/components/ui/Button";
import { submitInquiry } from "@/lib/inquiry";
import { cn } from "@/lib/cn";
import type { InquiryState } from "@/lib/validation";

type InquiryFormProps = {
  tone?: "light" | "dark";
};

export function InquiryForm({ tone = "light" }: InquiryFormProps) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(
    submitInquiry,
    null,
  );

  const dark = tone === "dark";

  if (state && !state.error && !state.fieldErrors) {
    return (
      <p className={cn("max-w-[42ch] leading-7", dark ? "text-white/80" : "text-ink/80")}>
        {contact.honeypotSuccess}
      </p>
    );
  }

  return (
    <form action={action} className="relative grid gap-6" noValidate>
      <Field
        id="name"
        name="name"
        label={contact.fields.name}
        autoComplete="name"
        error={state?.fieldErrors?.name}
        dark={dark}
        required
      />
      <Field
        id="company"
        name="company"
        label={contact.fields.company}
        autoComplete="organization"
        dark={dark}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="email"
          name="email"
          label={contact.fields.email}
          type="email"
          autoComplete="email"
          error={state?.fieldErrors?.email}
          dark={dark}
        />
        <Field
          id="phone"
          name="phone"
          label={contact.fields.phone}
          type="tel"
          autoComplete="tel"
          error={state?.fieldErrors?.phone}
          dark={dark}
        />
      </div>
      <p className={cn("text-sm", dark ? "text-white/50" : "text-muted")}>
        {contact.fields.contactHint}
      </p>
      <div className="grid gap-2">
        <label
          htmlFor="projectType"
          className={cn(
            "text-[0.75rem] uppercase tracking-[0.14em]",
            dark ? "text-white/55" : "text-muted",
          )}
        >
          {contact.fields.projectType}
        </label>
        <select
          id="projectType"
          name="projectType"
          defaultValue=""
          required
          className={cn(
            "field-input appearance-none bg-transparent",
            dark && "field-input-dark",
          )}
        >
          {contact.projectTypes.map((item) => (
            <option key={item.value || "empty"} value={item.value} disabled={item.value === ""}>
              {item.label}
            </option>
          ))}
        </select>
        {state?.fieldErrors?.projectType ? (
          <p className="text-sm text-cyan">{state.fieldErrors.projectType}</p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="message"
          className={cn(
            "text-[0.75rem] uppercase tracking-[0.14em]",
            dark ? "text-white/55" : "text-muted",
          )}
        >
          {contact.fields.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={cn("field-input min-h-32 resize-y", dark && "field-input-dark")}
        />
        {state?.fieldErrors?.message ? (
          <p className="text-sm text-cyan">{state.fieldErrors.message}</p>
        ) : null}
      </div>
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px opacity-0"
      />
      {state?.error ? (
        <p className="text-sm text-cyan" role="alert">
          {state.error}
        </p>
      ) : null}
      <p className={cn("text-sm leading-6", dark ? "text-white/50" : "text-muted")}>
        {contact.whatsappNote}
      </p>
      <Button type="submit" disabled={pending} variant={dark ? "inverse" : "primary"}>
        {pending ? contact.fields.pending : contact.fields.submit}
      </Button>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  dark: boolean;
};

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  required,
  error,
  dark,
}: FieldProps) {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={id}
        className={cn(
          "text-[0.75rem] uppercase tracking-[0.14em]",
          dark ? "text-white/55" : "text-muted",
        )}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={cn("field-input", dark && "field-input-dark")}
      />
      {error ? <p className="text-sm text-cyan">{error}</p> : null}
    </div>
  );
}
