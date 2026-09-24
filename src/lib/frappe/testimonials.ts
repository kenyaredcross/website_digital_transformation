import { frappeList, frappeGet, frappeFileUrl } from "./client";
import type { Testimonial } from "@/types";

export interface FrappeTestimonialDoc {
  name: string;
  external_id?: string;
  quote: string;
  author_name: string;
  author_role: string;
  organization: string;
  location: string;
  avatar: string;
  category: Testimonial["category"];
  featured?: boolean | number;
}

function formatAvatarUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("/files/") || path.startsWith("files/")) {
    return frappeFileUrl(path);
  }
  return path;
}

function mapTestimonial(raw: FrappeTestimonialDoc & Record<string, unknown>): Testimonial {
  const id = String(raw.external_id || raw.id || raw.name || "");
  const quote = String(raw.quote || "");
  const authorName = String(raw.author_name || raw.authorName || "");
  const authorRole = String(raw.author_role || raw.authorRole || "");
  const organization = String(raw.organization || "");
  const location = String(raw.location || "");
  const avatar = formatAvatarUrl((raw.avatar || "") as string);
  const category = (raw.category || "Field Volunteer") as Testimonial["category"];
  const featured = Boolean(raw.featured);

  return {
    id,
    quote,
    authorName,
    authorRole,
    organization,
    location,
    avatar,
    category,
    featured,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const response = await frappeList<FrappeTestimonialDoc>("Testimonials", {
    limit: 100,
  });
  return response.data.map((item) =>
    mapTestimonial(item as FrappeTestimonialDoc & Record<string, unknown>)
  );
}

export async function getTestimonial(id: string): Promise<Testimonial | null> {
  const testimonials = await getTestimonials();
  const found = testimonials.find((t) => t.id === id);
  if (found) {
    return found;
  }
  try {
    const raw = await frappeGet<FrappeTestimonialDoc>("Testimonials", id);
    return mapTestimonial(raw as FrappeTestimonialDoc & Record<string, unknown>);
  } catch {
    return null;
  }
}
