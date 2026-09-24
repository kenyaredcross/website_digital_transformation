"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Partner } from "@/types";
import { ArrowRight, Handshake, ExternalLink, ArrowUpRight } from "lucide-react";

interface PartnersPreviewProps {
  partners?: Partner[];
}

export function PartnersPreview({ partners = [] }: PartnersPreviewProps) {
  const featuredPartners = (
    partners.filter((p) => Boolean(p.featured)).length > 0
      ? partners.filter((p) => Boolean(p.featured))
      : partners
  ).slice(0, 4);

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

        {/* Partners Single Row (4 cards with logo/details flip) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {featuredPartners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
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

function PartnerCard({ partner }: { partner: Partner }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    if (!showDetails) {
      setShowDetails(true);
    } else if (partner.website) {
      window.open(partner.website, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      onClick={handleCardClick}
      className={`group relative rounded-xl transition-all duration-300 cursor-pointer min-h-[260px] flex flex-col justify-between overflow-hidden border ${
        showDetails
          ? "bg-white dark:bg-slate-900 border-red-500 shadow-xl ring-2 ring-red-500/20"
          : "bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-red-500/50 hover:shadow-md"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!showDetails ? (
          /* Default Logo View */
          <motion.div
            key="logo-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-6 flex flex-col items-center justify-between h-full min-h-[260px] w-full"
          >
            <div className="w-full flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm">
                {partner.category}
              </span>
            </div>

            {/* Logo Image */}
            <div className="my-auto relative w-full h-24 sm:h-28 flex items-center justify-center p-2">
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  sizes="(max-width: 640px) 100vw, 220px"
                  className="object-contain p-2 filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <span className="text-sm font-bold text-slate-800 dark:text-white text-center">
                  {partner.name}
                </span>
              )}
            </div>

            <div className="w-full text-center pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                {partner.name}
              </h3>
            </div>
          </motion.div>
        ) : (
          /* Details View */
          <motion.div
            key="details-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-6 flex flex-col justify-between h-full min-h-[260px] w-full bg-white dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50">
                  {partner.category}
                </span>
                <span className="text-red-600 dark:text-red-400">
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {partner.name}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-3">
                {partner.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                {partner.collaborationFocus}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 group-hover:translate-x-0.5 transition-transform">
                <span>Visit Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
