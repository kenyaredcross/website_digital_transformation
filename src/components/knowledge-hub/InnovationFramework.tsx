"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { BookOpen, Database, Lightbulb, FlaskConical } from "lucide-react";
import { INNOVATION_STEPS, DT_UPDATES_IMAGES } from "@/data/knowledgeHubData";

// Deterministic seeded shuffle so first render is consistent, then we hydrate
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue:    { bg: "bg-blue-50 dark:bg-blue-950/30",    border: "border-blue-200 dark:border-blue-800/50",    text: "text-blue-700 dark:text-blue-300",    badge: "bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-950/30",  border: "border-amber-200 dark:border-amber-800/50",  text: "text-amber-700 dark:text-amber-300",  badge: "bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300" },
  purple:  { bg: "bg-purple-50 dark:bg-purple-950/30",border: "border-purple-200 dark:border-purple-800/50",text: "text-purple-700 dark:text-purple-300",badge: "bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/30",border: "border-emerald-200 dark:border-emerald-800/50",text: "text-emerald-700 dark:text-emerald-300",badge: "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300" },
  red:     { bg: "bg-red-50 dark:bg-red-950/30",      border: "border-red-200 dark:border-red-800/50",      text: "text-red-700 dark:text-red-300",      badge: "bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300" },
  orange:  { bg: "bg-orange-50 dark:bg-orange-950/30",border: "border-orange-200 dark:border-orange-800/50",text: "text-orange-700 dark:text-orange-300",badge: "bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300" },
  teal:    { bg: "bg-teal-50 dark:bg-teal-950/30",    border: "border-teal-200 dark:border-teal-800/50",    text: "text-teal-700 dark:text-teal-300",    badge: "bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300" },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function InnovationFramework() {
  const [images, setImages] = useState<string[]>([...DT_UPDATES_IMAGES]);

  // After hydration, pick a random arrangement
  useEffect(() => {
    setImages(seededShuffle([...DT_UPDATES_IMAGES], Date.now() & 0xffff));
  }, []);

  const heroImg  = images[0] ?? DT_UPDATES_IMAGES[0];
  const accentImg = images[1] ?? DT_UPDATES_IMAGES[1];

  return (
    <section
      id="innovation-research"
      className="relative py-24 md:py-32 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300"
    >
      {/* ── Decorative blobs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06] dark:opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #EE2435 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.05] dark:opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <div className="space-y-4 max-w-2xl">
            {/* Eyebrow */}
            <motion.div variants={textVariants}>
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/60 shadow-sm w-fit">
                <FlaskConical className="w-3.5 h-3.5" />
                Innovation &amp; Research
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={textVariants}
              className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]"
            >
              Exploring New{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-red-600 dark:text-red-500">Possibilities</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-2.5 rounded-full opacity-20 bg-red-400 dark:bg-red-500 blur-sm"
                />
              </span>
            </motion.h2>

            {/* Lead text */}
            <motion.p
              variants={textVariants}
              className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
            >
              We explore how emerging technologies and new approaches can contribute to
              humanitarian action. Our innovation work includes research, experimentation,
              knowledge sharing and collaboration with staff, volunteers, communities and partners.
            </motion.p>
          </div>

          {/* Accent image (desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="hidden lg:block lg:w-72 xl:w-80 shrink-0"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200 dark:ring-slate-700">
              <Image src={accentImg} alt="Innovation in action" fill sizes="320px" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                  <Lightbulb className="w-3 h-3" /> Field Innovation
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Two-column feature: hero image + intro ── */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {/* Left: hero image */}
          <motion.div variants={cardVariants} className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 aspect-[4/3] lg:aspect-auto lg:h-80">
            <Image src={heroImg} alt="Research and innovation in humanitarian contexts" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-transparent dark:from-slate-900/70" />
            {/* Floating stats */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-white/70 text-xs font-mono uppercase tracking-widest">Documenting</span>
                <span className="text-white text-lg font-bold">7 Key Dimensions</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <BookOpen className="w-3.5 h-3.5 text-white" />
                <span className="text-white text-xs font-semibold">Evidence-Based</span>
              </div>
            </div>
          </motion.div>

          {/* Right: description cards */}
          <motion.div variants={textVariants} className="flex flex-col justify-center gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/50 shrink-0">
                  <Database className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Organisational Knowledge Base</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    This creates an organisational knowledge base and supports informed decision-making across all levels of the organisation.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 shrink-0">
                  <FlaskConical className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Structured Documentation</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    We document every experiment systematically — capturing the hypothesis, methodology, outcomes, and strategic direction for each initiative.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50">
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                <span className="font-bold text-red-600 dark:text-red-400">Every innovation cycle</span> is documented across seven key dimensions — creating institutional memory and accelerating future learning.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Seven Documentation Steps Grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          <motion.div variants={textVariants} className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              What We Document
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              Every innovation initiative is examined through these seven lenses to build a complete picture of its impact and applicability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {INNOVATION_STEPS.map((step, i) => {
              const c = COLOR_MAP[step.color] ?? COLOR_MAP.blue;
              return (
                <motion.div
                  key={step.id}
                  variants={cardVariants}
                  whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
                  className={`relative group rounded-2xl border p-5 transition-shadow duration-300 hover:shadow-lg ${c.bg} ${c.border}`}
                >
                  {/* Step number */}
                  <span className="absolute top-4 right-4 text-xs font-mono font-bold text-slate-400 dark:text-slate-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Emoji icon */}
                  <span className="text-2xl mb-3 block leading-none">{step.icon}</span>

                  {/* Label */}
                  <span className={`inline-block text-xs font-bold uppercase tracking-wider mb-2 px-2 py-0.5 rounded-full ${c.badge}`}>
                    {step.label}
                  </span>

                  {/* Question */}
                  <h4 className={`font-semibold text-sm mb-2 leading-snug ${c.text}`}>
                    {step.question}
                  </h4>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}

            {/* Final CTA card */}
            <motion.div
              variants={cardVariants}
              className="rounded-2xl border border-dashed border-red-300 dark:border-red-800/60 bg-gradient-to-br from-red-50 to-white dark:from-red-950/30 dark:to-slate-900 p-5 flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl mb-3 block">📋</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2 leading-snug">
                  Informed Decision-Making
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Together these seven dimensions build an evidence base that guides the entire organisation on what to adapt, scale, or discontinue.
                </p>
              </div>
              <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-red-600 to-red-300 dark:from-red-500 dark:to-red-800" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
