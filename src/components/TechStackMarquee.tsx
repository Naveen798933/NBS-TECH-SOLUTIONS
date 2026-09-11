// src/components/TechStackMarquee.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Layers } from "lucide-react";
import { easing, duration } from "@/motion/tokens";

type TechItem = {
  name: string;
  category: "Frontend" | "Backend" | "AI/ML" | "DevOps" | "Tools";
  proficiency: "Expert" | "Proficient" | "Familiar";
  usage: string;
  icon?: string;  // emoji fallback for speed
};

const techStack: TechItem[] = [
  // Frontend
  { name: "React 18", category: "Frontend", proficiency: "Expert", usage: "Primary SPA framework for web apps", icon: "⚛️" },
  { name: "Next.js", category: "Frontend", proficiency: "Expert", usage: "Full-stack React framework (App Router)", icon: "▲" },
  { name: "TypeScript", category: "Frontend", proficiency: "Proficient", usage: "Typed superset used across web projects", icon: "𝘛𝘚" },
  { name: "Tailwind CSS", category: "Frontend", proficiency: "Expert", usage: "Utility-first CSS framework", icon: "💨" },
  { name: "Three.js", category: "Frontend", proficiency: "Familiar", usage: "3D interactive UI elements for SkillTrix", icon: "🔷" },
  { name: "Framer Motion", category: "Frontend", proficiency: "Proficient", usage: "Animation library for React UIs", icon: "✦" },
  // Backend
  { name: "Node.js", category: "Backend", proficiency: "Expert", usage: "Core JavaScript runtime for APIs", icon: "🟢" },
  { name: "Express.js", category: "Backend", proficiency: "Expert", usage: "Minimal Node.js REST API framework", icon: "🚀" },
  { name: "Flask", category: "Backend", proficiency: "Expert", usage: "Python microframework for ML services", icon: "🌐" },
  { name: "Socket.io", category: "Backend", proficiency: "Proficient", usage: "Real-time bidirectional event streaming", icon: "⚡" },
  { name: "MongoDB", category: "Backend", proficiency: "Proficient", usage: "Document store for LogicVeda backend", icon: "🍃" },
  { name: "Redis", category: "Backend", proficiency: "Proficient", usage: "In-memory cache and task queue storage", icon: "🔴" },
  { name: "MySQL", category: "Backend", proficiency: "Proficient", usage: "Relational DB for MailForge SaaS", icon: "🐬" },
  { name: "Supabase", category: "Backend", proficiency: "Familiar", usage: "Auth and Postgres backend for SkillTrix", icon: "⚡" },
  // AI/ML
  { name: "Python", category: "AI/ML", proficiency: "Expert", usage: "Primary language for ML/AI workloads", icon: "🐍" },
  { name: "Google Gemini", category: "AI/ML", proficiency: "Expert", usage: "LLM API for conversational AI bots", icon: "🔷" },
  { name: "OpenAI GPT-4o", category: "AI/ML", proficiency: "Proficient", usage: "AI content generation in MailForge Pro", icon: "🤖" },
  { name: "Streamlit", category: "AI/ML", proficiency: "Proficient", usage: "Fast Python UI for AI demos", icon: "📊" },
  { name: "Scikit-learn", category: "AI/ML", proficiency: "Proficient", usage: "ML model training and evaluation", icon: "🧠" },
  { name: "NLTK / spaCy", category: "AI/ML", proficiency: "Familiar", usage: "NLP parsing for ResumeAI Pro", icon: "📝" },
  // DevOps
  { name: "Docker", category: "DevOps", proficiency: "Expert", usage: "Containerization for production deploy", icon: "🐳" },
  { name: "GitHub Actions", category: "DevOps", proficiency: "Proficient", usage: "CI/CD pipeline automation", icon: "🔄" },
  { name: "AWS", category: "DevOps", proficiency: "Familiar", usage: "Cloud infrastructure and deployment", icon: "☁️" },
  { name: "Vercel", category: "DevOps", proficiency: "Proficient", usage: "Next.js deployment platform", icon: "▲" },
  // Tools
  { name: "n8n", category: "Tools", proficiency: "Expert", usage: "Visual workflow automation platform", icon: "🔗" },
  { name: "Git / GitHub", category: "Tools", proficiency: "Expert", usage: "Version control for all projects", icon: "🐙" },
  { name: "Yjs CRDT", category: "Tools", proficiency: "Proficient", usage: "Conflict-free real-time collab in LogicVeda", icon: "🔁" },
  { name: "Playwright", category: "Tools", proficiency: "Familiar", usage: "E2E browser testing for LogicVeda", icon: "🎭" },
  { name: "Celery", category: "Tools", proficiency: "Proficient", usage: "Async task queue for MailForge backend", icon: "⚙️" },
  { name: "Razorpay", category: "Tools", proficiency: "Familiar", usage: "Payment gateway for SkillTrix LMS", icon: "💳" },
];

const filterCategories = ["All", "Frontend", "Backend", "AI/ML", "DevOps", "Tools"] as const;
type FilterCategory = typeof filterCategories[number];

const proficiencyColors = {
  Expert: "#34D399",
  Proficient: "#2E6BFF",
  Familiar: "#F59E0B",
};

function TechChip({ item, showTooltip }: { item: TechItem; showTooltip: boolean }) {
  return (
    <div className="tooltip-wrapper shrink-0">
      <div
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0B0F1A]/90 border border-white/[0.08] hover:border-[#2E6BFF]/40 hover:bg-[#0E1424] transition-all duration-200 cursor-default shadow-sm"
      >
        <span className="text-base select-none" aria-hidden>{item.icon}</span>
        <div>
          <div className="text-xs font-semibold text-white whitespace-nowrap">{item.name}</div>
          <div className="flex items-center gap-1 mt-0.5">
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: proficiencyColors[item.proficiency] }}
            />
            <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: proficiencyColors[item.proficiency] }}>
              {item.proficiency}
            </span>
          </div>
        </div>
      </div>
      {showTooltip && (
        <div className="tooltip-box text-center">
          <div className="text-xs font-bold text-white mb-0.5">{item.name}</div>
          <div className="text-[10px] text-[#8B93A7] leading-snug">{item.usage}</div>
          <div className="mt-1 text-[9px] font-mono uppercase" style={{ color: proficiencyColors[item.proficiency] }}>
            {item.proficiency} · {item.category}
          </div>
        </div>
      )}
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: TechItem[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row overflow-hidden relative">
      <motion.div
        className="flex gap-3"
        animate={{ x: reverse ? ["0%", "50%"] : ["-50%", "0%"] }}
        initial={{ x: reverse ? "0%" : "-50%" }}
        transition={{
          duration: items.length * 2.8,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <TechChip key={`${item.name}-${i}`} item={item} showTooltip={true} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStackMarquee() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filtered = activeFilter === "All"
    ? techStack
    : techStack.filter((t) => t.category === activeFilter);

  const row1 = filtered.filter((_, i) => i % 3 === 0);
  const row2 = filtered.filter((_, i) => i % 3 === 1);
  const row3 = filtered.filter((_, i) => i % 3 === 2);

  return (
    <section id="tech-stack" className="relative py-20 sm:py-28 border-t border-white/[0.06] bg-[#05070D] scroll-mt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#2E6BFF]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.base, ease: easing.standard }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F1A] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00D2FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technology Stack</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Technologies We Master &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF]">
              Deploy
            </span>
          </h2>

          <p className="text-base text-[#8B93A7] max-w-xl mx-auto">
            {techStack.length}+ technologies spanning frontend, backend, AI/ML, DevOps, and tooling.
            Hover any chip for usage context.
          </p>
        </motion.div>

        {/* Proficiency Legend */}
        <div className="flex items-center justify-center gap-5 flex-wrap text-xs">
          {Object.entries(proficiencyColors).map(([level, color]) => (
            <div key={level} className="flex items-center gap-1.5 text-[#8B93A7]">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span>{level}</span>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 mx-auto justify-center min-w-max sm:min-w-0 sm:flex-wrap" role="tablist">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(cat)}
                  className={`flex items-center gap-1.5 shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    isActive
                      ? "bg-[#2E6BFF] text-white border-white/20 shadow-[0_0_16px_rgba(46,107,255,0.4)]"
                      : "bg-[#0B0F1A] text-[#8B93A7] border-white/[0.08] hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat === "All" && <Layers className="w-3 h-3" />}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3 Marquee Rows */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4 px-2"
        >
          {row1.length > 0 && <MarqueeRow items={row1} reverse={false} />}
          {row2.length > 0 && <MarqueeRow items={row2} reverse={true} />}
          {row3.length > 0 && <MarqueeRow items={row3} reverse={false} />}
        </motion.div>
      </AnimatePresence>

      {/* Gradient masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#05070D] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#05070D] to-transparent pointer-events-none z-10" />
    </section>
  );
}
