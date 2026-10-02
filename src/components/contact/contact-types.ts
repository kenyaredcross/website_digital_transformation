export type ContactMode = "general" | "partner" | "feedback";
export type FeedbackSubmissionMode = "identified" | "anonymous";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  collaborationArea: string;
  message: string;
  stakeholderType: string;
  stakeholderTypeOther: string;
  country: string;
  region: string;
  digitalService: string;
  project: string;
  platformUsed: string;
  feedbackCategory: string;
  severity: string;
  suggestion: string;
  accessibilityImpacted: boolean;
  accessibilityArea: string;
  consentToContact: boolean;
  privacyAccepted: boolean;
}

export interface ContactSubmissionResult {
  frappeSynced?: boolean;
  docName?: string;
  message?: string;
}

export const INITIAL_CONTACT_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  subject: "",
  collaborationArea: "Data & Technology",
  message: "",
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
};
