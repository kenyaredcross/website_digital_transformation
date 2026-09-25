"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Partner, Project } from "@/types";
import { Network, Sparkles, ExternalLink, ArrowRight, ShieldCheck, Zap, Globe, Coins } from "lucide-react";

interface PartnerEcosystemGraphProps {
  partners?: Partner[];
  projects?: Project[];
}

export function PartnerEcosystemGraph({ partners = [], projects = [] }: PartnerEcosystemGraphProps) {
  const partnerList = partners;
  const [activePartnerId, setActivePartnerId] = useState<string>("");

  if (partnerList.length === 0) return null;

  const activePartner = partnerList.find((p) => p.id === activePartnerId) || partnerList[0];
  const relatedProjects = projects.filter((p) => p.partnerIds?.includes(activePartner.id));

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Strategic":
        return "bg-red-500/20 text-red-400 border-red-500/40";
      case "Technology":
        return "bg-blue-500/20 text-blue-400 border-blue-500/40";
      case "Funding":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      default:
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
    }
  };

  return (
    <div className="p-8 md:p-12 rounded-3xl bg-slate-950 text-white border border-slate-800 space-y-12 relative overflow-hidden shadow-2xl">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10 border-b border-slate-800/80 pb-8">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-500 bg-red-950/80 px-3.5 py-1.5 rounded-full border border-red-800/80">
            <Network className="w-4 h-4" /> Interactive Ecosystem Node Graph
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Global Partner Co-Innovation Matrix
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md">
          Click any partner node below to inspect joint digital platforms, funding initiatives, and active technology integration feeds.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-center">
        {/* Left Column: Interactive Partner Node Selector */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block mb-2">
            Select Partner Node:
          </h3>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
            {partnerList.map((partner) => {
              const isSelected = partner.id === activePartnerId;

              return (
                <button
                  key={partner.id}
                  onClick={() => setActivePartnerId(partner.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-4 group ${
                    isSelected
                      ? "bg-slate-900 border-red-500 shadow-lg shadow-red-600/10 scale-[1.02]"
                      : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl bg-white p-1 shrink-0 overflow-hidden border border-slate-700">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                        {partner.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">
                        {partner.category} Partner
                      </span>
                    </div>
                  </div>

                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-transform ${
                      isSelected
                        ? "bg-red-500 shadow-[0_0_10px_#ef4444] scale-125"
                        : "bg-slate-700"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Partner Deep-Dive Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePartner.id}
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Partner Logo & Metadata Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl bg-white p-2 shrink-0 overflow-hidden border border-slate-700">
                    <Image
                      src={activePartner.logo}
                      alt={activePartner.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border uppercase tracking-wider ${getCategoryBadge(
                        activePartner.category
                      )}`}
                    >
                      {activePartner.category} Partner
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {activePartner.name}
                    </h3>
                  </div>
                </div>

                <a
                  href={activePartner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700 shrink-0 w-fit"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Partner Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {activePartner.description}
              </p>

              {/* Collaboration Focus Highlight */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Strategic Collaboration Focus:
                </span>
                <span className="text-sm font-mono font-bold text-red-400 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-500 shrink-0" />
                  {activePartner.collaborationFocus}
                </span>
              </div>

              {/* Co-Developed Systems / Joint Projects */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Co-Developed Digital Products & Platforms ({relatedProjects.length})
                </span>

                {relatedProjects.length === 0 ? (
                  <p className="text-xs font-mono text-slate-500 italic">
                    Cross-cutting technical advice and strategic capacity building.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedProjects.map((proj) => (
                      <Link
                        key={proj.id}
                        href={`/portfolio/${proj.slug}`}
                        className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-red-500/50 transition-all flex items-center justify-between group"
                      >
                        <div className="truncate pr-2">
                          <span className="block text-xs font-bold text-white group-hover:text-red-400 transition-colors truncate">
                            {proj.title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 block">
                            {proj.category} • {proj.year}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-red-500 shrink-0 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Ecosystem Impact Metrics Ticker */}
      <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60">
          <Globe className="w-5 h-5 text-red-500 mx-auto mb-2" />
          <span className="block text-2xl font-black font-mono text-white">47 Counties</span>
          <span className="text-[10px] font-mono text-slate-400 uppercase">National Operational Reach</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60">
          <Coins className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
          <span className="block text-2xl font-black font-mono text-white">1M+ Transfers</span>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Automated Aid Disbursements</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60">
          <ShieldCheck className="w-5 h-5 text-blue-500 mx-auto mb-2" />
          <span className="block text-2xl font-black font-mono text-white">100K+ Responders</span>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Managed via VMMS</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60">
          <Sparkles className="w-5 h-5 text-amber-500 mx-auto mb-2" />
          <span className="block text-2xl font-black font-mono text-white">6 Ecosystem Tools</span>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Open Humanitarian Stack</span>
        </div>
      </div>
    </div>
  );
}
