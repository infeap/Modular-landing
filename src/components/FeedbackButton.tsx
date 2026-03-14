"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import FeedbackDialog from "./FeedbackDialog";

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300"
        style={{ background: "linear-gradient(135deg, #2D3A5C, #3B82F6)", boxShadow: "0 10px 25px rgba(45, 58, 92, 0.3)" }}
        aria-label="Ge feedback"
      >
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <MessageSquare className="w-6 h-6" />
        </motion.div>
      </motion.button>

      {/* Feedback Dialog */}
      <FeedbackDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
