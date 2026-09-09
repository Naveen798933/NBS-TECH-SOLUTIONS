// src/components/TeamSection.tsx
"use client";

import React from "react";
import { Users, Download, FileText } from "lucide-react";
import TeamMemberCard from "./TeamMemberCard";
import { teamMembers, TeamMember } from "@/data/team";

type TeamSectionProps = {
  onSelectMember: (member: TeamMember) => void;
};

export default function TeamSection({ onSelectMember }: TeamSectionProps) {
  return (
    <section id="team" className="relative py-24 sm:py-32 bg-[#05070D] border-t border-white/[0.06]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2E6BFF]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F1A] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00D2FF]">
            <Users className="w-3.5 h-3.5" />
            <span>Meet Our Leadership &amp; Engineering Team</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Specialized Engineering.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF]">
              Unified Execution.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#8B93A7] leading-relaxed">
            Three dedicated developers with complementary masteries spanning
            intelligent machine learning, robust software architecture, and modern full-stack web engineering.
          </p>
        </div>

        {/* 3-Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              index={index}
              onSelect={() => onSelectMember(member)}
            />
          ))}
        </div>

        {/* Unified Resumes Download Bar */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#0B0F1A]/80 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <FileText className="w-4 h-4 text-[#2E6BFF]" />
              Official Team Resumes &amp; Documents
            </h4>
            <p className="text-xs text-[#8B93A7]">
              Download original, unedited academic and professional CVs for direct verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {teamMembers.map((member) => (
              <a
                key={member.id}
                href={member.resumeFile}
                download={member.resumeFileName}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/50 text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>{member.name.split(" ")[0]} Resume</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
