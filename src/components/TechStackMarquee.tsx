// src/components/TechStackMarquee.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

const techRow1 = [
  { name: "React 18", category: "Frontend" },
  { name: "Next.js", category: "Full-Stack" },
  { name: "Python", category: "Language / AI" },
  { name: "TypeScript", category: "Language" },
  { name: "Java", category: "Enterprise Backend" },
  { name: "Node.js", category: "Runtime" },
  { name: "Express.js", category: "Backend" },
  { name: "Flask", category: "Python Backend" },
  { name: "Google Gemini AI", category: "GenAI" },
  { name: "OpenAI GPT-4o", category: "LLM API" },
  { name: "Streamlit", category: "AI Framework" },
  { name: "n8n Automation", category: "Workflows" },
];

const techRow2 = [
  { name: "MongoDB", category: "NoSQL DB" },
  { name: "MySQL", category: "Relational DB" },
  { name: "SQL", category: "Database" },
  { name: "Redis", category: "Cache / Queue" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS Cloud", category: "Cloud Infrastructure" },
  { name: "Socket.io", category: "Real-Time" },
  { name: "Yjs CRDT", category: "Collaboration" },
  { name: "Supabase", category: "BaaS" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Machine Learning", category: "Intelligence" },
  { name: "Git & GitHub", category: "Version Control" },
];

export default function TechStackMarquee() {
  return (
    <section id="tech-stack" className="relative py-24 bg-[#05070D] overflow-hidden border-t border-white/[0.06] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F1A] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00D2FF]">
          <Cpu className="w-3.5 h-3.5" />
          <span>Technology Ecosystem</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Our Unified{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF]">
            Tech Stack
          </span>
        </h2>

        <p className="text-sm sm:text-base text-[#8B93A7] max-w-2xl mx-auto">
          Every tool, runtime, and framework in our ecosystem is battle-tested in
          production-grade systems built by our founders.
        </p>
      </div>

      {/* Row 1 - Left to Right */}
      <div className="relative w-full overflow-hidden py-3">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#05070D] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#05070D] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
          className="flex gap-4 w-max"
        >
          {[...techRow1, ...techRow1].map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="px-5 py-2.5 rounded-2xl bg-[#0B0F1A]/90 border border-white/[0.08] hover:border-[#2E6BFF]/50 hover:bg-[#0E1424] shadow-md flex items-center gap-3 transition-colors shrink-0 group cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-[#2E6BFF] group-hover:bg-[#00D2FF] transition-colors" />
              <div className="text-left">
                <div className="text-xs font-bold text-white tracking-tight">
                  {tech.name}
                </div>
                <div className="text-[10px] text-[#8B93A7] font-mono">
                  {tech.category}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="relative w-full overflow-hidden py-3 mt-2">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#05070D] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#05070D] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            duration: 38,
            ease: "linear",
          }}
          className="flex gap-4 w-max"
        >
          {[...techRow2, ...techRow2].map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="px-5 py-2.5 rounded-2xl bg-[#0B0F1A]/90 border border-white/[0.08] hover:border-[#2E6BFF]/50 hover:bg-[#0E1424] shadow-md flex items-center gap-3 transition-colors shrink-0 group cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-[#00D2FF] group-hover:bg-[#2E6BFF] transition-colors" />
              <div className="text-left">
                <div className="text-xs font-bold text-white tracking-tight">
                  {tech.name}
                </div>
                <div className="text-[10px] text-[#8B93A7] font-mono">
                  {tech.category}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
