import type { Metadata } from "next";
import { seo } from "@/content/bg/seo";
import { projects, projectsContent } from "@/content/bg/projects";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: seo.projects.title,
  description: seo.projects.description,
};

export default function ProjectsPage() {
  const items =
    projects.length > 0
      ? projects
      : Array.from({ length: projectsContent.slots }, () => null);

  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={projectsContent.pageTitle} lead={projectsContent.lead} />
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((project, index) => (
            <article
              key={project?.slug ?? `slot-${index}`}
              className={cn(
                "relative min-h-[22rem] overflow-hidden border border-mist bg-white md:min-h-[28rem]",
                index === 1 && "md:mt-12",
              )}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B3D91_0%,transparent_42%,#3FC1F0_100%)] opacity-[0.07]" />
              <div className="relative flex h-full min-h-[22rem] flex-col justify-between p-6 md:min-h-[28rem] md:p-8">
                <p className="text-[0.75rem] uppercase tracking-[0.16em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h2 className="font-display text-3xl tracking-[-0.04em] text-ink md:text-4xl">
                    {project?.name ?? projectsContent.emptyName}
                  </h2>
                  <p className="mt-3 text-sm text-muted">
                    {project
                      ? `${project.company} · ${project.industry}`
                      : projectsContent.emptyLabel}
                  </p>
                  <p className="mt-4 max-w-[32ch] text-ink/75">
                    {project?.result ?? projectsContent.emptyHint}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
