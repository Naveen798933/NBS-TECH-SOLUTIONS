// src/components/MobileBottomDock.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  FolderGit2,
  Phone,
  Sparkles,
  X,
  PhoneCall,
  MessageCircle,
  Mail,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import { useToast } from "@/components/Toast";

type MobileBottomDockProps = {
  activeSection?: string;
  onOpenPromptStudio: () => void;
};

export default function MobileBottomDock({
  activeSection = "hero",
  onOpenPromptStudio,
}: MobileBottomDockProps) {
  const { showToast } = useToast();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isConnectDrawerOpen, setIsConnectDrawerOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll detection for auto-hiding on fast scroll down and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBackToTop(currentScrollY > 400);

      // Auto-hide when scrolling down quickly, reveal on scroll up
      if (currentScrollY > lastScrollY + 30 && currentScrollY > 200) {
        setIsVisible(false);
      } else if (lastScrollY - currentScrollY > 15 || currentScrollY < 150) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const triggerHaptic = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(10);
    }
  };

  const handleTabClick = (tabId: string, href?: string) => {
    triggerHaptic();
    if (tabId === "connect") {
      setIsConnectDrawerOpen(true);
      return;
    }
    if (href) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToTop = () => {
    triggerHaptic();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Back to top floating chip for mobile when scrolled */}
      <AnimatePresence>
        {showBackToTop && isVisible && !isConnectDrawerOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="md:hidden fixed bottom-20 right-4 z-40 p-2.5 rounded-full bg-[#0B0F1A]/90 backdrop-blur-md border border-white/15 text-[#00D2FF] shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(46,107,255,0.3)] touch-press"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Primary Mobile Bottom Dock Navigation */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: isVisible ? 0 : 90, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="md:hidden fixed bottom-3 left-3 right-3 sm:left-8 sm:right-8 z-40 select-none pointer-events-auto"
        style={{ willChange: "transform" }}
      >
        <div className="glass-dock rounded-3xl px-3 py-2 flex items-center justify-around shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(46,107,255,0.25)] border border-white/[0.14]">
          {/* Tab 1: Home */}
          <button
            type="button"
            onClick={() => handleTabClick("hero", "#hero")}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all touch-press ${
              activeSection === "hero" ? "text-white" : "text-[#8B93A7] hover:text-white"
            }`}
          >
            <div className="relative">
              <Home className="w-4 h-4" />
              {activeSection === "hero" && (
                <motion.span
                  layoutId="mobileActiveDot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00D2FF]"
                />
              )}
            </div>
            <span className="text-[10px] font-semibold mt-0.5 tracking-tight">Home</span>
          </button>

          {/* Tab 2: Services */}
          <button
            type="button"
            onClick={() => handleTabClick("services", "#services")}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all touch-press ${
              activeSection === "services" ? "text-white" : "text-[#8B93A7] hover:text-white"
            }`}
          >
            <div className="relative">
              <Briefcase className="w-4 h-4" />
              {activeSection === "services" && (
                <motion.span
                  layoutId="mobileActiveDot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00D2FF]"
                />
              )}
            </div>
            <span className="text-[10px] font-semibold mt-0.5 tracking-tight">Services</span>
          </button>

          {/* CENTER HIGHLIGHT: AI Studio / Pro Developer Prompt */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic();
              onOpenPromptStudio();
            }}
            className="group relative -top-3 flex flex-col items-center justify-center focus:outline-none touch-press"
            aria-label="Open Pro Developer AI Studio"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2E6BFF] via-[#5B8CFF] to-[#00D2FF] p-0.5 shadow-[0_0_24px_rgba(46,107,255,0.65)] group-active:scale-95 transition-transform">
              <div className="w-full h-full rounded-[14px] bg-[#05070D] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2E6BFF]/30 to-[#00D2FF]/30 opacity-70" />
                <Sparkles className="w-5 h-5 text-white animate-pulse relative z-10" />
              </div>
            </div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#00D2FF] mt-1 text-glow">
              AI Studio
            </span>
          </button>

          {/* Tab 4: Projects */}
          <button
            type="button"
            onClick={() => handleTabClick("projects", "#projects")}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all touch-press ${
              activeSection === "projects" ? "text-white" : "text-[#8B93A7] hover:text-white"
            }`}
          >
            <div className="relative">
              <FolderGit2 className="w-4 h-4" />
              {activeSection === "projects" && (
                <motion.span
                  layoutId="mobileActiveDot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00D2FF]"
                />
              )}
            </div>
            <span className="text-[10px] font-semibold mt-0.5 tracking-tight">Projects</span>
          </button>

          {/* Tab 5: Connect / Founder Speed Dial */}
          <button
            type="button"
            onClick={() => handleTabClick("connect")}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl text-[#8B93A7] hover:text-emerald-400 transition-all touch-press"
          >
            <div className="relative">
              <Phone className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 live-dot-pulse" />
            </div>
            <span className="text-[10px] font-semibold mt-0.5 tracking-tight">Connect</span>
          </button>
        </div>
      </motion.div>

      {/* Direct Founder Connect Mobile Bottom Sheet Drawer */}
      <AnimatePresence>
        {isConnectDrawerOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 flex items-end justify-center"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConnectDrawerOpen(false)}
              className="fixed inset-0 bg-[#05070D]/80 backdrop-blur-md"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-lg rounded-t-3xl bg-[#0B0F1A] border-t border-white/15 p-5 pb-8 shadow-[0_-15px_40px_rgba(0,0,0,0.8)] z-10 safe-bottom"
            >
              {/* Sheet Drag Handle */}
              <div className="sheet-drag-handle" />

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 live-dot-pulse" />
                  <span className="text-sm font-bold text-white tracking-wide">
                    Direct Founder Line
                  </span>
                </div>
                <button
                  onClick={() => setIsConnectDrawerOpen(false)}
                  className="p-1.5 rounded-xl bg-white/[0.06] text-[#8B93A7] hover:text-white"
                  aria-label="Close phone menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#8B93A7] mt-2 mb-4 leading-relaxed">
                Connect instantly with our founding engineers for technical consulting or project scoping.
              </p>

              {/* Founder Calling Options */}
              <div className="space-y-2 mb-4">
                {/* Naveen */}
                <a
                  href="tel:+917989335763"
                  onClick={() => {
                    triggerHaptic();
                    showToast("Opening dial pad for Kota Naveen...", "info");
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] active:bg-[#2E6BFF]/20 border border-white/[0.06] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#2E6BFF]/20 text-[#00D2FF] flex items-center justify-center font-bold text-xs">
                      KN
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Kota Naveen</div>
                      <div className="text-[11px] text-[#8B93A7]">Web Development &amp; Real-Time Lead</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </div>
                </a>

                {/* Satish */}
                <a
                  href="tel:+918008925730"
                  onClick={() => {
                    triggerHaptic();
                    showToast("Opening dial pad for Satish Reddy...", "info");
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] active:bg-[#2E6BFF]/20 border border-white/[0.06] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-xs">
                      SR
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Satish Reddy</div>
                      <div className="text-[11px] text-[#8B93A7]">AI &amp; Machine Learning Lead</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </div>
                </a>

                {/* Bhovan */}
                <a
                  href="mailto:nbstechsolutions3@gmail.com"
                  onClick={() => {
                    triggerHaptic();
                    showToast("Opening email client for Bhovan Chandra...", "info");
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] active:bg-[#2E6BFF]/20 border border-white/[0.06] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#00D2FF]/20 text-[#00D2FF] flex items-center justify-center font-bold text-xs">
                      BC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Bhovan Chandra</div>
                      <div className="text-[11px] text-[#8B93A7]">Software &amp; AI/ML Lead</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#00D2FF] px-3 py-1 rounded-xl bg-[#00D2FF]/10 border border-[#00D2FF]/20">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </div>
                </a>
              </div>

              {/* Quick WhatsApp & Form Actions */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/[0.06]">
                <a
                  href="https://wa.me/917989335763?text=Hi%20NBS%20Tech%20Solutions,%20I'd%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    triggerHaptic();
                    showToast("Opening WhatsApp chat...", "info");
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href="#contact"
                  onClick={() => {
                    triggerHaptic();
                    setIsConnectDrawerOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] text-white text-xs font-bold shadow-[0_0_15px_rgba(46,107,255,0.4)]"
                >
                  <span>Project Inquiry</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
