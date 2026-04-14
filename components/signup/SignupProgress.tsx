"use client";

import { motion } from "framer-motion";

interface Props {
  label: string;
  percent: number;
}

export default function SignupProgress({ label, percent }: Props) {
  return (
    <div className="progress-wrap">
      <div className="progress-meta">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="progress-bar-bg">
        <motion.div
          className="progress-bar-fill"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}
