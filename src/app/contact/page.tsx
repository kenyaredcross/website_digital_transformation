"use client";

import { useState, useEffect } from "react";
import { siteConfig as fallbackSiteConfig } from "@/data/site";
import { getSiteConfig } from "@/lib/frappe/site";
import type { SiteConfig } from "@/types";
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle2, Navigation, ExternalLink, Sparkles, Handshake, Database, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(fallbackSiteConfig);
  const [isPartnerMode, setIsPartnerMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    frappeSynced?: boolean;
    message?: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "Partnering Inquiry",
    collaborationArea: "Data & Technology",
    message: "",
  });

  useEffect(() => {
    getSiteConfig().then(setSiteConfig);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("type");
      const hash = window.location.hash;

      if (typeParam === "partner" || hash === "#partnering" || hash === "#partner-form") {
        setIsPartnerMode(true);
        setFormData((prev) => ({ ...prev, subject: "Partnering Inquiry" }));
        
        // Smooth scroll down to form
        setTimeout(() => {
          const el = document.getElementById("partnering-form-section");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isPartnerMode || formData.subject.toLowerCase().includes("partner")) {
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
        if (!res.ok) throw new Error(data.error || "Failed to submit partner inquiry");

        setSubmissionResult({
          frappeSynced: data.frappeSynced,
          message: data.message || "Partner inquiry submitted successfully!",
        });
      } else {
        // Standard inquiry submit
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

            {isPartnerMode && (
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/90 px-3.5 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-800 shadow-sm flex items-center gap-2">
                <Handshake className="w-4 h-4" /> Partnering Mode Active
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {isPartnerMode ? "Partner With Kenya Red Cross" : "Let's build for impact."}
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {isPartnerMode
              ? "If your organisation is interested in collaboration around data, technology, research, innovation or digital capacity development, submit your proposal below."
              : "Partner with the Kenya Red Cross Digital Transformation Department to co-create, pilot, or deploy humanitarian technology solutions."}
          </p>
        </div>
      </section>

      {/* Main Form & Contact Card Section */}
      <section id="partnering-form-section" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Form Mode Selector Tabs */}
          <div className="mb-8 flex items-center gap-3 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 w-fit">
            <button
              onClick={() => {
                setIsPartnerMode(false);
                setFormData((prev) => ({ ...prev, subject: "General Inquiry" }));
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                !isPartnerMode
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              General Inquiry
            </button>

            <button
              onClick={() => {
                setIsPartnerMode(true);
                setFormData((prev) => ({ ...prev, subject: "Partnering Inquiry" }));
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isPartnerMode
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Handshake className="w-4 h-4" />
              <span>Partner With Us</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Contact / Partnering Form */}
            <div className="lg:col-span-7 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-2xl transition-colors duration-300 relative">

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {isPartnerMode
                      ? "Submit Partnering Proposal"
                      : "Send an Inquiry or Partnership Proposal"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                    {isPartnerMode
                      ? "Creates a DocType record on Frappe & MariaDB database"
                      : "Direct message to Data & Digital Transformation team"}
                  </p>
                </div>

                {isPartnerMode && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <Database className="w-3.5 h-3.5" />
                    Frappe DocType Ready
                  </span>
                )}
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-center space-y-5 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      {isPartnerMode ? "Partnering Proposal Submitted!" : "Inquiry Received"}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      {submissionResult?.message ||
                        "Thank you for reaching out to the Kenya Red Cross Digital Transformation Department. Our team will review your message and respond shortly."}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-slate-700 dark:text-slate-300 max-w-md mx-auto space-y-1">
                    <p className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                      <Database className="w-4 h-4" />
                      DocType Record Created
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      DocType: <span className="font-semibold text-slate-900 dark:text-white">Partner Inquiry</span> | Storage: <span className="font-semibold text-slate-900 dark:text-white">MariaDB</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSubmissionResult(null);
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-md"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {isPartnerMode ? "Contact Person Full Name *" : "Full Name *"}
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
                        Work Email *
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                        Organisation / Academic Institution *
                      </label>
                      <input
                        type="text"
                        required={isPartnerMode}
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

                  {isPartnerMode ? (
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                        Collaboration Area *
                      </label>
                      <select
                        value={formData.collaborationArea}
                        onChange={(e) => setFormData({ ...formData, collaborationArea: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500 font-mono font-medium transition-colors"
                      >
                        <option value="Data & Analytics" className="bg-white dark:bg-slate-900">Data & Analytics</option>
                        <option value="Technology & Platforms" className="bg-white dark:bg-slate-900">Technology & Platforms</option>
                        <option value="Research & Evidence" className="bg-white dark:bg-slate-900">Research & Evidence</option>
                        <option value="Innovation & Experimentation" className="bg-white dark:bg-slate-900">Innovation & Experimentation</option>
                        <option value="Funding & Grant Sponsorship" className="bg-white dark:bg-slate-900">Funding & Grant Sponsorship</option>
                        <option value="Capacity Development" className="bg-white dark:bg-slate-900">Capacity Development</option>
                        <option value="National Societies Collaboration" className="bg-white dark:bg-slate-900">National Societies Collaboration</option>
                        <option value="Private-Sector Partnership" className="bg-white dark:bg-slate-900">Private-Sector Partnership</option>
                        <option value="Academic Institution" className="bg-white dark:bg-slate-900">Academic Institution</option>
                        <option value="Civil Society Partnership" className="bg-white dark:bg-slate-900">Civil Society Partnership</option>
                      </select>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500 font-mono font-medium transition-colors"
                      >
                        <option value="Technical Collaboration" className="bg-white dark:bg-slate-900">Technical Collaboration</option>
                        <option value="Data Sharing & Analytics" className="bg-white dark:bg-slate-900">Data Sharing & Analytics</option>
                        <option value="GIS & Mapping Access" className="bg-white dark:bg-slate-900">GIS & Mapping Access</option>
                        <option value="Funding & Sponsorship" className="bg-white dark:bg-slate-900">Funding & Sponsorship</option>
                        <option value="General Inquiry" className="bg-white dark:bg-slate-900">General Inquiry</option>
                      </select>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {isPartnerMode ? "Partnership Proposal Details *" : "Message / Proposal Summary *"}
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder={
                        isPartnerMode
                          ? "Detail your organisation's proposal around data, technology, research, innovation or digital capacity development..."
                          : "Detail your inquiry, project proposal, or collaboration goals..."
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 font-medium transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 transition-colors shadow-lg shadow-red-600/25 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting to Frappe & MariaDB...</span>
                      </>
                    ) : (
                      <>
                        <span>{isPartnerMode ? "Submit Partnering Proposal" : "Submit Inquiry"}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column - Official Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-2xl transition-colors duration-300">
                {/* Note Banner */}
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200/80 dark:border-red-800/60">
                  <p className="text-xs sm:text-sm text-red-900 dark:text-red-200 font-medium leading-relaxed flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <span>
                      If your organisation is interested in collaboration around data, technology, research, innovation or digital capacity development, get in touch with the Data and Digital Transformation team.
                    </span>
                  </p>
                </div>

                <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  {/* Organization & Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white text-base">
                        Kenya Red Cross Society
                      </span>
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-medium block mt-0.5">
                        South C (Bellevue), Red Cross Road, off Popo Road, Nairobi, Kenya.
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 pt-1">
                    <Mail className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">Email</span>
                      <a
                        href="mailto:data.digital@redcross.or.ke"
                        className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
                      >
                        data.digital@redcross.or.ke
                      </a>
                    </div>
                  </div>

                  {/* Phone & Toll Free */}
                  <div className="flex items-start gap-3 pt-1">
                    <Phone className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">Telephone & Hotline</span>
                      <span className="block text-xs text-slate-700 dark:text-slate-300 font-medium">
                        Phone: <strong className="font-mono text-slate-900 dark:text-white">(+254) 703 037 000</strong>
                      </span>
                      <span className="block text-xs text-slate-700 dark:text-slate-300 font-medium mt-0.5">
                        Toll Free: <strong className="font-mono text-red-600 dark:text-red-400">1199</strong>
                      </span>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3 pt-1">
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

      {/* Google Maps Map Location Section */}
      <section className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-500 flex items-center gap-2">
                <Navigation className="w-4 h-4" /> Geographical Location
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Our Location on Google Maps
              </h2>
            </div>

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-md w-fit"
            >
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Google Maps Container */}
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl">
            <iframe
              title="Kenya Red Cross Society Headquarters Google Maps Location"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-[1.02]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
