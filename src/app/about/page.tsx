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
      {/* Hero Section with lowered opacity hands1.jpg background */}
      <section className="relative py-20 md:py-28 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
        {/* Background Image hands1.jpg with lowered opacity */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/distro/lake4.jpg"
            alt="Humanitarian Technology & Field Operations"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-100 dark:opacity-100"
          />
          {/* Light mode: white washes; Dark mode: slate-950 overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/10 dark:from-slate-950 dark:via-slate-950/60 dark:to-slate-950/20 transition-colors duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80 dark:from-slate-950 dark:via-transparent dark:to-slate-950/70 transition-colors duration-300" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-950/90 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/70 shadow-md backdrop-blur-md">
            About Our Department
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {aboutData.heroHeading}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-200 max-w-3xl leading-relaxed">
            {aboutData.heroSubheading}
          </p>
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
