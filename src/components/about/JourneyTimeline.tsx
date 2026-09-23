"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { Flag, CheckCircle2, ArrowRight } from "lucide-react";
import { aboutData } from "@/data/about";

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="py-28 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 dark:bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 font-mono inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/70 border border-red-200 dark:border-red-800/60 px-3.5 py-1.5 rounded-full"
          >
            <Flag className="w-4 h-4 text-red-600 dark:text-red-500" /> Digital Transformation Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Our Evolution &amp; Key Milestones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            From a newly established tech unit to a portfolio of digital platforms serving communities across Kenya and Africa.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Static Background Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-slate-200 dark:bg-slate-800" />

          {/* Animated Dynamic Progress Line */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-red-600 via-red-500 to-amber-500 rounded-full shadow-[0_0_15px_rgba(238,36,53,0.8)] z-10"
          />

          {/* Timeline Items */}
          <div className="space-y-16 sm:space-y-24 relative z-20">
            {aboutData.milestones.map((m, index) => {
              const isEven = index % 2 === 0;
              const hasImage = !!m.image;

              const CardContent = (
                <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 hover:border-red-500/50 transition-all duration-300 shadow-lg space-y-3 group hover:bg-slate-50 dark:hover:bg-slate-900 h-full">
                  <div
                    className={`flex items-center gap-2 ${
                      isEven ? "md:justify-end" : "justify-start"
                    }`}
                  >
                    <span className="text-xs font-mono font-bold uppercase text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/40 px-2.5 py-0.5 rounded">
                      {m.year}
                    </span>
                    {m.imageTag && (
                      <span className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {m.imageTag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {m.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {m.description}
                  </p>

                  <div
                    className={`pt-2 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 ${
                      isEven ? "md:justify-end" : "justify-start"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0" />
                    <span>Completed Project Milestone</span>
                  </div>

                  {m.projectSlug && (
                    <div
                      className={`pt-1 flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 ${
                        isEven ? "md:justify-end" : "justify-start"
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      <span>View Project</span>
                    </div>
                  )}
                </div>
              );

              return (
                <motion.div
                  key={`${m.year}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                  className="relative flex flex-col md:flex-row items-stretch gap-8 md:gap-0"
                >
                  {/* Center Year Badge */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 z-30 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-12 h-12 rounded-full bg-white dark:bg-slate-950 border-2 border-red-600 dark:border-red-500 text-red-600 dark:text-red-400 font-mono text-sm font-black flex items-center justify-center shadow-lg bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950"
                    >
                      {m.year}
                    </motion.div>
                  </div>

                  {/* Left Column (Card on even, Image on odd) */}
                  <div
                    className={`pl-16 md:pl-0 md:w-1/2 ${
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:order-2"
                    }`}
                  >
                    {m.projectSlug ? (
                      <Link href={`/projects/${m.projectSlug}`} className="block h-full">
                        {CardContent}
                      </Link>
                    ) : (
                      CardContent
                    )}
                  </div>

                  {/* Right Column (Image on even, spacer on odd if no image) */}
                  <div
                    className={`pl-16 md:pl-0 md:w-1/2 ${
                      isEven ? "md:pl-12" : "md:pr-12 md:order-1"
                    }`}
                  >
                    {hasImage ? (
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
                        className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group cursor-pointer"
                      >
                        <Image
                          src={m.image!}
                          alt={m.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-75 group-hover:opacity-85 transition-opacity" />

                        {/* Image Caption overlay */}
                        <div className="absolute bottom-0 inset-x-0 p-5 space-y-1 z-10">
                          <div className="flex items-center justify-between text-xs font-mono text-red-400 font-bold uppercase">
                            <span>{m.imageTag ?? "Field Deployment"}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                            {m.imageCaption}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
