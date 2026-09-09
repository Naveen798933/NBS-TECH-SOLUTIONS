// src/components/ProjectShowcase.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  ArrowUpRight,
  User,
  Search,
  X,
  Sparkles,
} from "lucide-react";
import { projects } from "@/data/projects";
import { teamMembers, TeamMember } from "@/data/team";
import { easing, duration } from "@/motion/tokens";

type ProjectShowcaseProps = {
  onSelectMember: (member: TeamMember) => void;
};

const categories = [
  "All",
  "AI & Machine Learning",
  "Full-Stack Web",
  "Real-Time Systems",
  "Software Engineering",
] as const;

export default function ProjectShowcase({
  onSelectMember,
}: ProjectShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)) ||
        p.authorName.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  const handleAuthorClick = (authorId: string) => {
    const member = teamMembers.find((m) => m.id === authorId);
    if (member) {
      onSelectMember(member);
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#05070D] border-t border-white/[0.06] scroll-mt-20">
      {/* Glow Backdrop */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#2E6BFF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F1A] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00D2FF]">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Verified Portfolio Work</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Featured Projects &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF]">
              Engineering
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#8B93A7] leading-relaxed">
            Real software architectures built and deployed across the team.
            Every project below originates directly from the verified resumes of our three engineers.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-5 max-w-4xl mx-auto mb-12">
          {/* Instant Search Bar */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8B93A7]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or keyword (e.g. Next.js, Python, Docker)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-full bg-[#0B0F1A]/90 border border-white/10 focus:border-[#2E6BFF] focus:ring-2 focus:ring-[#2E6BFF]/30 text-xs text-white placeholder:text-[#8B93A7] transition-all outline-none shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8B93A7] hover:text-white transition-colors"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Project Categories">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-white bg-[#2E6BFF] shadow-[0_0_20px_rgba(46,107,255,0.5)] border border-white/20"
                      : "text-[#8B93A7] bg-[#0B0F1A] hover:text-white border border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Live Counter & Active Search indicator */}
          <div className="flex items-center justify-between text-xs text-[#8B93A7] px-2 font-mono">
            <div>
              Showing <span className="text-white font-bold">{filteredProjects.length}</span> of{" "}
              <span>{projects.length}</span> verified projects
            </div>
            {searchQuery && (
              <div className="flex items-center gap-1.5 text-[#00D2FF]">
                <span>Filter: &quot;{searchQuery}&quot;</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="underline hover:text-white text-[11px]"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-[#0B0F1A]/60 border border-white/10 max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2E6BFF]/20 border border-[#2E6BFF]/30 flex items-center justify-center text-[#00D2FF] mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-lg font-bold text-white">No projects found</div>
            <p className="text-xs text-[#8B93A7] leading-relaxed">
              We couldn&apos;t find any projects matching &quot;{searchQuery}&quot; in this category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="px-5 py-2 rounded-full text-xs font-semibold bg-[#2E6BFF] text-white hover:bg-[#3D79FF] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: duration.base,
                    ease: easing.standard,
                    delay: idx * 0.04,
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
                  }}
                  className="spotlight-card group relative rounded-2xl sm:rounded-3xl p-6 bg-[#0B0F1A]/80 backdrop-blur-md border border-white/[0.08] hover:border-[#2E6BFF]/40 hover:bg-[#0E1424] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                >
                <div className="space-y-4">
                  {/* Top Bar: Category & Author Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-white/[0.04] text-[#00D2FF] border border-white/[0.08]">
                      {project.category}
                    </span>

                    <button
                      onClick={() => handleAuthorClick(project.authorId)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#2E6BFF]/10 text-slate-200 hover:text-white border border-[#2E6BFF]/30 hover:border-[#2E6BFF] transition-colors"
                      title={`View ${project.authorName}'s full profile`}
                    >
                      <User className="w-3 h-3 text-[#2E6BFF]" />
                      <span>{project.authorName.split(" ")[0]}</span>
                    </button>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#00D2FF] transition-colors">
                      {project.title}
                    </h3>
                    <div className="text-xs text-[#8B93A7] font-mono mt-0.5">
                      {project.subtitle}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights Bullet points */}
                  <div className="space-y-1.5 pt-1">
                    {project.highlights.map((item, hIdx) => (
                      <div
                        key={hIdx}
                        className="text-xs text-[#8B93A7] flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#2E6BFF] shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Chips & Action Button */}
                <div className="pt-6 mt-4 border-t border-white/[0.06] space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchQuery(t);
                        }}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.03] hover:bg-[#2E6BFF]/20 text-slate-300 hover:text-white border border-white/[0.06] hover:border-[#2E6BFF]/40 transition-colors"
                        title={`Filter projects by ${t}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAuthorClick(project.authorId)}
                    className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/[0.08] hover:border-[#2E6BFF]/50 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all group-hover:shadow-[0_0_20px_rgba(46,107,255,0.25)]"
                  >
                    <span>View Engineer Credentials</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#00D2FF]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        )}
      </div>
    </section>
  );
}
