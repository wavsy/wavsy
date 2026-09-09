import type { Metadata } from "next";
import { seo } from "@/content/bg/seo";
import { legal } from "@/content/bg/legal";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: seo.privacy.title,
  description: seo.privacy.description,
};

export default function PrivacyPage() {
  return (
    <main id="content" className="bg-paper pb-24">
      <PageHeader title={legal.privacy.title} lead={legal.privacy.note} />
    </main>
  );
}
