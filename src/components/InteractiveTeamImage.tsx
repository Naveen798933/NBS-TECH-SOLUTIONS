// src/components/InteractiveTeamImage.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User, ArrowRight } from "lucide-react";
import { TeamMember, teamMembers } from "@/data/team";
import { easing, duration } from "@/motion/tokens";

type InteractiveTeamImageProps = {
  onSelectMember: (member: TeamMember) => void;
};

export default function InteractiveTeamImage({
  onSelectMember,
}: InteractiveTeamImageProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Precise percentage-based bounding zones corresponding to the 3 founders in team-hero.jpg
  const hotspots: {
    id: "satish" | "bhovan" | "naveen";
    name: string;
    role: string;
    style: {
      left: string;
      top: string;
      width: string;
      height: string;
    };
    pinPosition: { left: string; top: string };
  }[] = [
    {
      id: "satish",
      name: "Satish Reddy",
      role: "AI Analyst — Python Developer",
      style: {
        left: "7%",
        top: "8%",
        width: "28%",
        height: "88%",
      },
      pinPosition: { left: "21%", top: "18%" },
    },
    {
      id: "bhovan",
      name: "Bhovan Chandra",
      role: "Trainee Software Engineer | AI & ML",
      style: {
        left: "35%",
        top: "6%",
        width: "25%",
        height: "90%",
      },
      pinPosition: { left: "47.5%", top: "16%" },
    },
    {
      id: "naveen",
      name: "Kota Naveen",
      role: "Full-Stack Web Developer",
      style: {
        left: "60%",
        top: "8%",
        width: "26%",
        height: "88%",
      },
      pinPosition: { left: "73%", top: "18%" },
    },
  ];

  const handleMemberClick = (id: "satish" | "bhovan" | "naveen") => {
    const member = teamMembers.find((m) => m.id === id);
    if (member) {
      onSelectMember(member);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.8)] bg-[#0B0F1A] group/frame">
      {/* Background Glow Beams */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#2E6BFF]/20 blur-[90px] pointer-events-none" />

      {/* Main Image Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden select-none">
        <Image
          src="/images/team-hero.jpg"
          alt="NBS Tech Solutions Founders: Satish Reddy (Left), Bhovan Chandra (Middle), Kota Naveen (Right)"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          className={`object-cover object-center transition-transform duration-700 ease-out ${
            hoveredId ? "scale-[1.02]" : "scale-100"
          }`}
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-[#05070D]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070D]/40 via-transparent to-[#05070D]/40 pointer-events-none" />

        {/* Subtle Interactive Instruction Banner (Desktop only inside image so mobile faces are 100% visible and unblocked) */}
        <div
          className={`hidden sm:flex absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-[#05070D]/80 backdrop-blur-md border border-white/10 shadow-lg items-center gap-2 pointer-events-none transition-opacity duration-300 ${
            hoveredId ? "opacity-30" : "opacity-90"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00D2FF] animate-pulse" />
          <span className="text-[11px] font-medium text-slate-200 tracking-wide">
            Click any team member to explore verified profile &amp; resume
          </span>
        </div>

        {/* Hotspots for each person */}
        {hotspots.map((spot) => {
          const isHovered = hoveredId === spot.id;
          const isDimmed = hoveredId !== null && !isHovered;

          return (
            <div
              key={spot.id}
              style={spot.style}
              className={`absolute cursor-pointer z-20 rounded-2xl sm:rounded-3xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6BFF] ${
                isHovered
                  ? "bg-[#2E6BFF]/10 shadow-[0_0_35px_rgba(46,107,255,0.4)] border border-[#2E6BFF]/40"
                  : isDimmed
                  ? "opacity-60"
                  : "bg-transparent border border-transparent hover:border-white/20"
              }`}
              onMouseEnter={() => setHoveredId(spot.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleMemberClick(spot.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleMemberClick(spot.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${spot.name}'s verified professional profile and resume`}
            >
              {/* Interactive Pulse Marker */}
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: "50%",
                  top: spot.id === "bhovan" ? "22%" : "25%",
                }}
              >
                <div
                  className={`relative flex items-center justify-center transition-transform duration-300 ${
                    isHovered ? "scale-125" : "scale-100"
                  }`}
                >
                  <span
                    className={`absolute inline-flex h-7 w-7 rounded-full bg-[#2E6BFF] opacity-75 ${
                      isHovered ? "animate-ping" : "animate-pulse"
                    }`}
                  />
                  <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF] text-white shadow-[0_0_12px_#2E6BFF] border border-white/60">
                    <User className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>

              {/* Hover Tooltip / Floating Card */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{
                      duration: duration.micro,
                      ease: easing.standard,
                    }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[220px] sm:w-[260px] pointer-events-none z-30"
                  >
                    <div className="p-3.5 rounded-2xl bg-[#05070D]/90 backdrop-blur-xl border border-[#2E6BFF]/40 shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(46,107,255,0.3)] text-center">
                      <div className="text-[10px] uppercase font-mono tracking-widest text-[#00D2FF] font-semibold mb-0.5">
                        Team Founder
                      </div>
                      <div className="text-sm font-bold text-white tracking-tight">
                        {spot.name}
                      </div>
                      <div className="text-[11px] text-[#8B93A7] line-clamp-1 mb-2.5">
                        {spot.role}
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E6BFF] text-white text-[11px] font-semibold shadow-[0_0_12px_rgba(46,107,255,0.6)]">
                        <span>View Profile &amp; Resume</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Persistent Bottom Bar with 3 quick-click member chips */}
      <div className="px-4 py-3 sm:py-4 bg-[#05070D]/90 backdrop-blur-xl border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-[#8B93A7] flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
            <span>Verified Engineering Founders</span>
          </div>
          <span className="sm:hidden text-[10px] text-[#00D2FF] font-mono">
            Tap to view profile
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
          {teamMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => onSelectMember(member)}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`px-3 py-1.5 rounded-xl text-left transition-all duration-200 border flex items-center gap-2 ${
                hoveredId === member.id
                  ? "bg-[#2E6BFF]/20 border-[#2E6BFF]/50 text-white shadow-[0_0_16px_rgba(46,107,255,0.25)]"
                  : "bg-white/[0.03] border-white/[0.06] text-[#8B93A7] hover:text-white hover:border-white/20"
              }`}
            >
              <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white/20">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold truncate leading-tight">
                  {member.name.split(" ")[0]}
                </div>
                <div className="text-[10px] text-[#8B93A7] truncate">
                  {member.id === "satish"
                    ? "AI Analyst"
                    : member.id === "bhovan"
                    ? "Full-Stack Dev"
                    : "Web Developer"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
