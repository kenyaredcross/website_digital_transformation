"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { PointerCard } from "./PointerCard";
import type { Project } from "@/types";

interface ListViewProps {
  projects: Project[];
}

/**
 * Renders projects as a vertical list of wide cards — thumbnail on the left,
 * metadata and CTA on the right. Uses the same `PointerCard` spotlight effect.
 */
export function ListView({ projects }: ListViewProps) {
  return (
    <div className="space-y-4">
      {projects.map((project, i) => (
        <Reveal key={project.id} index={i}>
          <PointerCard
            tiltStrength={2.5}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/60 focus-within:border-red-500/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm hover:shadow-lg"
          >
            {/* Thumbnail */}
            <Link
              href={`/portfolio/${project.slug}`}
              className="relative block w-full md:w-48 aspect-[16/9] shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label={`View ${project.title} case study`}
            >
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                sizes="(max-width: 768px) 100vw, 192px"
                className="object-fill transition-transform duration-700 ease-out group-hover:scale-[1.07] motion-reduce:transform-none motion-reduce:transition-none"
              />
              <span className="pf-sheen" aria-hidden />
            </Link>

            {/* Meta */}
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-red-600 dark:text-red-400 font-bold">{project.category}</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-slate-500 dark:text-slate-400">{project.year}</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-slate-500 dark:text-slate-400">{project.countries.join(", ")}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-mono bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/portfolio/${project.slug}`}
              className="px-5 py-3 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shrink-0 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
            </Link>
          </PointerCard>
        </Reveal>
      ))}
    </div>
  );
}
