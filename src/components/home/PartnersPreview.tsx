"use client";

import Link from "next/link";
import { partners } from "@/data/partners";
import { ArrowRight, Handshake, ExternalLink } from "lucide-react";

export function PartnersPreview() {
  const featuredPartners = partners.filter((p) => p.featured);

  return (
    <section className="py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 font-mono flex items-center justify-center gap-2">
            <Handshake className="w-4 h-4" /> Global Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Working together for greater impact.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Collaborating with global tech pioneers, UN agencies, research institutions, and national telecommunications networks.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPartners.map((partner) => (
            <div
              key={partner.id}
              className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-red-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {partner.category}
                  </span>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-red-600 dark:text-slate-500 dark:hover:text-red-400 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {partner.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {partner.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80">
                <span className="text-[10px] font-mono text-red-600 dark:text-red-400 font-semibold block truncate">
                  Focus: {partner.collaborationFocus}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            <span>View all partners and collaboration areas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
