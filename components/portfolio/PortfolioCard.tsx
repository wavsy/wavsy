"use client";

import { useTranslations } from "next-intl";
import { HoverLift } from "@/components/motion/HoverLift";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

type PortfolioCardProps = {
  project: Project | null;
  index: number;
};

export function PortfolioCard({ project, index }: PortfolioCardProps) {
  const t = useTranslations("work");

  return (
    <HoverLift>
      <article
        className={cn(
          "group relative min-h-[22rem] overflow-hidden border border-mist bg-paper md:min-h-[28rem]",
          index === 1 && "md:mt-12",
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B3D91_0%,transparent_42%,#3FC1F0_100%)] opacity-[0.07]" />
        <div className="relative flex h-full min-h-[22rem] flex-col justify-between p-6 md:min-h-[28rem] md:p-8">
          <p className="text-[0.75rem] uppercase tracking-[0.16em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <p className="font-display text-3xl tracking-[-0.04em] text-ink md:text-4xl">
              {project?.name ?? t("emptyName")}
            </p>
            <p className="mt-3 text-sm text-muted">
              {project ? `${project.company} · ${project.industry}` : t("emptyLabel")}
            </p>
            <p className="mt-4 max-w-[32ch] text-ink/75">
              {project?.result ?? t("emptyHint")}
            </p>
          </div>
        </div>
      </article>
    </HoverLift>
  );
}
