"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Vad är Modular?",
    answer: "Modular är en modulär desktop-applikation utvecklad för installationsbranschen, särskilt elektriker. Vi kombinerar dokumentmallar, kabeldimensioneringar, effektberäkningar, gruppförteckningar och mycket mer i en enda plattform.",
  },
  {
    question: "Hur fungerar det modulära systemet?",
    answer: "Modular är uppbyggt med moduler som du kan köpa och aktivera efter behov. Detta ger dig flexibiliteten att endast betala för de funktioner du faktiskt använder. Börja med grundläggande dokumentmallar och lägg till specialiserade el-moduler när du behöver dem.",
  },
  {
    question: "Vilka el-moduler finns tillgängliga?",
    answer: "Vi erbjuder moduler för kabeldimensionering enligt SS 436 40 00, effektberäkningar, gruppförteckningar, samt mallar för anbudshandlingar, uppdragsbekräftelser och mycket mer. Fler moduler tillkommer löpande baserat på feedback från elektriker och installatörer.",
  },
  {
    question: "Är Modular gratis?",
    answer: "Vi arbetar för närvarande med prissättningen. Early access-användare kommer att få exklusiva förmåner och rabatter när vi lanserar. Registrera dig för att få mer information!",
  },
  {
    question: "Vilka plattformar stöds?",
    answer: "Modular fungerar på Windows, macOS och Linux. Vi siktar på att lansera för alla plattformar samtidigt.",
  },
  {
    question: "Lagras min projektdata lokalt?",
    answer: "Ja! All din projektdata och beräkningar lagras lokalt på din dator. Vi värdesätter din integritet och säkerhet, så ingen känslig data skickas till våra servrar.",
  },
  {
    question: "Kan jag föreslå nya moduler eller funktioner?",
    answer: "Absolut! Klicka på feedback-knappen i nedre högra hörnet för att dela dina idéer. Vi älskar att höra från elektriker och installatörer - era förslag hjälper oss att forma produkten.",
  },
  {
    question: "När lanseras Modular?",
    answer: "Vi är för närvarande i early access-fasen. Registrera din e-post för att få notifikationer om lansering och exklusiv tidig tillgång med förmånliga priser.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-stone-900">Vanliga frågor</span>
          </h2>
          <p className="text-lg text-stone-600">
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
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
              >
                <span className="font-semibold text-lg text-stone-900 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-stone-500" />
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
                    <div className="px-6 pb-5 text-stone-600 leading-relaxed">
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
          <p className="text-stone-600 mb-4">
            Har du fler frågor?
          </p>
          <a
            href="#early-access"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Registrera dig för early access
          </a>
        </motion.div>
      </div>
    </section>
  );
}


