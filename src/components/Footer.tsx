// src/components/Footer.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp, Mail, ArrowUpRight } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/icons/SocialIcons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#030408] border-t border-white/[0.08] text-[#8B93A7] text-sm overflow-hidden">
      {/* Premium gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2E6BFF]/60 to-transparent" />
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF]/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#2E6BFF]/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pb-16">

        {/* Top CTA Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B0F1A] via-[#0E1424] to-[#0B0F1A] border border-[#2E6BFF]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2E6BFF]/5 to-[#00D2FF]/5 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-xs uppercase tracking-widest font-mono text-[#00D2FF] mb-1.5">Ready to Build Together?</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Start Your Project with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF]">NBS Tech Solutions</span>
              </h3>
              <p className="text-sm text-[#8B93A7] mt-1.5 max-w-lg">
                From concept to production — our team responds within 24 hours.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] border border-white/20 shadow-[0_0_24px_rgba(46,107,255,0.45)] hover:shadow-[0_0_36px_rgba(46,107,255,0.65)] transition-all hover:-translate-y-0.5"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 px-3 py-1 rounded-xl bg-white flex items-center shadow-[0_0_20px_rgba(46,107,255,0.3)] border border-white/40">
                <Image
                  src="/images/logo.png"
                  alt="NBS Tech Solutions Official Logo"
                  width={150}
                  height={42}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                NBS TECH SOLUTIONS
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Innovate | Develop | Grow.
              <br />
              Delivering high-end modern digital products, artificial intelligence
              implementations, and scalable engineering architectures.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com/in/kota-naveen"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 text-[#8B93A7] hover:text-white transition-all hover:scale-110"
                aria-label="Founders LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4 text-[#00D2FF]" />
              </a>

              <a
                href="https://github.com/KotaNaveen"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 text-[#8B93A7] hover:text-white transition-all hover:scale-110"
                aria-label="Founders GitHub"
              >
                <GitHubIcon className="w-4 h-4 text-white" />
              </a>

              <a
                href="mailto:nbstechsolutions3@gmail.com"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 text-[#8B93A7] hover:text-white transition-all hover:scale-110"
                aria-label="Founders Email"
              >
                <Mail className="w-4 h-4 text-amber-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              {[
                { label: "Home", href: "#hero" },
                { label: "About Us", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Meet the Team", href: "#team" },
                { label: "Projects", href: "#projects" },
                { label: "Tech Stack", href: "#tech-stack" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#00D2FF] transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering Team */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Engineering Team
            </div>
            <ul className="space-y-3 text-xs">
              {[
                { name: "Satish Reddy", role: "AI & Python Developer", color: "#2E6BFF" },
                { name: "Bhovan Chandra", role: "Software & Full-Stack (AI/ML)", color: "#00D2FF" },
                { name: "Kota Naveen", role: "Full-Stack Web Developer", color: "#5B8CFF" },
              ].map((person) => (
                <li key={person.name} className="group cursor-default">
                  <span
                    className="font-semibold transition-colors group-hover:text-white"
                    style={{ color: person.color }}
                  >
                    {person.name}
                  </span>
                  <span className="block text-[11px] text-[#8B93A7] mt-0.5">{person.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#8B93A7]">
            &copy; 2026 NBS Tech Solutions. All rights reserved. Built with ❤️ in Vijayawada, India.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 text-xs text-[#8B93A7] hover:text-white transition-all hover:scale-105"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}

