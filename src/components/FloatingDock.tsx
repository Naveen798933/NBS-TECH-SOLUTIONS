// src/components/FloatingDock.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Phone,
  MessageSquare,
  GripVertical,
  X,
  MessageCircle,
  Mail,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/components/Toast";

export default function FloatingDock() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [constraints, setConstraints] = useState({ left: -300, right: 20, top: -600, bottom: 20 });
  const dockRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 280);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalScroll) * 100)));
      }
    };

    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        setConstraints({
          left: -window.innerWidth + 220,
          right: 20,
          top: -window.innerHeight + 140,
          bottom: 20,
        });
      }
    };

    updateConstraints();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateConstraints);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);

  const scrollToTop = () => {
    if (isDragging) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Close speed dial when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setIsSpeedDialOpen(false);
      }
    };

    if (isSpeedDialOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isSpeedDialOpen]);

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
          ref={dockRef}
          drag
          dragConstraints={constraints}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            // Small timeout prevents click triggers right after drag release
            setTimeout(() => setIsDragging(false), 150);
          }}
          whileDrag={{ scale: 1.04, cursor: "grabbing" }}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-6 right-9 sm:right-12 z-50 flex flex-col items-end select-none touch-none"
          style={{ willChange: "transform" }}
        >
          {/* Expandable Speed-Dial Calling & Messaging Pop-Up */}
          <AnimatePresence>
            {isSpeedDialOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="mb-3 w-[300px] sm:w-[330px] rounded-3xl bg-[#0B0F1A]/95 backdrop-blur-2xl border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(46,107,255,0.3)] p-4 sm:p-5 overflow-hidden text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 live-dot-pulse" />
                    <span className="text-xs font-bold text-white tracking-wide">
                      Direct Founder Connect
                    </span>
                  </div>
                  <button
                    onClick={() => setIsSpeedDialOpen(false)}
                    className="p-1 rounded-lg text-[#8B93A7] hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close speed dial"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtitle */}
                <p className="text-[11px] text-[#8B93A7] mt-2 mb-3 leading-relaxed">
                  Connect instantly with our founding engineers for technical consulting or project scoping.
                </p>

                {/* Founder Direct Call Options */}
                <div className="space-y-2 mb-3">
                  {/* Naveen */}
                  <a
                    href="tel:+917989335763"
                    onClick={() => showToast("Opening dial pad for Kota Naveen...", "info")}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.03] hover:bg-[#2E6BFF]/15 border border-white/[0.06] hover:border-[#2E6BFF]/40 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#2E6BFF]/20 text-[#00D2FF] flex items-center justify-center font-bold text-xs">
                        KN
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#00D2FF] transition-colors">
                          Kota Naveen
                        </div>
                        <div className="text-[10px] text-[#8B93A7]">Web Development Lead</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </div>
                  </a>

                  {/* Satish */}
                  <a
                    href="tel:+918008925730"
                    onClick={() => showToast("Opening dial pad for Satish Reddy...", "info")}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.03] hover:bg-[#2E6BFF]/15 border border-white/[0.06] hover:border-[#2E6BFF]/40 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-xs">
                        SR
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors">
                          Satish Reddy
                        </div>
                        <div className="text-[10px] text-[#8B93A7]">AI &amp; Python Lead</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </div>
                  </a>

                  {/* Bhovan */}
                  <a
                    href="mailto:nbstechsolutions3@gmail.com"
                    onClick={() => showToast("Opening email client for Bhovan Chandra...", "info")}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.03] hover:bg-[#2E6BFF]/15 border border-white/[0.06] hover:border-[#2E6BFF]/40 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#00D2FF]/20 text-[#00D2FF] flex items-center justify-center font-bold text-xs">
                        BC
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#00D2FF] transition-colors">
                          Bhovan Chandra
                        </div>
                        <div className="text-[10px] text-[#8B93A7]">Software &amp; AI/ML Lead</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#00D2FF]">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </div>
                  </a>
                </div>

                {/* Quick WhatsApp & Form Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
                  <a
                    href="https://wa.me/917989335763?text=Hi%20NBS%20Tech%20Solutions,%20I'd%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => showToast("Opening WhatsApp chat...", "info")}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="#contact"
                    onClick={() => setIsSpeedDialOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] text-white text-[11px] font-semibold transition-all shadow-[0_0_15px_rgba(46,107,255,0.3)]"
                  >
                    <span>Full Inquiry</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Moveable Floating Capsule */}
          <div
            className={`flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#0B0F1A]/95 backdrop-blur-xl border border-white/[0.14] shadow-[0_12px_40px_rgba(0,0,0,0.75),0_0_24px_rgba(46,107,255,0.3)] transition-shadow ${
              isDragging ? "ring-2 ring-[#2E6BFF]/60 shadow-[0_0_35px_rgba(46,107,255,0.5)]" : ""
            }`}
          >
            {/* Grab Handle for Dragging */}
            <div
              className="px-1 py-2 text-white/30 hover:text-white/70 cursor-grab active:cursor-grabbing transition-colors flex items-center justify-center"
              title="Drag to reposition widget"
              aria-label="Drag to reposition widget"
            >
              <GripVertical className="w-4 h-4" />
            </div>

            {/* Quick Call / Speed-Dial Toggle Button */}
            <button
              type="button"
              onClick={() => {
                if (!isDragging) setIsSpeedDialOpen(!isSpeedDialOpen);
              }}
              className={`group relative flex items-center justify-center w-9 h-9 rounded-full transition-all ${
                isSpeedDialOpen
                  ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  : "bg-white/[0.04] hover:bg-emerald-500/20 text-[#8B93A7] hover:text-emerald-400 border border-white/[0.06] hover:border-emerald-500/30"
              }`}
              aria-label="Direct Phone & Founder Speed Dial"
              title="Direct Phone & Founder Speed Dial"
            >
              <Phone className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 live-dot-pulse" />
            </button>

            {/* Quick Inquire / Messaging Button */}
            <button
              type="button"
              onClick={() => {
                if (!isDragging) setIsSpeedDialOpen(!isSpeedDialOpen);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] text-white text-xs font-semibold shadow-[0_0_15px_rgba(46,107,255,0.35)] transition-all hover:scale-105 active:scale-95"
              aria-label="Open Messaging & Inquiry Options"
              title="Open Messaging & Inquiry Options"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Connect</span>
            </button>

            {/* Scroll to Top with Circular Progress Indicator */}
            <button
              type="button"
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
