import Link from "next/link";
import { thematicAreas } from "@/data/thematicAreas";
import { Smartphone, BarChart3, MapPin, Cpu, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What We Do | Thematic Areas",
  description:
    "Explore Kenya Red Cross Digital Transformation's four thematic pillars: Digital Products, Data Services, GIS Spatial Intelligence, and AI for Humanitarian Action.",
};

const iconMap = {
  Smartphone,
  BarChart3,
  MapPin,
  Cpu,
};

export default function WhatWeDoPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-950 text-white min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-slate-800 bg-grid-pattern opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500 bg-red-950/80 px-3 py-1 rounded border border-red-800/60">
            Core Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            What We Do
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Building resilient digital infrastructure, spatial analytics, early warning models, and frontier AI for humanitarian action across East Africa.
          </p>
        </div>
      </section>

      {/* Large Editorial Layout for 4 Thematic Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {thematicAreas.map((area) => {
            const Icon = iconMap[area.iconName as keyof typeof iconMap] || Smartphone;

            return (
              <div
                key={area.id}
                className="group p-8 md:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 transition-all duration-300 shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-black font-mono text-red-500">
                        {area.number}
                      </span>
                      <div className="p-3 rounded-xl bg-slate-800 text-red-400 border border-slate-700">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-white group-hover:text-red-400 transition-colors">
                      {area.title}
                    </h2>

                    <p className="text-lg text-red-300/90 font-medium leading-relaxed">
                      &quot;{area.tagline}&quot;
                    </p>

                    <p className="text-slate-300 text-base leading-relaxed">
                      {area.detailedDescription}
                    </p>

                    {/* Capabilities grid */}
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {area.capabilities.map((cap) => (
                        <div
                          key={cap.title}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1"
                        >
                          <div className="flex items-center gap-2 text-sm font-bold text-white">
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                            <span>{cap.title}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed pl-6">
                            {cap.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Metrics & Detail CTA */}
                  <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-800 pb-2">
                      Operational Highlights
                    </span>

                    <div className="space-y-4">
                      {area.impactMetrics.map((m) => (
                        <div key={m.label} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="block text-xl font-black font-mono text-red-400">
                            {m.value}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/what-we-do/${area.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg"
                      >
                        <span>Detailed Thematic Overview</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
