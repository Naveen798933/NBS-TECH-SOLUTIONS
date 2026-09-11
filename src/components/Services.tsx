// src/components/Services.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Cpu,
  Sparkles,
  Layers,
  Workflow,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { services } from "@/data/services";
import { easing, duration } from "@/motion/tokens";

const iconMap = { Globe, Cpu, Sparkles, Layers, Workflow, Briefcase };

// Per-service color accents
const serviceAccents: Record<string, { primary: string; bg: string; border: string; badge: string }> = {
  "01": { primary: "#2E6BFF", bg: "from-[#2E6BFF]/10 to-transparent", border: "hover:border-[#2E6BFF]/50", badge: "bg-[#2E6BFF]/15 text-[#2E6BFF] border-[#2E6BFF]/30" },
  "02": { primary: "#F59E0B", bg: "from-[#F59E0B]/10 to-transparent", border: "hover:border-[#F59E0B]/50", badge: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30" },
  "03": { primary: "#A78BFA", bg: "from-[#A78BFA]/10 to-transparent", border: "hover:border-[#A78BFA]/50", badge: "bg-[#A78BFA]/15 text-[#A78BFA] border-[#A78BFA]/30" },
  "04": { primary: "#00D2FF", bg: "from-[#00D2FF]/10 to-transparent", border: "hover:border-[#00D2FF]/50", badge: "bg-[#00D2FF]/15 text-[#00D2FF] border-[#00D2FF]/30" },
  "05": { primary: "#34D399", bg: "from-[#34D399]/10 to-transparent", border: "hover:border-[#34D399]/50", badge: "bg-[#34D399]/15 text-[#34D399] border-[#34D399]/30" },
  "06": { primary: "#FB923C", bg: "from-[#FB923C]/10 to-transparent", border: "hover:border-[#FB923C]/50", badge: "bg-[#FB923C]/15 text-[#FB923C] border-[#FB923C]/30" },
};

const pricingTiers: Record<string, string> = {
  "01": "Standard",
  "02": "Standard",
  "03": "Custom",
  "04": "Standard",
  "05": "Budget Friendly",
  "06": "Budget Friendly",
};

export default function Services() {
  const [flippedId, setFlippedId] = useState<string | null>(null);

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

        {/* Services 3D Flip Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.iconName];
            const isFlipped = flippedId === service.id;
            const accent = serviceAccents[service.number] ?? serviceAccents["01"];
            const tier = pricingTiers[service.number] ?? "Standard";
            const isMostPopular = service.number === "01";

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
                className={`flip-card relative ${accent.border} ${isFlipped ? "flipped" : ""}`}
              >
                {/* Most Popular badge */}
                {isMostPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF] text-[10px] font-bold text-white uppercase tracking-wider shadow-[0_0_16px_rgba(46,107,255,0.5)] whitespace-nowrap">
                    ⭐ Most Popular
                  </div>
                )}

                <div className={`flip-card-inner rounded-2xl sm:rounded-3xl ${isMostPopular ? "ring-1 ring-[#2E6BFF]/40 shadow-[0_0_30px_rgba(46,107,255,0.2)]" : ""}`}>
                  {/* FRONT FACE */}
                  <div className={`flip-card-front bg-[#0B0F1A]/80 backdrop-blur-md border border-white/[0.08] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col`}>
                    {/* Subtle card gradient */}
                    <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <div className="relative space-y-4 flex-1">
                      {/* Top Row */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl sm:text-3xl font-mono font-bold text-white/20">
                          {service.number}
                        </span>
                        <div className="flex items-center gap-2">
                          {/* Pricing tier */}
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${accent.badge}`}>
                            {tier}
                          </span>
                          <div
                            className="w-12 h-12 rounded-2xl bg-[#05070D] border border-white/10 flex items-center justify-center transition-all duration-300 shadow-inner"
                            style={{ color: accent.primary }}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-xs text-[#8B93A7] mt-1 line-clamp-2">{service.tagline}</p>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed">{service.description}</p>
                    </div>

                    {/* Bottom actions */}
                    <div className="relative pt-6 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setFlippedId(isFlipped ? null : service.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold hover:text-white transition-colors focus:outline-none"
                        style={{ color: accent.primary }}
                        aria-label={`View capabilities of ${service.title}`}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>View Capabilities</span>
                      </button>

                      <a
                        href={`#contact`}
                        className="p-1.5 rounded-full bg-white/[0.03] hover:text-white transition-colors"
                        style={{ color: accent.primary }}
                        aria-label={`Inquire about ${service.title}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="flip-card-back bg-[#0E1424] border border-white/[0.12] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col"
                    style={{ borderColor: `${accent.primary}30` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs uppercase font-mono tracking-wider font-semibold mb-0.5" style={{ color: accent.primary }}>
                          Core Capabilities
                        </div>
                        <h4 className="text-base font-bold text-white">{service.title}</h4>
                      </div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${accent.primary}20`, color: accent.primary }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <ul className="space-y-2 flex-1">
                      {service.capabilities.map((cap) => (
                        <li key={cap} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: accent.primary }} />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setFlippedId(null)}
                        className="text-xs text-[#8B93A7] hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Back
                      </button>
                      <a
                        href="#contact"
                        className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white text-center transition-all"
                        style={{ background: `linear-gradient(135deg, ${accent.primary}, ${accent.primary}cc)`, boxShadow: `0 0 16px ${accent.primary}40` }}
                      >
                        Start This Service →
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
