"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { submitApplication } from "@/lib/application";
import { cn } from "@/lib/cn";
import { pathFor, type Locale } from "@/lib/routes";
import {
  APPLICATION_SCHEDULES,
  type ApplicationRole,
  type ApplicationState,
} from "@/lib/validation";

type ApplicationFormProps = {
  role: ApplicationRole;
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  place: string;
  linkedin: string;
  schedule: string;
  story: string;
};

const emptyValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  place: "",
  linkedin: "",
  schedule: "",
  story: "",
};

export function ApplicationForm({ role }: ApplicationFormProps) {
  const t = useTranslations("careers");
  const locale = useLocale() as Locale;
  const id = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const sent = useRef(false);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [state, action, pending] = useActionState<ApplicationState, FormData>(
    submitApplication,
    null,
  );

  useEffect(() => {
    if (state?.ok && !sent.current) {
      sent.current = true;
      trackEvent("career-sent", { role });
      successRef.current?.focus();
    }
  }, [state, role]);

  function update<Key extends keyof FormValues>(key: Key, value: FormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  if (state?.ok) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex items-start gap-4 rounded-2xl border border-mist bg-paper p-6 outline-none"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy to-cyan text-white">
          <CheckIcon />
        </span>
        <div>
          <p className="font-medium text-ink">{t("form.successTitle")}</p>
          <p className="mt-1 max-w-[42ch] leading-7 text-ink/80">{t("form.success")}</p>
        </div>
      </div>
    );
  }

  const storyError = state?.fieldErrors?.story ? t("errors.story") : undefined;

  return (
    <form
      action={action}
      className="relative grid gap-4"
      noValidate
      onSubmit={() => trackEvent("career-submit", { role })}
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="role" value={role} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          name="name"
          label={t("form.name")}
          autoComplete="name"
          value={values.name}
          onChange={(value) => update("name", value)}
          error={state?.fieldErrors?.name ? t("errors.name") : undefined}
          required
        />
        <Field
          id={`${id}-email`}
          name="email"
          label={t("form.email")}
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(value) => update("email", value)}
          error={state?.fieldErrors?.email ? t("errors.email") : undefined}
          required
        />
        <Field
          id={`${id}-phone`}
          name="phone"
          label={t("form.phone")}
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(value) => update("phone", value)}
          error={state?.fieldErrors?.phone ? t("errors.phone") : undefined}
        />
        <Field
          id={`${id}-place`}
          name="place"
          label={t("form.place")}
          autoComplete="address-level2"
          value={values.place}
          onChange={(value) => update("place", value)}
          error={state?.fieldErrors?.place ? t("errors.place") : undefined}
        />
      </div>
      <Field
        id={`${id}-linkedin`}
        name="linkedin"
        label={t("form.linkedin")}
        type="url"
        autoComplete="url"
        value={values.linkedin}
        onChange={(value) => update("linkedin", value)}
        error={state?.fieldErrors?.linkedin ? t("errors.linkedin") : undefined}
      />
      <p className="-mt-1 text-sm text-muted">{t("form.optionalNote")}</p>

      {role === "sales" ? (
        <fieldset className="mt-2 grid gap-3">
          <legend className="mb-3 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted">
            {t("form.schedule")}
          </legend>
          <div key={state ? JSON.stringify(state.fieldErrors ?? {}) : "initial"} className="flex flex-wrap gap-2">
            {APPLICATION_SCHEDULES.map((value) => (
              <label
                key={value}
                className="cursor-pointer rounded-full border border-ink/12 bg-white px-4 py-2 text-sm text-ink/80 transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:border-ink/30 active:scale-[0.97] has-[:checked]:border-transparent has-[:checked]:bg-gradient-to-r has-[:checked]:from-navy has-[:checked]:to-cyan has-[:checked]:text-white has-[:checked]:shadow-[0_10px_30px_-12px_rgb(63_193_240/0.7)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cyan"
              >
                <input
                  type="radio"
                  name="schedule"
                  value={value}
                  checked={values.schedule === value}
                  onChange={() => update("schedule", value)}
                  className="sr-only"
                />
                {t(`schedules.${value}`)}
              </label>
            ))}
          </div>
          {state?.fieldErrors?.schedule ? (
            <p className="text-sm text-[#c0392b]">{t("errors.schedule")}</p>
          ) : null}
        </fieldset>
      ) : null}

      <Field
        id={`${id}-story`}
        name="story"
        label={t("form.story")}
        multiline
        value={values.story}
        onChange={(value) => update("story", value)}
        error={storyError}
        required
      />
      {storyError ? null : (
        <p className="-mt-1 max-w-[52ch] text-sm leading-6 text-muted">
          {t(role === "sales" ? "form.storyHintSales" : "form.storyHintOpen")}
        </p>
      )}

      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px opacity-0"
      />

      {state?.error === "config" || state?.error === "generic" || state?.error === "activate" ? (
        <p className="text-sm text-[#c0392b]" role="alert">
          {t(`errors.${state.error}`)}
        </p>
      ) : null}

      <div className="mt-2">
        <Button
          type="submit"
          disabled={pending}
          icon={<SendIcon />}
          className="w-full justify-between sm:w-auto"
        >
          {pending ? t("form.pending") : t("form.submit")}
        </Button>
      </div>
      <p className="max-w-[52ch] text-sm leading-6 text-muted">
        {t("form.privacy")}{" "}
        <Link
          href={pathFor(locale, "privacy")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("form.privacyNewTab")}
          className="text-ink underline decoration-mist underline-offset-4 hover:decoration-navy"
        >
          {t("form.privacyLink")}
        </Link>.
      </p>
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
  multiline?: boolean;
  error?: string;
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
  multiline,
  error,
  value,
  onChange,
}: FieldProps) {
  const errorId = `${id}-error`;
  const field = cn(
    "peer w-full rounded-2xl border border-mist bg-paper px-4 pb-2.5 text-[1rem] text-ink outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:border-navy focus:bg-white focus:ring-4 focus:ring-cyan/20 aria-invalid:border-[#c0392b]/60",
    multiline ? "min-h-40 resize-y pt-8" : "h-[3.75rem] pt-6",
  );
  const shared = {
    id,
    name,
    required,
    value,
    maxLength: multiline ? 4000 : 200,
    placeholder: " ",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: field,
  };

  return (
    <div className="grid content-start gap-1.5">
      <div className="relative">
        {multiline ? (
          <textarea {...shared} rows={6} onChange={(event) => onChange(event.target.value)} />
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
            "pointer-events-none absolute left-4 origin-left text-muted transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:scale-[0.78] peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:scale-[0.78]",
            multiline ? "top-4" : "top-1/2 -translate-y-1/2",
          )}
        >
          {label}
        </label>
      </div>
      {error ? (
        <p id={errorId} className="pl-1 text-sm text-[#c0392b]">
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
