"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
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

interface ThematicCardProps {
  area: ThematicArea;
  idx: number;
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export function ThematicCard({
  area,
  idx,
  isExpanded,
  onExpand,
  onCollapse,
}: ThematicCardProps) {
  const router = useRouter();
  const Icon = iconMap[area.iconName as keyof typeof iconMap] || Smartphone;

  const handleCardClick = () => {
    if (!isExpanded) {
      onExpand();
    } else {
      router.push(`/what-we-do/${area.slug}`);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCollapse();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      onMouseLeave={() => {
        if (isExpanded) {
          onCollapse();
        }
      }}
      onClick={handleCardClick}
      className={`group relative p-6 rounded-lg transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden border ${
        isExpanded
          ? "bg-white dark:bg-slate-900 border-red-500 shadow-xl shadow-red-500/10 ring-2 ring-red-500/20"
          : "bg-slate-50 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-red-500/50 hover:shadow-md"
      }`}
    >
      <div>
        {/* Card Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl font-black font-mono text-red-600 dark:text-red-500">
              {area.number}
            </span>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Pillar
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Icon Box */}
            <div
              className={`p-2.5 rounded-md border transition-colors duration-300 ${
                isExpanded
                  ? "bg-red-600 text-white border-red-600 shadow-sm"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>

            {/* Mobile & Desktop Close (X) button */}
            {isExpanded && (
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close card details"
                className="p-2 rounded-md bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 dark:bg-slate-800 dark:hover:bg-red-950/60 dark:text-slate-300 dark:hover:text-red-400 border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`text-xl font-bold mb-2 transition-colors ${
            isExpanded
              ? "text-red-600 dark:text-red-400"
              : "text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400"
          }`}
        >
          {area.title}
        </h3>

        {/* Description */}
        <p
          className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-all duration-300 ${
            isExpanded ? "mb-5" : "line-clamp-2 mb-3 text-slate-500 dark:text-slate-400"
          }`}
        >
          {area.description}
        </p>

        {/* Collapsed Hint */}
        {!isExpanded && (
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 dark:text-red-400 mb-2 group-hover:translate-x-1 transition-transform duration-200">
            <span>Click to view details</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        )}

        {/* Key Capabilities Preview (Collapsible) */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 mb-5 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2 font-mono">
                  Key Capabilities
                </span>
                {area.capabilities.map((cap) => (
                  <div
                    key={cap.title}
                    className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {cap.title}:{" "}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {cap.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Metrics & CTA Link */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between mt-auto">
        <div className="text-xs">
          <span className="block font-mono font-bold text-slate-900 dark:text-white">
            {area.impactMetrics[0]?.value}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {area.impactMetrics[0]?.label}
          </span>
        </div>

        {/* Site link button */}
        {isExpanded ? (
          <Link
            href={`/what-we-do/${area.slug}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-sm transition-all hover:scale-105"
          >
            <span>Explore Area</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 cursor-not-allowed opacity-60 pointer-events-none"
          >
            <span>Explore Area</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
