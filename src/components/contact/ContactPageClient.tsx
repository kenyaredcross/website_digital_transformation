"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ContactFormPanel } from "@/components/contact/ContactFormPanel";
import {
  INITIAL_CONTACT_FORM,
  type ContactFormData,
  type ContactMode,
  type ContactSubmissionResult,
  type FeedbackSubmissionMode,
} from "@/components/contact/contact-types";

export function ContactPageClient({ contactInformation }: { contactInformation: ReactNode }) {
  const [mode, setMode] = useState<ContactMode>("general");
  const [submissionMode, setSubmissionMode] = useState<FeedbackSubmissionMode>("identified");
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_CONTACT_FORM);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<ContactSubmissionResult | null>(null);

  const changeMode = useCallback((nextMode: ContactMode) => {
    setMode(nextMode);
    setSubmitted(false);
    if (nextMode === "partner") setFormData((previous) => ({ ...previous, subject: "Partnering Inquiry" }));
    if (nextMode === "feedback") setFormData((previous) => ({ ...previous, subject: "User Feedback" }));
  }, []);

  useEffect(() => {
    let initialTabTimeout: number | undefined;
    let scrollTimeout: number | undefined;

    const handleSwitchTab = (event: Event) => {
      const requestedMode = (event as CustomEvent<string>).detail;
      if (requestedMode === "feedback" || requestedMode === "partner" || requestedMode === "general") {
        changeMode(requestedMode);
      }
    };

    window.addEventListener("switch-contact-tab", handleSwitchTab);
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type") || params.get("tab");
    const hash = window.location.hash;

    if (typeParam === "feedback" || hash === "#feedback" || hash === "#feedback-form" || hash === "#feedback-form-section") {
      initialTabTimeout = window.setTimeout(() => changeMode("feedback"), 0);
      scrollTimeout = window.setTimeout(() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" }), 100);
    } else if (typeParam === "partner" || hash === "#partnering" || hash === "#partner-form") {
      initialTabTimeout = window.setTimeout(() => changeMode("partner"), 0);
      scrollTimeout = window.setTimeout(() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" }), 100);
    }

    return () => {
      window.removeEventListener("switch-contact-tab", handleSwitchTab);
      if (initialTabTimeout !== undefined) window.clearTimeout(initialTabTimeout);
      if (scrollTimeout !== undefined) window.clearTimeout(scrollTimeout);
    };
  }, [changeMode]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      let endpoint: string;
      let payload: Record<string, string | number>;
      if (mode === "feedback") {
        endpoint = "/api/feedback";
        payload = {
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
        };
      } else if (mode === "partner") {
        endpoint = "/api/partner-inquiry";
        payload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          collaborationArea: formData.collaborationArea,
          subject: formData.subject,
          message: formData.message,
        };
      } else {
        endpoint = "/api/inquiry";
        payload = {
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          subject: formData.subject,
          message: formData.message,
        };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        const defaultError = mode === "feedback" ? "Failed to submit feedback." : mode === "partner" ? "Failed to submit partner inquiry." : "Failed to submit inquiry.";
        throw new Error(data.error || defaultError);
      }

      setSubmissionResult(mode === "feedback"
        ? { frappeSynced: true, docName: data.name, message: "Feedback successfully logged to MariaDB (DocType: Feedback)." }
        : mode === "partner"
        ? { frappeSynced: data.frappeSynced, docName: data.docName, message: data.message || "Partner inquiry submitted successfully!" }
        : { frappeSynced: true, docName: data.name, message: data.message || "Thank you for reaching out. Your inquiry has been received." });
      setSubmitted(true);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const title = mode === "partner" ? "Partner With Kenya Red Cross" : mode === "feedback" ? "Submit Website & Platform Feedback" : "Let's build for impact.";
  const description = mode === "partner"
    ? "If your organisation is interested in collaboration around data, technology, research, innovation or digital capacity development, submit your proposal below."
    : mode === "feedback"
    ? "Share your experience, report technical issues, or suggest new digital features directly to the Kenya Red Cross Digital team."
    : "Partner with the Kenya Red Cross Digital Transformation Department to co-create, pilot, or deploy humanitarian technology solutions.";

  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      <section className="py-10 sm:py-16 md:py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h1>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">{description}</p>
        </div>
      </section>

      <section id="form-section" className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            <ContactFormPanel
              mode={mode}
              submissionMode={submissionMode}
              formData={formData}
              loading={loading}
              submitted={submitted}
              submissionResult={submissionResult}
              onModeChange={changeMode}
              onSubmissionModeChange={setSubmissionMode}
              onFormDataChange={setFormData}
              onSubmit={handleSubmit}
              onSubmitAnother={() => { setSubmitted(false); setSubmissionResult(null); }}
            />
            {contactInformation}
          </div>
        </div>
      </section>
    </div>
  );
}
