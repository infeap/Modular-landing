"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "./ui/ScrollReveal";
import { LottieIcon } from "./ui/LottieIcon";

const faqs = [
  {
    question: "Vad är Modular?",
    answer: "Modular är en applikationsplattform under utveckling, riktad mot installationsbranschen. Tanken är att samla specialiserade verktyg för konsulter, installatörer och entreprenörer i en och samma plattform – där varje modul löser ett specifikt vardagsproblem, från kvalitetskontroll och dokumenthantering till effektberäkningar och offertgenerering.",
  },
  {
    question: "Hur fungerar det modulära systemet?",
    answer: "Grundtanken är att du själv väljer vilka delar av plattformen som är relevanta för din verksamhet. Istället för ett stort system med funktioner du aldrig använder plockar du ihop de moduler du faktiskt behöver och bygger på i din egen takt. Exakt hur det modulära upplägget utformas är något vi vill ta fram tillsammans med branschen. Det är en av anledningarna till att vi söker tidiga intressenter som vill vara med och påverka hur produkten utvecklas.",
  },
  {
    question: "Vilka moduler kommer att finnas tillgängliga från start?",
    answer: "Det vet vi faktiskt inte än – och det är en medveten strategi. Vi vill att marknaden ska styra vad som byggs först. Utvecklingen startar med de moduler som efterfrågas mest, baserat på feedback från elektriker, installatörer och konsulter. Har du önskemål om specifika funktioner eller arbetsmoment du vill automatisera? Hör av dig så utvärderar vi möjligheterna tillsammans.",
  },
  {
    question: "Vad kommer Modular att kosta?",
    answer: "I det här skedet fokuserar vi på att förstå marknadens behov snarare än prissättning. En prismodell kommer att tas fram längre fram i utvecklingsprocessen. Anmäl ditt intresse så är du bland de första att få information när det blir aktuellt.",
  },
  {
    question: "Vilka plattformar stöds?",
    answer: "Utgångspunkten är att i första hand rikta sig mot Windows, som idag är branschstandard inom installations- och projekteringsbranschen. Stöd för ytterligare plattformar är något vi utvärderar vidare längre fram i utvecklingen.",
  },
  {
    question: "Hur hanteras min projektdata - lokalt eller i molnet?",
    answer: "Utgångspunkten är att prioritera lokal lagring av projektdata så att du behåller full kontroll över din information. Vi ser det som en viktig princip, särskilt för verksamheter som hanterar känsliga projekthandlingar och kunddata. Den exakta tekniska lösningen är ännu inte fastställd och kommer att utformas i takt med att produkten utvecklas.",
  },
  {
    question: "Kan jag föreslå nya moduler eller funktioner?",
    answer: "Absolut. Det är precis den typen av input vi behöver i det här skedet. Använd feedback-knappen i nedre högra hörnet för att dela dina idéer och önskemål – dina förslag går direkt in i vår utvärdering och hjälper oss forma vad Modular blir.",
  },
  {
    question: "När lanseras Modular?",
    answer: "En första version planeras vara tillgänglig till sommaren. Exakt vad den initiala versionen innehåller styrs av den feedback och de intresseanmälningar vi får in under tiden fram till dess. Anmäl ditt intresse så håller vi dig uppdaterad längs vägen.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
            <LottieIcon src="/icons/FAQ.json" className="w-14 h-14" trigger="inView" />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            <span className="text-slate-900">Vanliga </span>
            <em style={{ fontFamily: "var(--font-playfair)", color: "#2D3A5C" }}>frågor</em>
          </h2>
          <p className="text-lg text-slate-600">
            Hittar du inte svaret? Kontakta oss via feedback-knappen!
          </p>
        </ScrollReveal>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
                {/* Top border hover animation */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2e5c9a] to-[#6a9fe0] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-lg text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-slate-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.4} className="mt-12 text-center">
          <button
            onClick={() => window.__lenis?.scrollTo("#intresseanmälan", { duration: 1.6 })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #2D3A5C, #3B82F6)" }}
          >
            Registrera dig för early access
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
