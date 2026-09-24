import { frappeList, frappeGet, frappeFileUrl } from "./client";
import type { Project } from "@/types";

export interface FrappeProjectDoc {
  name: string;
  external_id?: string;
  slug: string;
  title: string;
  category: Project["category"];
  year: number;
  description: string;
  short_description?: string;
  shortDescription?: string;
  challange?: string;
  challenge?: string;
  solution: string;
  impact: string;
  impact_metrics?: { label: string; value: string }[] | string;
  impactMetrics?: { label: string; value: string }[];
  technologies?: string[] | string;
  thematic_area_slug?: string;
  thematicAreaSlug?: string;
  countries?: string[] | string;
  team_ids?: string[] | string;
  teamIds?: string[];
  partner_ids?: string[] | string;
  partnerIds?: string[];
  featured?: boolean | number;
  image?: string;
  gallery?: string[] | string;
  demo_url?: string;
  demoUrl?: string;
  github_url?: string;
  githubUrl?: string;
}

function parseJsonOrArray<T>(val: T[] | string | undefined | null): T[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return val.split(",").map((s) => s.trim()).filter(Boolean) as T[];
    }
  }
  return [];
}

function formatImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("/files/") || path.startsWith("files/")) {
    return frappeFileUrl(path);
  }
  return path;
}

function mapProject(raw: FrappeProjectDoc & Record<string, unknown>): Project {
  const id = String(raw.external_id || raw.id || raw.name || "");
  const slug = String(raw.slug || raw.name || id);
  const title = String(raw.title || "");
  const category = (raw.category || "Digital Products") as Project["category"];
  const year = Number(raw.year || new Date().getFullYear());
  const description = String(raw.description || "");
  const shortDescription = String(
    raw.short_description ||
      raw.shortDescription ||
      (description ? description.slice(0, 100) : "")
  );
  const challenge = String(raw.challange || raw.challenge || "");
  const solution = String(raw.solution || "");
  const impact = String(raw.impact || "");

  const impactMetrics = parseJsonOrArray<{ label: string; value: string }>(
    raw.impact_metrics || raw.impactMetrics
  );
  const technologies = parseJsonOrArray<string>(raw.technologies);
  const thematicAreaSlug = String(
    raw.thematic_area_slug || raw.thematicAreaSlug || ""
  );
  const countries = parseJsonOrArray<string>(raw.countries);
  const teamIds = parseJsonOrArray<string>(raw.team_ids || raw.teamIds);
  const partnerIds = parseJsonOrArray<string>(raw.partner_ids || raw.partnerIds);
  const featured = Boolean(raw.featured);

  const rawImage = String(raw.image || "");
  const image = formatImageUrl(rawImage);

  const rawGallery = parseJsonOrArray<string>(raw.gallery);
  const gallery = rawGallery.map((g) => formatImageUrl(g));

  const demoUrl =
    raw.demo_url || raw.demoUrl
      ? String(raw.demo_url || raw.demoUrl)
      : undefined;
  const githubUrl =
    raw.github_url || raw.githubUrl
      ? String(raw.github_url || raw.githubUrl)
      : undefined;

  return {
    id,
    slug,
    title,
    category,
    year,
    description,
    shortDescription,
    challenge,
    solution,
    impact,
    impactMetrics: impactMetrics.length > 0 ? impactMetrics : undefined,
    technologies,
    thematicAreaSlug,
    countries,
    teamIds,
    partnerIds: partnerIds.length > 0 ? partnerIds : undefined,
    featured,
    image,
    gallery: gallery.length > 0 ? gallery : undefined,
    demoUrl,
    githubUrl,
  };
}

export async function getProjects(): Promise<Project[]> {
  const response = await frappeList<FrappeProjectDoc>("Projects", {
    limit: 100,
  });
  return response.data.map((item) =>
    mapProject(item as FrappeProjectDoc & Record<string, unknown>)
  );
}

export async function getProject(idOrSlug: string): Promise<Project | null> {
  const projects = await getProjects();
  const found = projects.find((p) => p.slug === idOrSlug || p.id === idOrSlug);
  if (found) {
    return found;
  }
  try {
    const raw = await frappeGet<FrappeProjectDoc>("Projects", idOrSlug);
    return mapProject(raw as FrappeProjectDoc & Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return getProject(slug);
}
