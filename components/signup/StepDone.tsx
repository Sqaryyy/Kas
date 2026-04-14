"use client";

import { motion } from "framer-motion";

export default function StepDone() {
  return (
    <motion.div
      className="done-screen"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="done-emoji"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
      >
        🎉
      </motion.div>
      <h2 className="done-title">Prijava primljena!</h2>
      <p className="done-lead">
        Hvala što si se prijavio/la. Poslaćemo ti potvrdu na email sa svim
        detaljima pre događaja. Vidimo se!
      </p>
    </motion.div>
  );
}
