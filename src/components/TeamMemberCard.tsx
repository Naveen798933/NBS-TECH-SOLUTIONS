// src/components/TeamMemberCard.tsx
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import { TeamMember } from "@/data/team";
import { easing, duration } from "@/motion/tokens";

type TeamMemberCardProps = {
  member: TeamMember;
  index: number;
  onSelect: () => void;
};

// SVG Radar Chart (5 axes: Frontend, Backend, AI/ML, DevOps, Design)
const radarData: Record<string, number[]> = {
  satish:  [30, 50, 95, 40, 45],  // Frontend, Backend, AI/ML, DevOps, Automation
  bhovan:  [75, 80, 85, 50, 60],
  naveen:  [90, 92, 65, 80, 55],
};

const radarLabels = ["Frontend", "Backend", "AI/ML", "DevOps", "Design"];

function RadarChart({ scores, color }: { scores: number[]; color: string }) {
  const cx = 72, cy = 72, r = 52;
  const n = scores.length;

  const point = (score: number, i: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const dist = (score / 100) * r;
    return [cx + dist * Math.cos(angle), cy + dist * Math.sin(angle)] as [number, number];
  };

  const labelPoint = (i: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + (r + 14) * Math.cos(angle), cy + (r + 14) * Math.sin(angle)] as [number, number];
  };

  const gridLevels = [25, 50, 75, 100];
  const filledPoints = scores.map((s, i) => point(s, i));
  const polygonPath = filledPoints.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + " Z";

  return (
    <svg width="144" height="144" viewBox="0 0 144 144" className="overflow-visible">
      {/* Grid rings */}
      {gridLevels.map((lvl) => {
        const pts = Array.from({ length: n }, (_, i) => point(lvl, i));
        const path = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + " Z";
        return (
          <path
            key={lvl}
            d={path}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis spokes */}
      {Array.from({ length: n }, (_, i) => {
        const [x, y] = point(100, i);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x.toFixed(1)}
            y2={y.toFixed(1)}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        );
      })}

      {/* Filled polygon */}
      <motion.path
        d={polygonPath}
        fill={`${color}25`}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="radar-polygon"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: easing.standard }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Data point dots */}
      {filledPoints.map(([x, y], i) => (
        <circle
          key={i}
          cx={x.toFixed(1)}
          cy={y.toFixed(1)}
          r="3"
          fill={color}
          opacity="0.9"
        />
      ))}

      {/* Labels */}
      {radarLabels.map((label, i) => {
        const [lx, ly] = labelPoint(i);
        return (
          <text
            key={label}
            x={lx.toFixed(1)}
            y={ly.toFixed(1)}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill="rgba(139,147,167,0.9)"
            fontFamily="monospace"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

const memberColors: Record<string, string> = {
  satish: "#A78BFA",
  bhovan: "#00D2FF",
  naveen: "#2E6BFF",
};

const codingStatus: Record<string, string[]> = {
  satish: ["Building AI Telegram bot...", "Training ML pipeline...", "Writing Gemini prompts..."],
  bhovan: ["Architecting API layer...", "Implementing RAG system...", "Debugging WebSocket..."],
  naveen: ["Deploying Docker containers...", "Building real-time collab...", "Optimizing DB queries..."],
};

export default function TeamMemberCard({ member, index, onSelect }: TeamMemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [holoStyle, setHoloStyle] = useState({});
  const [statusIdx] = useState(() => Math.floor(Math.random() * 3));

  const color = memberColors[member.id] ?? "#2E6BFF";
  const scores = radarData[member.id] ?? [70, 70, 70, 70, 70];
  const status = codingStatus[member.id]?.[statusIdx] ?? "Writing code...";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - cx) / (rect.width / 2)) * 6;
    const rotateX = -((e.clientY - cy) / (rect.height / 2)) * 4;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: duration.base, delay: index * 0.1, ease: easing.standard }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="holo-card group relative rounded-3xl bg-[#0B0F1A]/85 backdrop-blur-md border border-white/[0.08] hover:border-white/20 transition-colors duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden cursor-default"
      style={{ willChange: "transform", transitionProperty: "transform, border-color" }}
    >
      {/* Holographic shimmer overlay */}
      <div className="holo-overlay" />

      {/* Color accent top bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />

      <div className="p-6 space-y-5">
        {/* Avatar + name */}
        <div className="flex items-center gap-4">
          <div
            className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2"
            style={{ borderColor: `${color}60`, boxShadow: `0 0 16px ${color}30` }}
          >
            <Image src={member.avatar} alt={member.name} fill className="object-cover object-top" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white truncate group-hover:text-[#00D2FF] transition-colors">
              {member.name}
            </h3>
            <p className="text-[11px] text-[#8B93A7] leading-tight mt-0.5 line-clamp-2">{member.role}</p>
          </div>
        </div>

        {/* "Currently coding" terminal ticker */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-[#05070D]/80 border border-white/[0.05]">
          <Terminal className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color }} />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A7] mb-0.5">Currently</div>
            <p className="text-xs font-mono text-slate-300 leading-snug">{status}</p>
          </div>
        </div>

        {/* Radar chart */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-[10px] uppercase tracking-wider font-mono text-[#8B93A7]">Skill Profile</div>
          <RadarChart scores={scores} color={color} />
        </div>

        {/* Skills count + View profile button */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-base font-bold text-white">{member.allSkills.length}+</div>
              <div className="text-[10px] text-[#8B93A7]">Skills</div>
            </div>
            <div className="text-center">
              <div className="text-base font-bold" style={{ color }}>{member.projects.length}</div>
              <div className="text-[10px] text-[#8B93A7]">Projects</div>
            </div>
          </div>

          <button
            onClick={onSelect}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${color}30, ${color}15)`,
              border: `1px solid ${color}40`,
              boxShadow: `0 0 12px ${color}20`,
            }}
          >
            <span>View Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
