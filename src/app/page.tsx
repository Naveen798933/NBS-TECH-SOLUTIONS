// src/app/page.tsx
"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TeamSection from "@/components/TeamSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import TechStackMarquee from "@/components/TechStackMarquee";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProfileModal from "@/components/ProfileModal";
import FloatingDock from "@/components/FloatingDock";
import { ToastProvider } from "@/components/Toast";
import { TeamMember } from "@/data/team";

export default function Home() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <ToastProvider>
      <main className="min-h-screen bg-[#05070D] text-[#F5F7FA] relative selection:bg-[#2E6BFF]/30 selection:text-white">
        {/* Sticky Navigation with Scroll Progress Bar & Live Status */}
        <Navbar />

        {/* Hero Section with Interactive Team Image, Metrics Ribbon & Shimmer CTA */}
        <Hero onSelectMember={setSelectedMember} />

        {/* About Us with Mouse Spotlight Cards */}
        <About />

        {/* Services Portfolio with Expandable Capabilities & Mouse Spotlight */}
        <Services />

        {/* Meet the Team Showcase with Direct Dial & Resume Downloads */}
        <TeamSection onSelectMember={setSelectedMember} />

        {/* Verified Projects Showcase with Instant Search & Tech Filter */}
        <ProjectShowcase onSelectMember={setSelectedMember} />

        {/* Tech Stack Marquee */}
        <TechStackMarquee />

        {/* Contact Section with Click-to-Dial & Automated Gmail Routing */}
        <Contact />

        {/* Footer */}
        <Footer />

        {/* Floating Quick Action Dock */}
        <FloatingDock />

        {/* Tabbed Executive Profile Modal */}
        <ProfileModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      </main>
    </ToastProvider>
  );
}

