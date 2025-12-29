import Hero from "@/components/Hero";
import Features from "@/components/Features";
import EarlyAccess from "@/components/EarlyAccess";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FeedbackButton from "@/components/FeedbackButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <EarlyAccess />
      <FAQ />
      <Footer />
      <FeedbackButton />
    </main>
  );
}

