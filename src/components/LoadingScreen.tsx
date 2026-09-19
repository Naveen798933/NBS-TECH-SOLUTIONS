// src/components/LoadingScreen.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PARTICLES = [
  { top: "20%", left: "15%", delay: "0s" },
  { top: "35%", left: "80%", delay: "0.4s" },
  { top: "65%", left: "25%", delay: "0.8s" },
  { top: "75%", left: "70%", delay: "1.2s" },
  { top: "30%", left: "45%", delay: "1.6s" },
  { top: "80%", left: "35%", delay: "2.0s" },
  { top: "15%", left: "65%", delay: "2.4s" },
  { top: "50%", left: "90%", delay: "2.8s" },
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("nbs_loading_seen");
    }
    return false;
  });
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem("nbs_loading_seen", "1");
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => setVisible(false), 700);
    }, 2200);
    return () => clearTimeout(timer);
  }, [visible]);

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
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#2E6BFF]/50 float-orb"
              style={{
                top: p.top,
                left: p.left,
                animationDelay: p.delay,
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
