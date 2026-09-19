// src/components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon, Sparkles, Phone, MessageCircle } from "lucide-react";
import { easing } from "@/motion/tokens";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Team", href: "#team" },
  { name: "Projects", href: "#projects" },
  { name: "Tech Stack", href: "#tech-stack" },
  { name: "Contact", href: "#contact" },
];

type NavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenPromptStudio?: () => void;
};

export default function Navbar({ isDark, onToggleTheme, onOpenPromptStudio }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [daysLeft] = useState(() => {
    const q4End = new Date("2026-12-31T23:59:59");
    return Math.max(0, Math.ceil((q4End.getTime() - Date.now()) / 86400000));
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionProgress = navLinks.findIndex(
    (l) => l.href.substring(1) === activeSection
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#05070D]/85 backdrop-blur-xl border-b border-white/[0.07] py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-white/[0.03] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#2E6BFF] via-[#5B8CFF] to-[#00D2FF] shadow-[0_0_10px_#00D2FF] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6BFF] rounded-lg p-0.5"
          aria-label="NBS Tech Solutions Home"
        >
          <div className="relative h-8 sm:h-10 px-2 sm:px-2.5 py-1 rounded-xl bg-white flex items-center shadow-[0_0_20px_rgba(46,107,255,0.35)] border border-white/40 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="NBS Tech Solutions Logo"
              width={140}
              height={40}
              className="h-6 sm:h-8 w-auto object-contain"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              NBS TECH SOLUTIONS
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2E6BFF] animate-pulse" />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#8B93A7] font-medium">
              Innovate • Develop • Grow
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#0B0F1A]/70 backdrop-blur-md border border-white/[0.08]"
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-[#8B93A7] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2E6BFF]/25 to-[#2E6BFF]/10 border border-[#2E6BFF]/40 shadow-[0_0_12px_rgba(46,107,255,0.25)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Pro Developer Studio Pill */}
          {onOpenPromptStudio && (
            <button
              type="button"
              onClick={onOpenPromptStudio}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#2E6BFF]/15 to-[#00D2FF]/15 hover:from-[#2E6BFF]/30 hover:to-[#00D2FF]/30 border border-[#2E6BFF]/40 text-xs font-bold text-[#00D2FF] shadow-[0_0_15px_rgba(46,107,255,0.25)] transition-all hover:scale-105"
              title="Open Pro Developer AI Studio"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00D2FF] animate-pulse" />
              <span>AI Studio</span>
            </button>
          )}

          {/* Countdown chip */}
          <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B0F1A]/80 border border-orange-500/30 text-xs font-semibold text-orange-400 countdown-chip">
            <span className="font-mono">{daysLeft}d</span>
            <span className="text-orange-400/70 font-normal">Q4 2026</span>
          </div>

          {/* Available now */}
          <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F1A]/80 border border-emerald-500/25 text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 live-dot-pulse" />
            <span>Available Now</span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-[#8B93A7] hover:text-white transition-all"
            aria-label="Toggle light/dark mode"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] border border-white/20 shadow-[0_0_20px_rgba(46,107,255,0.4)] hover:shadow-[0_0_28px_rgba(46,107,255,0.6)] transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Header Right Actions (Clean In-Flow layout) */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick AI Studio Trigger for Mobile */}
          {onOpenPromptStudio && (
            <button
              type="button"
              onClick={onOpenPromptStudio}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#2E6BFF]/20 to-[#00D2FF]/20 border border-[#2E6BFF]/40 text-[#00D2FF] text-[11px] font-bold shadow-[0_0_12px_rgba(46,107,255,0.25)] touch-press"
              aria-label="Open AI Studio"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00D2FF] animate-pulse" />
              <span>Studio</span>
            </button>
          )}

          {/* Mobile Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-[#8B93A7] hover:text-white transition-all touch-press"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#0B0F1A] border border-white/10 text-white hover:border-[#2E6BFF]/40 focus:outline-none transition-all touch-press"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Section progress dots */}
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 pb-1"
        >
          {navLinks.map((_, idx) => (
            <a
              key={idx}
              href={navLinks[idx].href}
              className={`nav-progress-dot ${idx === sectionProgress ? "active" : ""}`}
              aria-label={`Go to ${navLinks[idx].name}`}
            />
          ))}
        </motion.div>
      )}

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-50 bg-[#05070D]/98 backdrop-blur-2xl flex flex-col overflow-y-auto safe-bottom"
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/[0.06]">
              <div className="h-8 px-2.5 py-1 rounded-xl bg-white flex items-center">
                <Image src="/images/logo.png" alt="NBS" width={100} height={28} className="h-6 w-auto object-contain" priority />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white/[0.06] border border-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick AI Studio Banner inside Menu */}
            {onOpenPromptStudio && (
              <div className="px-6 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPromptStudio();
                  }}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#2E6BFF]/20 via-[#00D2FF]/15 to-[#2E6BFF]/10 border border-[#2E6BFF]/40 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#2E6BFF] flex items-center justify-center text-white shadow-[0_0_12px_#2E6BFF]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        Pro Developer AI Studio
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">NEW</span>
                      </div>
                      <div className="text-[10px] text-[#8B93A7]">Generate system prompt &amp; project brief</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#00D2FF]" />
                </button>
              </div>
            )}

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-6 py-4 space-y-1.5" role="navigation">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3, ease: easing.standard }}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                      isActive
                        ? "bg-[#2E6BFF]/15 text-[#00D2FF] border border-[#2E6BFF]/30"
                        : "text-white/80 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#00D2FF]" />}
                  </motion.a>
                );
              })}
            </nav>

            {/* Bottom Quick Contact Strip */}
            <div className="px-6 pb-6 space-y-3 border-t border-white/[0.06] pt-4">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#8B93A7]">
                Instant Founder Connect
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+917989335763"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-emerald-400"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Naveen</span>
                </a>
                <a
                  href="tel:+918008925730"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-violet-300"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Satish</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/917989335763?text=Hi%20NBS%20Tech%20Solutions,%20I'd%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] shadow-[0_0_20px_rgba(46,107,255,0.4)]"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
