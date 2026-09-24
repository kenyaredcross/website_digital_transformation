import Image from "next/image";
import { BookOpen, Library } from "lucide-react";
import type { Metadata } from "next";
import { InnovationFramework } from "@/components/knowledge-hub/InnovationFramework";
import { ResourceLibrary } from "@/components/knowledge-hub/ResourceLibrary";

export const metadata: Metadata = {
  title: "Knowledge Hub | Kenya Red Cross Digital Transformation",
  description:
    "Explore resources from Kenya Red Cross digital transformation initiatives — project reports, case studies, research, digital guides, training materials, lessons learned, and innovation documentation.",
};

export default function KnowledgeHubPage() {
  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-20 md:py-24 transition-colors duration-300">

        {/* Dark mode: full-bleed background photograph */}
        <div className="absolute inset-0 z-0 hidden dark:block">
          <Image
            src="/assets/images/dt_updates/teaching.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        </div>

        {/* Light mode: decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 w-[700px] h-[700px] dark:hidden translate-x-1/3 -translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 65%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 bottom-0 w-[450px] h-[450px] dark:hidden -translate-x-1/3 translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(238,36,53,0.08) 0%, transparent 65%)" }}
        />
        {/* Grid pattern overlay */}
        <div aria-hidden className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

            {/* Left: Text */}
            <div className="flex-1 space-y-7">
              {/* Eyebrow badges */}
              <div className="flex flex-wrap gap-2">
                <span className="hero-step hero-step-1 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/80 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/70 shadow-sm backdrop-blur-md">
                  <Library className="w-3.5 h-3.5" />
                  Knowledge Hub
                </span>
                <span className="hero-step hero-step-1 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800/70 shadow-sm backdrop-blur-md">
                  <BookOpen className="w-3.5 h-3.5" />
                  Innovation &amp; Research
                </span>
              </div>

              {/* Headline */}
              <h1 className="hero-step hero-step-2 text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
                Learn from{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-red-600 dark:text-red-500">our work.</span>
                  <span
                    aria-hidden
                    className="hero-underline absolute -bottom-1 left-0 right-0 h-3 rounded-full opacity-20 bg-red-400 dark:bg-red-600 blur-sm"
                  />
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="hero-step hero-step-3 text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-[60ch]">
                Explore resources from Kenya Red Cross digital transformation initiatives — research, case studies,
                guides, training materials, and honest lessons learned from the field.
              </p>

              {/* Quick nav anchors */}
              <div className="hero-step hero-step-3 flex flex-wrap gap-3 pt-2">
                <a
                  href="#innovation-research"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow"
                >
                  Innovation Framework ↓
                </a>
                <a
                  href="#knowledge-hub-library"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-sm font-semibold border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow"
                >
                  Browse Resources ↓
                </a>
              </div>
            </div>

            {/* Right: Image (light mode only) */}
            <div className="hero-frame block dark:hidden lg:shrink-0 lg:w-[420px] xl:w-[480px] w-full">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                <Image
                  src="/assets/images/dt_updates/teaching.jpg"
                  alt="Kenya Red Cross knowledge sharing and field innovation"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                />
                {/* Floating badge overlay */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-200/60">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-red-50">
                        <BookOpen className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">Resources Available</p>
                        <p className="text-base font-bold text-slate-900">12 Knowledge Resources</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Innovation & Research Framework ──────────────────────────────── */}
      <InnovationFramework />

      {/* ── Knowledge Hub Resource Library ───────────────────────────────── */}
      <ResourceLibrary />

    </div>
  );
}
