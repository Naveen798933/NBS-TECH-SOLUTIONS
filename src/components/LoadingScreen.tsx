// src/components/LoadingScreen.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Only show once per browser session
    const seen = sessionStorage.getItem("nbs_loading_seen");
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem("nbs_loading_seen", "1");
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(() => setVisible(false), 700);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#05070D] overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2E6BFF]/15 blur-[160px] pointer-events-none" />

          {/* Particle dots */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#2E6BFF]/50 float-orb"
              style={{
                top: `${15 + Math.random() * 70}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="h-14 px-5 py-2 rounded-2xl bg-white flex items-center shadow-[0_0_50px_rgba(46,107,255,0.5)] load-logo-pulse">
              <Image
                src="/images/logo.png"
                alt="NBS Tech Solutions"
                width={180}
                height={48}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs font-mono uppercase tracking-widest text-[#2E6BFF]">
                NBS Tech Solutions
              </p>
              <p className="text-[11px] text-[#8B93A7] font-medium">
                Innovate • Develop • Grow
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-56 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#2E6BFF] via-[#5B8CFF] to-[#00D2FF] rounded-full load-bar-fill shadow-[0_0_8px_#00D2FF]" />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
