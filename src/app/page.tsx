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
import { TeamMember } from "@/data/team";

export default function Home() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <main className="min-h-screen bg-[#05070D] text-[#F5F7FA] relative selection:bg-[#2E6BFF]/30 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Hero Section with Interactive Team Image & Hotspots */}
      <Hero onSelectMember={setSelectedMember} />

      {/* About Us */}
      <About />

      {/* Services Portfolio */}
      <Services />

      {/* Meet the Team Showcase */}
      <TeamSection onSelectMember={setSelectedMember} />

      {/* Verified Projects Showcase */}
      <ProjectShowcase onSelectMember={setSelectedMember} />

      {/* Tech Stack Marquee */}
      <TechStackMarquee />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Shared Signature Profile Modal */}
      <ProfileModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </main>
  );
}
