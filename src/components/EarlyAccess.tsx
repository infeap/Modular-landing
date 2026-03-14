"use client";

import { motion } from "framer-motion";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { validateEmail } from "@/lib/utils";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ScrollReveal } from "./ui/ScrollReveal";
import { LottieIcon } from "./ui/LottieIcon";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const { trackFormSubmit } = useAnalytics();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Vänligen ange en giltig e-postadress");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/intresseanmälan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Tack för ditt intresse! Vi kontaktar dig snart.");
        setEmail("");
        trackFormSubmit("early_access_form", true);
      } else {
        setStatus("error");
        setMessage(data.error || "Något gick fel. Försök igen senare.");
        trackFormSubmit("early_access_form", false);
      }
    } catch (error) {
      setStatus("error");
      setMessage("Något gick fel. Kontrollera din internetanslutning.");
      trackFormSubmit("early_access_form", false);
    }
  };

  return (
    <section
      id="intresseanmälan"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #2D3A5C, #1D2A4C)" }}
    >
      {/* Subtle radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.12)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 mb-8"
          >
            <LottieIcon src="/icons/sign-in.json" className="w-20 h-20" trigger="inView" speed={0.5} />
          </motion.div>

          {/* Heading */}
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Registrera{" "}
            <em style={{ fontFamily: "var(--font-playfair)", color: "#60A5FA" }}>
              intresseanmälan!
            </em>
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Modular är ett koncept under tidig utveckling. 
          <br />
          Anmäl ditt intresse redan nu så kontaktar vi dig när projektet tar nästa steg – med information om vad som byggs, när det lanserar och hur du kan vara med och påverka.
          <br />
          Vi värnar om din tid. Du kommer aldrig att få onödiga utskick – endast relevanta uppdateringar när något faktiskt händer.
          <br />
          <br />
          Ange din e-postadress så hör vi av oss när projektet tar nästa steg.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din@email.se"
                  disabled={status === "loading" || status === "success"}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 border-0 focus:ring-4 focus:ring-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl whitespace-nowrap text-lg"
                style={{ background: "#3B82F6", color: "#ffffff" }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Skickar...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Registrerad!
                  </>
                ) : (
                  "Registrera"
                )}
              </button>
            </div>

            {/* Status Messages */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                  status === "success"
                    ? "bg-green-500/20 text-white border border-green-300/30"
                    : "bg-red-500/20 text-white border border-red-300/30"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{message}</p>
              </motion.div>
            )}
          </form>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Ingen spam</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Avregistrera när som helst</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
