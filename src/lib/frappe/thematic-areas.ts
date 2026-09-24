import { frappeList, frappeGet, frappeFileUrl } from "./client";
import type { ThematicArea } from "@/types";

export interface FrappeThematicAreaDoc {
  name: string;
  external_id?: string;
  slug: string;
  number: string;
  title: string;
  short_title?: string;
  shortTitle?: string;
  tag_line?: string;
  tagline?: string;
  description?: string;
  detailed_description?: string;
  detailedDescription?: string;
  capabilities?: { title: string; description: string }[] | string;
  impact_metrics?: { label: string; value: string }[] | string;
  impactMetrics?: { label: string; value: string }[] | string;
  icon_name?: string;
  iconName?: string;
  featured_image_url?: string;
  featuredImageUrl?: string;
}

function parseJsonArray<T>(val: T[] | string | undefined | null): T[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return [];
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

function mapThematicArea(
  raw: FrappeThematicAreaDoc & Record<string, unknown>
): ThematicArea {
  const id = String(raw.external_id || raw.id || raw.slug || raw.name || "");
  const slug = String(raw.slug || raw.external_id || raw.name || "");
  const number = String(raw.number || "01");
  const title = String(raw.title || raw.name || "");
  const shortTitle = String(
    raw.short_title || raw.shortTitle || raw.title || ""
  );
  const tagline = String(raw.tag_line || raw.tagline || raw.description || "");
  const description = String(raw.description || tagline || "");
  const detailedDescription = String(
    raw.detailed_description || raw.detailedDescription || description || ""
  );

  const capabilities = parseJsonArray<{ title: string; description: string }>(
    raw.capabilities as unknown as { title: string; description: string }[] | string | undefined
  );

  const impactMetrics = parseJsonArray<{ label: string; value: string }>(
    (raw.impact_metrics || raw.impactMetrics) as unknown as { label: string; value: string }[] | string | undefined
  );

  const iconName = String(raw.icon_name || raw.iconName || "Layers");
  const rawFeaturedImageUrl = String(
    raw.featured_image_url || raw.featuredImageUrl || ""
  );
  const featuredImageUrl = formatImageUrl(rawFeaturedImageUrl);

  return {
    id,
    slug,
    number,
    title,
    shortTitle,
    tagline,
    description,
    detailedDescription,
    capabilities,
    impactMetrics,
    iconName,
    featuredImageUrl,
  };
}

export async function getThematicAreas(): Promise<ThematicArea[]> {
  const response = await frappeList<FrappeThematicAreaDoc>("Thematic Areas", {
    limit: 100,
  });

  const list = response.data.map((item) =>
    mapThematicArea(item as FrappeThematicAreaDoc & Record<string, unknown>)
  );

  // Sort by number (01 to 07)
  return list.sort((a, b) => Number(a.number) - Number(b.number));
}

export async function getThematicArea(
  slugOrId: string
): Promise<ThematicArea | null> {
  const areas = await getThematicAreas();
  const found = areas.find(
    (a) =>
      a.slug.toLowerCase() === slugOrId.toLowerCase() ||
      a.id.toLowerCase() === slugOrId.toLowerCase()
  );
  if (found) {
    return found;
  }
  try {
    const raw = await frappeGet<FrappeThematicAreaDoc>(
      "Thematic Areas",
      slugOrId
    );
    return mapThematicArea(
      raw as FrappeThematicAreaDoc & Record<string, unknown>
    );
  } catch {
    return null;
  }
}

export async function getThematicAreaBySlug(
  slug: string
): Promise<ThematicArea | undefined> {
  const area = await getThematicArea(slug);
  return area || undefined;
}
