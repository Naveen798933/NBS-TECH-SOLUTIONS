// src/components/Footer.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp, Mail } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/icons/SocialIcons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#030408] border-t border-white/[0.08] text-[#8B93A7] text-sm overflow-hidden">
      {/* Top subtle light bleed */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#2E6BFF]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 text-[#8B93A7] hover:text-white transition-all"
                aria-label="Founders LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4 text-[#00D2FF]" />
              </a>

              <a
                href="https://github.com/KotaNaveen"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 text-[#8B93A7] hover:text-white transition-all"
                aria-label="Founders GitHub"
              >
                <GitHubIcon className="w-4 h-4 text-white" />
              </a>

              <a
                href="mailto:nbstechsolutions3@gmail.com"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 text-[#8B93A7] hover:text-white transition-all"
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
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Meet the Team
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-white transition-colors">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Core Foundations */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Engineering Team
            </div>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-300">
                <span className="text-[#00D2FF]">Satish Reddy</span>
                <span className="block text-[11px] text-[#8B93A7]">AI &amp; Python Developer</span>
              </li>
              <li className="text-slate-300">
                <span className="text-[#00D2FF]">Bhovan Chandra</span>
                <span className="block text-[11px] text-[#8B93A7]">Software &amp; Full-Stack (AI/ML)</span>
              </li>
              <li className="text-slate-300">
                <span className="text-[#00D2FF]">Kota Naveen</span>
                <span className="block text-[11px] text-[#8B93A7]">Full-Stack Web Developer</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#8B93A7]">
            &copy; 2026 NBS Tech Solutions. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-[#8B93A7] hover:text-white transition-all"
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
