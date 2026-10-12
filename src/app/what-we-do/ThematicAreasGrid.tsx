"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { ThematicArea } from "@/types";
import {
  Smartphone,
  BarChart3,
  MapPin,
  Cpu,
  Layers,
  Sparkles,
  GraduationCap,
  Users,
  Handshake,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
  X,
  ChevronRight,
} from "lucide-react";

const iconMap = {
  Smartphone,
  BarChart3,
  MapPin,
  Cpu,
  Layers,
  Sparkles,
  GraduationCap,
  Users,
  Handshake,
  BookOpen,
};

interface Props {
  thematicAreas: ThematicArea[];
}

export default function ThematicAreasGrid({ thematicAreas }: Props) {
  // Default to first area on desktop if none selected
  const [activeId, setActiveId] = useState<string | null>(thematicAreas[0]?.id ?? null);

  const activeArea = thematicAreas.find((a) => a.id === activeId) ?? thematicAreas[0] ?? null;

  const toggleMobile = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const selectDesktop = (id: string) => {
    setActiveId(id);
  };

  return (
    <section className="py-10 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-red-600 dark:text-red-400 mb-2 sm:mb-3">
            Our 7 Thematic Pillars
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Explore Every{" "}
            <span className="text-red-600 dark:text-red-500">Area</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto">
            Click on any pillar to explore capabilities, tagline, and learn more.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            1. MOBILE LAYOUT (< lg): Accordion style where detail opens 
               RIGHT BELOW the clicked card
           ───────────────────────────────────────────────────────────────── */}
        <div className="block lg:hidden space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {thematicAreas.map((area) => {
              const Icon = iconMap[area.iconName as keyof typeof iconMap] || Smartphone;
              const isActive = activeId === area.id;

              return (
                <div key={area.id} className="flex flex-col gap-3">
                  {/* Card Button */}
                  <button
                    id={`mobile-thematic-area-${area.id}`}
                    onClick={() => toggleMobile(area.id)}
                    aria-expanded={isActive}
                    aria-controls={`mobile-thematic-detail-${area.id}`}
                    className={`group relative flex items-center justify-between gap-3 p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                      ${
                        isActive
                          ? "bg-red-600 dark:bg-red-600 border-red-700 shadow-xl shadow-red-900/30 text-white"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-red-400 dark:hover:border-red-500 hover:shadow-md text-slate-900 dark:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Number badge */}
                      <span
                        className={`text-[10px] font-black font-sans tracking-wider px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-red-700 text-red-100"
                            : "bg-slate-100 dark:bg-slate-800 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {area.number}
                      </span>

                      {/* Icon */}
                      <div
                        className={`p-2 rounded-xl transition-colors duration-300 ${
                          isActive
                            ? "bg-red-500 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-red-600 dark:text-red-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Title */}
                      <p className="text-xs sm:text-sm font-bold leading-snug">
                        {area.shortTitle}
                      </p>
                    </div>

                    {/* Chevron */}
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isActive ? "rotate-90 text-white" : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                  </button>

                  {/* Mobile Inline Detail Panel — Opens RIGHT BELOW the clicked card */}
                  {isActive && (
                    <div className="mb-2">
                      <DetailPanel
                        area={area}
                        onClose={() => setActiveId(null)}
                        isMobile
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            2. DESKTOP LAYOUT (>= lg): 2 Columns
               Left: Cards Grid (4 cols span 4)
               Right: Detail Panel (8 cols span 8)
           ───────────────────────────────────────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cards List / Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">
            {thematicAreas.map((area) => {
              const Icon = iconMap[area.iconName as keyof typeof iconMap] || Smartphone;
              const isActive = activeId === area.id;

              return (
                <button
                  key={area.id}
                  id={`desktop-thematic-area-${area.id}`}
                  onClick={() => selectDesktop(area.id)}
                  aria-expanded={isActive}
                  className={`group relative flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                    ${
                      isActive
                        ? "bg-red-600 dark:bg-red-600 border-red-700 shadow-xl shadow-red-900/30 scale-[1.01] text-white"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-red-400 dark:hover:border-red-500 hover:shadow-md text-slate-900 dark:text-white"
                    }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Number badge */}
                    <span
                      className={`text-xs font-black font-sans tracking-wider px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-red-700 text-red-100"
                          : "bg-slate-100 dark:bg-slate-800 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {area.number}
                    </span>

                    {/* Icon */}
                    <div
                      className={`p-2.5 rounded-xl transition-colors duration-300 ${
                        isActive
                          ? "bg-red-500 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-red-600 dark:text-red-400 group-hover:bg-red-50 dark:group-hover:bg-slate-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <div>
                      <p className="text-sm font-bold leading-snug">
                        {area.title}
                      </p>
                      <p
                        className={`text-xs mt-0.5 line-clamp-1 ${
                          isActive ? "text-red-100" : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {area.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Active indicator arrow */}
                  <ChevronRight
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isActive ? "translate-x-1 text-white" : "text-slate-300 dark:text-slate-600 group-hover:text-red-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Detail Panel */}
          <div className="lg:col-span-7 sticky top-28">
            {activeArea ? (
              <DetailPanel
                area={activeArea}
                onClose={() => setActiveId(null)}
                isMobile={false}
              />
            ) : (
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400">
                Select a thematic area from the left to view detailed capabilities and insights.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

{/* ── Reusable Detail Panel Component ── */}
function DetailPanel({
  area,
  onClose,
  isMobile = false,
}: {
  area: ThematicArea;
  onClose: () => void;
  isMobile?: boolean;
}) {
  return (
    <div
      id={`thematic-detail-${area.id}`}
      className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-300"
    >
      {/* Collapse (X) button */}
      <button
        onClick={onClose}
        aria-label="Collapse details"
        title="Collapse details"
        className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 transition-colors shadow-md"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex flex-col">
        {/* Featured Image */}
        <div className="relative w-full h-44 sm:h-56 lg:h-64 bg-slate-950">
          <Image
            src={area.featuredImageUrl}
            alt={area.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Image Badge & Title */}
          <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
            <span className="text-2xl sm:text-3xl font-black font-sans text-red-400 opacity-90 block mb-1">
              {area.number}
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">
              {area.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* Tagline */}
          <p className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-300 italic leading-relaxed border-l-4 border-red-500 pl-3">
            &quot;{area.tagline}&quot;
          </p>

          {/* Detailed Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {area.detailedDescription}
          </p>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
            {area.capabilities.map((cap) => (
              <div
                key={cap.title}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1"
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 dark:text-red-500 shrink-0" />
                  <span>{cap.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-5">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Link */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-slate-100 dark:border-slate-800">
            <Link
              href={`/what-we-do/${area.slug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
            >
              <span>Full Thematic Overview</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <span className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium text-center sm:text-left">
              Learn more about {area.shortTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
