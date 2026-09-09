import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { Process } from "@/components/home/Process";
import { Founders } from "@/components/home/Founders";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyWavsy } from "@/components/home/WhyWavsy";
import { FinalCta } from "@/components/home/FinalCta";
import { parseLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await parseLocale(params);
  return pageMetadata(locale, "home");
}

export default async function HomePage({ params }: PageProps) {
  const locale = await parseLocale(params);
  setRequestLocale(locale);

  return (
    <main id="content">
      <Hero />
      <SelectedWork />
      <ServicesIndex />
      <Process />
      <Founders />
      <Testimonials />
      <WhyWavsy />
      <FinalCta />
    </main>
  );
}
