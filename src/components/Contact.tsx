// src/components/Contact.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { LinkedInIcon } from "@/components/icons/SocialIcons";
import confetti from "canvas-confetti";
import { easing, duration } from "@/motion/tokens";
import { useToast } from "@/components/Toast";

export default function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Application Development",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nbstechsolutions3@gmail.com");
    setCopiedEmail(true);
    showToast("Copied nbstechsolutions3@gmail.com to clipboard!", "success");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+917989335763");
    setCopiedPhone(true);
    showToast("Copied +91 79893 35763 to clipboard!", "success");
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required";
    }
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      errs.message = "Please describe your project or inquiry";
    } else if (formData.message.trim().length < 5) {
      errs.message = "Message should be at least 5 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        showToast("Project inquiry dispatched to founders!", "success");
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#2E6BFF", "#00D2FF", "#ffffff"],
          });
        } catch {
          // Confetti fallback
        }
      } else {
        setSubmitError(data.error || "Unable to send inquiry. Please try again or call directly.");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError("Network connection error. Please try again or reach out directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#05070D] border-t border-white/[0.06] scroll-mt-20">
      {/* Glow Beams */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#2E6BFF]/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F1A] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00D2FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Let&apos;s Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6BFF] to-[#00D2FF]">
              Great.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#8B93A7] leading-relaxed">
            Have a project in mind or looking for a specialized technology team?
            Reach out directly and our founders will connect with you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#0B0F1A]/85 backdrop-blur-md border border-white/[0.08] space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Connect Directly with the Founders
              </h3>
              <p className="text-sm text-[#8B93A7] leading-relaxed">
                NBS Tech Solutions is operated directly by Satish, Bhovan, and Naveen.
                Your inquiry goes straight to the engineering leads.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start justify-between gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#2E6BFF]/15 border border-[#2E6BFF]/30 flex items-center justify-center text-[#00D2FF] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#8B93A7] font-medium">
                        Primary Inquiries
                      </div>
                      <a
                        href="mailto:nbstechsolutions3@gmail.com"
                        className="text-sm font-semibold text-white hover:text-[#00D2FF] transition-colors break-all"
                      >
                        nbstechsolutions3@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 text-[#8B93A7] hover:text-white transition-all flex items-center gap-1 text-[11px]"
                    title="Copy email to clipboard"
                    aria-label="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-mono text-[10px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline font-mono text-[10px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-start justify-between gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#2E6BFF]/15 border border-[#2E6BFF]/30 flex items-center justify-center text-[#00D2FF] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#8B93A7] font-medium">
                        Direct Lines (Click to Call)
                      </div>
                      <div className="text-sm font-semibold text-white flex flex-wrap items-center gap-x-2 gap-y-1">
                        <a
                          href="tel:+917989335763"
                          className="hover:text-[#00D2FF] underline decoration-white/20 hover:decoration-[#00D2FF] underline-offset-4 transition-colors"
                          title="Call +91 79893 35763 on phone dial pad"
                        >
                          +91 79893 35763
                        </a>
                        <span className="text-[#8B93A7]">&bull;</span>
                        <a
                          href="tel:+919502422997"
                          className="hover:text-[#00D2FF] underline decoration-white/20 hover:decoration-[#00D2FF] underline-offset-4 transition-colors"
                          title="Call +91 95024 22997 on phone dial pad"
                        >
                          +91 95024 22997
                        </a>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 text-[#8B93A7] hover:text-white transition-all flex items-center gap-1 text-[11px]"
                    title="Copy phone number to clipboard"
                    aria-label="Copy phone number to clipboard"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-mono text-[10px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline font-mono text-[10px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2E6BFF]/15 border border-[#2E6BFF]/30 flex items-center justify-center text-[#00D2FF] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8B93A7] font-medium">
                      Location
                    </div>
                    <div className="text-sm font-semibold text-white">
                      Vijayawada, Andhra Pradesh, India
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Profiles */}
              <div className="pt-6 border-t border-white/[0.08] space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8B93A7]">
                  Founder Networks
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://linkedin.com/in/kota-naveen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span>Naveen</span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>

                  <a
                    href="https://linkedin.com/in/bhovanchandarkokkiligadda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span>Bhovan</span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/bayana-sathish-reddy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#2E6BFF]/20 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span>Satish</span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0B0F1A]/85 backdrop-blur-md border border-white/[0.08] shadow-2xl relative overflow-hidden">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: duration.base, ease: easing.standard }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">
                    Inquiry Sent Successfully!
                  </h4>
                  <p className="text-sm text-[#8B93A7] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>! Your project inquiry has been dispatched directly to our founders at <span className="text-[#00D2FF]">nbstechsolutions3@gmail.com</span>. We will review and reply to <span className="text-white font-medium">{formData.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSubmitError(null);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        service: "Web Development",
                        message: "",
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white/10 text-white border border-white/10 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {submitError && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-xs font-semibold text-slate-200 block"
                      >
                        Your Name <span className="text-[#2E6BFF]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="e.g. Alex Sharma"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-[#05070D] border text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? "border-rose-500/60 focus:ring-rose-500/40"
                            : "border-white/10 focus:border-[#2E6BFF] focus:ring-[#2E6BFF]/30"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-semibold text-slate-200 block"
                      >
                        Email Address <span className="text-[#2E6BFF]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-[#05070D] border text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? "border-rose-500/60 focus:ring-rose-500/40"
                            : "border-white/10 focus:border-[#2E6BFF] focus:ring-[#2E6BFF]/30"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-xs font-semibold text-slate-200 block"
                      >
                        Your Phone Number <span className="text-[#8B93A7] font-normal text-[11px]">(Optional / for calling)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#05070D] border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#2E6BFF] focus:ring-2 focus:ring-[#2E6BFF]/30 transition-all"
                      />
                    </div>

                    {/* Service of Interest */}
                    <div className="space-y-2">
                      <label
                        htmlFor="service"
                        className="text-xs font-semibold text-slate-200 block"
                      >
                        Area of Interest
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#05070D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2E6BFF] focus:ring-2 focus:ring-[#2E6BFF]/30 transition-all"
                      >
                        <option value="Web Development">01 — Web Development</option>
                        <option value="Software Development">02 — Software Development</option>
                        <option value="AI & Machine Learning">03 — AI &amp; Machine Learning</option>
                        <option value="Full-Stack Development">04 — Full-Stack Development</option>
                        <option value="Automation">05 — Workflow Automation</option>
                        <option value="Business Solutions">06 — Business Solutions</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold text-slate-200 block"
                    >
                      Project Description <span className="text-[#2E6BFF]">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us about what you want to build, timelines, or requirements..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl bg-[#05070D] border text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.message
                          ? "border-rose-500/60 focus:ring-rose-500/40"
                          : "border-white/10 focus:border-[#2E6BFF] focus:ring-[#2E6BFF]/30"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#2E6BFF] to-[#1B4ED8] hover:from-[#3D79FF] hover:to-[#2257F6] border border-white/20 shadow-[0_0_24px_rgba(46,107,255,0.4)] hover:shadow-[0_0_36px_rgba(46,107,255,0.6)] flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Dispatching to Founders...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
