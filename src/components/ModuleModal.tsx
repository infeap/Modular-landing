"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ExternalLink, Check, Clock } from "lucide-react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

export interface ModuleData {
  icon: LucideIcon;
  title: string;
  description: string;
  longDescription?: string;
  color: string;
  bgColor: string;
  available: boolean;
  comingSoon?: boolean;
  screenshot?: string;
  price?: string;
  features?: string[];
}

interface ModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: ModuleData | null;
  onAskQuestion: (moduleName: string) => void;
}

export default function ModuleModal({ isOpen, onClose, module, onAskQuestion }: ModuleModalProps) {
  if (!module) return null;

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl pointer-events-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all"
                aria-label="Stäng"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>

              {/* Header with gradient */}
              <div className={`relative bg-gradient-to-br ${module.color} p-8 pb-16`}>
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <module.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 
                        className="text-3xl font-bold text-white"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {module.title}
                      </h2>
                      {module.comingSoon && (
                        <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Kommer snart
                        </span>
                      )}
                      {module.available && (
                        <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          Tillgänglig
                        </span>
                      )}
                    </div>
                    <p className="text-white/90 text-lg max-w-xl">
                      {module.description}
                    </p>
                  </div>
                </div>

                {/* Price tag */}
                {module.price && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-8 right-16"
                  >
                    <div className="bg-white rounded-2xl px-6 py-3 shadow-xl">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Pris</p>
                      <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {module.price}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Screenshot - overlapping the header */}
              <div className="relative -mt-8 mx-8 mb-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-slate-100 to-slate-200"
                >
                  {module.screenshot ? (
                    <Image
                      src={module.screenshot}
                      alt={`${module.title} skärmdump`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 800px"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className={`${module.bgColor} p-8 rounded-2xl`}>
                        <module.icon className="w-16 h-16 text-slate-400" />
                      </div>
                      {module.comingSoon && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                          <div className="text-center">
                            <Clock className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                            <p className="text-lg font-semibold text-slate-600">Under utveckling</p>
                            <p className="text-sm text-slate-500 mt-1">Kommer snart!</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className="px-8 pb-8">
                {/* Long description */}
                {module.longDescription && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      Om modulen
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {module.longDescription}
                    </p>
                  </motion.div>
                )}

                {/* Features list */}
                {module.features && module.features.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      Funktioner
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {module.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-slate-50"
                        >
                          <div className={`p-1 rounded-full bg-gradient-to-br ${module.color}`}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-slate-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <button
                    onClick={() => onAskQuestion(module.title)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Ställ en fråga om {module.title}
                  </button>
                  
                  {module.available && (
                    <a
                      href="#early-access"
                      onClick={onClose}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-blue-300 hover:bg-blue-50 transition-all"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Få tidig åtkomst
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
