"use client";

import { useActionState, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  computeQuote,
  defaultAnswers,
  type Feature,
  type QuoteAnswers,
  type SiteType,
} from "@/lib/quote";
import { submitQuoteWhatsApp, type QuoteSubmitState } from "@/lib/quote-inquiry";

const TOTAL_STEPS = 8;

export function QuoteCalculator() {
  const t = useTranslations("calculator");
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuoteAnswers>(defaultAnswers);
  const quote = useMemo(() => computeQuote(answers), [answers]);

  const canNext =
    (step === 1 && answers.siteType !== null) ||
    step === 2 ||
    (step === 3 && answers.features.length > 0) ||
    (step === 4 && answers.assistant !== null) ||
    (step === 5 && answers.automations !== null) ||
    (step === 6 && answers.maintenance !== null) ||
    step >= 7;

  function toggleFeature(feature: Feature) {
    setAnswers((current) => {
      if (feature === "none") {
        return { ...current, features: ["none"] };
      }
      const withoutNone = current.features.filter((item) => item !== "none");
      const next = withoutNone.includes(feature)
        ? withoutNone.filter((item) => item !== feature)
        : [...withoutNone, feature];
      return { ...current, features: next };
    });
  }

  return (
    <div className="mx-auto w-full max-w-[36rem]">
      <p className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">
        {t("progress", { current: step, total: TOTAL_STEPS })}
      </p>
      <div className="mt-3 h-px bg-mist">
        <div
          className="h-px bg-navy transition-[width] duration-200"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      <div className="mt-8 min-h-[22rem]">
        {step === 1 ? (
          <fieldset>
            <legend className="font-display text-[clamp(1.6rem,6vw,2.4rem)] leading-[1.05] tracking-[-0.04em]">
              {t("step1.title")}
            </legend>
            <div className="mt-8 grid gap-3">
              {(["card", "company", "shop", "unsure"] as SiteType[]).map((value) => (
                <Choice
                  key={value}
                  selected={answers.siteType === value}
                  onClick={() => setAnswers((current) => ({ ...current, siteType: value }))}
                >
                  {t(`step1.${value}`)}
                </Choice>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <div>
            <h2 className="font-display text-[clamp(1.6rem,6vw,2.4rem)] leading-[1.05] tracking-[-0.04em]">
              {t("step2.title")}
            </h2>
            <p className="mt-4 max-w-[40ch] text-sm leading-6 text-muted">
              {t("step2.helper")}
            </p>
            <label className="mt-10 block">
              <span className="text-sm text-muted">
                {t("step2.value", { count: answers.pages })}
              </span>
              <input
                type="range"
                min={1}
                max={15}
                value={answers.pages}
                onChange={(event) =>
                  setAnswers((current) => ({
                    ...current,
                    pages: Number(event.target.value),
                  }))
                }
                className="mt-4 w-full accent-navy"
              />
            </label>
          </div>
        ) : null}

        {step === 3 ? (
          <fieldset>
            <legend className="font-display text-[clamp(1.6rem,6vw,2.4rem)] leading-[1.05] tracking-[-0.04em]">
              {t("step3.title")}
            </legend>
            <div className="mt-8 grid gap-3">
              {(["blog", "booking", "payments", "crm", "i18n", "none"] as Feature[]).map(
                (value) => (
                  <Choice
                    key={value}
                    selected={answers.features.includes(value)}
                    onClick={() => toggleFeature(value)}
                  >
                    {t(`step3.${value}`)}
                  </Choice>
                ),
              )}
            </div>
          </fieldset>
        ) : null}

        {step === 4 ? (
          <fieldset>
            <legend className="font-display text-[clamp(1.6rem,6vw,2.4rem)] leading-[1.05] tracking-[-0.04em]">
              {t("step4.title")}
            </legend>
            <p className="mt-4 max-w-[42ch] text-sm leading-6 text-muted">
              {t("step4.note")}
            </p>
            <div className="mt-8 grid gap-3">
              <Choice
                selected={answers.assistant === true}
                onClick={() => setAnswers((current) => ({ ...current, assistant: true }))}
              >
                {t("step4.yes")}
              </Choice>
              <Choice
                selected={answers.assistant === false}
                onClick={() => setAnswers((current) => ({ ...current, assistant: false }))}
              >
                {t("step4.no")}
              </Choice>
            </div>
          </fieldset>
        ) : null}

        {step === 5 ? (
          <fieldset>
            <legend className="font-display text-[clamp(1.6rem,6vw,2.4rem)] leading-[1.05] tracking-[-0.04em]">
              {t("step5.title")}
            </legend>
            <div className="mt-8 grid gap-3">
              <Choice
                selected={answers.automations === "one"}
                onClick={() => setAnswers((current) => ({ ...current, automations: "one" }))}
              >
                <span className="block">{t("step5.one")}</span>
                <span className="mt-1 block text-sm font-normal text-muted">
                  {t("step5.oneExample")}
                </span>
              </Choice>
              <Choice
                selected={answers.automations === "three"}
                onClick={() => setAnswers((current) => ({ ...current, automations: "three" }))}
              >
                <span className="block">{t("step5.three")}</span>
                <span className="mt-1 block text-sm font-normal text-muted">
                  {t("step5.threeExample")}
                </span>
              </Choice>
              <Choice
                selected={answers.automations === "no"}
                onClick={() => setAnswers((current) => ({ ...current, automations: "no" }))}
              >
                <span className="block">{t("step5.none")}</span>
                <span className="mt-1 block text-sm font-normal text-muted">
                  {t("step5.noneExample")}
                </span>
              </Choice>
            </div>
          </fieldset>
        ) : null}

        {step === 6 ? (
          <fieldset>
            <legend className="font-display text-[clamp(1.6rem,6vw,2.4rem)] leading-[1.05] tracking-[-0.04em]">
              {t("step6.title")}
            </legend>
            <p className="mt-4 max-w-[42ch] text-sm leading-6 text-muted">
              {t("step6.note")}
            </p>
            <div className="mt-8 grid gap-3">
              {(["basic", "standard", "none"] as const).map((value) => (
                <Choice
                  key={value}
                  selected={answers.maintenance === value}
                  onClick={() =>
                    setAnswers((current) => ({ ...current, maintenance: value }))
                  }
                >
                  {t(`step6.${value}`)}
                </Choice>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 7 ? (
          <Result answers={answers} low={quote.low} high={quote.high} monthly={quote.monthly} />
        ) : null}

        {step === 8 ? <QuoteContact answers={answers} locale={locale} /> : null}
      </div>

      {step < 8 ? (
        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep((value) => Math.max(1, value - 1))}
            disabled={step === 1}
            className="py-3 text-sm text-muted transition-colors duration-150 hover:text-ink disabled:opacity-40"
          >
            {t("back")}
          </button>
          {step < 7 ? (
            <Button
              type="button"
              disabled={!canNext}
              onClick={() => canNext && setStep((value) => value + 1)}
            >
              {t("next")}
            </Button>
          ) : (
            <Button type="button" onClick={() => setStep(8)}>
              {t("result.continue")}
            </Button>
          )}
        </div>
      ) : (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setStep(7)}
            className="py-3 text-sm text-muted transition-colors duration-150 hover:text-ink"
          >
            {t("back")}
          </button>
        </div>
      )}
    </div>
  );
}

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "w-full min-h-12 border px-4 py-4 text-left text-[1.02rem] leading-6 transition-colors duration-150",
        selected
          ? "border-navy bg-white text-ink"
          : "border-mist bg-transparent text-ink/80 hover:border-ink/40",
      )}
    >
      {children}
    </button>
  );
}

function Result({
  answers,
  low,
  high,
  monthly,
}: {
  answers: QuoteAnswers;
  low: number;
  high: number;
  monthly: number;
}) {
  const t = useTranslations("calculator");
  const locale = useLocale();
  const [state, action, pending] = useActionState<QuoteSubmitState, FormData>(
    submitQuoteWhatsApp,
    null,
  );
  const featureList = answers.features.includes("none")
    ? t("step3.none")
    : answers.features.map((item) => t(`step3.${item}`)).join(" · ");

  return (
    <div>
      <h2 className="font-display text-[clamp(1.6rem,6vw,2.4rem)] leading-[1.05] tracking-[-0.04em]">
        {t("result.title")}
      </h2>
      <p className="mt-6 font-display text-[clamp(1.8rem,7vw,3rem)] leading-[1.05] tracking-[-0.04em]">
        {t("result.range", { low, high })}
      </p>
      {monthly > 0 ? (
        <p className="mt-3 text-lg text-ink/80">
          {t("result.monthly", { amount: monthly })}
        </p>
      ) : null}
      <p className="mt-4 max-w-[42ch] text-sm leading-6 text-muted">
        {t("result.disclaimer")}
      </p>
      <dl className="mt-8 grid gap-3 text-sm">
        <SummaryRow label={t("labels.siteType")}>
          {answers.siteType ? t(`step1.${answers.siteType}`) : "—"}
        </SummaryRow>
        <SummaryRow label={t("labels.pages")}>{answers.pages}</SummaryRow>
        <SummaryRow label={t("labels.features")}>{featureList || "—"}</SummaryRow>
        <SummaryRow label={t("labels.assistant")}>
          {answers.assistant ? t("labels.yes") : t("labels.no")}
        </SummaryRow>
        <SummaryRow label={t("labels.automations")}>
          {answers.automations === "one"
            ? t("step5.one")
            : answers.automations === "three"
              ? t("step5.three")
              : t("step5.none")}
        </SummaryRow>
        <SummaryRow label={t("labels.maintenance")}>
          {answers.maintenance ? t(`step6.${answers.maintenance}`) : "—"}
        </SummaryRow>
      </dl>
      <form action={action} className="mt-8">
        <input type="hidden" name="answers" value={JSON.stringify(answers)} />
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="requireContact" value="0" />
        <input name="website" className="pointer-events-none absolute h-px w-px opacity-0" tabIndex={-1} aria-hidden />
        {state?.error === "config" ? (
          <p className="mb-4 text-sm text-navy">{t("form.errors.config")}</p>
        ) : null}
        <Button type="submit" disabled={pending}>
          {pending ? t("form.whatsapp") : t("result.whatsapp")}
        </Button>
      </form>
    </div>
  );
}

function QuoteContact({
  answers,
  locale,
}: {
  answers: QuoteAnswers;
  locale: string;
}) {
  const t = useTranslations("calculator");
  const [state, action, pending] = useActionState<QuoteSubmitState, FormData>(
    submitQuoteWhatsApp,
    null,
  );

  return (
    <form action={action} className="relative grid gap-5">
      <h2 className="font-display text-[clamp(1.6rem,6vw,2.4rem)] leading-[1.05] tracking-[-0.04em]">
        {t("form.title")}
      </h2>
      <input type="hidden" name="answers" value={JSON.stringify(answers)} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="requireContact" value="1" />
      <input name="website" className="pointer-events-none absolute h-px w-px opacity-0" tabIndex={-1} aria-hidden />
      <Field
        name="name"
        label={t("form.name")}
        autoComplete="name"
        error={state?.fieldErrors?.name ? t("form.errors.name") : undefined}
      />
      <Field name="company" label={t("form.company")} autoComplete="organization" />
      <Field
        name="phone"
        label={t("form.phone")}
        type="tel"
        autoComplete="tel"
        error={state?.fieldErrors?.phone ? t("form.errors.phone") : undefined}
      />
      <Field
        name="email"
        label={t("form.email")}
        type="email"
        autoComplete="email"
        error={state?.fieldErrors?.email ? t("form.errors.email") : undefined}
      />
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <Button type="submit" disabled={pending}>
          {pending ? t("result.whatsapp") : t("form.submit")}
        </Button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="field-input"
      />
      {error ? <p className="text-sm text-navy">{error}</p> : null}
    </div>
  );
}

function SummaryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-mist py-2">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right text-ink">{children}</dd>
    </div>
  );
}
