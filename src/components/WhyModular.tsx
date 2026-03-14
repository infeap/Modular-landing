"use client";

import { useRef } from "react";
import { ScrollReveal } from "./ui/ScrollReveal";
import { LottieIcon, LottieIconHandle } from "./ui/LottieIcon";

const usps = [
  {
    lottie: "/icons/fast.json",
    title: "Blixtsnabbt",
    description: "Desktop-app för maximal prestanda och offline-arbete",
  },
  {
    lottie: "/icons/secure.json",
    title: "Säkert & Privat",
    description: "All projektdata lagras lokalt på din dator (funktioner som behöver tredjepartsintegritet meddelas för respektive modul)",
  },
  {
    lottie: "/icons/module.json",
    title: "Modulärt system",
    description: "Köp och aktivera endast de moduler du behöver och använder",
  },
];

function UspCard({ usp }: { usp: (typeof usps)[number] }) {
  const lottieRef = useRef<LottieIconHandle>(null);

  return (
    <div
      className="group relative bg-white rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => lottieRef.current?.play()}
    >
      {/* Top border animation */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2e5c9a] to-[#6a9fe0] origin-left scale-x-[0.3] group-hover:scale-x-100 transition-transform duration-500 ease-out" />

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center">
          <LottieIcon ref={lottieRef} src={usp.lottie} className="w-10 h-10" trigger="hover" />
        </div>
        <div>
          <h4 className="font-semibold text-lg text-slate-900 mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
            {usp.title}
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {usp.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhyModular() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #2D3A5C, #1D2A4C)" }}>
      {/* Subtle radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Heading + description */}
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: "#f0f4f8" }}>
              <span style={{ fontFamily: "var(--font-jakarta)" }}>Varför </span>
              <em style={{ fontFamily: "var(--font-playfair)", color: "#60A5FA" }}>Modular?</em>
            </h2>
            <p className="text-lg leading-relaxed max-w-lg" style={{ color: "rgba(240, 244, 248, 0.65)" }}>
              Byggt från grunden för installationsbranschen. Snabbt, säkert och anpassningsbart
              efter dina behov utan onödiga funktioner som tynger ner arbetsflödet.
            </p>
          </ScrollReveal>

          {/* Right: USP cards */}
          <div className="space-y-6">
            {usps.map((usp, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <UspCard usp={usp} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
