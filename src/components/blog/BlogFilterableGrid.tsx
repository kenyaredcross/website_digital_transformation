"use client";

import { useState, useEffect, useMemo } from "react";
import { BlogPost } from "@/types";
import { BlogCard, BlogCardVariant } from "@/components/blog/BlogCard";
import { Search, X } from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Layout engine

   A repeating 5-post block on a 12-column grid:

     ┌──────────────────┐ ┌────────────┐
     │                  │ │  standard  │   row 1
     │     featured     │ ├────────────┤
     │    (span 2 rows) │ │  standard  │   row 2
     └──────────────────┘ └────────────┘
     ┌────────────────────────┐ ┌──────┐
     │         wide           │ │compact│  row 3
     └────────────────────────┘ └──────┘

   The tail (count % 5) gets its own balanced arrangement so the last
   row is never left with a hole in it. Filtering changes the count,
   so this is recomputed on every render of the result set.
   ──────────────────────────────────────────────────────────── */

type Slot = { variant: BlogCardVariant; span: string };

const FEATURED: Slot = { variant: "featured", span: "lg:col-span-7 lg:row-span-2" };
const STANDARD_5: Slot = { variant: "standard", span: "lg:col-span-5" };
const STANDARD_6: Slot = { variant: "standard", span: "lg:col-span-6" };
const WIDE_8: Slot = { variant: "wide", span: "lg:col-span-8" };
const WIDE_12: Slot = { variant: "wide", span: "lg:col-span-12" };
const COMPACT_4: Slot = { variant: "compact", span: "lg:col-span-4" };

const BLOCK: Slot[] = [FEATURED, STANDARD_5, STANDARD_5, WIDE_8, COMPACT_4];

function buildLayout(count: number): Slot[] {
  const slots: Slot[] = [];
  const whole = Math.floor(count / BLOCK.length) * BLOCK.length;

  for (let i = 0; i < whole; i++) slots.push(BLOCK[i % BLOCK.length]);

  switch (count - whole) {
    case 1:
      slots.push(WIDE_12);
      break;
    case 2:
      slots.push(STANDARD_6, STANDARD_6);
      break;
    case 3:
      slots.push(FEATURED, STANDARD_5, STANDARD_5);
      break;
    case 4:
      slots.push(FEATURED, STANDARD_5, STANDARD_5, WIDE_12);
      break;
  }

  return slots;
}

export function BlogFilterableGrid() {
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let active = true;
    fetch("/api/data/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) setBlogsList(data);
      })
      .catch((err) => console.error("Failed to load live blogs:", err));
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogsList.map((b) => b.category)))],
    [blogsList]
  );

  const filteredBlogs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return blogsList
      .filter((post) => {
        if (selectedCategory !== "All" && post.category !== selectedCategory) return false;
        if (!q) return true;
        return (
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          !!post.tags?.some((t) => t.toLowerCase().includes(q))
        );
      })
      /* Editorial prominence is data-driven: flagged posts take the
         featured slots, everything else keeps its source order. */
      .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }, [blogsList, selectedCategory, searchQuery]);

  const layout = useMemo(() => buildLayout(filteredBlogs.length), [filteredBlogs.length]);
  const isFiltered = selectedCategory !== "All" || searchQuery.trim() !== "";

  const reset = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <div className="space-y-12">
      {/* ── Controls ───────────────────────────────────────── */}
      <div className="space-y-5">
        <div className="relative max-w-xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <label htmlFor="blog-search" className="sr-only">
            Search stories
          </label>
          <input
            id="blog-search"
            type="search"
            placeholder="Search stories, topics or tags"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-11 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/25 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by topic">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                  active
                    ? "bg-red-600 font-semibold text-white"
                    : "border border-slate-300 bg-transparent text-slate-700 hover:border-slate-400 hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
          {filteredBlogs.length} {filteredBlogs.length === 1 ? "story" : "stories"}
          {isFiltered && (
            <>
              {" · "}
              <button
                type="button"
                onClick={reset}
                className="font-medium text-red-600 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:text-red-400"
              >
                Show all
              </button>
            </>
          )}
        </p>
      </div>

      {/* ── Results ────────────────────────────────────────── */}
      {filteredBlogs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 px-8 py-20 text-center dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            No stories match that search
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-300">
            Try a broader keyword, or browse everything we have published.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            Show all stories
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {filteredBlogs.map((post, i) => {
            const slot = layout[i] ?? STANDARD_6;
            return (
              <div key={post.id} className={slot.span}>
                <BlogCard post={post} variant={slot.variant} priority={i === 0} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
