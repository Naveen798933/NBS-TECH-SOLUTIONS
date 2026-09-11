// src/components/Testimonials.tsx
"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";
import { easing, duration } from "@/motion/tokens";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Startup Founder",
    industry: "EdTech",
    avatar: "AM",
    color: "#2E6BFF",
    stars: 5,
    quote:
      "NBS Tech built our entire LMS platform from scratch in under 6 weeks. The quality of code, the design, and the real-time features were far beyond what we expected. Truly a world-class team.",
  },
  {
    name: "Priya Nambiar",
    role: "Product Manager",
    industry: "HealthTech",
    avatar: "PN",
    color: "#00D2FF",
    stars: 5,
    quote:
      "The AI Telegram bot they built for our medical portal handles thousands of queries a day with impressive accuracy. Their understanding of Gemini AI and prompt engineering is exceptional.",
  },
  {
    name: "Rohit Srinivas",
    role: "CTO",
    industry: "SaaS",
    avatar: "RS",
    color: "#34D399",
    stars: 5,
    quote:
      "We hired them to build a real-time document collaboration tool. The CRDT architecture they designed using Yjs and Socket.io was production-grade and highly scalable. Outstanding engineering.",
  },
  {
    name: "Aisha Kapoor",
    role: "Operations Lead",
    industry: "Logistics",
    avatar: "AK",
    color: "#F59E0B",
    stars: 5,
    quote:
      "The n8n automation workflows they set up saved our team over 40 hours a week in manual processing. Their knowledge of workflow automation is genuinely impressive.",
  },
  {
    name: "Venkat Rao",
    role: "Tech Director",
    industry: "Enterprise Software",
    avatar: "VR",
    color: "#A78BFA",
    stars: 5,
    quote:
      "From architecture to deployment — they delivered a complete bulk email SaaS platform with GPT-4o integration. The async queuing with Celery/Redis was flawlessly executed.",
  },
];

export default function Testimonials() {
  const [dragStart, setDragStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32 bg-[#05070D] border-t border-white/[0.06] scroll-mt-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#2E6BFF]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#00D2FF]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.base, ease: easing.standard }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F1A] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00D2FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            What Clients{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF]">
              Say About Us
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#8B93A7] leading-relaxed">
            Trusted by founders and engineering teams across EdTech, HealthTech,
            SaaS, and Enterprise domains.
          </p>
        </motion.div>

        {/* Carousel — drag to scroll */}
        <div ref={containerRef} className="relative overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.1}
            onDragStart={(_, info) => setDragStart(info.point.x)}
            className="flex gap-5 pb-4 cursor-grab active:cursor-grabbing select-none"
            style={{ width: "max-content" }}
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: duration.base,
                  delay: idx * 0.08,
                  ease: easing.standard,
                }}
                className="w-[300px] sm:w-[340px] shrink-0 p-6 rounded-3xl bg-[#0B0F1A]/85 backdrop-blur-md border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between gap-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Quote icon */}
                <Quote
                  className="w-7 h-7 shrink-0"
                  style={{ color: t.color, opacity: 0.7 }}
                />

                {/* Stars */}
                <div className="flex items-center gap-1 -mt-2">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm text-slate-300 leading-relaxed italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="h-px bg-white/[0.06]" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 text-white"
                    style={{
                      background: `linear-gradient(135deg, ${t.color}40, ${t.color}20)`,
                      border: `1px solid ${t.color}50`,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-[11px] text-[#8B93A7]">
                      {t.role} · {t.industry}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-[#05070D] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[#05070D] to-transparent pointer-events-none z-10" />
        </div>

        {/* Hint text */}
        <p className="text-center text-[11px] text-[#8B93A7] mt-4 font-mono">
          ← drag to scroll →
        </p>
      </div>
    </section>
  );
}
