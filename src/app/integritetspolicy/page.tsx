"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Cookie, Database, Lock, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Integritetspolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/assets/Modular_logo_icon.png"
                alt="Modular"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span
                className="text-2xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Modular
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Tillbaka
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Integritetspolicy
            </h1>
            <p className="text-slate-600">
              Senast uppdaterad: {new Date().toLocaleDateString("sv-SE")}
            </p>
          </div>

          {/* Introduction */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
            <p className="text-slate-600 leading-relaxed">
              På Modular värnar vi om din integritet. Denna policy beskriver hur vi samlar in, 
              använder och skyddar dina uppgifter när du besöker vår webbplats. Genom att använda 
              vår webbplats godkänner du de villkor som beskrivs nedan.
            </p>
          </section>

          {/* Google Analytics Section */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-100">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <h2
                className="text-2xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Användning av Google Analytics
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Vi använder <strong>Google Analytics</strong>, en webbanalystjänst som tillhandahålls 
                av Google LLC, för att förstå hur besökare interagerar med vår webbplats. Detta hjälper 
                oss att förbättra användarupplevelsen och vårt innehåll.
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mt-6">Data som samlas in</h3>
              <p>Google Analytics samlar in följande typer av anonymiserad information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Sidvisningar och besökstid</li>
                <li>Geografisk plats (land/region, ej exakt position)</li>
                <li>Enhetstyp och webbläsarinformation</li>
                <li>Trafikkälla (hur du hittade till webbplatsen)</li>
                <li>Interaktioner med webbplatsen (klick, scrollning)</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mt-6">Syfte med datainsamling</h3>
              <p>Vi använder denna data för att:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Förstå hur besökare använder vår webbplats</li>
                <li>Identifiera och åtgärda tekniska problem</li>
                <li>Förbättra webbplatsens innehåll och struktur</li>
                <li>Mäta effektiviteten av marknadsföringsinsatser</li>
              </ul>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm">
                  <strong>Viktigt:</strong> Vi skickar aldrig personuppgifter som e-postadresser, 
                  personnummer eller andra identifierande uppgifter till Google Analytics. All data 
                  som samlas in är anonymiserad.
                </p>
              </div>

              <div className="mt-6">
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Läs mer om hur Google använder data
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* Cookies Section */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-amber-100">
                <Cookie className="w-6 h-6 text-amber-600" />
              </div>
              <h2
                className="text-2xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Cookies och samtycke
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Vår webbplats använder cookies för att möjliggöra Google Analytics och förbättra 
                din upplevelse. I enlighet med GDPR och tillämplig e-privacy-lagstiftning inhämtar 
                vi ditt samtycke innan vi aktiverar cookies som inte är strikt nödvändiga.
              </p>

              <h3 className="text-lg font-semibold text-slate-900 mt-6">Typer av cookies</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Nödvändiga cookies:</strong> Krävs för webbplatsens grundläggande funktionalitet</li>
                <li><strong>Analyscookies:</strong> Används av Google Analytics för att samla in anonymiserad besöksstatistik</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mt-6">Hantera ditt samtycke</h3>
              <p>
                Du kan när som helst ändra eller dra tillbaka ditt samtycke till cookies genom att 
                klicka på cookie-inställningar i sidfoten eller rensa cookies i din webbläsare.
              </p>
            </div>
          </section>

          {/* Data Security Section */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-100">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <h2
                className="text-2xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Datasäkerhet
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Vi tar datasäkerhet på allvar och vidtar lämpliga tekniska och organisatoriska 
                åtgärder för att skydda din information. Detta inkluderar:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Krypterad dataöverföring (HTTPS)</li>
                <li>Begränsad åtkomst till analysdata</li>
                <li>Regelbunden granskning av säkerhetsrutiner</li>
                <li>Anonymisering av IP-adresser i Google Analytics</li>
              </ul>
            </div>
          </section>

          {/* Your Rights Section */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
            <h2
              className="text-2xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Dina rättigheter
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Enligt GDPR har du följande rättigheter gällande dina personuppgifter:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Rätt till information:</strong> Du har rätt att veta hur vi behandlar dina uppgifter</li>
                <li><strong>Rätt till tillgång:</strong> Du kan begära ut information om vilka uppgifter vi har</li>
                <li><strong>Rätt till radering:</strong> Du kan begära att vi raderar dina uppgifter</li>
                <li><strong>Rätt att invända:</strong> Du kan invända mot viss behandling av dina uppgifter</li>
                <li><strong>Rätt till dataportabilitet:</strong> Du kan begära att få dina uppgifter i ett maskinläsbart format</li>
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2
              className="text-2xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Kontakta oss
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Om du har frågor om denna integritetspolicy eller vill utöva dina rättigheter, 
                kontakta oss via:
              </p>
              <p className="font-medium">
                E-post: <a href="mailto:kontakt@modular.se" className="text-blue-600 hover:text-blue-700">kontakt@modular.se</a>
              </p>
            </div>
          </section>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Tillbaka till startsidan
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

