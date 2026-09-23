"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects as initialProjects } from "@/data/projects";
import { Project } from "@/types";
import { ArrowRight, Sparkles, Layers } from "lucide-react";

export function FeaturedProjects() {
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);

  useEffect(() => {
    fetch("/api/data/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjectsList(data);
        }
      })
      .catch((err) => console.error("Failed to load live projects:", err));
  }, []);

  const featured = (
    projectsList.filter((p) => Boolean(p.featured)).length > 0
      ? projectsList.filter((p) => Boolean(p.featured))
      : projectsList
  ).slice(0, 3);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Flagship Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured work.
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            Explore digital platforms and humanitarian products transforming communities across Kenya.
          </p>
        </div>

        {/* 1 Row of Clean Minimal Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group relative rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-red-500/60 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1 h-full"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <Image
                    src={project.image || "/assets/images/dt_updates/app.jpg"}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Project Name */}
                <div className="p-5 flex items-center justify-between gap-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold text-slate-800 dark:text-white bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all shadow-sm"
          >
            <Layers className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span>View Complete Digital Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}


