"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState, FormEvent } from "react";

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Funktionsförfrågan" },
  { value: "improvement", label: "Förbättring" },
  { value: "other", label: "Övrigt" },
];

export default function FeedbackDialog({ isOpen, onClose }: FeedbackDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "feature",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Meddelandet måste vara minst 10 tecken långt");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setFormData({ name: "", email: "", category: "feature", message: "" });
          setStatus("idle");
        }, 2000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Något gick fel. Försök igen senare.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Något gick fel. Kontrollera din internetanslutning.");
    }
  };

  const charCount = formData.message.length;
  const maxChars = 500;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-orange-600 to-amber-600 px-5 py-4 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/20 transition-colors"
                  aria-label="Stäng"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Dela din feedback
                </h2>
                <p className="text-white/90 mt-1">
                  Dina idéer hjälper oss att göra Modular bättre
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Name (optional) */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                    Namn (valfritt)
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ditt namn"
                    disabled={status === "loading" || status === "success"}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>

                {/* Email (optional) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                    E-post (valfritt)
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="din@email.se"
                    disabled={status === "loading" || status === "success"}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-stone-700 mb-2">
                    Kategori
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    disabled={status === "loading" || status === "success"}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                    Meddelande *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Berätta om din idé eller feedback..."
                    rows={4}
                    maxLength={maxChars}
                    disabled={status === "loading" || status === "success"}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50 resize-none"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-stone-500">* Obligatoriskt</span>
                    <span className={`text-xs ${charCount > maxChars * 0.9 ? "text-orange-500" : "text-stone-500"}`}>
                      {charCount}/{maxChars}
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                {status === "error" && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{errorMessage}</p>
                  </motion.div>
                )}

                {/* Success Message */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 rounded-lg bg-green-50 border border-green-200 text-green-600"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">Tack för din feedback!</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={status === "loading"}
                    className="flex-1 px-6 py-3 rounded-lg border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Avbryt
                  </button>
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Skickar...
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Skickat!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Skicka
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


