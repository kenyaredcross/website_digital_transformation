"use client";

import { useState } from "react";
import { thematicAreas } from "@/data/thematicAreas";
import { ThematicCard } from "./ThematicCard";

export function ThematicAreas() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // 3 cards in first row, 4 remaining cards in second row
  const firstRowAreas = thematicAreas.slice(0, 3);
  const secondRowAreas = thematicAreas.slice(3);

  return (
    <section className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 font-mono">
              Core Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Seven pillars. One mission.
            </h2>
          </div>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            Building digital systems, analytics, skills, innovation, community engagement, partnerships, and open resources for humanitarian transformation.
          </p>
        </div>

        {/* First Row: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8 items-start">
          {firstRowAreas.map((area, idx) => (
            <ThematicCard
              key={area.id}
              area={area}
              idx={idx}
              isExpanded={expandedId === area.id}
              onExpand={() => setExpandedId(area.id)}
              onCollapse={() => setExpandedId(null)}
            />
          ))}
        </div>

        {/* Second Row: 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {secondRowAreas.map((area, idx) => (
            <ThematicCard
              key={area.id}
              area={area}
              idx={idx + 3}
              isExpanded={expandedId === area.id}
              onExpand={() => setExpandedId(area.id)}
              onCollapse={() => setExpandedId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


