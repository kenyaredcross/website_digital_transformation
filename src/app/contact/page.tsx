"use client";

import { useState, useEffect } from "react";
import { siteConfig as fallbackSiteConfig } from "@/data/site";
import { getSiteConfig } from "@/lib/frappe/site";
import type { SiteConfig } from "@/types";
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle2, Navigation, ExternalLink, Sparkles, Handshake, Database, Loader2, MessageSquarePlus, UserCheck, EyeOff } from "lucide-react";

export default function ContactPage() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(fallbackSiteConfig);
  const [tabMode, setTabMode] = useState<"general" | "partner" | "feedback">("general");
  const [submissionMode, setSubmissionMode] = useState<"identified" | "anonymous">("identified");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    frappeSynced?: boolean;
    docName?: string;
    message?: string;
  } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    collaborationArea: "Data & Technology",
    message: "",

    // Feedback specific fields
    stakeholderType: "community_member",
    stakeholderTypeOther: "",
    country: "Kenya",
    region: "",
    digitalService: "KRCS Digital Platform",
    project: "",
    platformUsed: "web",
    feedbackCategory: "ux_issue",
    severity: "medium",
    suggestion: "",
    accessibilityImpacted: false,
    accessibilityArea: "",
    consentToContact: true,
    privacyAccepted: true,
  });

  useEffect(() => {
    getSiteConfig().then(setSiteConfig);

    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail === "feedback" || customEvent.detail === "partner" || customEvent.detail === "general") {
        setTabMode(customEvent.detail as "general" | "partner" | "feedback");
      }
    };

    window.addEventListener("switch-contact-tab", handleSwitchTab);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("type") || params.get("tab");
      const hash = window.location.hash;

      if (typeParam === "feedback" || hash === "#feedback" || hash === "#feedback-form" || hash === "#feedback-form-section") {
        setTabMode("feedback");
        setTimeout(() => {
          const el = document.getElementById("form-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else if (typeParam === "partner" || hash === "#partnering" || hash === "#partner-form") {
        setTabMode("partner");
        setFormData((prev) => ({ ...prev, subject: "Partnering Inquiry" }));
        setTimeout(() => {
          const el = document.getElementById("form-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }

    return () => {
      window.removeEventListener("switch-contact-tab", handleSwitchTab);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (tabMode === "feedback") {
        // Feedback DocType submission to Frappe & MariaDB
        const res = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submission_mode: submissionMode,
            full_name: submissionMode === "identified" ? formData.name : "Anonymous",
            email: submissionMode === "identified" ? formData.email : "",
            phone: submissionMode === "identified" ? formData.phone : "",
            stakeholder_type: formData.stakeholderType,
            stakeholder_type_other: formData.stakeholderTypeOther,
            organisation: formData.organization,
            country: formData.country,
            region: formData.region,
            digital_service: formData.digitalService,
            project: formData.project,
            platform_used: formData.platformUsed,
            feedback_category: formData.feedbackCategory,
            severity: formData.severity,
            subject: formData.subject,
            description: formData.message,
            suggestion: formData.suggestion,
            accessibility_impacted: formData.accessibilityImpacted ? 1 : 0,
            accessibility_area: formData.accessibilityArea,
            consent_to_contact: formData.consentToContact ? 1 : 0,
            privacy_accepted: formData.privacyAccepted ? 1 : 0,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to submit feedback.");

        setSubmissionResult({
          frappeSynced: true,
          docName: data.name,
          message: "Feedback successfully logged to MariaDB (DocType: Feedback).",
        });
      } else if (tabMode === "partner") {
        const res = await fetch("/api/partner-inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            organization: formData.organization,
            collaborationArea: formData.collaborationArea,
            message: formData.message,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to submit partner inquiry.");

        setSubmissionResult({
          frappeSynced: data.frappeSynced,
          docName: data.docName,
          message: data.message || "Partner inquiry submitted successfully!",
        });
      } else {
        // General Inquiry
        setSubmissionResult({
          frappeSynced: false,
          message: "Thank you for reaching out. Your message has been received.",
        });
      }

      setSubmitted(true);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Kenya+Red+Cross+Society+Headquarters,+South+C+(Bellevue),+Red+Cross+Road,+off+Popo+Road,+Nairobi,+Kenya&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Kenya+Red+Cross+Society+Headquarters+South+C+Nairobi";

  return (
    <div className="pt-25 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/90 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/70 shadow-sm flex items-center gap-2">
              <Mail className="w-4 h-4" /> Get In Touch
            </span>

            {tabMode === "partner" && (
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/90 px-3.5 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-800 shadow-sm flex items-center gap-2">
                <Handshake className="w-4 h-4" /> Partnering Mode Active
              </span>
            )}

            {tabMode === "feedback" && (
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/90 px-3.5 py-1.5 rounded-full border border-purple-300 dark:border-purple-800 shadow-sm flex items-center gap-2">
                <MessageSquarePlus className="w-4 h-4" /> User Feedback Mode Active
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {tabMode === "partner"
              ? "Partner With Kenya Red Cross"
              : tabMode === "feedback"
              ? "Submit Website & Platform Feedback"
              : "Let's build for impact."}
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {tabMode === "partner"
              ? "If your organisation is interested in collaboration around data, technology, research, innovation or digital capacity development, submit your proposal below."
              : tabMode === "feedback"
              ? "Share your experience, report technical issues, or suggest new digital features directly to the Kenya Red Cross Digital team."
              : "Partner with the Kenya Red Cross Digital Transformation Department to co-create, pilot, or deploy humanitarian technology solutions."}
          </p>
        </div>
      </section>

      {/* Main Form & Contact Card Section */}
      <section id="form-section" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Form Mode Selector Tabs */}
          <div className="mb-8 flex flex-wrap items-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 w-fit">
            <button
              onClick={() => {
                setTabMode("general");
                setSubmitted(false);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                tabMode === "general"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              General Inquiry
            </button>

            <button
              onClick={() => {
                setTabMode("partner");
                setSubmitted(false);
                setFormData((prev) => ({ ...prev, subject: "Partnering Inquiry" }));
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                tabMode === "partner"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Handshake className="w-4 h-4" />
              <span>Partner With Us</span>
            </button>

            <button
              onClick={() => {
                setTabMode("feedback");
                setSubmitted(false);
                setFormData((prev) => ({ ...prev, subject: "User Feedback" }));
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                tabMode === "feedback"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Contact / Partnering / Feedback Form */}
            <div className="lg:col-span-7 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-2xl transition-colors duration-300 relative">

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {tabMode === "feedback"
                      ? "Submit System Feedback"
                      : tabMode === "partner"
                      ? "Submit Partnering Proposal"
                      : "Send an Inquiry or Proposal"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                    {tabMode === "feedback"
                      ? "Give your feedback to the Digital Team"
                      : tabMode === "partner"
                      ? "Put Across Your Inquiry"
                      : "Direct message to Data & Digital Transformation team"}
                  </p>
                </div>

                {(tabMode === "feedback" || tabMode === "partner") && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <Database className="w-3.5 h-3.5" />
                     Active
                  </span>
                )}
              </div>

              {/* Identified vs Anonymous switch for Feedback Tab */}
              {tabMode === "feedback" && (
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    Submission Privacy Mode:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSubmissionMode("identified")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        submissionMode === "identified"
                          ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Identified</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmissionMode("anonymous")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        submissionMode === "anonymous"
                          ? "bg-slate-800 text-white dark:bg-slate-700 shadow-md"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Anonymous</span>
                    </button>
                  </div>
                </div>
              )}

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-center space-y-5 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      {tabMode === "feedback"
                        ? "Feedback Submission Recorded!"
                        : tabMode === "partner"
                        ? "Partnering Proposal Submitted!"
                        : "Inquiry Received"}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      {submissionResult?.message ||
                        "Thank you for reaching out to the Kenya Red Cross Digital Transformation Department. Our team will review your submission and respond."}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-slate-700 dark:text-slate-300 max-w-md mx-auto space-y-1">
                    <p className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                      <Database className="w-4 h-4" />
                      Frappe Record Saved
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      DocType: <span className="font-semibold text-slate-900 dark:text-white">{tabMode === "feedback" ? "Feedback" : "Partner Inquiry"}</span>
                      {submissionResult?.docName && (
                        <span> | ID: <span className="font-semibold text-slate-900 dark:text-white">{submissionResult.docName}</span></span>
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSubmissionResult(null);
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-md"
                  >
                    Submit Another Response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email (hidden if anonymous feedback) */}
                  {(tabMode !== "feedback" || submissionMode === "identified") && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                          {tabMode === "partner" ? "Contact Person Full Name *" : "Full Name *"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Jane Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 font-medium transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jane.doe@organization.org"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 font-medium transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* Organisation & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {tabMode === "partner"
                          ? "Organisation / Academic Institution *"
                          : "Organisation (Optional)"}
                      </label>
                      <input
                        type="text"
                        required={tabMode === "partner"}
                        placeholder="e.g. National Society / UN Agency / Tech Org"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 font-medium transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+254 7XX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 font-medium transition-colors"
                      />
                    </div>
                  </div>

                  {/* Specific Fields per Tab */}
                  {tabMode === "feedback" && (
                    <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                            Feedback Category *
                          </label>
                          <select
                            value={formData.feedbackCategory}
                            onChange={(e) => setFormData({ ...formData, feedbackCategory: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-purple-500"
                          >
                            <option value="problem">Problem / Bug Report</option>
                            <option value="accessibility_barrier">Accessibility Barrier</option>
                            <option value="ux_issue">UX / UI Interface Issue</option>
                            <option value="improvement_opportunity">Improvement Opportunity</option>
                            <option value="new_idea">New Innovation Idea</option>
                            <option value="training_need">Training Need</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                            Stakeholder Type *
                          </label>
                          <select
                            value={formData.stakeholderType}
                            onChange={(e) => setFormData({ ...formData, stakeholderType: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-purple-500"
                          >
                            <option value="community_member">Community Member / Public</option>
                            <option value="volunteer">Red Cross Volunteer</option>
                            <option value="staff">Red Cross Staff</option>
                            <option value="partner">Partner Organisation</option>
                            <option value="other_stakeholder">Other Stakeholder</option>
                          </select>
                        </div>
                      </div>

                      {formData.stakeholderType === "other_stakeholder" && (
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                            Specify Other Stakeholder Type *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Specify your role or stakeholder type..."
                            value={formData.stakeholderTypeOther}
                            onChange={(e) => setFormData({ ...formData, stakeholderTypeOther: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {tabMode === "partner" && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                        Collaboration Area *
                      </label>
                      <select
                        value={formData.collaborationArea}
                        onChange={(e) => setFormData({ ...formData, collaborationArea: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500 font-mono font-medium transition-colors"
                      >
                        <option value="Data & Analytics">Data & Analytics</option>
                        <option value="Technology & Platforms">Technology & Platforms</option>
                        <option value="Research & Evidence">Research & Evidence</option>
                        <option value="Innovation & Experimentation">Innovation & Experimentation</option>
                        <option value="Funding & Grant Sponsorship">Funding & Grant Sponsorship</option>
                        <option value="Capacity Development">Capacity Development</option>
                        <option value="National Societies Collaboration">National Societies Collaboration</option>
                        <option value="Private-Sector Partnership">Private-Sector Partnership</option>
                      </select>
                    </div>
                  )}

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Subject / Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={
                        tabMode === "feedback"
                          ? "Brief title of your feedback or issue..."
                          : "Inquiry or proposal title..."
                      }
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 font-medium transition-colors"
                    />
                  </div>

                  {/* Message / Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {tabMode === "feedback"
                        ? "Detailed Feedback Description *"
                        : tabMode === "partner"
                        ? "Partnership Proposal Details *"
                        : "Message / Proposal Summary *"}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={
                        tabMode === "feedback"
                          ? "Describe the issue, experience, or suggestion in detail..."
                          : tabMode === "partner"
                          ? "Detail your organisation's proposal around data, technology, research, innovation..."
                          : "Detail your inquiry, project proposal, or collaboration goals..."
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 font-medium transition-colors"
                    />
                  </div>

                  {/* Optional Suggestion for Feedback Tab */}
                  {tabMode === "feedback" && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                        Suggested Solution / Improvement (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="What would you suggest to improve this?"
                        value={formData.suggestion}
                        onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white disabled:opacity-60 transition-colors shadow-lg cursor-pointer ${
                      tabMode === "feedback"
                        ? "bg-purple-600 hover:bg-purple-700 shadow-purple-600/25"
                        : "bg-red-600 hover:bg-red-700 shadow-red-600/25"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting to Frappe & MariaDB...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {tabMode === "feedback"
                            ? "Submit System Feedback"
                            : tabMode === "partner"
                            ? "Submit Partnering Proposal"
                            : "Submit Inquiry"}
                        </span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column - Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-2xl transition-colors duration-300">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Contact Information
                </h2>

                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">Headquarters</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {siteConfig.contact.location}, {siteConfig.contact.city}, {siteConfig.contact.country}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">Digital Team Email</span>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-xs text-red-600 dark:text-red-400 hover:underline">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">Emergency Toll Free</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        Hotline: {siteConfig.contact.emergencyLine}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">Working Hours</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {siteConfig.contact.workingHours}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Kenya Red Cross Society Authorized Portal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Visit Our Headquarters</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">South C (Bellevue), Red Cross Road, Nairobi</p>
            </div>
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md w-fit"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>

          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
            <iframe
              src={mapEmbedUrl}
              title="Kenya Red Cross Headquarters Location Map"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
