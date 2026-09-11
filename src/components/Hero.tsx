// src/components/Hero.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import InteractiveTeamImage from "./InteractiveTeamImage";
import { TeamMember } from "@/data/team";
import { easing, duration } from "@/motion/tokens";

type HeroProps = {
  onSelectMember: (member: TeamMember) => void;
};

// Animated count-up hook
function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// Typewriter hook
function useTypewriter(text: string, speed: number = 45, delay: number = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let idx = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const start = () => {
      timeout = setTimeout(() => {
        const interval = setInterval(() => {
          idx++;
          setDisplayed(text.slice(0, idx));
          if (idx >= text.length) {
            clearInterval(interval);
            setDone(true);
          }
        }, speed);
      }, delay);
    };
    start();
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return { displayed, done };
}

const tickerItems = [
  "AI Chatbots & Assistants",
  "Real-Time Collaboration Tools",
  "Business Portals & LMS",
  "ML Data Pipelines",
  "SaaS Automation Platforms",
];

export default function Hero({ onSelectMember }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [istTime, setIstTime] = useState("");

  // IST clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ticker rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIdx((prev) => (prev + 1) % tickerItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Stats intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const count1 = useCountUp(3, 1.2, statsVisible);
  const count2 = useCountUp(13, 1.6, statsVisible);

  const { displayed: typewriterText, done: typewriterDone } = useTypewriter(
    "Building Digital Experiences That Matter",
    38,
    800
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Radiant Light Beams */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#2E6BFF]/25 via-[#00D2FF]/12 to-transparent blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#2E6BFF]/12 blur-[130px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#5B8CFF]/12 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#00D2FF]/8 blur-[100px] pointer-events-none" />

      {/* Floating Decorative Orbs */}
      <div className="absolute top-1/3 left-[8%] w-3 h-3 rounded-full bg-[#2E6BFF]/60 float-orb blur-sm" />
      <div className="absolute top-[20%] right-[12%] w-2 h-2 rounded-full bg-[#00D2FF]/70 float-orb-slow" />
      <div className="absolute bottom-[30%] left-[15%] w-4 h-4 rounded-full bg-[#5B8CFF]/40 float-orb-medium blur-sm" />
      <div className="absolute top-[60%] right-[8%] w-2.5 h-2.5 rounded-full bg-[#2E6BFF]/50 float-orb" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[15%] left-[30%] w-1.5 h-1.5 rounded-full bg-[#00D2FF]/60 float-orb-medium" style={{ animationDelay: '1.5s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center space-y-10">
        {/* Top Badge Row: Logo + Live Status + IST Clock */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: easing.standard }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {/* Official Logo Badge */}
          <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white shadow-[0_0_30px_rgba(46,107,255,0.35)] border border-white/60">
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
          </div>

          {/* Live Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0B0F1A]/90 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 live-dot-pulse" />
            <span className="text-xs font-semibold text-emerald-400 tracking-wide">Available Now</span>
          </div>

          {/* IST Clock */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0B0F1A]/90 border border-[#2E6BFF]/25 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#2E6BFF] animate-pulse" />
            <span className="text-xs font-mono text-[#8B93A7]">IST</span>
            <span className="text-xs font-mono font-bold text-[#00D2FF]">{istTime}</span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="space-y-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.scene, ease: easing.standard, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
          >
            NBS{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] via-[#5B8CFF] to-[#00D2FF] text-glow">
              TECH SOLUTIONS
            </span>
            <br />
            <span
              className={`text-2xl sm:text-4xl md:text-5xl font-bold text-slate-200 block mt-2 ${
                !typewriterDone ? "typewriter-cursor" : ""
              }`}
            >
              {typewriterText || "\u00A0"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.scene, ease: easing.standard, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-[#8B93A7] max-w-2xl mx-auto leading-relaxed"
          >
            We design, develop and deliver modern digital solutions that turn
            ideas into scalable technology.
          </motion.p>

          {/* Rotating Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-sm"
          >
            <span className="text-[#8B93A7]">Currently building:</span>
            <div className="overflow-hidden h-5 relative w-64 text-left">
              <motion.div
                key={tickerIdx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: easing.standard }}
                className="absolute font-semibold text-[#00D2FF] whitespace-nowrap"
              >
                {tickerItems[tickerIdx]}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.scene, ease: easing.standard, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-2"
        >
          <a
            href="#team"
            className="btn-shimmer w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] border border-white/20 shadow-[0_0_30px_rgba(46,107,255,0.45)] hover:shadow-[0_0_40px_rgba(46,107,255,0.7)] transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
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

        {/* Animated Count-Up Metrics Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: duration.base }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2 w-full max-w-3xl"
        >
          {[
            {
              value: statsVisible ? count1.toString() : "0",
              label: "Founding Engineers",
              color: "text-white",
              border: "hover:border-[#2E6BFF]/50",
              glow: "hover:shadow-[0_0_20px_rgba(46,107,255,0.25)]",
            },
            {
              value: statsVisible ? `${count2}+` : "0+",
              label: "Verified Projects",
              color: "text-[#00D2FF]",
              border: "hover:border-[#00D2FF]/50",
              glow: "hover:shadow-[0_0_20px_rgba(0,210,255,0.25)]",
            },
            {
              value: "100%",
              label: "Documented Records",
              color: "text-emerald-400",
              border: "hover:border-emerald-500/50",
              glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
            },
            {
              value: "< 24h",
              label: "Direct Response",
              color: "text-[#5B8CFF]",
              border: "hover:border-[#5B8CFF]/50",
              glow: "hover:shadow-[0_0_20px_rgba(91,140,255,0.25)]",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`stat-number p-3.5 sm:p-4 rounded-2xl bg-[#0B0F1A]/80 border border-white/[0.08] ${stat.border} ${stat.glow} backdrop-blur-md text-center transition-all duration-300 cursor-default hover:-translate-y-0.5`}
            >
              <div className={`text-xl sm:text-2xl font-extrabold tracking-tight ${stat.color} drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]`}>
                {stat.value}
              </div>
              <div className="text-[11px] text-[#8B93A7] font-medium mt-0.5 leading-tight">{stat.label}</div>
            </div>
          ))}
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
          transition={{ duration: duration.scene, ease: easing.standard, delay: 0.45 }}
          className="w-full pt-4"
        >
          <InteractiveTeamImage onSelectMember={onSelectMember} />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: duration.base }}
          className="inline-flex flex-col items-center gap-2 text-xs text-[#8B93A7] hover:text-white transition-colors pt-6"
          aria-label="Scroll to About section"
        >
          <span className="text-[11px] uppercase tracking-widest font-mono">Scroll to discover</span>
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
