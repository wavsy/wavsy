"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Clip } from "@/components/clips/Clip";
import { RoleDialog } from "@/components/careers/RoleDialog";
import { WhyJoin } from "@/components/careers/WhyJoin";
import { Button } from "@/components/ui/Button";
import { umamiEvent } from "@/lib/analytics";
import { APPLICATION_SCHEDULES, type ApplicationRole } from "@/lib/validation";

export function Openings() {
  const t = useTranslations("careers");
  const [role, setRole] = useState<ApplicationRole | null>(null);
  const close = useCallback(() => setRole(null), []);
  const facts = t.raw("sales.facts") as string[];

  return (
    <>
      <div className="mt-14 grid gap-5 md:mt-20 md:gap-6">
        <article className="relative overflow-hidden rounded-3xl bg-deep text-white shadow-[0_30px_70px_-30px_rgb(11_61_145/0.7)]">
          <div className="ai-aurora ai-aurora-soft pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative grid gap-10 p-7 sm:p-9 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:items-start lg:gap-12 lg:p-12">
            <div>
              <Clip name="offer" play="always" className="mb-6 w-20 text-cyan" />
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-cyan">
                {t("sales.eyebrow")}
              </p>
              <h3 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.15rem)] leading-[0.95] tracking-[-0.045em]">
                {t("sales.title")}
              </h3>
              <p className="mt-5 max-w-[28ch] text-lg font-medium leading-7 text-white">
                {t("sales.lead")}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {APPLICATION_SCHEDULES.map((id) => (
                  <li
                    key={id}
                    className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-sm text-white/80"
                  >
                    {t(`schedules.${id}`)}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  type="button"
                  variant="inverse"
                  onClick={() => setRole("sales")}
                  track={umamiEvent("career-open", { role: "sales" })}
                >
                  {t("sales.apply")}
                </Button>
              </div>
            </div>
            <ul className="grid gap-3">
              {facts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 leading-6 text-white/85"
                >
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <WhyJoin />

        <div className="flex items-center gap-4 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-muted">
          <span className="h-px flex-1 bg-mist" />
          {t("or")}
          <span className="h-px flex-1 bg-mist" />
        </div>

        <article className="rounded-3xl border border-mist bg-white p-7 sm:p-9">
          <div className="grid items-center gap-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-10">
            <Clip name="contact" play="always" className="w-20 text-navy" />
            <div>
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-muted">
                {t("open.eyebrow")}
              </p>
              <h3 className="mt-2 font-display text-3xl tracking-[-0.04em] md:text-4xl">
                {t("open.title")}
              </h3>
              <p className="mt-3 max-w-[46ch] leading-7 text-ink/75">{t("open.summary")}</p>
            </div>
            <Button
              type="button"
              variant="soft"
              onClick={() => setRole("open")}
              track={umamiEvent("career-open", { role: "open" })}
            >
              {t("write")}
            </Button>
          </div>
        </article>
      </div>
      {role ? <RoleDialog role={role} onClose={close} /> : null}
    </>
  );
}
