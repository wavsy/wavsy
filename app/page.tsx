import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { Process } from "@/components/home/Process";
import { Founders } from "@/components/home/Founders";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyWavsy } from "@/components/home/WhyWavsy";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
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
