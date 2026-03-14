"use client";

import { motion } from "framer-motion";

interface SvgWaveTransitionProps {
  fill?: string;
  className?: string;
}

export function SvgWaveTransition({ fill = "#ffffff", className }: SvgWaveTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.2, delay: 3.5, ease: [0.4, 0, 0.2, 1] }}
      className={`absolute bottom-0 left-0 right-0 z-10 pointer-events-none ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[80px] md:h-[120px] block"
        fill="none"
      >
        <path
          d="M0 0C0 0 240 120 720 120C1200 120 1440 0 1440 0V120H0V0Z"
          fill={fill}
        />
      </svg>
    </motion.div>
  );
}
