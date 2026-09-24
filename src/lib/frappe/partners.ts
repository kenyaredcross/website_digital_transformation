import { frappeList, frappeGet, frappeFileUrl } from "./client";
import type { Partner } from "@/types";

export interface FrappePartnerDoc {
  name: string;
  external_id?: string;
  partner_name: string;
  category: Partner["category"];
  logo: string;
  description: string;
  website: string;
  collaboration_focus: string;
  featured?: boolean | number;
}

/** Only prepend the Frappe origin for paths that actually live on the Frappe server.
 *  Paths like /assets/... or /images/... are Next.js public-folder assets and
 *  must be returned unchanged so the browser resolves them locally.
 */
function formatLogoUrl(path: string | null | undefined): string {
  if (!path) return "";
  // Already a full URL → keep as-is
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  // Frappe private/public file uploads → prepend Frappe origin
  if (path.startsWith("/files/") || path.startsWith("files/")) {
    return frappeFileUrl(path);
  }
  // Everything else (e.g. /assets/images/...) → local Next.js public asset
  return path;
}

function mapPartner(raw: FrappePartnerDoc & Record<string, unknown>): Partner {
  const id = String(raw.external_id || raw.id || raw.name || "");
  const name = String(raw.partner_name || raw.name || "");
  const category = (raw.category || "Strategic") as Partner["category"];
  const rawLogo = (raw.logo || "") as string;
  const logo = formatLogoUrl(rawLogo);
  const description = String(raw.description || "");
  const website = String(raw.website || "");
  const collaborationFocus = String(
    raw.collaboration_focus || raw.collaborationFocus || ""
  );
  const featured = Boolean(raw.featured);

  return {
    id,
    name,
    category,
    logo,
    description,
    website,
    collaborationFocus,
    featured,
  };
}

export async function getPartners(): Promise<Partner[]> {
  const response = await frappeList<FrappePartnerDoc>("Partners", {
    limit: 100,
  });
  return response.data.map((item) =>
    mapPartner(item as FrappePartnerDoc & Record<string, unknown>)
  );
}

export async function getPartner(id: string): Promise<Partner> {
  const partners = await getPartners();
  const found = partners.find((p) => p.id === id || p.name === id);
  if (found) {
    return found;
  }
  const raw = await frappeGet<FrappePartnerDoc>("Partners", id);
  return mapPartner(raw as FrappePartnerDoc & Record<string, unknown>);
}

export async function getPartnerById(id: string): Promise<Partner | undefined> {
  try {
    const partner = await getPartner(id);
    return partner || undefined;
  } catch {
    return undefined;
  }
}
