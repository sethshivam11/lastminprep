import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Technologies from "@/components/Technologies";
import Working from "@/components/Working";
import Analytics from "@/components/Analytics";
import FAQs from "@/components/FAQs";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <Features />
        <Technologies />
        <Working />
        <Analytics />
        <FAQs />
        <CTA />
      </main>
    </div>
  );
}
