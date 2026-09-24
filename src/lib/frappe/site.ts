import type { SiteConfig } from "@/types";

const FRAPPE_API_URL =
  process.env.NEXT_PUBLIC_FRAPPE_API_URL ?? "http://redcross.local:8000";


/** Shape returned by Frappe's tabSite row */
interface FrappeSiteDoc {
  name: string | number;
  site_name?: string;
  short_name?: string;
  tagline?: string;
  description?: string;
  url?: string;
  official_redcross_url?: string;
  /** Stored as a JSON string in MariaDB; _clean() in api.py parses it */
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

/** Fallback so the site never completely breaks if Frappe is unreachable. */
const FALLBACK: SiteConfig = {
  name: "Kenya Red Cross Society — Digital Transformation",
  shortName: "KRCS Digital",
  tagline: "Digital innovation for a more resilient Kenya.",
  description:
    "Exploring the people, products, data and partnerships transforming humanitarian action across Kenya and the Greater Horn of Africa.",
  url: "https://digital.redcross.or.ke",
  officialRedCrossUrl: "https://www.redcross.or.ke",
  contact: {
    email: "data.digital@redcross.or.ke",
    phone: "(+254) 703 037 000",
    emergencyLine: "1199",
    location: "South C (Bellevue), Red Cross Road, off Popo Road",
    address: "P.O. Box 40712",
    postalCode: "00100",
    city: "Nairobi",
    country: "Kenya",
    workingHours: "Monday – Friday: 08:00 AM – 05:00 PM (EAT)",
  },
  social: {
    twitter: "https://twitter.com/KenyaRedCross",
    facebook: "https://facebook.com/KenyaRedCross",
    linkedin: "https://linkedin.com/company/kenya-red-cross",
    github: "https://github.com/redcross-digital",
    youtube: "https://youtube.com/user/KenyaRedCross",
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
    name: String(raw.site_name || FALLBACK.name),
    shortName: String(raw.short_name || FALLBACK.shortName),
    tagline: String(raw.tagline || FALLBACK.tagline),
    description: String(raw.description || FALLBACK.description),
    url: String(raw.url || FALLBACK.url),
    officialRedCrossUrl: String(
      raw.official_redcross_url || FALLBACK.officialRedCrossUrl
    ),
    contact: {
      email: String(contact.email || FALLBACK.contact.email),
      phone: String(contact.phone || FALLBACK.contact.phone),
      emergencyLine: String(contact.emergencyLine || FALLBACK.contact.emergencyLine),
      location: String(contact.location || FALLBACK.contact.location),
      address: String(contact.address || FALLBACK.contact.address),
      postalCode: String(contact.postalCode || FALLBACK.contact.postalCode),
      city: String(contact.city || FALLBACK.contact.city),
      country: String(contact.country || FALLBACK.contact.country),
      workingHours: String(contact.workingHours || FALLBACK.contact.workingHours),
    },
    social: {
      twitter: String(social.twitter || FALLBACK.social.twitter),
      facebook: String(social.facebook || FALLBACK.social.facebook),
      linkedin: String(social.linkedin || FALLBACK.social.linkedin),
      github: String(social.github || FALLBACK.social.github),
      youtube: String(social.youtube || FALLBACK.social.youtube),
    },
  };
}

/**
 * Fetches the singleton Site document from Frappe.
 * Falls back to hardcoded values if Frappe is unreachable (e.g. during build).
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch(
      `${FRAPPE_API_URL}/api/method/redcross_digital.api.get_site_config`,
      { next: { revalidate: 300 } } // ISR: refresh every 5 min
    );
    if (!res.ok) throw new Error(`Frappe returned ${res.status}`);
    const json = await res.json();
    const raw = json?.message as FrappeSiteDoc | undefined;
    if (!raw) throw new Error("Empty message from Frappe");
    return mapSiteConfig(raw);
  } catch (err) {
    console.warn("[site] Frappe unreachable, using fallback config:", err);
    return FALLBACK;
  }
}
