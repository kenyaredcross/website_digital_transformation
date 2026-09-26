import { frappeList, frappeGet, frappeFileUrl } from "./client";
import type { Person } from "@/types";

export interface FrappePersonDoc {
  name: string;
  external_id?: string;
  slug: string;
  full_name?: string;
  name1?: string;
  role: string;
  department: Person["department"];
  is_volunteer?: boolean | number;
  bio?: string;
  short_bio?: string;
  avatar?: string;
  expertise?: string[] | string;
  email?: string;
  linkedin?: string | null;
  twitter?: string | null;
  github?: string | null;
  featured?: boolean | number;
}

function formatImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/files/") || path.startsWith("files/")) {
    return frappeFileUrl(path);
  }
  return path;
}

function mapPerson(raw: FrappePersonDoc & Record<string, unknown>): Person {
  const id = String(raw.external_id || raw.id || raw.name || "");
  const slug = String(raw.slug || "");
  const name = String(raw.full_name || raw.name1 || raw.name || "");
  const role = String(raw.role || "");
  const department = (raw.department || "Technology") as Person["department"];
  const isVolunteer = Boolean(raw.is_volunteer ?? raw.isVolunteer);
  const bio = String(raw.bio || "");
  const shortBio = String(
    raw.short_bio || raw.shortBio || (bio ? bio.slice(0, 100) : "")
  );

  const rawAvatar = (raw.avatar || "") as string;
  const avatar = formatImageUrl(rawAvatar);

  let expertise: string[] = [];
  if (Array.isArray(raw.expertise)) {
    expertise = raw.expertise.map(String);
  } else if (typeof raw.expertise === "string") {
    expertise = (raw.expertise as string)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const email = raw.email ? String(raw.email) : undefined;
  const linkedin = raw.linkedin ? String(raw.linkedin) : undefined;
  const twitter = raw.twitter ? String(raw.twitter) : undefined;
  const github = raw.github ? String(raw.github) : undefined;
  const featured = Boolean(raw.featured);

  return {
    id,
    slug,
    name,
    role,
    department,
    isVolunteer,
    bio,
    shortBio,
    avatar,
    expertise,
    email,
    linkedin,
    twitter,
    github,
    featured,
  };
}

export async function getPeople(): Promise<Person[]> {
  const response = await frappeList<FrappePersonDoc>("Person", { limit: 100 });
  return response.data.map((item) =>
    mapPerson(item as FrappePersonDoc & Record<string, unknown>)
  ).sort((a, b) => {
    const aNumber = /^p(\d+)$/i.exec(a.id)?.[1];
    const bNumber = /^p(\d+)$/i.exec(b.id)?.[1];
    if (aNumber && bNumber) return Number(aNumber) - Number(bNumber);
    if (aNumber) return -1;
    if (bNumber) return 1;
    return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: "base" });
  });
}

export async function getPerson(idOrSlug: string): Promise<Person | null> {
  const people = await getPeople();
  const found = people.find((p) => p.slug === idOrSlug || p.id === idOrSlug);
  if (found) {
    return found;
  }
  try {
    const raw = await frappeGet<FrappePersonDoc>("Person", idOrSlug);
    return mapPerson(raw as FrappePersonDoc & Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function getPersonBySlug(slug: string): Promise<Person | null> {
  return getPerson(slug);
}
