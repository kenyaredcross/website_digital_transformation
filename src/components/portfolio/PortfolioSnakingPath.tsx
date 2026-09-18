"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { ArrowRight, Sparkles, ExternalLink, Calendar, Layers } from "lucide-react";

interface PortfolioSnakingPathProps {
  projects: Project[];
}

export function PortfolioSnakingPath({ projects }: PortfolioSnakingPathProps) {
  // Sort projects chronologically from oldest to latest
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      return a.title.localeCompare(b.title);
    });
  }, [projects]);

  return (
    <div className="relative py-12">
      {/* Header Banner for Desktop Snaking Journey */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/80 px-3.5 py-1 rounded-full border border-red-200 dark:border-red-800">
          <Sparkles className="w-3.5 h-3.5" /> Chronological Evolution Path (Oldest → Latest)
        </span>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Humanitarian Tech Innovation Journey
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Follow the connected evolution of Kenya Red Cross digital solutions from initial surveillance feeds to national-scale platforms.
        </p>
      </div>

      {/* Main Snaking Timeline Container */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* SVG Snaking Path Background Line (Desktop Only) */}
        <div className="absolute inset-0 pointer-events-none flex justify-center z-0">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1000 1600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="snakingLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#dc2626" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#991b1b" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* S-curve path passing through alternating left & right nodes */}
            <motion.path
              d="M 500 40 
                 C 200 160, 200 240, 500 360 
                 C 800 480, 800 560, 500 680 
                 C 200 800, 200 880, 500 1000 
                 C 800 1120, 800 1200, 500 1320
                 C 200 1440, 200 1500, 500 1560"
              stroke="url(#snakingLineGradient)"
              strokeWidth="4"
              strokeDasharray="8 8"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Chronological Projects List */}
        <div className="relative z-10 space-y-24">
          {sortedProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: isEven ? -60 : 60, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`flex items-center gap-8 md:gap-16 ${
                  isEven ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Project Card */}
                <div className="w-1/2 group">
                  <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-red-600/10 space-y-6">
                    {/* Header info */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 border border-slate-200 dark:border-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-red-500" />
                        Release Year: {project.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h3>

                    {/* Image preview - width fit object-contain */}
                    <div className="relative aspect-[16/10] rounded-2xl bg-slate-900 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800 p-3 flex items-center justify-center">
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        sizes="40vw"
                        className="object-contain object-center p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action button */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {project.countries.join(", ")}
                      </span>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-all shadow-md shadow-red-600/20"
                      >
                        <span>Explore Solution</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Central Node Badge connecting the snake path */}
                <div className="relative shrink-0 flex items-center justify-center w-16 h-16 z-20">
                  <div className="w-14 h-14 rounded-full bg-slate-900 dark:bg-slate-950 border-2 border-red-500 shadow-xl flex flex-col items-center justify-center text-white relative group">
                    <span className="text-[10px] font-mono text-red-400 font-bold">#0{index + 1}</span>
                    <span className="text-xs font-black font-mono">{project.year}</span>

                    {/* Pulsing ring */}
                    <span className="absolute inset-0 rounded-full border border-red-500/60 animate-ping pointer-events-none" />
                  </div>
                </div>

                {/* Spacer side for 50/50 split */}
                <div className="w-1/2 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
