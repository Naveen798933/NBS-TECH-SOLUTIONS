// src/components/Footer.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  ArrowUpRight,
  Clock,
  Bell,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

// Inline social icons (lucide-react version doesn't export Github/Linkedin)
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import { easing, duration } from "@/motion/tokens";

const teamLinks = [
  { name: "Kota Naveen", github: "https://github.com/KotaNaveen", linkedin: "https://linkedin.com/in/kota-naveen" },
  { name: "Satish Reddy", linkedin: "https://www.linkedin.com/in/bayana-sathish-reddy" },
  { name: "Bhovan Chandra", github: "https://github.com/bhovanchandarkokkiligadda", linkedin: "https://linkedin.com/in/bhovanchandarkokkiligadda" },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Contact", href: "#contact" },
];

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing.standard } },
};

export default function Footer() {
  const [istTime, setIstTime] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    const list = JSON.parse(localStorage.getItem("nbs_newsletter") ?? "[]");
    if (!list.includes(email)) {
      list.push(email);
      localStorage.setItem("nbs_newsletter", JSON.stringify(list));
    }
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#05070D] pt-16 pb-8 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-[#2E6BFF]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.base, ease: easing.standard }}
          className="mb-14 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B0F1A] to-[#05070D] border border-[#2E6BFF]/30 shadow-[0_0_40px_rgba(46,107,255,0.15)] text-center"
        >
          <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF]">
              Build Something?
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#8B93A7] max-w-xl mx-auto mb-6">
            Whether you need a web app, AI integration, or a custom software tool — we&apos;re available now.
          </p>
          <a
            href="#contact"
            className="btn-shimmer inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] shadow-[0_0_24px_rgba(46,107,255,0.4)] hover:shadow-[0_0_36px_rgba(46,107,255,0.65)] transition-all hover:-translate-y-0.5"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Footer Columns */}
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* Brand Column */}
          <motion.div variants={ITEM_VARIANTS} className="lg:col-span-1 space-y-5">
            <div className="h-9 px-2.5 py-1 rounded-xl bg-white inline-flex items-center shadow-[0_0_20px_rgba(46,107,255,0.3)]">
              <Image
                src="/images/logo.png"
                alt="NBS Tech Solutions"
                width={120}
                height={36}
                className="h-6 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-[#8B93A7] leading-relaxed max-w-xs">
              A three-member engineering team building scalable, production-grade technology across web, AI, and software domains.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8B93A7]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#2E6BFF]" />
              <span>Vijayawada, Andhra Pradesh, India</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#8B93A7]">
              <Clock className="w-3.5 h-3.5 shrink-0 text-[#00D2FF]" />
              <span className="font-mono text-[#00D2FF]">{istTime}</span>
              <span className="text-[10px]">IST</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={ITEM_VARIANTS} className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-white font-mono">Quick Links</div>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#8B93A7] hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#2E6BFF] group-hover:bg-[#00D2FF] transition-colors shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Team Links */}
          <motion.div variants={ITEM_VARIANTS} className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-white font-mono">The Team</div>
            <div className="space-y-4">
              {teamLinks.map((t) => (
                <div key={t.name}>
                  <div className="text-xs font-semibold text-slate-300 mb-1.5">{t.name}</div>
                  <div className="flex gap-2">
                    {t.github && (
                      <a
                        href={t.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] text-[#8B93A7] hover:text-white transition-all"
                        aria-label={`${t.name} GitHub`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {t.linkedin && (
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/[0.08] hover:border-[#2E6BFF]/40 text-[#8B93A7] hover:text-[#2E6BFF] transition-all"
                        aria-label={`${t.name} LinkedIn`}
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter + Contact */}
          <motion.div variants={ITEM_VARIANTS} className="space-y-5">
            <div className="text-xs font-bold uppercase tracking-widest text-white font-mono">Stay Updated</div>
            <p className="text-xs text-[#8B93A7] leading-relaxed">
              Get notified about our new projects and open-source releases.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8B93A7] pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder:text-[#8B93A7]/60 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] text-xs font-bold text-white flex items-center justify-center gap-2 hover:shadow-[0_0_16px_rgba(46,107,255,0.4)] transition-all"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-3.5 h-3.5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>
            <a
              href="mailto:nbstechsolutions3@gmail.com"
              className="flex items-center gap-2 text-xs text-[#8B93A7] hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#2E6BFF]" />
              nbstechsolutions3@gmail.com
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="glow-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8B93A7]">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} NBS Tech Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot-pulse" />
            <span>All systems operational</span>
          </div>
          <div className="text-center sm:text-right font-mono">
            Built with Next.js &amp; Framer Motion
          </div>
        </div>
      </div>
    </footer>
  );
}
