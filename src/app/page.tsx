// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TeamSection from "@/components/TeamSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import TechStackMarquee from "@/components/TechStackMarquee";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProfileModal from "@/components/ProfileModal";
import FloatingDock from "@/components/FloatingDock";
import LoadingScreen from "@/components/LoadingScreen";
import LiveActivityWidget from "@/components/LiveActivityWidget";
import { ToastProvider } from "@/components/Toast";
import { TeamMember } from "@/data/team";

export default function Home() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Persist theme to localStorage and apply to <html>
  useEffect(() => {
    const saved = localStorage.getItem("nbs_theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        localStorage.setItem("nbs_theme", "dark");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        localStorage.setItem("nbs_theme", "light");
      }
      return next;
    });
  };

  return (
    <ToastProvider>
      {/* Session-throttled loading screen */}
      <LoadingScreen />

      <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-[#2E6BFF]/30 selection:text-white">
        {/* Sticky Navigation with scroll progress, section dots & theme toggle */}
        <Navbar isDark={isDark} onToggleTheme={handleToggleTheme} />

        {/* Hero Section — typewriter, count-up stats, IST clock, rotating ticker */}
        <Hero onSelectMember={setSelectedMember} />

        {/* About — 3D tilt cards, animated process timeline, badge carousel */}
        <About />

        {/* Services — 3D flip cards with color-coded accents */}
        <Services />

        {/* Team Showcase */}
        <TeamSection onSelectMember={setSelectedMember} />

        {/* Projects — featured hero card, status badges, sort by, hover overlay */}
        <ProjectShowcase onSelectMember={setSelectedMember} />

        {/* Testimonials drag carousel */}
        <Testimonials />

        {/* Tech Stack Marquee — SVG logos, tooltips, category filters */}
        <TechStackMarquee />

        {/* Contact — visual service picker, budget slider, WhatsApp CTA */}
        <Contact />

        {/* Footer — IST clock, newsletter, staggered columns */}
        <Footer />

        {/* Floating Quick Action Dock */}
        <FloatingDock />

        {/* Mission Control floating widget */}
        <LiveActivityWidget />

        {/* Tabbed Executive Profile Modal */}
        <ProfileModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      </main>
    </ToastProvider>
  );
}
