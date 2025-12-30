"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Vad är Modular?",
    answer: "Modular är ett koncept vi undersöker intresset för. Tanken är att det i framtiden skulle kunna bli en modulär applikation riktad mot installationsbranschen, exempelvis entreprenörer och mindre konsultverksamheter.",
  },
  {
    question: "Hur fungerar det modulära systemet?",
    answer: "En möjlig inriktning är ett modulbaserat upplägg, där användaren själv väljer vilka funktioner som är relevanta. Detta är dock något vi vill utvärdera tillsammans med branschen innan eventuell utveckling påbörjas.",
  },
  {
    question: "Vilka moduler kommer att finnas tillgängliga från start?",
    answer: "Finns det intresse startar vi utvecklingen med de mest efterfrågade modulerna – baserat på feedback från elektriker, installatörer och konsulter. Har ni önskemål? Kontakta oss så utvärderar vi möjligheterna att implementera dem.",
  },
  {
    question: "Vad kommer Modular att kosta?",
    answer: "I detta tidiga skede när vi endast utför intresseundersökningar så har vi ingen aktuell prissättning. Registrera dig för att hålla dig uppdaterad om utvecklingen!",
  },
  {
    question: "Vilka plattformar stöds?",
    answer: "Om projektet realiseras är utgångspunkten att i första hand rikta sig mot Windows, som idag är branschstandard.",
  },
  {
    question: "Hur hanteras min projektdata - lokalt eller i molnet?",
    answer: "En möjlig inriktning är att prioritera lokal lagring av projektdata för att värna om integritet och kontroll. Exakt teknisk lösning är ännu inte fastställd och kommer att avgöras i ett senare skede.",
  },
  {
    question: "Kan jag föreslå nya moduler eller funktioner?",
    answer: "Absolut! Klicka på feedback-knappen i nedre högra hörnet för att dela dina idéer. Vi älskar att höra från er! Era förslag hjälper oss att forma produkten.",
  },
  {
    question: "När lanseras Modular?",
    answer: "Det finns för närvarande inget lanseringsdatum. Detta är en intresseundersökning där eventuell vidare utveckling sker baserat på intresseanmälningar och feedback.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-slate-900">Vanliga frågor</span>
          </h2>
          <p className="text-lg text-slate-600">
            Hittar du inte svaret? Kontakta oss via feedback-knappen!
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
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
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 mb-4">
            Har du fler frågor?
          </p>
          <a
            href="#intresseanmälan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Registrera dig för early access
          </a>
        </motion.div>
      </div>
    </section>
  );
}
