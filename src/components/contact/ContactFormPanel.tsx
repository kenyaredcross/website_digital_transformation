"use client";

import { CheckCircle2, Database, EyeOff, Handshake, Loader2, MessageSquarePlus, Send, UserCheck } from "lucide-react";
import type { ContactFormData, ContactMode, ContactSubmissionResult, FeedbackSubmissionMode } from "./contact-types";

interface ContactFormPanelProps {
  mode: ContactMode;
  submissionMode: FeedbackSubmissionMode;
  formData: ContactFormData;
  loading: boolean;
  submitted: boolean;
  submissionResult: ContactSubmissionResult | null;
  onModeChange: (mode: ContactMode) => void;
  onSubmissionModeChange: (mode: FeedbackSubmissionMode) => void;
  onFormDataChange: (formData: ContactFormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onSubmitAnother: () => void;
}

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 font-medium transition-colors";
const labelClass = "text-xs font-mono font-semibold text-slate-700 dark:text-slate-300";

export function ContactFormPanel({
  mode,
  submissionMode,
  formData,
  loading,
  submitted,
  submissionResult,
  onModeChange,
  onSubmissionModeChange,
  onFormDataChange,
  onSubmit,
  onSubmitAnother,
}: ContactFormPanelProps) {
  const update = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    onFormDataChange({ ...formData, [key]: value });
  };

  return (
    <div className="lg:col-span-7 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-2xl transition-colors duration-300 relative">
      <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 w-fit">
        <button type="button" onClick={() => onModeChange("general")} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === "general" ? "bg-red-600 text-white shadow-md shadow-red-600/30" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>General Inquiry</button>
        <button type="button" onClick={() => onModeChange("partner")} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${mode === "partner" ? "bg-red-600 text-white shadow-md shadow-red-600/30" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}><Handshake className="w-4 h-4" />Partner With Us</button>
        <button type="button" onClick={() => onModeChange("feedback")} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${mode === "feedback" ? "bg-red-600 text-white shadow-md shadow-red-600/30" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}><MessageSquarePlus className="w-4 h-4" />Submit Feedback</button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {mode === "feedback" ? "Submit System Feedback" : mode === "partner" ? "Submit Partnering Proposal" : "Send an Inquiry or Proposal"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
            {mode === "feedback" ? "Give your feedback to the Digital Team" : mode === "partner" ? "Put Across Your Inquiry" : "Direct message to Data & Digital Transformation team"}
          </p>
        </div>
      </div>

      {mode === "feedback" && <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"><span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Submission Privacy Mode:</span><div className="flex items-center gap-2"><button type="button" onClick={() => onSubmissionModeChange("identified")} className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${submissionMode === "identified" ? "bg-red-600 text-white shadow-md shadow-red-600/30" : "text-slate-600 dark:text-slate-400"}`}><UserCheck className="w-3.5 h-3.5" />Identified</button><button type="button" onClick={() => onSubmissionModeChange("anonymous")} className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${submissionMode === "anonymous" ? "bg-slate-800 text-white dark:bg-slate-700 shadow-md" : "text-slate-600 dark:text-slate-400"}`}><EyeOff className="w-3.5 h-3.5" />Anonymous</button></div></div>}

      {submitted ? (
        <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-center space-y-5 animate-in fade-in duration-300">
          <CheckCircle2 className="w-14 h-14 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <div className="space-y-2"><h3 className="text-2xl font-black text-slate-900 dark:text-white">{mode === "feedback" ? "Feedback Submission Recorded!" : mode === "partner" ? "Partnering Proposal Submitted!" : "Inquiry Received"}</h3><p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">{submissionResult?.message || "Thank you for reaching out to the Kenya Red Cross Digital Transformation Department. Our team will review your submission and respond."}</p></div>
          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-slate-700 dark:text-slate-300 max-w-md mx-auto space-y-1"><p className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1.5"><Database className="w-4 h-4" />Frappe Record Saved</p><p className="text-[11px] text-slate-500 dark:text-slate-400">DocType: <span className="font-semibold text-slate-900 dark:text-white">{mode === "feedback" ? "Feedback" : mode === "partner" ? "Partnership Proposal" : "Inquiry"}</span>{submissionResult?.docName && <span> | ID: <span className="font-semibold text-slate-900 dark:text-white">{submissionResult.docName}</span></span>}</p></div>
          <button type="button" onClick={onSubmitAnother} className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-md">Submit Another Response</button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          {(mode !== "feedback" || submissionMode === "identified") && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="space-y-1.5"><label className={labelClass}>{mode === "partner" ? "Contact Person Full Name *" : "Full Name *"}</label><input type="text" required placeholder="e.g. Dr. Jane Doe" value={formData.name} onChange={(e) => update("name", e.target.value)} className={inputClass} /></div><div className="space-y-1.5"><label className={labelClass}>Email Address *</label><input type="email" required placeholder="jane.doe@organization.org" value={formData.email} onChange={(e) => update("email", e.target.value)} className={inputClass} /></div></div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="space-y-1.5"><label className={labelClass}>{mode === "partner" ? "Organisation / Academic Institution *" : "Organisation (Optional)"}</label><input type="text" required={mode === "partner"} placeholder="e.g. National Society / UN Agency / Tech Org" value={formData.organization} onChange={(e) => update("organization", e.target.value)} className={inputClass} /></div><div className="space-y-1.5"><label className={labelClass}>Phone / WhatsApp (Optional)</label><input type="tel" placeholder="+254 7XX XXX XXX" value={formData.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} /></div></div>

          {mode === "feedback" && <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="space-y-1.5"><label className={labelClass}>Feedback Category *</label><select value={formData.feedbackCategory} onChange={(e) => update("feedbackCategory", e.target.value)} className={inputClass}><option value="problem">Problem / Bug Report</option><option value="accessibility_barrier">Accessibility Barrier</option><option value="ux_issue">UX / UI Interface Issue</option><option value="improvement_opportunity">Improvement Opportunity</option><option value="new_idea">New Innovation Idea</option><option value="training_need">Training Need</option><option value="other">Other</option></select></div><div className="space-y-1.5"><label className={labelClass}>Stakeholder Type *</label><select value={formData.stakeholderType} onChange={(e) => update("stakeholderType", e.target.value)} className={inputClass}><option value="community_member">Community Member / Public</option><option value="volunteer">Red Cross Volunteer</option><option value="staff">Red Cross Staff</option><option value="partner">Partner Organisation</option><option value="other_stakeholder">Other Stakeholder</option></select></div></div>{formData.stakeholderType === "other_stakeholder" && <div className="space-y-1.5"><label className={labelClass}>Specify Other Stakeholder Type *</label><input type="text" required placeholder="Specify your role or stakeholder type..." value={formData.stakeholderTypeOther} onChange={(e) => update("stakeholderTypeOther", e.target.value)} className={inputClass} /></div>}</div>}

          {mode === "partner" && <div className="space-y-1.5"><label className={labelClass}>Collaboration Area *</label><select value={formData.collaborationArea} onChange={(e) => update("collaborationArea", e.target.value)} className={inputClass}><option value="Data & Analytics">Data & Analytics</option><option value="Technology & Platforms">Technology & Platforms</option><option value="Research & Evidence">Research & Evidence</option><option value="Innovation & Experimentation">Innovation & Experimentation</option><option value="Funding & Grant Sponsorship">Funding & Grant Sponsorship</option><option value="Capacity Development">Capacity Development</option><option value="National Societies Collaboration">National Societies Collaboration</option><option value="Private-Sector Partnership">Private-Sector Partnership</option></select></div>}

          <div className="space-y-1.5"><label className={labelClass}>Subject / Title *</label><input type="text" required placeholder={mode === "feedback" ? "Brief title of your feedback or issue..." : "Inquiry or proposal title..."} value={formData.subject} onChange={(e) => update("subject", e.target.value)} className={inputClass} /></div>
          <div className="space-y-1.5"><label className={labelClass}>{mode === "feedback" ? "Detailed Feedback Description *" : mode === "partner" ? "Partnership Proposal Details *" : "Message / Proposal Summary *"}</label><textarea required rows={4} placeholder={mode === "feedback" ? "Describe the issue, experience, or suggestion in detail..." : mode === "partner" ? "Detail your organisation's proposal around data, technology, research, innovation..." : "Detail your inquiry, project proposal, or collaboration goals..."} value={formData.message} onChange={(e) => update("message", e.target.value)} className={inputClass} /></div>
          {mode === "feedback" && <div className="space-y-1.5"><label className={labelClass}>Suggested Solution / Improvement (Optional)</label><textarea rows={2} placeholder="What would you suggest to improve this?" value={formData.suggestion} onChange={(e) => update("suggestion", e.target.value)} className={inputClass} /></div>}

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white disabled:opacity-60 transition-colors shadow-lg cursor-pointer bg-red-600 hover:bg-red-700 shadow-red-600/25">{loading ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Submitting to Frappe & MariaDB...</span></> : <><span>{mode === "feedback" ? "Submit System Feedback" : mode === "partner" ? "Submit Partnership Proposal" : "Submit Inquiry"}</span><Send className="w-4 h-4" /></>}</button>
        </form>
      )}
    </div>
  );
}
