// src/components/TeamMemberCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Download,
  ArrowRight,
  ShieldCheck,
  Mail,
  Phone,
} from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/icons/SocialIcons";
import { TeamMember } from "@/data/team";
import { duration, easing } from "@/motion/tokens";
import { useToast } from "@/components/Toast";

type TeamMemberCardProps = {
  member: TeamMember;
  onSelect: () => void;
  index: number;
};

export default function TeamMemberCard({
  member,
  onSelect,
  index,
}: TeamMemberCardProps) {
  const { showToast } = useToast();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (member.contact?.email) {
      navigator.clipboard.writeText(member.contact.email);
      showToast(`Copied ${member.contact.email} to clipboard!`, "success");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: duration.base,
        delay: index * 0.12,
        ease: easing.standard,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      }}
      className="spotlight-card group relative rounded-3xl p-6 sm:p-7 bg-[#0B0F1A]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#2E6BFF]/50 hover:bg-[#0E1424] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
    >
      {/* Top Identity Block */}
      <div className="space-y-5">
        {/* Member Portrait (3:4 ratio matching assets_ready high-res portraits) */}
        <div
          onClick={onSelect}
          className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#2E6BFF]/40 shadow-inner bg-[#05070D] cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect();
            }
          }}
          aria-label={`Open ${member.name}'s profile modal`}
        >
          <Image
            src={member.avatar}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Founder Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#05070D]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-[#00D2FF]">
            Team Founder
          </div>

          <div className="absolute top-3 right-3 p-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Member Details */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h3
              onClick={onSelect}
              className="text-xl font-bold text-white tracking-tight group-hover:text-[#00D2FF] transition-colors cursor-pointer"
            >
              {member.name}
            </h3>
          </div>
          <div className="text-xs font-semibold text-[#2E6BFF]">
            {member.role}
          </div>
          <p className="text-xs text-[#8B93A7] line-clamp-3 leading-relaxed pt-1">
            {member.summary}
          </p>
        </div>

        {/* Highlight Skills Badges */}
        <div className="space-y-1.5">
          <div className="text-[10px] uppercase tracking-wider font-mono text-[#8B93A7]">
            Core Technologies
          </div>
          <div className="flex flex-wrap gap-1.5">
            {member.allSkills.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#2E6BFF]/10 text-slate-200 border border-[#2E6BFF]/25"
              >
                {skill}
              </span>
            ))}
            {member.allSkills.length > 5 && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-[#8B93A7] border border-white/[0.06]">
                +{member.allSkills.length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 mt-6 border-t border-white/[0.06] space-y-3">
        {/* Social Links & Resume Download */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {member.links.linkedin && (
              <a
                href={member.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 text-[#8B93A7] hover:text-white transition-all"
                aria-label={`${member.name}'s LinkedIn`}
                title={`${member.name}'s LinkedIn`}
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-[#00D2FF]" />
              </a>
            )}
            {member.links.github && (
              <a
                href={member.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 text-[#8B93A7] hover:text-white transition-all"
                aria-label={`${member.name}'s GitHub`}
                title={`${member.name}'s GitHub`}
              >
                <GitHubIcon className="w-3.5 h-3.5 text-white" />
              </a>
            )}
            {member.contact?.phone && (
              <a
                href={`tel:${member.contact.phone?.replace(/\s+/g, "")}`}
                onClick={(e) => {
                  e.stopPropagation();
                  showToast(`Opening dial pad for ${member.name}...`, "info");
                }}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-[#8B93A7] hover:text-emerald-400 transition-all"
                aria-label={`Call ${member.name} (${member.contact.phone})`}
                title={`Call ${member.name} (${member.contact.phone})`}
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            )}
            {member.contact?.email && (
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 text-[#8B93A7] hover:text-[#00D2FF] transition-all"
                aria-label={`Copy ${member.name}'s email address`}
                title={`Copy ${member.contact.email}`}
              >
                <Mail className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <a
            href={member.resumeFile}
            download={member.resumeFileName}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs text-[#8B93A7] hover:text-[#00D2FF] font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* View Full Profile CTA */}
        <button
          onClick={onSelect}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] text-white text-xs font-semibold shadow-[0_0_20px_rgba(46,107,255,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
        >
          <span>View Full Profile &amp; Credentials</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
