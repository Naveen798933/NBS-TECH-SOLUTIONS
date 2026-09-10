// src/components/FloatingDock.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Phone, MessageSquare } from "lucide-react";
import { useToast } from "@/components/Toast";

export default function FloatingDock() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 320);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalScroll) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG Circular progress constants
  const size = 38;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-6 right-9 sm:right-12 z-40 flex items-center gap-2 p-1.5 rounded-full bg-[#0B0F1A]/90 backdrop-blur-xl border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(46,107,255,0.25)]"
        >
          {/* Quick Call Button */}
          <a
            href="tel:+917989335763"
            onClick={() => showToast("Opening phone dial pad...", "info")}
            className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] hover:bg-emerald-500/20 text-[#8B93A7] hover:text-emerald-400 border border-white/[0.06] hover:border-emerald-500/30 transition-all"
            aria-label="Direct Phone Call"
            title="Direct Phone Call (+91 79893 35763)"
          >
            <Phone className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 live-dot-pulse" />
          </a>

          {/* Quick Inquire Button */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] text-white text-xs font-semibold shadow-[0_0_15px_rgba(46,107,255,0.35)] transition-all hover:scale-105"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inquire</span>
          </a>

          {/* Scroll to Top with Circular Progress Indicator */}
          <button
            onClick={scrollToTop}
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-[#8B93A7] hover:text-white transition-all focus:outline-none"
            aria-label="Scroll to top of page"
            title="Back to Top"
          >
            <svg
              width={size}
              height={size}
              className="absolute inset-0 -rotate-90 pointer-events-none"
            >
              <circle
                stroke="rgba(255, 255, 255, 0.08)"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
              />
              <circle
                stroke="#00D2FF"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                className="transition-[stroke-dashoffset] duration-150 ease-out"
              />
            </svg>
            <ArrowUp className="w-4 h-4 relative z-10" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
