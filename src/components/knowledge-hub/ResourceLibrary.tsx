"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Search, LayoutGrid, List, Filter, X, Calendar, User, Tag,
  BookOpen, FileText, Download, ExternalLink, ChevronDown,
  Shuffle, Users, Eye,
} from "lucide-react";
import {
  RESOURCE_TYPES,
  AUDIENCE_TYPES,
  RESOURCE_TYPE_COLORS,
  DT_UPDATES_IMAGES,
  type KnowledgeResource,
  type ResourceType,
  type AudienceType,
} from "@/data/knowledgeHubData";

// ── helpers ───────────────────────────────────────────────────────────────────

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-KE", { year: "numeric", month: "short", day: "numeric" });
}

// Tailwind badge colour classes by resource type colour name
const TYPE_BADGE: Record<string, string> = {
  blue:    "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  violet:  "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
  purple:  "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  cyan:    "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300",
  green:   "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  slate:   "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  amber:   "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  orange:  "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  red:     "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  pink:    "bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300",
  teal:    "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300",
};

function typeBadgeClass(type: ResourceType): string {
  const color = RESOURCE_TYPE_COLORS[type] ?? "slate";
  return TYPE_BADGE[color] ?? TYPE_BADGE.slate;
}

// ── Animation variants ────────────────────────────────────────────────────────

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const gridItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit:   { opacity: 0, scale: 0.95 },
};

// ── Resource Card (Grid) — lean version ───────────────────────────────────────

function ResourceCard({ resource, image, onSelect }: { resource: KnowledgeResource; image: string; onSelect: () => void }) {
  return (
    <motion.article
      layout
      variants={gridItem}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/80 transition-shadow duration-300 cursor-pointer"
      onClick={onSelect}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      aria-label={`Open ${resource.title}`}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
        {/* Type badge pinned to image bottom-left */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm ${typeBadgeClass(resource.type)}`}>
            {resource.type}
          </span>
        </div>
      </div>

      {/* Content — intentionally minimal; detail is in the modal */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {resource.title}
        </h3>

        {/* Single-line meta strip */}
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-auto">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(resource.date)}
          </span>
          <span className="flex items-center gap-1 truncate">
            <User className="w-3 h-3 shrink-0" />
            <span className="truncate">{resource.department}</span>
          </span>
        </div>

        {/* CTA */}
        <button className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 px-4 py-2 rounded-xl transition-colors border border-red-100 dark:border-red-900/40">
          <Eye className="w-3.5 h-3.5" /> View Details
        </button>
      </div>
    </motion.article>
  );
}

// ── Resource Row (List) ───────────────────────────────────────────────────────

function ResourceRow({ resource, image, onSelect }: { resource: KnowledgeResource; image: string; onSelect: () => void }) {
  return (
    <motion.article
      layout
      variants={gridItem}
      className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/80 transition-shadow duration-300 cursor-pointer"
      onClick={onSelect}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
        <Image src={image} alt="" fill sizes="80px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
            {resource.title}
          </h3>
        </div>

        {/* Inline metadata strip */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`px-2 py-0.5 rounded-full font-semibold text-[11px] ${typeBadgeClass(resource.type)}`}>{resource.type}</span>
          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(resource.date)}</span>
          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1"><User className="w-3 h-3" />{resource.department}</span>
          <span className="text-slate-400 dark:text-slate-500 font-mono">{resource.version}</span>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-1">{resource.description}</p>

        {/* Audience */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {resource.audience.map((a) => (
            <span key={a} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 font-medium">
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 shrink-0">
        <button className="p-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors" aria-label="View">
          <Eye className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Download">
          <Download className="w-4 h-4" />
        </button>
      </div>
    </motion.article>
  );
}

// ── Detail Modal ──────────────────────────────────────────────────────────────

function ResourceModal({ resource, image, onClose }: { resource: KnowledgeResource; image: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={resource.title}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }}
          exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero image */}
          <div className="relative h-52 bg-slate-100 dark:bg-slate-800">
            <Image src={image} alt="" fill sizes="672px" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 transition-colors border border-white/20"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-5 right-5">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeBadgeClass(resource.type)}`}>
                {resource.type}
              </span>
              <h2 className="mt-2 text-white font-bold text-xl leading-snug line-clamp-2">{resource.title}</h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Full metadata table */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              {[
                { label: "Type",       value: resource.type,       icon: <FileText className="w-3.5 h-3.5" /> },
                { label: "Date",       value: formatDate(resource.date), icon: <Calendar className="w-3.5 h-3.5" /> },
                { label: "Department", value: resource.department, icon: <BookOpen className="w-3.5 h-3.5" /> },
                { label: "Owner",      value: resource.owner,      icon: <User className="w-3.5 h-3.5" /> },
                { label: "Version",    value: resource.version,    icon: <Tag className="w-3.5 h-3.5" /> },
              ].map(({ label, value, icon }) => (
                <div key={label}>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{icon}{label}</div>
                  <div className="text-slate-900 dark:text-white text-sm font-semibold">{value}</div>
                </div>
              ))}
              <div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                  <Users className="w-3.5 h-3.5" />Audience
                </div>
                <div className="flex flex-wrap gap-1">
                  {resource.audience.map((a) => (
                    <span key={a} className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-medium">{a}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{resource.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {resource.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium border border-slate-200 dark:border-slate-700">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm">
                <Download className="w-4 h-4" /> Download Resource
              </button>
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <ExternalLink className="w-4 h-4" /> Open Link
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function ResourceLibrary({ resources = [] }: { resources?: KnowledgeResource[] }) {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ResourceType | "All">("All");
  const [selectedAudience, setSelectedAudience] = useState<AudienceType | "All">("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedResource, setSelectedResource] = useState<KnowledgeResource | null>(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // Assign images to resources (random but stable per seed)
  const buildImageMap = useCallback((seed: number) => {
    const shuffled = seededShuffle([...DT_UPDATES_IMAGES], seed);
    const map: Record<string, string> = {};
    resources.forEach((r, i) => {
      map[r.id] = shuffled[i % shuffled.length];
    });
    return map;
  }, [resources]);

  const imageMap = useMemo(() => buildImageMap(shuffleSeed), [buildImageMap, shuffleSeed]);

  const handleShuffle = () => {
    const seed = (shuffleSeed + 31337) & 0xffff;
    setShuffleSeed(seed);
  };

  // Filtering
  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const q = query.toLowerCase();
      const matchQuery =
        !query ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        r.department.toLowerCase().includes(q) ||
        r.owner.toLowerCase().includes(q);
      const matchType = selectedType === "All" || r.type === selectedType;
      const matchAudience = selectedAudience === "All" || r.audience.includes(selectedAudience as AudienceType);
      return matchQuery && matchType && matchAudience;
    });
  }, [query, selectedType, selectedAudience, resources]);

  return (
    <section id="knowledge-hub-library" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          className="mb-12 md:mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800/60 shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            Resource Library
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Learn From{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-600 dark:text-blue-400">Our Work</span>
              <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-2.5 rounded-full opacity-20 bg-blue-400 dark:bg-blue-500 blur-sm" />
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Explore resources from Kenya Red Cross digital transformation initiatives — project reports, case studies,
            digital guides, training materials, research, and more.
          </p>
        </motion.div>

        {/* ── Controls Bar ── */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="search"
                id="kh-search"
                placeholder="Search resources, departments, tags…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/40 dark:focus:ring-red-400/30 transition"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Filters toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-colors ${
                  showFilters
                    ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>

              {/* Shuffle images */}
              <button
                onClick={handleShuffle}
                title="Shuffle images"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <Shuffle className="w-4 h-4" />
              </button>

              {/* View toggle */}
              <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
                <button
                  onClick={() => setView("grid")}
                  className={`p-3 transition-colors ${view === "grid" ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400"}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-3 transition-colors ${view === "list" ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400"}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="pt-1 pb-2 space-y-4">
                  {/* Type filter */}
                  <div>
                    <p className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Resource Type</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedType("All")}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${selectedType === "All" ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white" : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400"}`}
                      >
                        All Types
                      </button>
                      {RESOURCE_TYPES.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedType(t)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${selectedType === t ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white" : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Audience filter */}
                  <div>
                    <p className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Audience</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedAudience("All")}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${selectedAudience === "All" ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white" : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400"}`}
                      >
                        All Audiences
                      </button>
                      {AUDIENCE_TYPES.map((a) => (
                        <button
                          key={a}
                          onClick={() => setSelectedAudience(a)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${selectedAudience === a ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white" : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400"}`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count & active filters */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> of {resources.length} resources
            </span>
            {(selectedType !== "All" || selectedAudience !== "All" || query) && (
              <button
                onClick={() => { setQuery(""); setSelectedType("All"); setSelectedAudience("All"); }}
                className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 font-semibold"
              >
                <X className="w-3 h-3" /> Clear all filters
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Resource Grid/List ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No resources found</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Try adjusting your search or filters.</p>
            </motion.div>
          ) : view === "grid" ? (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              variants={gridContainer}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((r) => (
                <ResourceCard
                  key={r.id}
                  resource={r}
                  image={imageMap[r.id] ?? DT_UPDATES_IMAGES[0]}
                  onSelect={() => setSelectedResource(r)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="flex flex-col gap-3"
              variants={gridContainer}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((r) => (
                <ResourceRow
                  key={r.id}
                  resource={r}
                  image={imageMap[r.id] ?? DT_UPDATES_IMAGES[0]}
                  onSelect={() => setSelectedResource(r)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Detail Modal ── */}
      {selectedResource && (
        <ResourceModal
          resource={selectedResource}
          image={imageMap[selectedResource.id] ?? DT_UPDATES_IMAGES[0]}
          onClose={() => setSelectedResource(null)}
        />
      )}
    </section>
  );
}
