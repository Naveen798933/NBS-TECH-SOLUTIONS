// src/components/About.tsx
"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Sparkles,
  Bot,
  Zap,
  Globe2,
  Shield,
  Layers,
  BadgeCheck,
  FileCheck,
  Lock,
} from "lucide-react";
import { easing, duration } from "@/motion/tokens";

export default function About() {
  const [badgeIdx, setBadgeIdx] = useState(0);

  const pillars = [
    {
      icon: Globe2,
      title: "Web Development",
      desc: "Modern responsive web applications engineered with Next.js, React 18, and resilient frontend design systems.",
    },
    {
      icon: Cpu,
      title: "Software Development",
      desc: "Object-oriented and algorithmic solutions built with Java, Python, and TypeScript backed by relational databases.",
    },
    {
      icon: Bot,
      title: "AI Solutions & ML",
      desc: "Applied Generative AI (Google Gemini, OpenAI GPT-4o), RAG workflows, and predictive machine learning models.",
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      desc: "Automated business logic, asynchronous worker queues (Celery/Redis), and low-code n8n pipeline integrations.",
    },
    {
      icon: Layers,
      title: "Scalable Applications",
      desc: "Enterprise-grade real-time systems using WebSockets, Yjs CRDT collaboration, and containerized Docker deployments.",
    },
    {
      icon: Code2,
      title: "Business Websites",
      desc: "High-impact digital portals with client-side authentication, rigorous form validation, and optimized SEO.",
    },
  ];

  const trustBadges = [
    {
      icon: BadgeCheck,
      label: "Authentic Credentials",
      sub: "All credentials verified from original records",
      color: "#2E6BFF",
    },
    {
      icon: FileCheck,
      label: "100% Original Work",
      sub: "Every project is uniquely engineered from scratch",
      color: "#00D2FF",
    },
    {
      icon: Lock,
      label: "Documented Records",
      sub: "Fully documented with source-verified resumes",
      color: "#34D399",
    },
  ];

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - cx) / (rect.width / 2)) * 8;
    const rotateX = -((e.clientY - cy) / (rect.height / 2)) * 6;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#05070D] scroll-mt-20">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#2E6BFF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00D2FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F1A] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00D2FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About NBS Tech Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Technology Built Around{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF]">
              Ideas.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#8B93A7] leading-relaxed">
            At NBS Tech Solutions, our engineering philosophy is simple: we turn
            visionary ideas into scalable, high-performance technology. Combining
            strengths in full-stack web architectures, software engineering, and
            artificial intelligence, our three-member development team delivers
            digital solutions engineered for stability and real-world impact.
          </p>
        </div>

        {/* 3D Tilt Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: duration.base,
                  delay: idx * 0.08,
                  ease: easing.standard,
                }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                className="spotlight-card tilt-card group p-6 sm:p-8 rounded-2xl bg-[#0B0F1A]/70 backdrop-blur-md border border-white/[0.08] hover:border-[#2E6BFF]/40 hover:bg-[#0B0F1A] transition-colors duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] cursor-default"
                style={{ willChange: "transform" }}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2E6BFF]/20 to-[#00D2FF]/10 border border-[#2E6BFF]/30 flex items-center justify-center text-[#00D2FF] mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(46,107,255,0.2)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#00D2FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8B93A7] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* HOW WE WORK — Animated 4-Step Process */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: duration.base, ease: easing.standard }}
          className="mt-20"
        >
          <div className="text-center space-y-3 mb-10">
            <div className="text-xs uppercase tracking-widest font-mono text-[#00D2FF] font-semibold">
              Our Engineering Process
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How We{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF]">
                Build & Deliver
              </span>
            </h3>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Animated connecting line */}
            <motion.div
              className="absolute top-8 left-[12.5%] right-[12.5%] h-[1px] glow-divider hidden lg:block pointer-events-none"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: easing.standard, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />

            {[
              {
                step: "01",
                title: "Discovery & Scoping",
                desc: "We deeply analyze your requirements, define technical specifications, and map out a clear project scope before writing a single line of code.",
                color: "#2E6BFF",
              },
              {
                step: "02",
                title: "Architecture Design",
                desc: "Our engineers design system architecture, choose the right tech stack, and establish the database schema and API contract first.",
                color: "#5B8CFF",
              },
              {
                step: "03",
                title: "Agile Development",
                desc: "We build in modular sprints with continuous code reviews, test-driven development, and milestone deliveries via private GitHub repos.",
                color: "#00D2FF",
              },
              {
                step: "04",
                title: "Deploy & Handover",
                desc: "We deliver production-grade deployments on cloud infrastructure, complete with documentation, env configs, and a structured handover call.",
                color: "#34D399",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: duration.base, ease: easing.standard }}
                className="relative h-full flex flex-col p-5 rounded-2xl bg-[#0B0F1A]/70 border border-white/[0.08] hover:border-white/20 transition-all duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold font-mono mb-4 border shrink-0"
                  style={{
                    backgroundColor: `${item.color}15`,
                    borderColor: `${item.color}40`,
                    color: item.color,
                    boxShadow: `0 0 16px ${item.color}20`,
                  }}
                >
                  {item.step}
                </div>
                <h4 className="text-sm font-bold text-white mb-2 group-hover:text-[#00D2FF] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#8B93A7] leading-relaxed flex-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quality & Transparency — Badge Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.base, ease: easing.standard }}
          className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B0F1A] via-[#05070D] to-[#0B0F1A] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Shield icon + rotating badge */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-[#2E6BFF]/20 border border-[#2E6BFF]/40 flex items-center justify-center text-[#2E6BFF] shrink-0 shadow-[0_0_20px_rgba(46,107,255,0.3)]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Authentic Engineering & Verified Foundations
              </h4>
              {/* Rotating trust badges */}
              <div className="mt-2 overflow-hidden h-10">
                {trustBadges.map((badge, i) => {
                  const BadgeIcon = badge.icon;
                  return (
                    <motion.div
                      key={badge.label}
                      initial={false}
                      animate={{ opacity: badgeIdx === i ? 1 : 0, y: badgeIdx === i ? 0 : 10 }}
                      className="absolute flex items-center gap-2"
                    >
                      <BadgeIcon className="w-3.5 h-3.5 shrink-0" style={{ color: badge.color }} />
                      <div>
                        <span className="text-xs font-semibold text-white">{badge.label}</span>
                        <span className="hidden sm:inline text-xs text-[#8B93A7] ml-2">{badge.sub}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              {/* Dots */}
              <div className="flex items-center gap-1.5 mt-6">
                {trustBadges.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setBadgeIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === badgeIdx ? "w-4 bg-[#2E6BFF]" : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <a
            href="#team"
            className="shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-white/[0.06] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 transition-colors"
          >
            Meet the Engineers &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
