"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle2, Navigation, ExternalLink, Sparkles } from "lucide-react";

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

  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Kenya+Red+Cross+Society+Headquarters,+South+C+(Bellevue),+Red+Cross+Road,+off+Popo+Road,+Nairobi,+Kenya&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Kenya+Red+Cross+Society+Headquarters+South+C+Nairobi";

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
      <section className="py-16">
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
                {/* Note Banner */}
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200/80 dark:border-red-800/60">
                  <p className="text-xs sm:text-sm text-red-900 dark:text-red-200 font-medium leading-relaxed flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <span>
                      For enquiries about data, digital systems, innovation, partnerships and digital transformation initiatives:
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

