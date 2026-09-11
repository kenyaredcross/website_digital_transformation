"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowRight, Layers, Sparkles, ExternalLink } from "lucide-react";

const featuredProjectImages: Record<string, string> = {
  hazina: "/assets/images/dt_updates/app.jpg",
  bomacare: "/assets/images/dt_updates/app_phone.jpg",
  redpulse: "/assets/images/dt_updates/person_standingl.jpg",
  "rafiki-ai": "/assets/images/dt_updates/learning.jpg",
};

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Flagship Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Our work.
            </h2>
          </div>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            From early warning platforms to mobile cash disbursement gateways, explore products built to solve real humanitarian challenges.
          </p>
        </div>

        {/* Varied Showcase Items */}
        <div className="space-y-16 lg:space-y-24">
          {featured.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? "" : "lg:grid-flow-col-dense"
                }`}
              >
                {/* Visual / Screenshot Side */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative group aspect-[4/3] rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-all duration-300 shadow-2xl overflow-hidden">
                    <Image
                      src={featuredProjectImages[project.id]}
                      alt={`${project.title} project preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent px-5 pb-5 pt-16">
                      <span className="text-xs font-mono font-bold text-white">
                        {project.countries.join(" • ")}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950/90 text-red-300 border border-red-800/60">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Side */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      Year: {project.year}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Technology Tags */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Technologies & Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-all shadow-md shadow-red-600/25"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-slate-800 dark:text-white bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all"
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
