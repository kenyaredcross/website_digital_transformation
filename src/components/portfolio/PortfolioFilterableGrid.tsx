"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Layers } from "lucide-react";
import { projects } from "@/data/projects";
import { FilterControls } from "./FilterControls";
import { GridView } from "./GridView";
import { ListView } from "./ListView";
import { DeckView } from "./DeckView";

type ViewMode = "grid" | "list" | "deck";

/**
 * Orchestrates filter state, derived data, and view-mode switching for the
 * portfolio page. All rendering is delegated to focused sub-components:
 *
 * - `FilterControls`  — search + dropdowns + category pills
 * - `GridView`        — 3-column card grid
 * - `ListView`        — horizontal list rows
 * - `DeckView`        — single-card carousel / deck
 *
 * CSS animations live in `globals.css` (prefixed `pf-*` and `hero-*`).
 */
export function PortfolioFilterableGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedThematicArea, setSelectedThematicArea] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [deckIndex, setDeckIndex] = useState(0);
  const [deckDir, setDeckDir] = useState<"forward" | "back">("forward");

  // Stable derived lists for filter dropdowns
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );
  const years = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.year.toString()))).sort().reverse()],
    []
  );

  // Apply all active filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (selectedCategory !== "All" && project.category !== selectedCategory) return false;
      if (selectedThematicArea !== "All" && project.thematicAreaSlug !== selectedThematicArea) return false;
      if (selectedYear !== "All" && project.year.toString() !== selectedYear) return false;

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const hit =
          project.title.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q) ||
          project.technologies.some((t) => t.toLowerCase().includes(q)) ||
          project.challenge?.toLowerCase().includes(q);
        if (!hit) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedThematicArea, selectedYear]);

  const total = filteredProjects.length;

  // Reset deck to first card whenever filters change
  useEffect(() => {
    setDeckIndex(0);
    setDeckDir("forward");
  }, [searchQuery, selectedCategory, selectedThematicArea, selectedYear]);

  const goNext = useCallback(() => {
    if (total === 0) return;
    setDeckDir("forward");
    setDeckIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total === 0) return;
    setDeckDir("back");
    setDeckIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedThematicArea("All");
    setSelectedYear("All");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedThematicArea !== "All" ||
    selectedYear !== "All" ||
    !!searchQuery;

  return (
    <div className="space-y-10">
      {/* Controls bar */}
      <FilterControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedThematicArea={selectedThematicArea}
        onThematicAreaChange={setSelectedThematicArea}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        categories={categories}
        years={years}
      />

      {/* Results count + reset */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 px-1">
        <span aria-live="polite">
          Showing <strong className="text-slate-900 dark:text-white">{total}</strong> of{" "}
          {projects.length} digital solutions
        </span>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-red-600 dark:text-red-400 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Empty state */}
      {total === 0 ? (
        <div className="p-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <Layers className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No projects found</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            No digital products match your current search query or filter criteria. Try adjusting your parameters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <GridView projects={filteredProjects} />
      ) : viewMode === "list" ? (
        <ListView projects={filteredProjects} />
      ) : (
        <DeckView
          projects={filteredProjects}
          deckIndex={deckIndex}
          deckDir={deckDir}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </div>
  );
}
