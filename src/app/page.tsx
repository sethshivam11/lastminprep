import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Technologies from "@/components/Technologies";
import Working from "@/components/Working";
import FAQs from "@/components/FAQs";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="flex flex-col border-l border-r border-muted">
      <Hero />
      <Features />
      <Technologies />
      <Working />
      <FAQs />
      <CTA />
    </main>
  );
}
