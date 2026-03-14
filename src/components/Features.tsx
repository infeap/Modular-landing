"use client";

import { FileText, Cable, Zap, Calculator, ListChecks, Lock, CheckSquare, Layers, FileSignature } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ModuleModal, { ModuleData } from "./ModuleModal";
import FeedbackDialog from "./FeedbackDialog";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ScrollReveal } from "./ui/ScrollReveal";

const features: ModuleData[] = [
  {
    icon: FileText,
    title: "Dokumentmallar",
    description: "Professionella mallar för anbudshandlingar, uppdragsbekräftelser, arbetsordrar och mycket mer.",
    longDescription: "Spara tid med färdiga dokumentmallar som är skräddarsydda för installationsbranschen. Alla mallar är professionellt utformade och enkla att anpassa efter dina behov. Perfekt för elektriker, VVS-installatörer och byggföretag som vill ha enhetliga och snygga dokument.",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    available: true,
    screenshot: "/screenshots/dokumentmallar.png",

    features: [
      "Anbudsmallar",
      "Uppdragsbekräftelser",
      "Arbetsordrar",
      "Faktureringsunderlag",
      "Protokollmallar",
      "Exportera till PDF"
    ]
  },
  {
    icon: Layers,
    title: "Mappstruktur",
    description: "Organisera dina projekt med standardiserade mappstrukturer för olika typer av entreprenader.",
    longDescription: "Håll ordning på alla dina projekt med intelligenta mappstrukturer. Skapa egna mallar eller använd våra fördefinierade strukturer för olika projekttyper. Perfekt för att säkerställa att alla dokument hamnar på rätt plats och att hela teamet arbetar på samma sätt.",
    color: "from-slate-500 to-slate-600",
    bgColor: "bg-slate-50",
    available: true,
    screenshot: "/screenshots/mappstruktur.png",

    features: [
      "Fördefinierade projektmallar",
      "Skapa egna mappstrukturer",
      "Dela mallar med teamet",
      "Automatisk mappgenerering",
      "Stöd för olika projekttyper",
      "Synkronisering med molntjänster"
    ]
  },
  {
    icon: Zap,
    title: "Pomodoro Timer",
    description: "Öka din fokus med inbyggd pomodoro-timer. Håll koll på din produktivitet.",
    longDescription: "Använd den beprövade pomodoro-tekniken för att maximera din produktivitet. Arbeta i fokuserade intervaller med korta pauser emellan. Få statistik över din arbetstid och se hur mycket du faktiskt producerar varje dag.",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50",
    available: true,
    screenshot: "/screenshots/pomodoro.png",

    features: [
      "Anpassningsbara intervaller",
      "Notifikationer",
      "Statistik & rapporter",
      "Pausschema",
      "Fokusläge",
      "Historik"
    ]
  },
  {
    icon: CheckSquare,
    title: "Tasks",
    description: "Hantera uppgifter och att-göra-listor för dina projekt med enkel prioritering.",
    longDescription: "En kraftfull men enkel uppgiftshanterare byggd för installatörer. Skapa uppgifter, sätt deadlines och prioritera ditt arbete. Perfekt för att hålla koll på allt som behöver göras i varje projekt, från materialbeställningar till slutbesiktning.",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    available: true,
    screenshot: "/screenshots/tasks.png",

    features: [
      "Skapa & organisera uppgifter",
      "Sätt deadlines",
      "Prioriteringsnivåer",
      "Projektspecifika listor",
      "Checklistor",
      "Snabbanteckningar"
    ]
  },
  {
    icon: Cable,
    title: "Kabeldimensionering",
    description: "Beräkna kabeldimensioner snabbt och enkelt enligt SS 436 40 00.",
    longDescription: "Slipp manuella beräkningar och tabeller. Vår kabeldimensioneringsmodul beräknar automatiskt rätt kabelarea baserat på belastning, längd, installationsmetod och miljöfaktorer. Följer svensk standard SS 436 40 00 och ger dig säkra, korrekta resultat varje gång.",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    available: true,
    screenshot: "/screenshots/kabeldimensionering.png",

    features: [
      "Beräkning enligt SS 436 40 00",
      "Automatisk korrektionsfaktor",
      "Flera installationsmetoder",
      "Spänningsfall-beräkning",
      "Kortslutningsberäkning",
      "Exportera till rapport"
    ]
  },
  {
    icon: Calculator,
    title: "Effektberäkningar",
    description: "Gör korrekta effektberäkningar för anläggningar med automatiska uträkningar.",
    longDescription: "Beräkna anslutningsvärde, dimensionerande ström och säkringsstorlekar för hela anläggningar. Perfekt för projektörer och installatörer som behöver snabba och korrekta effektberäkningar.",
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50",
    available: false,
    comingSoon: true,

    features: [
      "Anslutningsvärde-beräkning",
      "Dimensionerande ström",
      "Säkringsdimensionering",
      "Lastbalansering",
      "Rapport-generering",
      "Standard-kompatibel"
    ]
  },
  {
    icon: ListChecks,
    title: "Gruppförteckningar",
    description: "Skapa professionella gruppförteckningar för elcentraler med automatisk generering.",
    longDescription: "Generera snygga och professionella gruppförteckningar för alla typer av elcentraler. Automatisk numrering, standardiserade beteckningar och enkel export till PDF eller Excel.",
    color: "from-sky-500 to-blue-500",
    bgColor: "bg-sky-50",
    available: false,
    comingSoon: true,

    features: [
      "Automatisk generering",
      "Standardiserade beteckningar",
      "Export till PDF",
      "Export till Excel",
      "Mallar för olika centraler",
      "Kundanpassning"
    ]
  },
  {
    icon: FileSignature,
    title: "Anbudsgenerator",
    description: "Skapa professionella anbud snabbt med automatisk prissättning och anpassningsbara mallar.",
    longDescription: "Effektivisera din anbudsprocess från start till mål. Anbudsgeneratorn hjälper dig att snabbt ta fram korrekta och professionella anbud baserat på projektets omfattning. Med automatisk prissättning, materialdatabas och anpassningsbara mallar sparar du tid och ökar dina chanser att vinna uppdraget.",
    color: "from-[#2D3A5C] to-[#3B82F6]",
    bgColor: "bg-slate-50",
    available: false,
    comingSoon: true,

    features: [
      "Anpassningsbara anbudsmallar",
      "Automatisk prissättning",
      "Materialdatabas",
      "Kundregister",
      "Export till PDF",
      "Uppföljning & statistik"
    ]
  },
];

export default function Features() {
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackModule, setFeedbackModule] = useState("");
  const { trackEvent } = useAnalytics();

  const handleModuleClick = (feature: ModuleData) => {
    setSelectedModule(feature);
    setIsModalOpen(true);
    trackEvent("module_click", {
      event_category: "engagement",
      event_label: feature.title,
      module_available: feature.available,
    });
  };

  const handleAskQuestion = (moduleName: string) => {
    setFeedbackModule(moduleName);
    setIsModalOpen(false);
    setTimeout(() => {
      setIsFeedbackOpen(true);
    }, 300);
  };

  return (
    <>
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span
                className="bg-gradient-to-r from-[#2D3A5C] to-[#3B82F6] bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Moduler för{" "}
              </span>
              <em style={{ fontFamily: "var(--font-playfair)", color: "#2D3A5C" }}>
                elektriker
              </em>
              <br />
              <span className="text-slate-900" style={{ fontFamily: "var(--font-jakarta)" }}>
                och installatörer
              </span>
            </h2>
            <p className="text-lg text-slate-600">
              Från anbudsprocess till färdig entreprenad - allt du behöver i en applikation.
              <span className="block mt-2 font-medium" style={{ color: "#3B82F6" }}>Klicka på en modul för mer information</span>
            </p>
          </ScrollReveal>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div
                  className="group relative cursor-pointer h-full"
                  onClick={() => handleModuleClick(feature)}
                >
                  <div className="relative h-full p-8 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                    {/* Top border hover animation */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2e5c9a] to-[#6a9fe0] origin-left scale-x-[0.3] group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                    {/* Coming Soon Badge */}
                    {feature.comingSoon && (
                      <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-slate-500 text-white text-xs font-semibold flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Kommer snart
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 ${!feature.available ? 'opacity-60' : ''}`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-3 text-slate-900" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Screenshot */}
                    <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {feature.available && feature.screenshot ? (
                        <>
                          <Image
                            src={feature.screenshot}
                            alt={`${feature.title} skärmdump`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                            <span className="text-white font-medium text-sm">Klicka för mer info</span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center relative">
                          <div className={`${feature.bgColor} p-4 rounded-lg blur-sm`}>
                            <feature.icon className="w-12 h-12 text-slate-400" />
                          </div>
                          {feature.comingSoon && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                              <div className="text-center">
                                <Lock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <p className="text-sm font-semibold text-slate-600">Under utveckling</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Module Modal */}
      <ModuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        module={selectedModule}
        onAskQuestion={handleAskQuestion}
      />

      {/* Feedback Dialog */}
      <FeedbackDialog
        isOpen={isFeedbackOpen}
        onClose={() => {
          setIsFeedbackOpen(false);
          setFeedbackModule("");
        }}
        defaultMessage={feedbackModule ? `Jag har en fråga om modulen "${feedbackModule}": ` : undefined}
      />
    </>
  );
}
