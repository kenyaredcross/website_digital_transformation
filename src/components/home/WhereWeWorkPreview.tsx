"use client";

import Link from "next/link";
import { AfricaMap } from "@/components/geography/AfricaMap";
import { ArrowRight, MapPin } from "lucide-react";

export function WhereWeWorkPreview() {
  return (
    <section className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Geographic Footprint
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              From Kenya to the region.
            </h2>
          </div>
          <p className="text-base text-slate-400 max-w-md leading-relaxed">
            Our digital products and predictive data feeds power humanitarian action across 47 Kenyan counties and 8 East & Horn of Africa nations.
          </p>
        </div>

        {/* Africa Map Widget */}
        <AfricaMap />

        {/* Footer Link */}
        <div className="mt-10 text-center">
          <Link
            href="/where-we-work"
            className="inline-flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300 transition-colors group"
          >
            <span>View detailed county breakdown & regional initiatives</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
