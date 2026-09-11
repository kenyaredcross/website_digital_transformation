"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { thematicAreas } from "@/data/thematicAreas";
import { Smartphone, BarChart3, MapPin, Cpu, ArrowUpRight, CheckCircle2 } from "lucide-react";

const iconMap = {
  Smartphone,
  BarChart3,
  MapPin,
  Cpu,
};

export function ThematicAreas() {
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
              Four areas. One mission.
            </h2>
          </div>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            Building end-to-end digital capabilities across products, analytics, geospatial intelligence, and frontier AI.
          </p>
        </div>

        {/* Thematic Cards Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {thematicAreas.map((area, idx) => {
            const Icon = iconMap[area.iconName as keyof typeof iconMap] || Smartphone;

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-red-600 dark:text-red-500">
                      {area.number}
                    </span>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {area.description}
                  </p>

                  {/* Key Capabilities Preview */}
                  <div className="space-y-2.5 mb-8">
                    {area.capabilities.slice(0, 3).map((cap) => (
                      <div key={cap.title} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="font-medium">{cap.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Metrics & CTA Link */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="block font-mono font-bold text-slate-900 dark:text-white">
                      {area.impactMetrics[0]?.value}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {area.impactMetrics[0]?.label}
                    </span>
                  </div>

                  <Link
                    href={`/what-we-do/${area.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Explore Area</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
