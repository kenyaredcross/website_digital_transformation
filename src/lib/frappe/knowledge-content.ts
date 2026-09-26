import { frappeFileUrl, frappeGet, frappeList } from "./client";
import type { KnowledgeResource } from "@/data/knowledgeHubData";
import type { DigitalStory } from "@/data/digitalStories";
import type { NewsItem } from "@/data/newsUpdates";

type FrappeDoc = Record<string, unknown> & { name: string };

function strings(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => typeof item === "string" ? item : String((item as { audience?: unknown }).audience ?? "")).filter(Boolean);
  }
  if (typeof value === "string") {
    try { return strings(JSON.parse(value) as unknown); } catch { return value.split(",").map((part) => part.trim()).filter(Boolean); }
  }
  return [];
}

function mapKnowledge(doc: FrappeDoc): KnowledgeResource {
  return {
    id: String(doc.knowledge_id || doc.name),
    title: String(doc.title || ""),
    type: String(doc.resource_type || "Research") as KnowledgeResource["type"],
    date: String(doc.date || ""),
    department: String(doc.department_text || ""),
    owner: String(doc.owner_team || ""),
    version: String(doc.version || ""),
    audience: strings(doc.audience) as KnowledgeResource["audience"],
    description: String(doc.description || ""),
    tags: strings(doc.tags),
  };
}

function mapStory(doc: FrappeDoc): DigitalStory {
  return {
    id: String(doc.story_id || doc.name),
    slug: String(doc.slug || doc.story_id || doc.name),
    title: String(doc.title || ""),
    subtitle: String(doc.subtitle || ""),
    date: String(doc.date || ""),
    author: String(doc.author || "Kenya Red Cross"),
    authorRole: String(doc.author_role || ""),
    tag: String(doc.tag || ""),
    coverImage: frappeFileUrl(String(doc.cover_image || "")) || undefined,
    challenge: String(doc.challenge || ""),
    people: String(doc.people || ""),
    solution: String(doc.solution || ""),
    experience: String(doc.experience || ""),
    learning: String(doc.learning || ""),
    impact: String(doc.impact || ""),
    safeguardingNote: doc.safeguarding_note ? String(doc.safeguarding_note) : undefined,
  };
}

function mapNews(doc: FrappeDoc): NewsItem {
  const resources = Array.isArray(doc.resources) ? doc.resources as { label?: string; url?: string }[] : [];
  return {
    id: String(doc.news_id || doc.name),
    slug: String(doc.slug || doc.news_id || doc.name),
    title: String(doc.title || ""),
    date: String(doc.date || ""),
    author: String(doc.author || "Kenya Red Cross"),
    department: String(doc.department || ""),
    category: String(doc.category || "Policy") as NewsItem["category"],
    summary: String(doc.summary || ""),
    content: String(doc.content || ""),
    resources: resources.map((resource) => ({ label: String(resource.label || ""), url: String(resource.url || "") })),
    imageAlt: doc.image_alt ? String(doc.image_alt) : undefined,
  };
}

async function allDocs<T extends FrappeDoc>(doctype: string): Promise<T[]> {
  const first = await frappeList<T>(doctype, { limit: 100 });
  const later = await Promise.all(Array.from({ length: Math.ceil(Math.max(first.total - first.data.length, 0) / 100) }, (_, index) =>
    frappeList<T>(doctype, { limit: 100, start: first.data.length + index * 100 }),
  ));
  return [ ...first.data, ...later.flatMap((page) => page.data) ];
}

export async function getKnowledgeResources(): Promise<KnowledgeResource[]> {
  const docs = await allDocs<FrappeDoc>("Knowledge Resource");
  const hydrated = await Promise.all(docs.map(async (doc) => {
    if (Array.isArray(doc.audience)) return doc;
    try { return await frappeGet<FrappeDoc>("Knowledge Resource", String(doc.name)); } catch { return doc; }
  }));
  return hydrated.map(mapKnowledge);
}

export async function getDigitalStories(): Promise<DigitalStory[]> {
  return (await allDocs<FrappeDoc>("Digital Story")).map(mapStory);
}

export async function getDigitalStory(idOrSlug: string): Promise<DigitalStory | undefined> {
  const stories = await getDigitalStories();
  const found = stories.find((story) => story.slug === idOrSlug || story.id === idOrSlug);
  if (found) return found;
  try { return mapStory(await frappeGet<FrappeDoc>("Digital Story", idOrSlug)); } catch { return undefined; }
}

export async function getNewsItems(): Promise<NewsItem[]> {
  const docs = await allDocs<FrappeDoc>("News Item");
  // The list API intentionally returns parent fields only; hydrate child resource links via get_doc.
  const hydrated = await Promise.all(docs.map(async (doc) => {
    if (Array.isArray(doc.resources)) return doc;
    try { return await frappeGet<FrappeDoc>("News Item", String(doc.name)); } catch { return doc; }
  }));
  return hydrated.map(mapNews);
}

export async function getNewsItem(idOrSlug: string): Promise<NewsItem | undefined> {
  const items = await getNewsItems();
  return items.find((item) => item.slug === idOrSlug || item.id === idOrSlug);
}
