"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "modular_cookie_consent";

export type ConsentStatus = "pending" | "accepted" | "rejected";

interface CookieConsentProps {
  onConsentChange?: (status: ConsentStatus) => void;
}

export default function CookieConsent({ onConsentChange }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Notify parent of existing consent status
      const status = consent as ConsentStatus;
      onConsentChange?.(status);
    }
  }, [onConsentChange]);

  const handleAcceptAll = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShowBanner(false);
    onConsentChange?.("accepted");
  };

  const handleRejectAll = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setShowBanner(false);
    onConsentChange?.("rejected");
  };

  const handleSaveSettings = () => {
    const status: ConsentStatus = analyticsEnabled ? "accepted" : "rejected";
    localStorage.setItem(CONSENT_KEY, status);
    setShowBanner(false);
    setShowSettings(false);
    onConsentChange?.(status);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {!showSettings ? (
                /* Main Banner */
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-blue-100">
                      <Cookie className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-lg font-bold text-slate-900 mb-2"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        Vi värnar om din integritet
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Vi använder cookies för att förbättra din upplevelse och analysera webbplatstrafik med Google Analytics. 
                        Ingen personligt identifierbar information samlas in. Du kan läsa mer i vår{" "}
                        <Link href="/integritetspolicy" className="text-blue-600 hover:underline font-medium">
                          integritetspolicy
                        </Link>.
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={handleAcceptAll}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all text-sm"
                        >
                          <Check className="w-4 h-4" />
                          Acceptera alla
                        </button>
                        <button
                          onClick={handleRejectAll}
                          className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all text-sm"
                        >
                          Endast nödvändiga
                        </button>
                        <button
                          onClick={() => setShowSettings(true)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all text-sm"
                        >
                          <Settings className="w-4 h-4" />
                          Inställningar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Settings Panel */
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 
                      className="text-lg font-bold text-slate-900"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      Cookie-inställningar
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-5 h-5 text-slate-500" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Necessary Cookies */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <h4 className="font-semibold text-slate-900">Nödvändiga cookies</h4>
                        <p className="text-sm text-slate-600">Krävs för grundläggande webbplatsfunktionalitet</p>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-sm font-medium">
                        Alltid aktiv
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <h4 className="font-semibold text-slate-900">Analyscookies</h4>
                        <p className="text-sm text-slate-600">Google Analytics för anonymiserad besöksstatistik</p>
                      </div>
                      <button
                        onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                        className={`relative w-12 h-7 rounded-full transition-colors ${
                          analyticsEnabled ? "bg-blue-600" : "bg-slate-300"
                        }`}
                      >
                        <motion.div
                          animate={{ x: analyticsEnabled ? 20 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveSettings}
                      className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all text-sm"
                    >
                      Spara inställningar
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all text-sm"
                    >
                      Acceptera alla
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export a hook to check consent status
export function useConsentStatus(): ConsentStatus {
  const [status, setStatus] = useState<ConsentStatus>("pending");

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "accepted" || consent === "rejected") {
      setStatus(consent as ConsentStatus);
    }
  }, []);

  return status;
}

// Export function to reset consent (useful for footer link)
export function resetCookieConsent() {
  localStorage.removeItem(CONSENT_KEY);
  window.location.reload();
}

