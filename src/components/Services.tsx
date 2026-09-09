// src/components/Services.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Cpu,
  Sparkles,
  Layers,
  Workflow,
  Briefcase,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { services } from "@/data/services";
import { easing, duration } from "@/motion/tokens";

const iconMap = {
  Globe,
  Cpu,
  Sparkles,
  Layers,
  Workflow,
  Briefcase,
};

export default function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#05070D] border-t border-white/[0.06] scroll-mt-20">
      {/* Background Gradients */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#2E6BFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F1A] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00D2FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Service Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Specialized Technology{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF]">
              Services
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#8B93A7] leading-relaxed">
            Delivering clean architectural design and production-ready code across
            modern web ecosystems, intelligent AI models, and scalable backend platforms.
          </p>
        </div>

        {/* Services 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.iconName];
            const isExpanded = expandedId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: duration.base,
                  delay: index * 0.08,
                  ease: easing.standard,
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
                }}
                className={`spotlight-card group relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-[#0B0F1A]/80 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between ${
                  isExpanded
                    ? "border-[#2E6BFF]/60 shadow-[0_12px_40px_rgba(46,107,255,0.25)] bg-[#0E1424]"
                    : "border-white/[0.08] hover:border-[#2E6BFF]/40 hover:bg-[#0E1424] hover:-translate-y-1"
                }`}
              >
                {/* Subtle Card Gradient Tint */}
                <div
                  className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative space-y-4">
                  {/* Top Row: Number & Animated Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-white/20 group-hover:text-[#2E6BFF]/50 transition-colors">
                      {service.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#05070D] border border-white/10 flex items-center justify-center text-[#2E6BFF] group-hover:text-[#00D2FF] group-hover:scale-110 group-hover:border-[#00D2FF]/40 group-hover:shadow-[0_0_20px_rgba(0,210,255,0.35)] transition-all duration-300 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#00D2FF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#8B93A7] mt-1 line-clamp-2">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Main Description */}
                  <p className="text-sm text-slate-300 leading-relaxed pt-1">
                    {service.description}
                  </p>

                  {/* Expandable Capabilities Checklist */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: easing.standard }}
                        className="overflow-hidden pt-3 border-t border-white/[0.08] space-y-2"
                      >
                        <div className="text-xs uppercase font-mono tracking-wider text-[#00D2FF] font-semibold">
                          Core Capabilities:
                        </div>
                        <ul className="space-y-1.5">
                          {service.capabilities.map((cap) => (
                            <li
                              key={cap}
                              className="text-xs text-slate-300 flex items-start gap-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6BFF] shrink-0 mt-0.5" />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Toggle Button */}
                <div className="relative pt-6 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00D2FF] hover:text-white transition-colors focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? "Show Less" : "Explore Capabilities"}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <a
                    href="#contact"
                    className="p-1.5 rounded-full bg-white/[0.03] hover:bg-[#2E6BFF] text-[#8B93A7] hover:text-white transition-colors"
                    aria-label={`Inquire about ${service.title}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
