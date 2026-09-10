"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { HoverLift } from "@/components/motion/HoverLift";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

type PortfolioCardProps = {
  project: Project | null;
  index: number;
};

export function PortfolioCard({ project, index }: PortfolioCardProps) {
  const work = useTranslations("work");
  const t = useTranslations("portfolio");

  const name = project ? t(`projects.${project.slug}.name`) : work("emptyName");
  const industry = project ? t(`projects.${project.slug}.industry`) : work("emptyLabel");
  const summary = project ? t(`projects.${project.slug}.summary`) : work("emptyHint");

  const body = (
    <article
      className={cn(
        "group overflow-hidden border border-mist bg-white",
        index === 1 && "md:mt-12",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        {project ? (
          <Image
            src={project.image}
            alt={t("imageAlt", { name })}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            priority={index < 2}
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B3D91_0%,transparent_42%,#3FC1F0_100%)] opacity-[0.18]" />
        )}
      </div>
      <div className="p-6 md:p-8">
        <p className="text-[0.75rem] uppercase tracking-[0.16em] text-muted">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="mt-4 font-display text-3xl tracking-[-0.04em] text-ink md:text-4xl">
          {name}
        </p>
        <p className="mt-3 text-sm text-muted">{industry}</p>
        <p className="mt-4 max-w-[32ch] text-ink/75">{summary}</p>
        {project ? (
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink/55 transition-colors duration-150 group-hover:text-navy">
            <span>{t("visit")}</span>
            <span
              aria-hidden
              className="translate-x-0 transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            >
              →
            </span>
          </p>
        ) : null}
      </div>
    </article>
  );

  if (!project) {
    return <HoverLift>{body}</HoverLift>;
  }

  return (
    <HoverLift>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("visitAria", { name })}
        className="block h-full"
      >
        {body}
      </a>
    </HoverLift>
  );
}
