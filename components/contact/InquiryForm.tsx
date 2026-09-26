"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
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
  // Counted before the chat opens, since opening it leaves the page.
  useEffect(() => {
    if (state?.url) {
      trackEvent("inquiry-whatsapp");
    }
  }, [state?.url]);
  useExternalChat(state?.url);

  const dark = tone === "dark";
  const [started, setStarted] = useState(false);

  // Funnel events: someone started the form, which type they chose, and every
  // submit attempt. The WhatsApp and Viber events mark real enquiries.
  function markStarted() {
    if (!started) {
      setStarted(true);
      trackEvent("form-start");
    }
  }

  function update<Key extends keyof FormValues>(key: Key, value: FormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  if (state && !state.error && !state.fieldErrors && !state.url) {
    return (
      <div
        className={cn(
          "flex items-start gap-4 rounded-2xl border p-6",
          dark ? "border-white/12 bg-white/[0.04] text-white/85" : "border-mist bg-paper text-ink/85",
        )}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy to-cyan text-white">
          <CheckIcon />
        </span>
        <p className="max-w-[42ch] leading-7">{t("honeypotSuccess")}</p>
      </div>
    );
  }

  const errorText = dark ? "text-[#ff9d9d]" : "text-[#c0392b]";

  return (
    <div className="grid gap-6">
      <form
        action={action}
        className="relative grid gap-4"
        noValidate
        onFocusCapture={markStarted}
        onSubmit={() => trackEvent("form-submit", { type: values.projectType || "none" })}
      >
        <input type="hidden" name="locale" value={locale} />
        <div className="grid gap-4 sm:grid-cols-2">
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
        <p className={cn("-mt-1 text-sm", dark ? "text-white/50" : "text-muted")}>
          {t("fields.contactHint")}
        </p>

        <fieldset className="mt-2 grid gap-3">
          <legend
            className={cn(
              "mb-3 text-[0.75rem] font-medium uppercase tracking-[0.14em]",
              dark ? "text-white/55" : "text-muted",
            )}
          >
            {t("fields.projectType")}
          </legend>
          {/* Remounted after every submit: React resets the form's inputs after
              an action, and a controlled radio would otherwise lose its
              checked state while ours still holds the choice. */}
          <div key={state ? JSON.stringify(state) : "initial"} className="flex flex-wrap gap-2">
            {projectTypeValues.map((value) => (
              <label
                key={value}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm transition-[color,background-color,border-color,box-shadow,transform] duration-200 active:scale-[0.97] has-[:checked]:border-transparent has-[:checked]:bg-gradient-to-r has-[:checked]:from-navy has-[:checked]:to-cyan has-[:checked]:text-white has-[:checked]:shadow-[0_10px_30px_-12px_rgb(63_193_240/0.7)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cyan",
                  dark
                    ? "border-white/15 bg-white/[0.04] text-white/80 hover:border-white/35"
                    : "border-ink/12 bg-white text-ink/80 hover:border-ink/30",
                )}
              >
                <input
                  type="radio"
                  name="projectType"
                  value={value}
                  checked={values.projectType === value}
                  onChange={() => {
                    update("projectType", value);
                    trackEvent("project-type", { type: value });
                  }}
                  className="sr-only"
                />
                {t(`projectTypes.${value}`)}
              </label>
            ))}
          </div>
          {state?.fieldErrors?.projectType ? (
            <p className={cn("text-sm", errorText)}>{t("errors.projectType")}</p>
          ) : null}
        </fieldset>

        <Field
          id={`${id}-message`}
          name="message"
          label={t("fields.message")}
          multiline
          value={values.message}
          onChange={(value) => update("message", value)}
          error={state?.fieldErrors?.message ? t("errors.message") : undefined}
          dark={dark}
          required
        />

        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute h-px w-px opacity-0"
        />
        {state?.error === "config" || state?.error === "generic" ? (
          <p className={cn("text-sm", errorText)} role="alert">
            {t("errors.config")}
          </p>
        ) : null}
        <div className="mt-2">
          <Button
            type="submit"
            disabled={pending}
            variant={dark ? "inverse" : "primary"}
            icon={<SendIcon />}
            className="w-full justify-between sm:w-auto"
          >
            {pending ? t("fields.pending") : t("fields.submit")}
          </Button>
        </div>
      </form>
      {viberHref ? (
        <div className={cn("border-t pt-6", dark ? "border-white/10" : "border-mist")}>
          <Button
            href={viberHref}
            onClick={() => trackEvent("inquiry-viber")}
            variant={dark ? "outline" : "soft"}
            icon={<ChatIcon />}
          >
            {t("fields.viber")}
          </Button>
          <p className={cn("mt-3 max-w-[36ch] text-sm leading-6", dark ? "text-white/50" : "text-muted")}>
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
  multiline?: boolean;
  error?: string;
  dark: boolean;
  value: string;
  onChange: (value: string) => void;
};

// A filled field with its label inside: the label sits in the middle while
// the field is empty and floats up when it has focus or a value.
function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  required,
  multiline,
  error,
  dark,
  value,
  onChange,
}: FieldProps) {
  const errorId = `${id}-error`;
  const field = cn(
    "peer w-full rounded-2xl border px-4 pb-2.5 text-[1rem] outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:ring-4",
    multiline ? "min-h-36 resize-y pt-8" : "h-[3.75rem] pt-6",
    dark
      ? "border-white/12 bg-white/[0.04] text-white focus:border-cyan focus:bg-white/[0.07] focus:ring-cyan/15"
      : "border-mist bg-paper text-ink focus:border-navy focus:bg-white focus:ring-cyan/20",
    dark ? "aria-invalid:border-[#ff9d9d]/70" : "aria-invalid:border-[#c0392b]/60",
  );
  const shared = {
    id,
    name,
    required,
    value,
    placeholder: " ",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: field,
  };

  return (
    <div className="grid content-start gap-1.5">
      <div className="relative">
        {multiline ? (
          <textarea {...shared} rows={5} onChange={(event) => onChange(event.target.value)} />
        ) : (
          <input
            {...shared}
            type={type}
            autoComplete={autoComplete}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-4 origin-left transition-all duration-200",
            multiline ? "top-4" : "top-1/2 -translate-y-1/2",
            "peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:scale-[0.78] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:scale-[0.78]",
            multiline && "peer-focus:top-2.5 peer-[:not(:placeholder-shown)]:top-2.5",
            dark ? "text-white/55 peer-focus:text-cyan" : "text-muted peer-focus:text-navy",
          )}
        >
          {label}
        </label>
      </div>
      {error ? (
        <p id={errorId} className={cn("pl-1 text-sm", dark ? "text-[#ff9d9d]" : "text-[#c0392b]")}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path d="M3 10l14-6-5 14-2.5-5.5L3 10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5v5a2.5 2.5 0 0 1-2.5 2.5H9l-3.5 3v-3h0A2.5 2.5 0 0 1 4 10.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
