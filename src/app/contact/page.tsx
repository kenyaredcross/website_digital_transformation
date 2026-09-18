"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "Technical Collaboration",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-25 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/90 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/70 shadow-sm flex items-center gap-2 w-fit">
            <Mail className="w-4 h-4" /> Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Let&apos;s build for impact.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Partner with the Kenya Red Cross Digital Transformation Department to co-create, pilot, or deploy humanitarian technology solutions.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Card Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-7 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-2xl transition-colors duration-300">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Send an Inquiry or Partnership Proposal
              </h2>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-center space-y-4 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Inquiry Received</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out to the Kenya Red Cross Digital Transformation Department. Our team will review your message and respond shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                        Full Name *
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
                        Organization / University
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. UN Agency / Tech Startup / University"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 font-medium transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500 font-mono font-medium transition-colors"
                      >
                        <option value="Technical Collaboration" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Technical Collaboration</option>
                        <option value="Data Sharing & Analytics" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Data Sharing & Analytics</option>
                        <option value="GIS & Mapping Access" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">GIS & Mapping Access</option>
                        <option value="Funding & Sponsorship" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Funding & Sponsorship</option>
                        <option value="General Inquiry" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Message / Proposal Summary *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Detail your inquiry, project proposal, or collaboration goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 font-medium transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/25"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Right Column - Official Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-2xl transition-colors duration-300">
                <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block border-b border-slate-200 dark:border-slate-800 pb-3">
                  Official Headquarters Information
                </span>

                <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">Headquarters Address</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{siteConfig.contact.location}</span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">
                        {siteConfig.contact.address}, {siteConfig.contact.city}, {siteConfig.contact.country}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">Department Email</span>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-xs text-red-600 dark:text-red-400 hover:underline">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">Emergency Hotline</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        National Toll-Free: <strong className="text-red-600 dark:text-red-400 font-mono">{siteConfig.contact.emergencyLine}</strong>
                      </span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">{siteConfig.contact.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-900 dark:text-white">Working Hours</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{siteConfig.contact.workingHours}</span>
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
    </div>
  );
}
