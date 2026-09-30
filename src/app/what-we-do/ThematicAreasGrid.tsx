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
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeArea = thematicAreas.find((a) => a.id === activeId) ?? null;

  const toggle = (id: string) => setActiveId((prev) => (prev === id ? null : id));

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-red-600 dark:text-red-400 mb-3">
            Our 7 Thematic Pillars
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Explore Every{" "}
            <span className="text-red-600 dark:text-red-500">Area</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Click on any pillar to explore capabilities, tagline, and learn more.
          </p>
        </div>

        {/* ── Card grid — all 7 visible at once ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {thematicAreas.map((area) => {
            const Icon = iconMap[area.iconName as keyof typeof iconMap] || Smartphone;
            const isActive = activeId === area.id;

            return (
              <button
                key={area.id}
                id={`thematic-area-${area.id}`}
                onClick={() => toggle(area.id)}
                aria-expanded={isActive}
                aria-controls={`thematic-detail-${area.id}`}
                className={`group relative flex flex-col items-start gap-3 p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                  ${
                    isActive
                      ? "bg-red-600 dark:bg-red-600 border-red-700 shadow-2xl shadow-red-900/30 scale-[1.02]"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-red-400 dark:hover:border-red-500 hover:shadow-lg hover:scale-[1.01] shadow-sm"
                  }`}
              >
                {/* Number badge */}
                <span
                  className={`text-xs font-black font-mono tracking-wider px-2 py-0.5 rounded-full ${
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
                <p
                  className={`text-sm font-bold leading-snug transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400"
                  }`}
                >
                  {area.shortTitle}
                </p>

                {/* Active indicator chevron */}
                <ChevronRight
                  className={`absolute top-4 right-4 w-4 h-4 transition-all duration-300 ${
                    isActive
                      ? "text-red-200 rotate-90"
                      : "text-slate-300 dark:text-slate-600 group-hover:text-red-400"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* ── Detail panel — animated expansion ── */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            activeArea ? "mt-6 max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-live="polite"
        >
          {activeArea && (
            <div
              id={`thematic-detail-${activeArea.id}`}
              className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveId(null)}
                aria-label="Close detail panel"
                className="absolute top-5 right-5 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[320px]">

                {/* ── Left: Image ── */}
                <div className="relative lg:col-span-4 min-h-[220px] lg:min-h-0">
                  <Image
                    src={activeArea.featuredImageUrl}
                    alt={activeArea.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent" />
                  {/* Number + title on image */}
                  <div className="absolute inset-x-6 bottom-6 lg:hidden">
                    <span className="text-4xl font-black font-mono text-red-400 opacity-70">{activeArea.number}</span>
                    <h3 className="text-2xl font-black text-white leading-tight">{activeArea.title}</h3>
                  </div>
                </div>

                {/* ── Right: Content ── */}
                <div className="lg:col-span-8 p-8 md:p-10 space-y-6">

                  {/* Header */}
                  <div className="hidden lg:flex items-center gap-4">
                    <span className="text-5xl font-black font-mono text-red-600 dark:text-red-500 opacity-30 leading-none">
                      {activeArea.number}
                    </span>
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                        {activeArea.title}
                      </h3>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-base font-medium text-red-700 dark:text-red-300 italic leading-relaxed border-l-4 border-red-400 dark:border-red-500 pl-4">
                    &quot;{activeArea.tagline}&quot;
                  </p>

                  {/* Detailed description */}
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeArea.detailedDescription}
                  </p>

                  {/* Capabilities */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeArea.capabilities.map((cap) => (
                      <div
                        key={cap.title}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                          <CheckCircle2 className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0" />
                          <span>{cap.title}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-6">
                          {cap.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/what-we-do/${activeArea.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
                    >
                      <span>Full Thematic Overview</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                      Learn more about {activeArea.shortTitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
