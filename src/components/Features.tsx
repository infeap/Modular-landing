"use client";

import { motion } from "framer-motion";
import { FileText, Cable, Zap, Calculator, ListChecks, Shield, Puzzle, Layers, Lock } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: FileText,
    title: "Dokumentmallar",
    description: "Professionella mallar för anbudshandlingar, uppdragsbekräftelser, arbetsordrar och mycket mer. Anpassade för installationsbranschen.",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    available: true,
    screenshot: "/screenshots/dokumentmallar.png"
  },
  {
    icon: Layers,
    title: "Mappstruktur",
    description: "Organisera dina projekt med standardiserade mappstrukturer. Bygg och dela mallar för olika typer av entreprenader.",
    color: "from-stone-500 to-slate-500",
    bgColor: "bg-stone-50",
    available: true,
    screenshot: "/screenshots/mappstruktur.png"
  },
  {
    icon: Zap,
    title: "Pomodoro Timer",
    description: "Öka din fokus med inbyggd pomodoro-timer. Håll koll på din produktivitet med statistik och notifikationer.",
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50",
    available: true,
    screenshot: "/screenshots/pomodoro.png"
  },
  {
    icon: Cable,
    title: "Kabeldimensionering",
    description: "Beräkna kabeldimensioner snabbt och enkelt enligt SS 436 40 00. Med hänsyn till belastning, längd, installationsmetod och miljöfaktorer.",
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-50",
    available: false,
    comingSoon: true
  },
  {
    icon: Calculator,
    title: "Effektberäkningar",
    description: "Gör korrekta effektberäkningar för anläggningar. Beräkna anslutningsvärde, dimensionerande ström och säkringsstorlekar.",
    color: "from-orange-600 to-red-500",
    bgColor: "bg-orange-50",
    available: false,
    comingSoon: true
  },
  {
    icon: ListChecks,
    title: "Gruppförteckningar",
    description: "Skapa professionella gruppförteckningar för elcentraler. Automatisk generering och exportera till PDF eller Excel.",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50",
    available: false,
    comingSoon: true
  },
];

const additionalFeatures = [
  {
    icon: Zap,
    title: "Blixtsnabbt",
    description: "Desktop-app för maximal prestanda och offline-arbete",
  },
  {
    icon: Shield,
    title: "Säkert & Privat",
    description: "All projektdata lagras lokalt på din dator",
  },
  {
    icon: Puzzle,
    title: "Modulärt system",
    description: "Köp och aktivera endast de moduler du behöver",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Moduler för elektriker
            </span>
            <br />
            <span className="text-stone-900">
              och installatörer
            </span>
          </h2>
          <p className="text-lg text-stone-600">
            Från anbudsprocess till färdig entreprenad - allt du behöver i en applikation.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-2xl bg-white border border-stone-200 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Coming Soon Badge */}
                {feature.comingSoon && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Kommer snart
                  </div>
                )}

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 ${!feature.available ? 'opacity-60' : ''}`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-stone-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {feature.title}
                </h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Screenshot */}
                <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 relative">
                  {feature.available && feature.screenshot ? (
                    <>
                      <Image
                        src={feature.screenshot}
                        alt={`${feature.title} skärmdump`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          // Fallback om bilden inte hittas
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center relative">
                      {/* Blurred placeholder för kommande moduler */}
                      <div className={`${feature.bgColor} p-4 rounded-lg blur-sm`}>
                        <feature.icon className="w-12 h-12 text-stone-400" />
                      </div>
                      {feature.comingSoon && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                          <div className="text-center">
                            <Lock className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                            <p className="text-sm font-semibold text-stone-600">Under utveckling</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-start gap-4 p-6 rounded-xl bg-stone-50 border border-stone-200"
            >
              <div className="flex-shrink-0">
                <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 mb-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-stone-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


