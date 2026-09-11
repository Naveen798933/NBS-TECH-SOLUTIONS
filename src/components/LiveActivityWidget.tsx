// src/components/LiveActivityWidget.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, X, ChevronDown, Clock, GitBranch, Zap } from "lucide-react";

const activities = [
  { member: "Naveen", action: "Building real-time collaboration engine", color: "#2E6BFF" },
  { member: "Satish", action: "Training ML pipeline for healthcare", color: "#A78BFA" },
  { member: "Bhovan", action: "Architecting full-stack API layer", color: "#00D2FF" },
];

export default function LiveActivityWidget() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(0);
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const act = activities[currentActivity];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-32 left-4 sm:left-6 z-40 select-none"
      >
        {/* Collapsed pill */}
        {!open && (
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0B0F1A]/95 backdrop-blur-xl border border-white/[0.12] shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(46,107,255,0.2)] text-xs text-white font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 live-dot-pulse shrink-0" />
            <Activity className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span className="hidden sm:inline">Mission Control</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8B93A7]" />
          </motion.button>
        )}

        {/* Expanded panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="w-[280px] sm:w-[320px] rounded-3xl bg-[#0B0F1A]/96 backdrop-blur-2xl border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(46,107,255,0.25)] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 live-dot-pulse" />
                  <span className="text-xs font-bold text-white tracking-wide">
                    Mission Control
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg text-[#8B93A7] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Live Activity */}
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#8B93A7] font-semibold">
                    <GitBranch className="w-3 h-3" />
                    Currently Building
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentActivity}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-1"
                    >
                      <span
                        className="text-xs font-bold"
                        style={{ color: act.color }}
                      >
                        {act.member}
                      </span>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {act.action}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Projects", value: "13+", icon: GitBranch, color: "#2E6BFF" },
                    { label: "Avg Reply", value: "< 6h", icon: Zap, color: "#00D2FF" },
                    { label: "Available", value: "Now", icon: Activity, color: "#34D399" },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.label}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center"
                      >
                        <Icon className="w-3 h-3 mx-auto mb-1" style={{ color: s.color }} />
                        <div className="text-xs font-extrabold text-white">{s.value}</div>
                        <div className="text-[9px] text-[#8B93A7] mt-0.5">{s.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* IST Time */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8B93A7]">
                    <Clock className="w-3 h-3" />
                    <span>IST Time</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00D2FF]">
                    {istTime}
                  </span>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] text-white text-xs font-semibold text-center shadow-[0_0_16px_rgba(46,107,255,0.35)] hover:shadow-[0_0_24px_rgba(46,107,255,0.55)] transition-all"
                >
                  Start a Project →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
