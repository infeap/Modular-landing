"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function Hero() {
  const { trackClick } = useAnalytics();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#f0f2f8" }}>
      {/* Light wavy background — matching the app */}
      <div className="absolute inset-0 z-0">
        {/* Base subtle gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #f0f2f8 0%, #e8ecf4 40%, #dfe4f0 100%)" }} />
        {/* Wavy shapes */}
        <svg className="absolute bottom-0 left-0 w-full" style={{ height: "60%" }} viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none">
          <path d="M0 300C200 200 400 350 720 280C1040 210 1240 350 1440 300V600H0V300Z" fill="rgba(195,210,240,0.4)" />
          <path d="M0 380C180 300 360 420 720 340C1080 260 1260 400 1440 380V600H0V380Z" fill="rgba(180,200,235,0.35)" />
          <path d="M0 440C240 380 480 480 720 420C960 360 1200 460 1440 440V600H0V440Z" fill="rgba(170,192,230,0.3)" />
          <path d="M0 500C300 460 500 520 720 490C940 460 1140 530 1440 500V600H0V500Z" fill="rgba(160,185,225,0.25)" />
        </svg>
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(140,170,220,0.15)_0%,transparent_60%)]" />
      </div>

      {/* Header/Navbar */}
      <nav className="relative z-20 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/Modular_logo_icon.png"
              alt="Modular"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-jakarta)", color: "#2D3A5C" }}
            >
              Modular
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <button
              onClick={() => { trackClick("nav_features", "navigation"); window.__lenis?.scrollTo("#features", { duration: 1.6 }); }}
              className="font-medium transition-colors cursor-pointer text-slate-600 hover:text-[#3B82F6]"
            >
              Funktioner
            </button>
            <button
              onClick={() => { trackClick("nav_faq", "navigation"); window.__lenis?.scrollTo("#faq", { duration: 1.6 }); }}
              className="font-medium transition-colors cursor-pointer text-slate-600 hover:text-[#3B82F6]"
            >
              FAQ
            </button>
            <button
              onClick={() => { trackClick("nav_early_access", "navigation"); window.__lenis?.scrollTo("#intresseanmälan", { duration: 1.6 }); }}
              className="px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:-translate-y-px cursor-pointer"
              style={{ background: "#2D3A5C", color: "#f0f4f8" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#3B82F6")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#2D3A5C")}
            >
              Anmäl intresse
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <motion.div
        style={{ opacity: prefersReducedMotion ? 1 : heroOpacity, willChange: "opacity" }}
        className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-[8vw] pb-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Text content */}
          <div className="max-w-2xl mb-12">
            <h1
              className="text-5xl sm:text-6xl lg:text-5xl font-bold leading-[1.08] mb-6"
              style={{ fontFamily: "var(--font-jakarta)", color: "#2D3748" }}
            >
              Smartare verktyg för{" "}
              <br />
              <em
                className="italic"
                style={{ fontFamily: "var(--font-playfair)", color: "#3B82F6" }}
              >
                installatörer
              </em>
              {" "}och{" "}
              <em
                className="italic"
                style={{ fontFamily: "var(--font-playfair)", color: "#3B82F6" }}
              >
                konsulter
              </em>
            </h1>

            <p className="text-lg sm:text-xl leading-relaxed max-w-xl mb-10 text-slate-600">
              Modular är den kompletta lösningen för elektriker och installatörer.
              Från anbudsprocess till färdig entreprenad - dokumentmallar, kabeldimensioneringar,
              effektberäkningar, gruppförteckningar och mycket mer i en applikation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => { trackClick("hero_early_access_cta", "cta"); window.__lenis?.scrollTo("#intresseanmälan", { duration: 1.6 }); }}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:-translate-y-px hover:shadow-xl cursor-pointer"
                style={{ background: "#2D3A5C", color: "#f0f4f8" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#3B82F6")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#2D3A5C")}
              >
                Registrera intresseanmälan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => { trackClick("hero_features_cta", "cta"); window.__lenis?.scrollTo("#features", { duration: 1.6 }); }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 hover:-translate-y-px cursor-pointer text-[#2D3A5C] border-[#2D3A5C]/20 hover:border-[#3B82F6] hover:text-[#3B82F6]"
              >
                Se funktioner
              </button>
            </div>
          </div>

          {/* Screenshot — full width below text */}
          <div className="max-w-4xl">
            <div className="aspect-video rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden relative">
              <Image
                src="/screenshots/hem-oversikt.png"
                alt="Modular app översikt"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: prefersReducedMotion ? 1 : scrollHintOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span
          className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-slate-400"
        >
          Scrolla
        </span>
        <div
          className="w-px h-8 animate-[scrollPulse_2s_ease-in-out_infinite]"
          style={{ background: "linear-gradient(to bottom, #3B82F6, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
