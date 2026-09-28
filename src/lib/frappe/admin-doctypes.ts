export const ADMIN_DOCTYPES = [
  "Person", "Projects", "Countries", "Thematic Areas", "Digital Story",
  "Knowledge Resource", "News Item", "Testimonials", "Innovations", "Partners", "Blogs", "Site",
] as const;

export const SUBMISSION_DOCTYPES = ["Inquiry", "Partnership Proposal", "Feedback"] as const;

export function isAdminDoctype(value: string): boolean {
  return (ADMIN_DOCTYPES as readonly string[]).includes(value);
}

export function isSubmissionDoctype(value: string): boolean {
  return (SUBMISSION_DOCTYPES as readonly string[]).includes(value);
}
