"use client";

import { useActionState, useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { submitInquiry } from "@/lib/inquiry";
import { useExternalChat } from "@/lib/use-external-chat";
import { cn } from "@/lib/cn";
import type { InquiryState } from "@/lib/validation";

const projectTypeValues = [
  "website",
  "app",
  "maintenance",
  "automation",
  "unsure",
] as const;

type InquiryFormProps = {
  tone?: "light" | "dark";
  viberHref?: string | null;
};

type FormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

const emptyValues: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

export function InquiryForm({ tone = "light", viberHref }: InquiryFormProps) {
  const t = useTranslations("contact");
  const locale = useLocale();
  const id = useId();
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [state, action, pending] = useActionState<InquiryState, FormData>(
    submitInquiry,
    null,
  );
  useExternalChat(state?.url);

  const dark = tone === "dark";

  function update<Key extends keyof FormValues>(key: Key, value: FormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  if (state && !state.error && !state.fieldErrors && !state.url) {
    return (
      <p className={cn("max-w-[42ch] leading-7", dark ? "text-white/80" : "text-ink/80")}>
        {t("honeypotSuccess")}
      </p>
    );
  }

  return (
    <div className="grid gap-6">
      <form action={action} className="relative grid gap-6" noValidate>
      <input type="hidden" name="locale" value={locale} />
      <Field
        id={`${id}-name`}
        name="name"
        label={t("fields.name")}
        autoComplete="name"
        value={values.name}
        onChange={(value) => update("name", value)}
        error={state?.fieldErrors?.name ? t("errors.name") : undefined}
        dark={dark}
        required
      />
      <Field
        id={`${id}-company`}
        name="company"
        label={t("fields.company")}
        autoComplete="organization"
        value={values.company}
        onChange={(value) => update("company", value)}
        dark={dark}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={`${id}-email`}
          name="email"
          label={t("fields.email")}
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(value) => update("email", value)}
          error={
            state?.fieldErrors?.email
              ? t(`errors.${state.fieldErrors.email === "contact" ? "contact" : "email"}`)
              : undefined
          }
          dark={dark}
        />
        <Field
          id={`${id}-phone`}
          name="phone"
          label={t("fields.phone")}
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(value) => update("phone", value)}
          error={state?.fieldErrors?.phone ? t("errors.contact") : undefined}
          dark={dark}
        />
      </div>
      <p className={cn("text-sm", dark ? "text-white/50" : "text-muted")}>
        {t("fields.contactHint")}
      </p>
      <div className="grid gap-2">
        <label
          htmlFor={`${id}-projectType`}
          className={cn(
            "text-[0.75rem] uppercase tracking-[0.14em]",
            dark ? "text-white/55" : "text-muted",
          )}
        >
          {t("fields.projectType")}
        </label>
        <select
          id={`${id}-projectType`}
          name="projectType"
          value={values.projectType}
          onChange={(event) => update("projectType", event.target.value)}
          required
          className={cn(
            "field-input appearance-none bg-transparent",
            dark && "field-input-dark",
          )}
        >
          <option value="" disabled>
            {t("projectTypes.empty")}
          </option>
          {projectTypeValues.map((value) => (
            <option key={value} value={value}>
              {t(`projectTypes.${value}`)}
            </option>
          ))}
        </select>
        {state?.fieldErrors?.projectType ? (
          <p className="text-sm text-cyan">{t("errors.projectType")}</p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label
          htmlFor={`${id}-message`}
          className={cn(
            "text-[0.75rem] uppercase tracking-[0.14em]",
            dark ? "text-white/55" : "text-muted",
          )}
        >
          {t("fields.message")}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          className={cn("field-input min-h-32 resize-y", dark && "field-input-dark")}
        />
        {state?.fieldErrors?.message ? (
          <p className="text-sm text-cyan">{t("errors.message")}</p>
        ) : null}
      </div>
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px opacity-0"
      />
      {state?.error === "config" || state?.error === "generic" ? (
        <p className="text-sm text-cyan" role="alert">
          {t("errors.config")}
        </p>
      ) : null}
        <Button type="submit" disabled={pending} variant={dark ? "inverse" : "primary"}>
          {pending ? t("fields.pending") : t("fields.submit")}
        </Button>
      </form>
      {viberHref ? (
        <div>
          <Button
            href={viberHref}
            variant="ghost"
            className={cn(
              "border px-5",
              dark ? "border-white/40 text-white hover:border-cyan hover:text-cyan" : "border-ink",
            )}
          >
            {t("fields.viber")}
          </Button>
          <p className={cn("mt-2 max-w-[36ch] text-sm leading-6", dark ? "text-white/50" : "text-muted")}>
            {t("viberHint")}
          </p>
        </div>
      ) : null}
    </div>
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
  value: string;
  onChange: (value: string) => void;
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
  value,
  onChange,
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
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn("field-input", dark && "field-input-dark")}
      />
      {error ? <p className="text-sm text-cyan">{error}</p> : null}
    </div>
  );
}
