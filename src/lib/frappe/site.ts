import type { SiteConfig } from "@/types";

const FRAPPE_API_URL =
  process.env.NEXT_PUBLIC_FRAPPE_API_URL ?? "http://redcross.local:8000";

interface FrappeSiteDoc {
  name: string | number;
  site_name?: string;
  short_name?: string;
  tagline?: string;
  description?: string;
  url?: string;
  official_redcross_url?: string;
  contact?: {
    email?: string;
    phone?: string;
    emergencyLine?: string;
    location?: string;
    address?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    workingHours?: string;
  };
  social?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
  [key: string]: unknown;
}

export const EMPTY_SITE_CONFIG: SiteConfig = {
  name: "",
  shortName: "",
  tagline: "",
  description: "",
  url: "",
  officialRedCrossUrl: "",
  contact: {
    email: "",
    phone: "",
    emergencyLine: "",
    location: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    workingHours: "",
  },
  social: {
    twitter: "",
    facebook: "",
    linkedin: "",
    github: "",
    youtube: "",
  },
};

function parseJsonObject(val: unknown): Record<string, any> {
  if (typeof val === "string") {
    try {
      return JSON.parse(val) || {};
    } catch {
      return {};
    }
  }
  if (typeof val === "object" && val !== null) {
    return val as Record<string, any>;
  }
  return {};
}

function mapSiteConfig(raw: FrappeSiteDoc): SiteConfig {
  const contact = parseJsonObject(raw.contact);
  const social = parseJsonObject(raw.social);

  return {
    name: String(raw.site_name || ""),
    shortName: String(raw.short_name || ""),
    tagline: String(raw.tagline || ""),
    description: String(raw.description || ""),
    url: String(raw.url || ""),
    officialRedCrossUrl: String(raw.official_redcross_url || ""),
    contact: {
      email: String(contact.email || ""),
      phone: String(contact.phone || ""),
      emergencyLine: String(contact.emergencyLine || ""),
      location: String(contact.location || ""),
      address: String(contact.address || ""),
      postalCode: String(contact.postalCode || ""),
      city: String(contact.city || ""),
      country: String(contact.country || ""),
      workingHours: String(contact.workingHours || ""),
    },
    social: {
      twitter: String(social.twitter || ""),
      facebook: String(social.facebook || ""),
      linkedin: String(social.linkedin || ""),
      github: String(social.github || ""),
      youtube: String(social.youtube || ""),
    },
  };
}

/**
 * Fetches the singleton Site document from Frappe.
 * Returns empty config if Frappe is unreachable (no static fallback).
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch(
      `${FRAPPE_API_URL}/api/method/redcross_digital.api.get_site_config`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error(`Frappe returned ${res.status}`);
    const json = await res.json();
    const raw = json?.message as FrappeSiteDoc | undefined;
    if (!raw) throw new Error("Empty message from Frappe");
    return mapSiteConfig(raw);
  } catch (err) {
    console.warn("[site] Frappe unreachable:", err);
    return EMPTY_SITE_CONFIG;
  }
}
