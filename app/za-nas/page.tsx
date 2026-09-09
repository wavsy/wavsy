import type { Metadata } from "next";
import { seo } from "@/content/bg/seo";
import { about } from "@/content/bg/about";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: seo.about.title,
  description: seo.about.description,
};

export default function AboutPage() {
  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={about.pageTitle} lead={about.lead} />
      <Container>
        <p className="max-w-[46ch] text-[1.0625rem] leading-7 text-ink/80">
          {about.body}
        </p>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {about.people.map((person) => (
            <article key={person.name}>
              <div className="flex aspect-[4/5] items-end border border-mist bg-mist/60 p-5">
                <p className="text-sm tracking-[0.04em] text-muted">
                  {person.photoLabel}
                </p>
              </div>
              <h2 className="mt-6 font-display text-3xl tracking-[-0.04em]">
                {person.name}
              </h2>
              <p className="mt-2 text-sm text-muted">{person.role}</p>
              <p className="mt-4 max-w-[36ch] leading-7 text-ink/80">{person.bio}</p>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
