import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhyModular from "@/components/WhyModular";
import EarlyAccess from "@/components/EarlyAccess";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FeedbackButton from "@/components/FeedbackButton";
import { LenisProvider } from "@/components/LenisProvider";

export default function Home() {
  return (
    <LenisProvider>
      <main className="min-h-screen">
        <Hero />
        <Features />
        <WhyModular />
        <EarlyAccess />
        <FAQ />
        <Footer />
        <FeedbackButton />
      </main>
    </LenisProvider>
  );
}
