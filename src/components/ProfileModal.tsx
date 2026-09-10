// src/components/ProfileModal.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Eye,
  ExternalLink,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  ShieldCheck,
  Sparkles,
  Layers,
} from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/icons/SocialIcons";
import { TeamMember } from "@/data/team";
import { easing, duration, springConfig } from "@/motion/tokens";
import { useToast } from "@/components/Toast";

type ProfileModalProps = {
  member: TeamMember | null;
  onClose: () => void;
};

type ModalTab = "overview" | "skills" | "projects" | "experience";

export default function ProfileModal({ member, onClose }: ProfileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ModalTab>("overview");
  const [prevMemberId, setPrevMemberId] = useState<string | null>(null);
  const { showToast } = useToast();

  // Reset tab when member changes without useEffect setState
  if (member && member.id !== prevMemberId) {
    setPrevMemberId(member.id);
    setActiveTab("overview");
  }

  // Focus trap and Escape key listener
  useEffect(() => {
    if (!member) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [member, onClose]);

  if (!member) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
      >
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.base, ease: easing.standard }}
          onClick={onClose}
          className="fixed inset-0 bg-[#05070D]/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          initial={{
            opacity: 0,
            scale: 0.94,
            y: member.heroPosition === "left" ? 20 : member.heroPosition === "right" ? 20 : 30,
          }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ ...springConfig }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0B0F1A] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(46,107,255,0.2)] overflow-hidden z-10"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 px-6 py-4 bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-7 px-2 py-0.5 rounded-lg bg-white flex items-center shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="NBS Tech Solutions"
                  width={80}
                  height={22}
                  className="h-5 w-auto object-contain"
                />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#2E6BFF]/15 text-[#00D2FF] border border-[#2E6BFF]/30">
                Team Founder
              </span>
              <span className="text-xs text-[#8B93A7] hidden sm:inline border-l border-white/10 pl-2">
                Verified Credentials
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-[#8B93A7] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6BFF]"
              aria-label="Close profile modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-8 custom-scrollbar">
            {/* Top Identity Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-white/[0.08]">
              {/* Portrait */}
              <div className="relative w-32 h-40 sm:w-36 sm:h-44 rounded-2xl overflow-hidden shrink-0 border-2 border-[#2E6BFF]/40 shadow-[0_0_24px_rgba(46,107,255,0.3)] bg-[#05070D]">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Title & Actions */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2
                    id="profile-modal-title"
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
                  >
                    {member.name}
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                <div className="text-sm sm:text-base font-semibold text-[#00D2FF]">
                  {member.role}
                </div>

                <p className="text-xs sm:text-sm text-[#8B93A7] italic leading-relaxed">
                  &ldquo;{member.headline}&rdquo;
                </p>

                {/* Contact & Social Links with Toast feedback */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  {member.links.linkedin && (
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 text-xs text-[#8B93A7] hover:text-white transition-all"
                    >
                      <LinkedInIcon className="w-3.5 h-3.5 text-[#00D2FF]" />
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}

                  {member.links.github && (
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 hover:border-[#2E6BFF]/40 text-xs text-[#8B93A7] hover:text-white transition-all"
                    >
                      <GitHubIcon className="w-3.5 h-3.5 text-white" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}

                  {member.contact?.email && (
                    <button
                      type="button"
                      onClick={() => {
                        if (member.contact?.email) {
                          navigator.clipboard.writeText(member.contact.email);
                          showToast(`Copied ${member.contact.email} to clipboard!`, "success");
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs text-[#8B93A7] hover:text-white transition-all"
                      title="Click to copy email address"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>{member.contact.email}</span>
                    </button>
                  )}

                  {member.contact?.phone && (
                    <a
                      href={`tel:${member.contact.phone?.replace(/\s+/g, "")}`}
                      onClick={() => showToast(`Opening dial pad for ${member.name}...`, "info")}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-xs text-[#8B93A7] hover:text-white transition-all group"
                      title={`Call ${member.name} (${member.contact.phone}) on phone dial pad`}
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>{member.contact.phone}</span>
                    </a>
                  )}
                </div>

                {/* Primary Action Buttons: Resume */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3">
                  <a
                    href={member.resumeFile}
                    download={member.resumeFileName}
                    className="btn-shimmer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] text-white text-xs font-semibold shadow-[0_0_20px_rgba(46,107,255,0.4)] transition-all hover:scale-[1.02]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume ({member.resumeFileName.endsWith('.pdf') ? 'PDF' : 'DOCX'})</span>
                  </a>

                  <a
                    href={member.resumeViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all hover:scale-[1.02]"
                  >
                    <Eye className="w-4 h-4 text-[#00D2FF]" />
                    <span>View Resume in Browser</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Segmented Tab Navigation Bar */}
            <div role="tablist" aria-label="Profile sections" className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#05070D]/80 border border-white/[0.08] overflow-x-auto">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "overview"
                    ? "bg-[#2E6BFF] text-white shadow-[0_0_15px_rgba(46,107,255,0.4)]"
                    : "text-[#8B93A7] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                Overview &amp; Bio
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "skills"}
                onClick={() => setActiveTab("skills")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "skills"
                    ? "bg-[#2E6BFF] text-white shadow-[0_0_15px_rgba(46,107,255,0.4)]"
                    : "text-[#8B93A7] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                Skills Matrix ({member.allSkills.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "projects"}
                onClick={() => setActiveTab("projects")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "projects"
                    ? "bg-[#2E6BFF] text-white shadow-[0_0_15px_rgba(46,107,255,0.4)]"
                    : "text-[#8B93A7] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                Key Projects ({member.projects.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "experience"}
                onClick={() => setActiveTab("experience")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "experience"
                    ? "bg-[#2E6BFF] text-white shadow-[0_0_15px_rgba(46,107,255,0.4)]"
                    : "text-[#8B93A7] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                Experience &amp; Education
              </button>
            </div>

            {/* TAB CONTENT PANELS */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Professional Summary */}
                <div className="space-y-2.5">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#00D2FF] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Executive Summary
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed bg-[#05070D]/60 p-4 rounded-2xl border border-white/[0.06]">
                    {member.summary}
                  </p>
                </div>

                {/* Core Strengths */}
                {member.strengths && (
                  <div className="space-y-2.5">
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-[#00D2FF] flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5" />
                      Core Engineering Strengths
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {member.strengths.map((str) => (
                        <span
                          key={str}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-[#2E6BFF]/10 text-white border border-[#2E6BFF]/30 shadow-sm"
                        >
                          {str}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Highlights Quick Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#05070D]/60 border border-white/[0.06] text-center">
                    <div className="text-lg font-bold text-white">{member.allSkills.length}+</div>
                    <div className="text-[11px] text-[#8B93A7]">Documented Skills</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#05070D]/60 border border-white/[0.06] text-center">
                    <div className="text-lg font-bold text-[#00D2FF]">{member.projects.length}</div>
                    <div className="text-[11px] text-[#8B93A7]">Production Projects</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#05070D]/60 border border-white/[0.06] text-center">
                    <div className="text-lg font-bold text-emerald-400">100%</div>
                    <div className="text-[11px] text-[#8B93A7]">Academic Verified</div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "skills" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {member.skills.map((grp) => (
                    <div
                      key={grp.category}
                      className="p-4 rounded-xl bg-[#05070D]/60 border border-white/[0.06] space-y-2.5"
                    >
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span>{grp.category}</span>
                        <span className="text-[10px] font-mono text-[#00D2FF]">
                          {grp.items.length} skills
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {grp.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#2E6BFF]/10 text-slate-200 border border-[#2E6BFF]/25 hover:border-[#2E6BFF]/50 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "projects" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {member.projects.map((proj) => (
                  <div
                    key={proj.name}
                    className="p-4 rounded-xl bg-[#05070D]/60 border border-white/[0.06] hover:border-[#2E6BFF]/30 transition-colors space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-bold text-white text-sm">
                        {proj.name}
                      </div>
                      {proj.subtitle && (
                        <div className="text-[11px] text-[#00D2FF] font-mono">
                          {proj.subtitle}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.04] text-[#8B93A7] border border-white/[0.08]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "experience" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Experience */}
                {member.experience.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#00D2FF] flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      Internship &amp; Experience
                    </h4>
                    <div className="space-y-3">
                      {member.experience.map((exp, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-[#05070D]/60 border border-white/[0.06] space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="font-bold text-white text-sm">
                              {exp.title}
                            </div>
                            {exp.period && (
                              <span className="text-[11px] text-[#8B93A7] font-mono">
                                {exp.period}
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-semibold text-[#2E6BFF]">
                            {exp.org}
                          </div>
                          {exp.description && (
                            <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                              {exp.description.map((point, pIdx) => (
                                <li key={pIdx}>{point}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#00D2FF] flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5" />
                    Education History
                  </h4>
                  <div className="space-y-2.5">
                    {member.education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#05070D]/60 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {edu.degree}
                          </div>
                          <div className="text-xs text-[#8B93A7]">
                            {edu.institution}
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          {edu.period && (
                            <div className="text-xs font-mono text-slate-300">
                              {edu.period}
                            </div>
                          )}
                          {edu.score && (
                            <div className="text-xs font-semibold text-[#00D2FF]">
                              {edu.score}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                {member.certifications.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#00D2FF] flex items-center gap-2">
                      <Award className="w-3.5 h-3.5" />
                      Verified Certifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.certifications.map((cert) => (
                        <div
                          key={cert}
                          className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-slate-200 flex items-center gap-1.5"
                        >
                          <Award className="w-3 h-3 text-[#2E6BFF]" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 bg-[#0B0F1A]/95 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#8B93A7]">
            <span>NBS Tech Solutions &bull; Engineering Profile</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
