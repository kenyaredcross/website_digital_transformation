"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { thematicAreas } from "@/data/thematicAreas";
import { Search, Filter, Layers, ArrowRight, Grid, List } from "lucide-react";

export function PortfolioFilterableGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedThematicArea, setSelectedThematicArea] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Derive categories present in data
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const years = ["All", ...Array.from(new Set(projects.map((p) => p.year.toString()))).sort().reverse()];

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category check
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }

      // Thematic area check
      if (
        selectedThematicArea !== "All" &&
        project.thematicAreaSlug !== selectedThematicArea
      ) {
        return false;
      }

      // Year check
      if (selectedYear !== "All" && project.year.toString() !== selectedYear) {
        return false;
      }

      // Search query check
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchTitle = project.title.toLowerCase().includes(q);
        const matchDesc = project.description.toLowerCase().includes(q);
        const matchTech = project.technologies.some((t) => t.toLowerCase().includes(q));
        const matchChallenge = project.challenge?.toLowerCase().includes(q);

        if (!matchTitle && !matchDesc && !matchTech && !matchChallenge) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedThematicArea, selectedYear]);

  return (
    <div className="space-y-10">
      {/* Controls Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        {/* Top Controls: Search Bar & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, technology (e.g. Next.js, Python), or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
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
              onChange={(e) => setSelectedThematicArea(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-red-500 font-mono"
            >
              <option value="All">All Thematic Areas</option>
              {thematicAreas.map((area) => (
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
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-red-500 font-mono"
            >
              <option value="All">All Years</option>
              {years.filter((y) => y !== "All").map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === "grid"
                    ? "bg-red-600 text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === "list"
                    ? "bg-red-600 text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
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
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
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

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 px-1">
        <span>
          Showing <strong className="text-slate-900 dark:text-white">{filteredProjects.length}</strong> of{" "}
          {projects.length} digital solutions
        </span>
        {(selectedCategory !== "All" ||
          selectedThematicArea !== "All" ||
          selectedYear !== "All" ||
          searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedThematicArea("All");
              setSelectedYear("All");
              setSearchQuery("");
            }}
            className="text-red-600 dark:text-red-400 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="p-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <Layers className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No projects found</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            No digital products match your current search query or filter criteria. Try adjusting your parameters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedThematicArea("All");
              setSelectedYear("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md"
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="relative block aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-950"
                aria-label={`View ${project.title} case study`}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </Link>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {project.year}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {project.countries.join(", ")}
                </span>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                >
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm"
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="relative block w-full md:w-48 aspect-[16/9] shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950"
                aria-label={`View ${project.title} case study`}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 192px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-red-600 dark:text-red-400 font-bold">{project.category}</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-slate-500 dark:text-slate-400">{project.year}</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-slate-500 dark:text-slate-400">{project.countries.join(", ")}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] font-mono bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/portfolio/${project.slug}`}
                className="px-5 py-3 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shrink-0 flex items-center gap-2"
              >
                <span>View Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
