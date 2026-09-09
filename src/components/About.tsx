// src/components/About.tsx
"use client";

import React from "react";
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
} from "lucide-react";
import { easing, duration } from "@/motion/tokens";

export default function About() {
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

        {/* Pillars Grid */}
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
                className="group p-6 sm:p-8 rounded-2xl bg-[#0B0F1A]/70 backdrop-blur-md border border-white/[0.08] hover:border-[#2E6BFF]/40 hover:bg-[#0B0F1A] transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2E6BFF]/20 to-[#00D2FF]/10 border border-[#2E6BFF]/30 flex items-center justify-center text-[#00D2FF] mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#00D2FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8B93A7] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Quality & Transparency Assurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.base, ease: easing.standard }}
          className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B0F1A] via-[#05070D] to-[#0B0F1A] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2E6BFF]/20 border border-[#2E6BFF]/40 flex items-center justify-center text-[#2E6BFF] shrink-0 shadow-[0_0_20px_rgba(46,107,255,0.3)]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Authentic Engineering &amp; Verified Foundations
              </h4>
              <p className="text-xs sm:text-sm text-[#8B93A7]">
                Every project and credential showcased on this website is verified
                directly from the original academic and professional records of our team.
              </p>
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
