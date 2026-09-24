"use client";

import { Search, Filter, Grid, List, GalleryHorizontalEnd } from "lucide-react";
import { thematicAreas as staticThematicAreas } from "@/data/thematicAreas";
import type { ThematicArea } from "@/types";

type ViewMode = "grid" | "list" | "deck";

interface FilterControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedThematicArea: string;
  onThematicAreaChange: (value: string) => void;
  selectedYear: string;
  onYearChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  categories: string[];
  years: string[];
  thematicAreas?: ThematicArea[];
}

function ViewButton({
  mode,
  label,
  Icon,
  active,
  onClick,
}: {
  mode: ViewMode;
  label: string;
  Icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-1.5 rounded-lg text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-950 ${
        active
          ? "bg-red-600 text-white"
          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      }`}
      title={label}
      aria-pressed={active}
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

/**
 * The full controls bar: search input, thematic area select, year select,
 * view-mode toggle, and category pill filters.
 */
export function FilterControls({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedThematicArea,
  onThematicAreaChange,
  selectedYear,
  onYearChange,
  viewMode,
  onViewModeChange,
  categories,
  years,
  thematicAreas = [],
}: FilterControlsProps) {
  const activeThematicAreas = thematicAreas.length > 0 ? thematicAreas : staticThematicAreas;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
      {/* Top row: Search, Thematic Area, Year + View Mode */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Input */}
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, technology (e.g. Next.js, Python), or keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Thematic Area Selector */}
        <div className="md:col-span-3">
          <select
            value={selectedThematicArea}
            onChange={(e) => onThematicAreaChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-red-500 font-mono"
            aria-label="Filter by thematic area"
          >
            <option value="All">All Thematic Areas</option>
            {activeThematicAreas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.shortTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Year Selector & View Mode */}
        <div className="md:col-span-3 flex items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-red-500 font-mono"
            aria-label="Filter by year"
          >
            <option value="All">All Years</option>
            {years
              .filter((y) => y !== "All")
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>

          {/* View Mode Toggle */}
          <div
            className="flex items-center bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0"
            role="group"
            aria-label="Change how projects are displayed"
          >
            <ViewButton
              mode="grid"
              label="Grid view"
              Icon={Grid}
              active={viewMode === "grid"}
              onClick={() => onViewModeChange("grid")}
            />
            <ViewButton
              mode="list"
              label="List view"
              Icon={List}
              active={viewMode === "list"}
              onClick={() => onViewModeChange("list")}
            />
            <ViewButton
              mode="deck"
              label="Card deck view"
              Icon={GalleryHorizontalEnd}
              active={viewMode === "deck"}
              onClick={() => onViewModeChange("deck")}
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            aria-pressed={selectedCategory === cat}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
              selectedCategory === cat
                ? "bg-red-600 text-white font-bold shadow"
                : "bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
