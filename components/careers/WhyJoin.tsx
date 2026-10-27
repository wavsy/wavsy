"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";

type Reason = { title: string; body: string };

export function WhyJoin() {
  const t = useTranslations("careers");
  const headingId = useId();
  const reasons = t.raw("sales.why") as Reason[];

  return (
    <section aria-labelledby={headingId} className="mt-8 md:mt-10">
      <h3
        id={headingId}
        className="font-display text-[clamp(1.75rem,3vw,2.5rem)] tracking-[-0.04em]"
      >
        {t("sales.whyTitle")}
      </h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {reasons.map((reason) => (
          <li key={reason.title} className="rounded-3xl border border-mist bg-white p-6">
            <span aria-hidden className="mb-4 block size-1.5 rounded-full bg-cyan" />
            <h4 className="font-display text-xl leading-tight tracking-[-0.03em]">{reason.title}</h4>
            <p className="mt-2 leading-7 text-ink/75">{reason.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
