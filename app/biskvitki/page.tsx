import type { Metadata } from "next";
import { seo } from "@/content/bg/seo";
import { legal } from "@/content/bg/legal";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: seo.cookies.title,
  description: seo.cookies.description,
};

export default function CookiesPage() {
  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={legal.cookies.title} lead={legal.cookies.note} />
    </main>
  );
}
