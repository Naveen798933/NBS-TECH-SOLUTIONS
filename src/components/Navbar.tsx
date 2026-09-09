// src/components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      // Scroll spy for active section
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#05070D]/80 backdrop-blur-xl border-b border-white/[0.07] py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
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
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] border border-white/20 shadow-[0_0_20px_rgba(46,107,255,0.4)] hover:shadow-[0_0_28px_rgba(46,107,255,0.6)] transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden mr-5 md:mr-0 p-2 rounded-xl bg-[#0B0F1A] border border-white/10 text-[#8B93A7] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6BFF]"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: duration.base, ease: easing.standard }}
            className="md:hidden px-4 pt-3 pb-6 bg-[#05070D]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#2E6BFF]/15 text-[#2E6BFF] border border-[#2E6BFF]/30 font-semibold"
                        : "text-[#8B93A7] hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-3 border-t border-white/[0.08] mt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] shadow-[0_0_20px_rgba(46,107,255,0.4)]"
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
