// src/components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { easing, duration } from "@/motion/tokens";

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
};

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    // Compute Q4 2026 countdown
    const q4End = new Date("2026-12-31T23:59:59");
    const diff = Math.max(0, Math.ceil((q4End.getTime() - Date.now()) / 86400000));
    setDaysLeft(diff);
  }, []);

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
          : "bg-transparent py-5"
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
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6BFF] rounded-lg p-1"
          aria-label="NBS Tech Solutions Home"
        >
          <div className="relative h-9 sm:h-10 px-2.5 py-1 rounded-xl bg-white flex items-center shadow-[0_0_20px_rgba(46,107,255,0.35)] border border-white/40 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="NBS Tech Solutions Logo"
              width={140}
              height={40}
              className="h-7 sm:h-8 w-auto object-contain"
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

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-hamburger-btn md:hidden p-2.5 rounded-xl bg-[#0B0F1A] border border-white/10 text-[#8B93A7] hover:text-white hover:border-[#2E6BFF]/40 focus:outline-none transition-all duration-200"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
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
            className="md:hidden fixed inset-0 z-40 bg-[#05070D]/98 backdrop-blur-2xl flex flex-col"
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div className="h-9 px-2.5 py-1 rounded-xl bg-white flex items-center">
                <Image src="/images/logo.png" alt="NBS" width={100} height={28} className="h-6 w-auto object-contain" priority />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Background watermark text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <span className="text-[120px] font-black text-white/[0.025] tracking-tighter select-none">NBS</span>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 space-y-2" role="navigation">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.35, ease: easing.standard }}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl text-lg font-bold transition-all ${
                      isActive
                        ? "bg-[#2E6BFF]/15 text-[#2E6BFF] border border-[#2E6BFF]/30"
                        : "text-white/80 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#2E6BFF]" />}
                  </motion.a>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.35 }}
              className="px-8 pb-10 space-y-3"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { onToggleTheme(); setMobileMenuOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-sm font-medium text-white"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-base text-white bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] shadow-[0_0_24px_rgba(46,107,255,0.45)]"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
