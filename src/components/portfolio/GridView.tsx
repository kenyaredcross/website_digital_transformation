"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { PointerCard } from "./PointerCard";
import type { Project } from "@/types";

interface GridViewProps {
  projects: Project[];
}

/**
 * Renders a responsive 3-column grid of project cards.
 * Each card has pointer-tracking spotlight + tilt (via `PointerCard`) and
 * a scroll-reveal entrance animation (via `Reveal`).
 */
export function GridView({ projects }: GridViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, i) => (
        <Reveal key={project.id} index={i} className="h-full">
          <PointerCard className="group h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/60 focus-within:border-red-500/60 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:shadow-red-500/5 dark:hover:shadow-red-500/10">
            {/* Thumbnail */}
            <Link
              href={`/portfolio/${project.slug}`}
              className="relative block aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset"
              aria-label={`View ${project.title} case study`}
            >
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-fill transition-transform duration-700 ease-out group-hover:scale-[1.07] motion-reduce:transform-none motion-reduce:transition-none"
              />
              <span className="pf-sheen" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
            </Link>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {project.year}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/60 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {project.countries.join(", ")}
              </span>
              <Link
                href={`/portfolio/${project.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
              >
                <span>Explore Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
              </Link>
            </div>
          </PointerCard>
        </Reveal>
      ))}
    </div>
  );
}
