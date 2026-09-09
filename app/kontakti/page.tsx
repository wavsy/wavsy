import type { Metadata } from "next";
import { seo } from "@/content/bg/seo";
import { contact } from "@/content/bg/contact";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { InquiryForm } from "@/components/contact/InquiryForm";

export const metadata: Metadata = {
  title: seo.contact.title,
  description: seo.contact.description,
};

export default function ContactPage() {
  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={contact.pageTitle} lead={contact.lead} />
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.8fr] lg:gap-20">
          <InquiryForm />
          <aside className="lg:pt-2">
            <p className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">
              {contact.emailLabel}
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-3 inline-block text-xl text-ink underline decoration-mist underline-offset-4 hover:decoration-navy"
            >
              {contact.email}
            </a>
            <p className="mt-3 max-w-[36ch] text-sm leading-6 text-muted">
              {contact.emailHint}
            </p>
            <p className="mt-6 text-sm text-muted">{contact.response}</p>
          </aside>
        </div>
      </Container>
    </main>
  );
}
