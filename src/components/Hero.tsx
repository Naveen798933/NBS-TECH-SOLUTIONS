// src/components/Hero.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import InteractiveTeamImage from "./InteractiveTeamImage";
import { TeamMember } from "@/data/team";
import { easing, duration } from "@/motion/tokens";

type HeroProps = {
  onSelectMember: (member: TeamMember) => void;
};

export default function Hero({ onSelectMember }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Radiant Light Beams & Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#2E6BFF]/20 via-[#00D2FF]/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#2E6BFF]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#5B8CFF]/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center space-y-10">
        {/* Top Official Logo Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: easing.standard }}
          className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white shadow-[0_0_30px_rgba(46,107,255,0.35)] border border-white/60"
        >
          <div className="h-8 px-2 py-0.5 rounded-xl bg-white flex items-center">
            <Image
              src="/images/logo.png"
              alt="NBS Tech Solutions Official Logo"
              width={140}
              height={38}
              className="h-7 w-auto object-contain"
              priority
            />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase text-[#05070D] font-mono border-l border-slate-300 pl-3">
            Innovate &bull; Develop &bull; Grow
          </span>
        </motion.div>

        {/* Cinematic Headline */}
        <div className="space-y-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: duration.scene,
              ease: easing.standard,
              delay: 0.1,
            }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
          >
            NBS{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] via-[#5B8CFF] to-[#00D2FF] text-glow">
              TECH SOLUTIONS
            </span>
            <br />
            <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-200 block mt-2">
              Building Digital Experiences That Matter
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: duration.scene,
              ease: easing.standard,
              delay: 0.2,
            }}
            className="text-base sm:text-lg md:text-xl text-[#8B93A7] max-w-2xl mx-auto leading-relaxed"
          >
            We design, develop and deliver modern digital solutions that turn
            ideas into scalable technology.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: duration.scene,
            ease: easing.standard,
            delay: 0.3,
          }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-2"
        >
          <a
            href="#team"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] border border-white/20 shadow-[0_0_30px_rgba(46,107,255,0.45)] hover:shadow-[0_0_40px_rgba(46,107,255,0.7)] transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Explore Our Team</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <a
            href="#projects"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-sm text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>View Our Work</span>
          </a>
        </motion.div>

        {/* Secondary Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: duration.base }}
          className="text-xs sm:text-sm uppercase tracking-widest text-[#8B93A7] font-medium"
        >
          Web &bull; Software &bull; AI &bull; Digital Solutions
        </motion.div>

        {/* Interactive Team Image Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: duration.scene,
            ease: easing.standard,
            delay: 0.45,
          }}
          className="w-full pt-4"
        >
          <InteractiveTeamImage onSelectMember={onSelectMember} />
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: duration.base }}
          className="inline-flex flex-col items-center gap-2 text-xs text-[#8B93A7] hover:text-white transition-colors pt-6"
          aria-label="Scroll to About section"
        >
          <span className="text-[11px] uppercase tracking-widest font-mono">
            Scroll to discover
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#2E6BFF]"
            />
          </div>
        </motion.a>
      </div>
    </section>
  );
}
