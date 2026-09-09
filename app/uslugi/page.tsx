import type { Metadata } from "next";
import { seo } from "@/content/bg/seo";
import { services } from "@/content/bg/services";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: seo.services.title,
  description: seo.services.description,
};

export default function ServicesPage() {
  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={services.pageTitle} lead={services.lead} />
      <Container>
        <ul>
          {services.items.map((item) => (
            <li key={item.id} className="border-t border-mist last:border-b">
              <article className="grid gap-4 py-8 md:grid-cols-[5rem_1fr_1.1fr] md:items-start md:gap-10 md:py-10">
                <p className="font-display text-sm tracking-[0.12em] text-navy">
                  {item.number}
                </p>
                <h2 className="font-display text-3xl tracking-[-0.04em] md:text-4xl">
                  {item.title}
                </h2>
                <div>
                  <p className="text-[1.0625rem] leading-7">{item.sentence}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.audience}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[46ch] text-ink/80">{services.priceNote}</p>
        <div className="mt-8">
          <Button href={services.cta.href}>{services.cta.label}</Button>
        </div>
      </Container>
    </main>
  );
}
