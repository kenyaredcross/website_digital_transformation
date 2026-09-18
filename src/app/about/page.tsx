import Image from "next/image";
import { aboutData } from "@/data/about";
import { AboutGallery } from "@/components/about/AboutGallery";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { Search, PenTool, Code, Rocket, BarChart2, RefreshCw, Flag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Kenya Red Cross Digital Transformation",
  description:
    "Learn about our mission, vision, values, 6-step humanitarian innovation process, and digital transformation journey.",
};

const iconMap = {
  Search,
  PenTool,
  Code,
  Rocket,
  BarChart2,
  RefreshCw,
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">

        {/* Dark mode only: full-bleed background image + gradient overlays */}
        <div className="absolute inset-0 z-0 hidden dark:block">
          <Image
            src="/assets/images/distro/lake4.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
        </div>

        {/* Light mode only: decorative radial blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 w-[600px] h-[600px] dark:hidden translate-x-1/3 -translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(238,36,53,0.12) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 bottom-0 w-[400px] h-[400px] dark:hidden -translate-x-1/3 translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }}
        />

        {/* Two-column layout: text left, image right (light) / text only (dark) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

            {/* ── Left: Text content ── */}
            <div className="flex-1 space-y-7">
              {/* Label */}
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/80 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/70 shadow-sm backdrop-blur-md w-fit">
                About Our Department
              </span>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
                {aboutData.heroHeading}
              </h1>

              {/* Sub-copy */}
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {aboutData.heroSubheading}
              </p>
            </div>

            {/* ── Right: Image square — light mode only, zero gradient overlay ── */}
            <div className="block dark:hidden lg:flex-shrink-0 lg:w-[420px] xl:w-[480px] w-full">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                <Image
                  src="/assets/images/distro/lake4.jpg"
                  alt="Humanitarian Technology & Field Operations"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Who We Are & Mission / Vision Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Who We Are */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {aboutData.whoWeAreTitle}
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                {aboutData.whoWeAreParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Right: Mission & Vision Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 border-l-4 border-l-red-500 shadow-md space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-red-600 dark:text-red-400">
                  Our Mission
                </span>
                <p className="text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
                  &quot;{aboutData.mission}&quot;
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 border-l-4 border-l-blue-600 dark:border-l-blue-500 shadow-md space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-blue-600 dark:text-blue-400">
                  Our Vision
                </span>
                <p className="text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
                  &quot;{aboutData.vision}&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Field Operations & Deployments Photo Gallery */}
      <AboutGallery />

      {/* Values Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 font-mono">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Our Core Values
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              The ethical and operational foundation guiding our software development and data governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.values.map((val) => (
              <div
                key={val.number}
                className="p-8 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-red-500/40 transition-all duration-300 space-y-4 shadow-sm"
              >
                <span className="text-3xl font-black font-mono text-red-600 dark:text-red-500">
                  {val.number}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{val.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Step Visual Approach */}
      <section className="py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 font-mono">
              Humanitarian Innovation Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Our 6-Step Approach
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              From field immersion to continuous telemetry monitoring, how we build technology for extreme environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {aboutData.approach.map((step) => {
              const Icon = iconMap[step.iconName as keyof typeof iconMap] || Search;

              return (
                <div
                  key={step.step}
                  className="relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-red-600 dark:text-red-500">
                        0{step.step}
                      </span>
                      <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Animated Digital Transformation Journey Timeline with Scroll Effects & Distro Images */}
      <JourneyTimeline />
    </div>
  );
}
