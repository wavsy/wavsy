import { projects, projectsContent } from "@/content/bg/projects";
import { home } from "@/content/bg/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function SelectedWork() {
  const items =
    projects.length > 0
      ? projects
      : Array.from({ length: projectsContent.slots }, () => null);

  return (
    <Section tone="white" id="проекти-начало">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-[12ch] font-display text-[clamp(2rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.05em]">
              {projectsContent.title}
            </h2>
            <Button href={home.work.cta.href} variant="ghost">
              {home.work.cta.label}
            </Button>
          </div>
          <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">
            {projectsContent.lead}
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((project, index) => (
            <Reveal key={project?.slug ?? `slot-${index}`}>
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
                      {project?.name ?? projectsContent.emptyName}
                    </p>
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
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
