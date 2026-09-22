"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { partners } from "@/data/partners";
import { projects } from "@/data/projects";
import {
  ExternalLink,
  ArrowRight,
  Zap,
  ShieldCheck,
  Globe,
  Cpu,
  DollarSign,
  Users,
  X,
  ChevronDown,
} from "lucide-react";

type Category = "All" | "Strategic" | "Technology" | "Funding" | "Implementation";

const categoryConfig: Record<
  string,
  { icon: React.ReactNode; color: string; bg: string; border: string; glow: string }
> = {
  Strategic: {
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800/60",
    glow: "rgba(238,36,53,0.15)",
  },
  Technology: {
    icon: <Cpu className="w-3.5 h-3.5" />,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800/60",
    glow: "rgba(59,130,246,0.15)",
  },
  Funding: {
    icon: <DollarSign className="w-3.5 h-3.5" />,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800/60",
    glow: "rgba(245,158,11,0.15)",
  },
  Implementation: {
    icon: <Users className="w-3.5 h-3.5" />,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800/60",
    glow: "rgba(16,185,129,0.15)",
  },
};

const TABS: Category[] = ["All", "Strategic", "Technology", "Funding", "Implementation"];

// --- Spotlight Card ---
function PartnerCard({
  partner,
  index,
}: {
  partner: (typeof partners)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const relatedProjects = projects.filter((p) => p.partnerIds?.includes(partner.id));
  const cfg = categoryConfig[partner.category];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setSpotlight((s) => ({ ...s, opacity: 0 }));
    setIsExpanded(false);
  };

  const handleCardClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      if (partner.website) {
        window.open(partner.website, "_blank", "noopener,noreferrer");
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className={`group relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer ${
        isExpanded
          ? "ring-2 ring-red-500/40 dark:ring-red-500/30 shadow-lg"
          : "hover:-translate-y-1"
      }`}
    >
      {/* Spotlight glow layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, ${cfg?.glow ?? "rgba(238,36,53,0.12)"}, transparent 70%)`,
        }}
      />

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-inset ring-slate-300/60 dark:ring-white/10" />

      {/* Header Band */}
      <div
        className={`relative z-10 px-6 pt-6 pb-4 flex items-start justify-between gap-4 border-b ${cfg?.border} ${cfg?.bg}`}
      >
        {/* Logo */}
        <div className="relative w-16 h-16 rounded-2xl bg-white dark:bg-white/90 p-2 shrink-0 overflow-hidden shadow-md border border-slate-200/80 dark:border-transparent">
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            fill
            sizes="64px"
            className="object-contain p-0.5"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Category badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${cfg?.bg} ${cfg?.color} ${cfg?.border}`}>
            {cfg?.icon}
            {partner.category}
          </div>

          {/* Close button for mobile and desktop when expanded */}
          {isExpanded && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              aria-label="Close partner details"
              className="p-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-col flex-1 p-6 gap-4">
        {/* Name + site */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
            {partner.name}
          </h3>
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${partner.name} website`}
            tabIndex={isExpanded ? 0 : -1}
            onClick={(e) => {
              if (!isExpanded) {
                e.preventDefault();
                e.stopPropagation();
              } else {
                e.stopPropagation();
              }
            }}
            className={`shrink-0 p-2 rounded-xl transition-all duration-200 ${
              isExpanded
                ? "bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white opacity-100 pointer-events-auto shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 opacity-40 pointer-events-none cursor-not-allowed"
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Collapsed view indicator prompt */}
        {!isExpanded && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 mt-auto">
            <span className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
              <span>Click to view details</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </span>
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
              Expand info
            </span>
          </div>
        )}

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 overflow-hidden pt-1"
            >
              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {partner.description}
              </p>

              {/* Collaboration focus */}
              <div className={`flex items-start gap-2.5 px-4 py-3 rounded-2xl border ${cfg?.bg} ${cfg?.border}`}>
                <Zap className={`w-4 h-4 mt-0.5 shrink-0 ${cfg?.color}`} />
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                    Focus
                  </span>
                  <span className={`text-xs font-bold ${cfg?.color}`}>
                    {partner.collaborationFocus}
                  </span>
                </div>
              </div>

              {/* Related projects */}
              {relatedProjects.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Joint Projects ({relatedProjects.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {relatedProjects.map((rp) => (
                      <Link
                        key={rp.id}
                        href={`/portfolio/${rp.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/60 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 border border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-800 transition-all duration-200 group/link"
                      >
                        <span>{rp.title}</span>
                        <ArrowRight className="w-2.5 h-2.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* External Link Redirect Hint */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                <span className="font-medium flex items-center gap-1">
                  <span>Click card to visit website</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  External link
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom accent bar */}
      <div
        className={`h-0.5 w-full transition-all duration-500 opacity-0 group-hover:opacity-100`}
        style={{ background: `linear-gradient(90deg, transparent, ${cfg?.glow?.replace("0.15", "0.8")}, transparent)` }}
      />
    </motion.div>
  );
}

// --- Main Section ---
export function PartnersShowcase() {
  const [activeTab, setActiveTab] = useState<Category>("All");

  const filtered =
    activeTab === "All"
      ? partners
      : partners.filter((p) => p.category === activeTab);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Tab Filter */}
        <div className="flex flex-wrap gap-2 relative">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            const cfg = tab !== "All" ? categoryConfig[tab] : null;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-lg scale-105"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {cfg && isActive && (
                  <span className="inline-flex items-center gap-1.5">
                    {cfg.icon}
                    {tab}
                  </span>
                )}
                {(!cfg || !isActive) && tab}
                {isActive && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

          {/* Count badge */}
          <span className="ml-auto self-center text-xs font-mono text-slate-400 dark:text-slate-500">
            {filtered.length} partner{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Cards Grid — masonry-style 3 col on xl, 2 on md */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((partner, i) => (
              <PartnerCard key={partner.id} partner={partner} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
