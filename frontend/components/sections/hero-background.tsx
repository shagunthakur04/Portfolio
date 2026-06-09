"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,182,193,0.42),transparent_52%),radial-gradient(ellipse_at_75%_65%,rgba(244,114,182,0.22),transparent_58%),radial-gradient(ellipse_at_50%_100%,rgba(251,207,232,0.35),transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.28] [background-image:radial-gradient(rgba(226,85,122,0.16)_1px,transparent_1px)] [background-size:22px_22px]" />

      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-16 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 25, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-16 top-1/4 h-96 w-96 rounded-full bg-rose-300/30 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute right-[8%] top-[18%] h-[28rem] w-[28rem] rounded-full border border-primary/10 opacity-60"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute right-[12%] top-[22%] h-[22rem] w-[22rem] rounded-full border border-dashed border-primary/15 opacity-40"
      />
    </div>
  );
}
