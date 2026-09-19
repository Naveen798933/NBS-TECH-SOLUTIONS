// src/components/ProDeveloperPromptStudio.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Copy,
  Check,
  Download,
  MessageCircle,
  ArrowRight,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useToast } from "@/components/Toast";
import { easing, duration, springConfig } from "@/motion/tokens";

type Archetype = {
  id: string;
  name: string;
  badge: string;
  icon: typeof Code2;
  description: string;
  defaultStack: string[];
  defaultFeatures: string[];
  estimatedWeeks: string;
  lead: "naveen" | "satish" | "bhovan";
};

const ARCHETYPES: Archetype[] = [
  {
    id: "ai-rag-agent",
    name: "AI Agent & RAG Intelligence System",
    badge: "Most Requested",
    icon: Cpu,
    description: "Autonomous AI agents, vector embeddings, document intelligence, and structured LLM tool-calling pipelines.",
    defaultStack: ["Next.js 15+", "FastAPI (Python)", "Gemini / OpenAI API", "Supabase (pgvector)", "Tailwind v4"],
    defaultFeatures: ["Vector Embeddings & Semantic Search", "Streaming LLM Responses", "Role-Based Access Control", "Rate-Limiting & Token Auditing"],
    estimatedWeeks: "2-3 weeks",
    lead: "satish",
  },
  {
    id: "fullstack-saas",
    name: "Modern Multi-Tenant SaaS Platform",
    badge: "Enterprise Ready",
    icon: Layers,
    description: "Scalable cloud application with authentication, subscription tiers, analytics dashboard, and automated workflows.",
    defaultStack: ["Next.js 15+", "TypeScript", "PostgreSQL", "Prisma ORM", "Stripe / Razorpay", "Tailwind v4"],
    defaultFeatures: ["Multi-Tenant Authentication", "Subscription Billing Engine", "Audit Logging & Analytics", "Responsive Native-Feel UI"],
    estimatedWeeks: "3-4 weeks",
    lead: "bhovan",
  },
  {
    id: "realtime-collab",
    name: "Real-Time Collaboration & Interactive Hub",
    badge: "High Performance",
    icon: Zap,
    description: "Low-latency bidirectional WebSocket engine, live document/canvas sync, presence indicators, and instant messaging.",
    defaultStack: ["Next.js 15+", "WebSockets / Socket.io", "Redis", "TypeScript", "Docker", "Tailwind v4"],
    defaultFeatures: ["Sub-50ms State Synchronization", "Live User Presence & Cursor Tracking", "Offline-Ready Optimistic UI", "End-to-End Type Safety"],
    estimatedWeeks: "2-4 weeks",
    lead: "naveen",
  },
  {
    id: "enterprise-portal",
    name: "Enterprise Business Portal & LMS",
    badge: "Mission Critical",
    icon: ShieldCheck,
    description: "Internal operations dashboard, employee/student management system, automated compliance, and role workflows.",
    defaultStack: ["React 19 / Next.js", "Node.js / Express", "PostgreSQL", "Docker", "Tailwind v4"],
    defaultFeatures: ["Granular Permission Matrix", "Automated PDF & Report Generation", "RESTful Service Mesh", "Full Data Export & Backup"],
    estimatedWeeks: "3-5 weeks",
    lead: "bhovan",
  },
  {
    id: "custom-innovation",
    name: "Custom Startup MVP & Digital Innovation",
    badge: "Bespoke",
    icon: Sparkles,
    description: "Bespoke digital product designed to validate your market rapidly with high aesthetic appeal and scalable architecture.",
    defaultStack: ["Next.js 15+", "TypeScript", "Supabase", "Framer Motion", "Tailwind v4"],
    defaultFeatures: ["Stunning Interactive Animations", "SEO & OpenGraph Social Engine", "Lightning-Fast Lighthouse 98+ Score", "Integrated Inquiry Funnel"],
    estimatedWeeks: "2-3 weeks",
    lead: "naveen",
  },
];

const AVAILABLE_TECH = [
  "Next.js 15+",
  "React 19",
  "TypeScript",
  "Tailwind v4",
  "FastAPI (Python)",
  "Node.js / Express",
  "PostgreSQL",
  "Supabase (pgvector)",
  "Redis",
  "Prisma ORM",
  "Docker",
  "Gemini / OpenAI API",
  "WebSockets",
  "Stripe / Razorpay",
  "Framer Motion",
];

const AVAILABLE_MODULES = [
  "Role-Based Access Control (RBAC)",
  "Streaming LLM Responses",
  "Vector Embeddings & Semantic Search",
  "Sub-50ms State Synchronization",
  "Subscription Billing Engine",
  "Live User Presence & Cursor Tracking",
  "Granular Permission Matrix",
  "Automated CI/CD & Containerization",
  "Responsive Native-Feel UI & Dark Mode",
  "Offline-Ready Optimistic UI",
  "Audit Logging & Analytics Telemetry",
];

const PROMPT_PRESETS = [
  {
    title: "AI Healthcare Diagnostics Portal",
    prompt: "Build an AI-powered clinical diagnostics portal with real-time patient queue triage, medical record RAG retrieval, and doctor collaboration.",
  },
  {
    title: "Real-Time Project Whiteboard & Kanban",
    prompt: "Architect a Figma-like real-time visual canvas with multiplayer cursor presence, live WebSocket state sync, and markdown note exports.",
  },
  {
    title: "Automated Invoice & Document Extraction",
    prompt: "Create an enterprise automation hub that ingests supplier invoices, extracts structured line items via LLM vision, and syncs to accounting.",
  },
];

const LEAD_DATA = {
  naveen: {
    name: "Kota Naveen",
    title: "Web Development & Real-Time Lead",
    phone: "+917989335763",
    color: "#2E6BFF",
  },
  satish: {
    name: "Satish Reddy",
    title: "AI & Machine Learning Lead",
    phone: "+918008925730",
    color: "#A78BFA",
  },
  bhovan: {
    name: "Bhovan Chandra",
    title: "Software & Full-Stack Systems Lead",
    phone: "+917989335763",
    color: "#00D2FF",
  },
};

type ProDeveloperPromptStudioProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectService?: (serviceName: string) => void;
};

export default function ProDeveloperPromptStudio({
  isOpen,
  onClose,
  onSelectService,
}: ProDeveloperPromptStudioProps) {
  const { showToast } = useToast();

  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>("ai-rag-agent");
  const [selectedTech, setSelectedTech] = useState<string[]>(ARCHETYPES[0].defaultStack);
  const [selectedModules, setSelectedModules] = useState<string[]>(ARCHETYPES[0].defaultFeatures);
  const [customVision, setCustomVision] = useState<string>("");
  const [budgetTier, setBudgetTier] = useState<string>("Growth (₹50k - ₹1.5L)");
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"configure" | "preview">("configure");

  const archetype = useMemo(
    () => ARCHETYPES.find((a) => a.id === selectedArchetypeId) ?? ARCHETYPES[0],
    [selectedArchetypeId]
  );

  const matchedLead = LEAD_DATA[archetype.lead];

  const handleSelectArchetype = (arc: Archetype) => {
    setSelectedArchetypeId(arc.id);
    setSelectedTech(arc.defaultStack);
    setSelectedModules(arc.defaultFeatures);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(10);
    }
  };

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const toggleModule = (mod: string) => {
    setSelectedModules((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
    );
  };

  // Generate the Master Pro Developer System Prompt
  const generatedPrompt = useMemo(() => {
    const visionText = customVision.trim() || archetype.description;
    const techList = selectedTech.join(", ");
    const modulesList = selectedModules.map((m) => `  - ${m}`).join("\n");

    return `# SYSTEM PROMPT: PRINCIPAL ARCHITECT & FULL-STACK LEAD
You are acting as a world-class Principal Software Architect and Senior Full-Stack Engineer at NBS Tech Solutions. 
Your objective is to produce production-grade, fault-tolerant, and performant code for the following project specification.

## PROJECT ARCHETYPE: ${archetype.name}
**Project Vision:** ${visionText}
**Target Delivery Sprint:** ${archetype.estimatedWeeks}
**Budget Bracket:** ${budgetTier}
**Assigned Technical Lead:** ${matchedLead.name} (${matchedLead.title})

---

## 1. TECHNOLOGY STACK
The solution must strictly adhere to the following ecosystem:
${techList}

## 2. CORE ARCHITECTURAL REQUIREMENTS
Implement the system ensuring:
${modulesList}

## 3. ENGINEERING DIRECTIVES
1. Maintain strict type safety across all client, API, and database boundaries.
2. Structure directory hierarchy following standard feature-sliced clean architecture.
3. Optimize for Lighthouse 95+ (Core Web Vitals, dynamic imports, responsive touch-safe viewport).
4. Implement atomic error-boundary handling, graceful degradation, and structured logging.
5. Provide actionable test suites (unit + integration coverage) for critical paths.

## 4. NEXT STEP: NBS TECH SOLUTIONS DELIVERY SPRINT
- Phase 1 (Week 1): Architecture Foundation, Schema Migration & Authentication
- Phase 2 (Week 2): Core Business Logic, Real-Time / AI Integration
- Phase 3 (Week 3): UI/UX Polish, Accessibility, Edge Caching & End-to-End Testing
- Phase 4 (Final): Production CI/CD Deployment, Monitoring & Founder Handover
`;
  }, [archetype, selectedTech, selectedModules, customVision, budgetTier, matchedLead]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    showToast("Pro Developer System Prompt copied to clipboard!", "success");

    // Micro celebratory confetti
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#2E6BFF", "#00D2FF", "#34D399", "#A78BFA"],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hi NBS Tech Solutions, I generated a Project Architecture Spec using your Pro Developer Studio!\n\n` +
      `*Archetype:* ${archetype.name}\n` +
      `*Vision:* ${customVision.trim() || archetype.description}\n` +
      `*Tech Stack:* ${selectedTech.slice(0, 4).join(", ")}\n` +
      `*Budget:* ${budgetTier}\n` +
      `*Matched Lead:* ${matchedLead.name}\n\n` +
      `I'd like to discuss bringing this project to production with your team.`
    );
    window.open(`https://wa.me/917989335763?text=${text}`, "_blank");
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([generatedPrompt], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${archetype.id}-spec.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Downloaded architecture spec (.md)", "success");
  };

  const handlePreFillContact = () => {
    if (onSelectService) {
      onSelectService(archetype.name);
    }
    onClose();
    // Scroll to contact form
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      showToast("Ready to submit your inquiry with NBS Tech Solutions!", "info");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prompt-studio-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.base, ease: easing.standard }}
          onClick={onClose}
          className="fixed inset-0 bg-[#05070D]/85 backdrop-blur-xl"
        />

        {/* Modal / Bottom Sheet Window */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ ...springConfig }}
          className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col bg-[#0B0F1A] border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(46,107,255,0.25)] overflow-hidden z-10"
        >
          {/* Mobile Sheet Drag Handle */}
          <div className="sm:hidden w-full pt-2 flex justify-center">
            <div className="sheet-drag-handle" />
          </div>

          {/* Header Bar */}
          <div className="px-5 sm:px-7 py-3.5 sm:py-4 bg-[#0B0F1A]/95 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2E6BFF] to-[#00D2FF] flex items-center justify-center text-white shadow-[0_0_15px_rgba(46,107,255,0.4)]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2
                    id="prompt-studio-title"
                    className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-1.5"
                  >
                    Pro Developer Studio
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#2E6BFF]/20 text-[#00D2FF] border border-[#2E6BFF]/30">
                      v2.0
                    </span>
                  </h2>
                </div>
                <p className="text-[11px] text-[#8B93A7] hidden sm:block">
                  Architect system prompts &amp; project specifications like a Principal Engineer.
                </p>
              </div>
            </div>

            {/* View Switcher Tabs (Mobile Ergonomics) */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 rounded-xl bg-[#05070D] border border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setActiveTab("configure")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "configure"
                      ? "bg-[#2E6BFF] text-white shadow-sm"
                      : "text-[#8B93A7] hover:text-white"
                  }`}
                >
                  Configure
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "preview"
                      ? "bg-[#2E6BFF] text-white shadow-sm"
                      : "text-[#8B93A7] hover:text-white"
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  <span>Prompt ({selectedTech.length + selectedModules.length})</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-[#8B93A7] hover:text-white transition-colors"
                aria-label="Close Pro Developer Studio"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="overflow-y-auto px-5 sm:px-8 py-5 sm:py-6 space-y-6 custom-scrollbar flex-1 safe-bottom">
            {activeTab === "configure" ? (
              <>
                {/* 1. Project Archetype Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase font-mono tracking-wider font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#2E6BFF]" />
                      1. Select Project Archetype
                    </label>
                    <span className="text-[11px] text-[#8B93A7]">Tap to customize</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {ARCHETYPES.map((arc) => {
                      const isSelected = arc.id === selectedArchetypeId;
                      const Icon = arc.icon;
                      return (
                        <button
                          key={arc.id}
                          type="button"
                          onClick={() => handleSelectArchetype(arc)}
                          className={`text-left p-3.5 rounded-2xl border transition-all relative ${
                            isSelected
                              ? "bg-[#2E6BFF]/15 border-[#2E6BFF] shadow-[0_0_20px_rgba(46,107,255,0.25)] ring-1 ring-[#2E6BFF]/50"
                              : "bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.08] hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div
                              className={`p-2 rounded-xl border ${
                                isSelected
                                  ? "bg-[#2E6BFF] text-white border-white/20 shadow-[0_0_10px_#2E6BFF]"
                                  : "bg-[#05070D] text-[#8B93A7] border-white/10"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-white/[0.05] text-[#00D2FF] border border-white/10">
                              {arc.badge}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-white">{arc.name}</div>
                          <p className="text-[11px] text-[#8B93A7] mt-1 line-clamp-2 leading-relaxed">
                            {arc.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Custom Idea / Vision Input */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase font-mono tracking-wider font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00D2FF]" />
                      2. Project Vision or Prompt Details
                    </label>
                    <span className="text-[11px] text-[#8B93A7]">Optional prompt boost</span>
                  </div>

                  <div className="relative">
                    <textarea
                      value={customVision}
                      onChange={(e) => setCustomVision(e.target.value)}
                      placeholder="Describe what you want to build (e.g. A real-time telemetry dashboard for logistics with autonomous AI routing and SMS alerts)..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-2xl bg-[#05070D] border border-white/10 focus:border-[#2E6BFF] focus:ring-2 focus:ring-[#2E6BFF]/30 text-xs sm:text-sm text-white placeholder:text-[#8B93A7] outline-none transition-all resize-none shadow-inner"
                    />
                  </div>

                  {/* Preset Starters */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono text-[#8B93A7] mr-1">Try preset:</span>
                    {PROMPT_PRESETS.map((preset) => (
                      <button
                        key={preset.title}
                        type="button"
                        onClick={() => setCustomVision(preset.prompt)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white/[0.03] hover:bg-[#2E6BFF]/20 text-slate-300 hover:text-white border border-white/[0.06] hover:border-[#2E6BFF]/40 transition-colors"
                      >
                        {preset.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Tech Stack Chips */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase font-mono tracking-wider font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      3. Target Technology Stack
                    </label>
                    <span className="text-[11px] font-mono text-[#00D2FF]">
                      {selectedTech.length} selected
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABLE_TECH.map((tech) => {
                      const active = selectedTech.includes(tech);
                      return (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => toggleTech(tech)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            active
                              ? "bg-[#2E6BFF] text-white shadow-[0_0_12px_rgba(46,107,255,0.4)] border border-white/20"
                              : "bg-white/[0.03] text-[#8B93A7] hover:text-white border border-white/[0.08]"
                          }`}
                        >
                          {active && <Check className="w-3 h-3" />}
                          <span>{tech}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Core Architecture Modules */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase font-mono tracking-wider font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      4. Architecture Capabilities &amp; Deliverables
                    </label>
                    <span className="text-[11px] font-mono text-amber-400">
                      {selectedModules.length} active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {AVAILABLE_MODULES.map((mod) => {
                      const checked = selectedModules.includes(mod);
                      return (
                        <button
                          key={mod}
                          type="button"
                          onClick={() => toggleModule(mod)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs border transition-all ${
                            checked
                              ? "bg-white/[0.06] border-white/20 text-white"
                              : "bg-white/[0.01] border-white/[0.06] text-[#8B93A7] hover:text-slate-200"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-md flex items-center justify-center text-xs shrink-0 border ${
                              checked
                                ? "bg-emerald-500 border-emerald-400 text-white"
                                : "border-white/20 bg-black/40"
                            }`}
                          >
                            {checked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="leading-snug">{mod}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Budget & Matched Lead Preview Ribbon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Budget Selector */}
                  <div className="p-3.5 rounded-2xl bg-[#05070D] border border-white/[0.08] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A7]">
                      Estimated Budget Tier
                    </span>
                    <select
                      value={budgetTier}
                      onChange={(e) => setBudgetTier(e.target.value)}
                      className="w-full bg-[#0B0F1A] border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#2E6BFF]"
                    >
                      <option value="MVP Sprint (₹25k - ₹50k)">MVP Sprint (₹25k - ₹50k)</option>
                      <option value="Growth (₹50k - ₹1.5L)">Growth (₹50k - ₹1.5L)</option>
                      <option value="Enterprise Scaled (₹1.5L - ₹5L+)">Enterprise Scaled (₹1.5L - ₹5L+)</option>
                    </select>
                  </div>

                  {/* Matched Lead Engineer Card */}
                  <div className="p-3.5 rounded-2xl bg-[#05070D] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A7]">
                        Matched NBS Lead
                      </span>
                      <div className="text-xs font-bold text-white mt-0.5 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5" style={{ color: matchedLead.color }} />
                        <span>{matchedLead.name}</span>
                      </div>
                      <div className="text-[10px] text-[#8B93A7]">{matchedLead.title}</div>
                    </div>
                    <span
                      className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg border"
                      style={{
                        color: matchedLead.color,
                        borderColor: `${matchedLead.color}40`,
                        background: `${matchedLead.color}15`,
                      }}
                    >
                      {archetype.estimatedWeeks}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              /* PREVIEW TAB: System Prompt & Specification */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#8B93A7]">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-white font-bold">PRO_ARCHITECT_SYSTEM_PROMPT.md</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Production Ready
                  </span>
                </div>

                <div className="relative rounded-2xl bg-[#05070D] border border-white/10 p-4 sm:p-5 overflow-x-auto shadow-inner">
                  <pre className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-[#2E6BFF]/40">
                    {generatedPrompt}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer Bar */}
          <div className="px-5 sm:px-8 py-3.5 sm:py-4 bg-[#0B0F1A] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              {/* Copy Pro Prompt */}
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="btn-shimmer flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] text-white text-xs font-semibold shadow-[0_0_20px_rgba(46,107,255,0.4)] transition-all active:scale-95"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? "Copied!" : "Copy Pro Prompt"}</span>
              </button>

              {/* Download Markdown */}
              <button
                type="button"
                onClick={handleDownloadMarkdown}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
                title="Download architecture spec as markdown"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .md</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* WhatsApp Brief */}
              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Brief</span>
              </button>

              {/* Start Project with this spec */}
              <button
                type="button"
                onClick={handlePreFillContact}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white text-xs font-semibold transition-all hover:scale-105"
              >
                <span>Hire NBS Team</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00D2FF]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
