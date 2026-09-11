// src/components/Contact.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Globe,
  Cpu,
  Sparkles,
  Layers,
  Workflow,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { easing, duration } from "@/motion/tokens";

const BUDGET_STEPS = [
  { value: 0, label: "₹20,000" },
  { value: 1, label: "₹50,000" },
  { value: 2, label: "₹1,00,000" },
  { value: 3, label: "₹2,50,000" },
  { value: 4, label: "₹5,00,000" },
  { value: 5, label: "₹5,00,000+" },
];

const serviceOptions = [
  { id: "web-dev", icon: Globe, label: "Web Development", color: "#2E6BFF" },
  { id: "software-dev", icon: Cpu, label: "Software Dev", color: "#F59E0B" },
  { id: "ai-ml", icon: Sparkles, label: "AI & ML", color: "#A78BFA" },
  { id: "full-stack", icon: Layers, label: "Full-Stack App", color: "#00D2FF" },
  { id: "automation", icon: Workflow, label: "Automation", color: "#34D399" },
  { id: "business-site", icon: Briefcase, label: "Business Site", color: "#FB923C" },
];

const MAX_MESSAGE_LENGTH = 1500;

function CharCounter({ current, max }: { current: number; max: number }) {
  const pct = current / max;
  const color = pct < 0.7 ? "#8B93A7" : pct < 0.9 ? "#F59E0B" : "#EF4444";
  return (
    <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[11px] font-mono" style={{ color }}>
      <span>{current}/{max}</span>
    </div>
  );
}

export default function Contact() {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "", email: "", company: "", service: "", message: "", phone: "",
  });
  const [budget, setBudget] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Check for ?service= query param to pre-fill
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const svc = params.get("service");
    if (svc) setForm((prev) => ({ ...prev, service: svc }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (id: string) => {
    setForm((prev) => ({ ...prev, service: id }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.service) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    setIsSubmitting(true);
    const budgetLabel = BUDGET_STEPS[budget]?.label ?? "Not specified";
    const selectedService = serviceOptions.find((s) => s.id === form.service)?.label ?? form.service;

    const subject = encodeURIComponent(`[NBS Portfolio] Project Inquiry: ${selectedService} from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ""}${form.company ? `\nCompany: ${form.company}` : ""}\n\nService: ${selectedService}\nBudget Range: ${budgetLabel}\n\nMessage:\n${form.message}\n\n---\nSent via NBS Portfolio Contact Form`
    );

    try {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=nbstechsolutions3@gmail.com&su=${subject}&body=${body}`, "_blank");
      setIsSuccess(true);
      setForm({ name: "", email: "", company: "", service: "", message: "", phone: "" });
      setBudget(0);
      showToast("Gmail opened with your message! Send it to reach us.", "success");
    } catch {
      showToast("Something went wrong. Please email us directly.", "error");
    } finally {
      setTimeout(() => { setIsSubmitting(false); setIsSuccess(false); }, 3000);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#05070D] border-t border-white/[0.06] scroll-mt-20">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#2E6BFF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00D2FF]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F1A] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00D2FF]">
            <Send className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Start a Project{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF]">
              With Us
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#8B93A7] leading-relaxed">
            Have a project in mind? Describe it below and we&apos;ll get back to you
            within 24 hours with a detailed response.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* LEFT: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: duration.base, ease: easing.standard }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0F1A]/80 border border-white/[0.08] backdrop-blur-md space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Contact Info</h3>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "nbstechsolutions3@gmail.com", href: "mailto:nbstechsolutions3@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 79893 35763", href: "tel:+917989335763" },
                  { icon: MapPin, label: "Location", value: "Vijayawada, Andhra Pradesh, India", href: null },
                  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: null },
                ].map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-3 group">
                      <div className="w-9 h-9 rounded-xl bg-[#2E6BFF]/15 border border-[#2E6BFF]/30 flex items-center justify-center text-[#2E6BFF] shrink-0 shadow-[0_0_12px_rgba(46,107,255,0.15)]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#8B93A7] font-mono mb-0.5">{item.label}</div>
                        <div className={`text-sm font-medium text-slate-200 ${item.href ? "group-hover:text-[#00D2FF] transition-colors" : ""}`}>
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );
                  return item.href ? (
                    <a key={item.label} href={item.href} className="block">{content}</a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/917989335763?text=Hi%20NBS%20Tech%20Solutions%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#2EE875] hover:to-[#1BAE97] shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Social links */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                {[
                  { label: "GitHub", href: "https://github.com/KotaNaveen" },
                  { label: "LinkedIn", href: "https://linkedin.com/in/kota-naveen" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 text-center text-xs font-semibold rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[#8B93A7] hover:text-white transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="p-5 rounded-3xl bg-[#0B0F1A]/80 border border-emerald-500/25 backdrop-blur-md flex items-center gap-4">
              <span className="w-3 h-3 rounded-full bg-emerald-400 live-dot-pulse shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">Team Available Now</div>
                <div className="text-xs text-[#8B93A7] mt-0.5">Actively taking new projects. Response within 24h.</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: duration.base, ease: easing.standard }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-[#0B0F1A]/80 border border-white/[0.08] backdrop-blur-md space-y-6"
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#8B93A7] uppercase tracking-wider">Full Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="input-field w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-[#8B93A7]/50 transition-all outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#8B93A7] uppercase tracking-wider">Email Address *</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="input-field w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-[#8B93A7]/50 transition-all outline-none"
                />
              </div>
            </div>

            {/* Phone + Company row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#8B93A7] uppercase tracking-wider">Phone (Optional)</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="input-field w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-[#8B93A7]/50 transition-all outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#8B93A7] uppercase tracking-wider">Company (Optional)</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="input-field w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-[#8B93A7]/50 transition-all outline-none"
                />
              </div>
            </div>

            {/* Visual Service Picker */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#8B93A7] uppercase tracking-wider">Service Required *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {serviceOptions.map((svc) => {
                  const Icon = svc.icon;
                  const isSelected = form.service === svc.id;
                  return (
                    <button
                      type="button"
                      key={svc.id}
                      onClick={() => handleServiceSelect(svc.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        isSelected
                          ? "text-white"
                          : "bg-white/[0.02] border-white/[0.06] text-[#8B93A7] hover:text-white hover:bg-white/[0.05]"
                      }`}
                      style={
                        isSelected
                          ? { background: `${svc.color}20`, borderColor: `${svc.color}50`, boxShadow: `0 0 14px ${svc.color}25`, color: "white" }
                          : {}
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" style={{ color: isSelected ? svc.color : undefined }} />
                      <span className="truncate">{svc.label}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 ml-auto shrink-0" style={{ color: svc.color }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#8B93A7] uppercase tracking-wider">Estimated Budget</label>
                <span className="text-sm font-bold text-[#00D2FF] font-mono">
                  {BUDGET_STEPS[budget]?.label}
                </span>
              </div>
              <input
                type="range"
                className="budget-slider"
                min={0}
                max={5}
                step={1}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />
              <div className="flex justify-between text-[9px] text-[#8B93A7] font-mono">
                {BUDGET_STEPS.map((s, i) => (
                  <span key={i} className={i === budget ? "text-[#00D2FF] font-bold" : ""}>{s.label.replace("₹", "")}</span>
                ))}
              </div>
            </div>

            {/* Message + Character Counter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8B93A7] uppercase tracking-wider">Project Brief *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="Briefly describe your project, goals, timeline, and any specific requirements..."
                required
                className="input-field w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-[#8B93A7]/50 transition-all outline-none resize-none leading-relaxed"
              />
              <CharCounter current={form.message.length} max={MAX_MESSAGE_LENGTH} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="btn-shimmer w-full py-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] shadow-[0_0_24px_rgba(46,107,255,0.5)] hover:shadow-[0_0_36px_rgba(46,107,255,0.7)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Opening Gmail... Check your tab!</span>
                </>
              ) : isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Preparing your message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Project Brief</span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-[#8B93A7]">
              We typically respond within <span className="text-white font-semibold">24 hours</span>. For urgent requests, contact us on WhatsApp.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
