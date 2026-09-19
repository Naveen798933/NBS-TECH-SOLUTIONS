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
import MobileBottomDock from "@/components/MobileBottomDock";
import ProDeveloperPromptStudio from "@/components/ProDeveloperPromptStudio";
import { ToastProvider } from "@/components/Toast";
import { TeamMember } from "@/data/team";

const sectionIds = ["hero", "about", "services", "team", "projects", "tech-stack", "contact"];

export default function Home() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("nbs_theme") !== "light";
    }
    return true;
  });
  const [isPromptStudioOpen, setIsPromptStudioOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track active scroll section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync theme classes with <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

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

      <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-[#2E6BFF]/30 selection:text-white pb-16 md:pb-0">
        {/* Sticky Navigation with scroll progress, section dots & theme toggle */}
        <Navbar
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          onOpenPromptStudio={() => setIsPromptStudioOpen(true)}
        />

        {/* Hero Section — typewriter, count-up stats, IST clock, rotating ticker */}
        <Hero
          onSelectMember={setSelectedMember}
          onOpenPromptStudio={() => setIsPromptStudioOpen(true)}
        />

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

        {/* Desktop-Only Floating Quick Action Dock */}
        <FloatingDock />

        {/* Native Mobile Floating Bottom Dock */}
        <MobileBottomDock
          activeSection={activeSection}
          onOpenPromptStudio={() => setIsPromptStudioOpen(true)}
        />

        {/* Mission Control floating widget */}
        <LiveActivityWidget />

        {/* Tabbed Executive Profile Modal */}
        <ProfileModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />

        {/* Pro Developer AI Prompt & Architecture Studio */}
        <ProDeveloperPromptStudio
          isOpen={isPromptStudioOpen}
          onClose={() => setIsPromptStudioOpen(false)}
        />
      </main>
    </ToastProvider>
  );
}
