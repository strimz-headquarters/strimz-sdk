'use client'
import Benefits from "@/components/guest/benefits";
import CTA from "@/components/guest/CTA";
import Faqs from "@/components/guest/faqs";
import Features from "@/components/guest/features";
import HeroSection from "@/components/guest/herosection";
import Payroll from "@/components/guest/payroll";


/**
 * The Home component is the main entry point for the application.
 * It renders all the top-level components for the guest experience.
 * It also applies a CSS class to hide any horizontal scrollbars.
 */
export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <Features />
      <Benefits />
      <Payroll />
      <Faqs />
      <CTA />
    </main>
  );
}
