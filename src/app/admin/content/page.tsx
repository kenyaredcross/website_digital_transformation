"use client";

import { useEffect, useState } from "react";
import { fetchEntityData } from "@/lib/api-client";
import type { KnowledgeResource } from "@/data/knowledgeHubData";
import type { DigitalStory } from "@/data/digitalStories";
import type { NewsItem } from "@/data/newsUpdates";

type ContentItem = KnowledgeResource | DigitalStory | NewsItem;

const CONTENT_TYPES = [
  { key: "knowledge-resources", label: "Knowledge Resources" },
  { key: "digital-stories", label: "Digital Stories" },
  { key: "news-items", label: "News Items" },
] as const;

export default function AdminContentPage() {
  const [activeType, setActiveType] = useState<(typeof CONTENT_TYPES)[number]["key"]>("knowledge-resources");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchEntityData<ContentItem[]>(activeType)
      .then((data) => { if (active) setItems(Array.isArray(data) ? data : []); })
      .catch((error) => { console.error("Could not load Frappe content", error); if (active) setItems([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [activeType]);

  const title = (item: ContentItem) => item.title;
  const identifier = (item: ContentItem) => item.id;
  const subtitle = (item: ContentItem) => {
    const record = item as ContentItem & { date: string; department?: string; tag?: string; type?: string };
    return [record.date, record.department || record.tag || record.type].filter(Boolean).join(" · ");
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Knowledge, Stories &amp; News</h1>
        <p className="mt-2 text-slate-400">Live read-only view of content stored in Frappe. Create, edit and delete are managed in Frappe Desk.</p>
      </header>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Content type">
        {CONTENT_TYPES.map((type) => (
          <button key={type.key} role="tab" aria-selected={activeType === type.key} onClick={() => setActiveType(type.key)} className={`rounded-lg px-4 py-2 text-sm font-medium ${activeType === type.key ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}>
            {type.label}
          </button>
        ))}
      </div>
      {loading ? <p className="py-10 text-center text-slate-400">Loading Frappe content…</p> : items.length ? (
        <div className="overflow-hidden rounded-xl border border-slate-800">
          {items.map((item) => (
            <article key={identifier(item)} className="border-b border-slate-800 p-5 last:border-b-0">
              <h2 className="font-semibold">{title(item)}</h2>
              <p className="mt-1 text-sm text-slate-400">{subtitle(item)} · {identifier(item)}</p>
            </article>
          ))}
        </div>
      ) : <p className="py-10 text-center text-slate-400">No records found in Frappe.</p>}
    </section>
  );
}
