import { aboutData } from "@/data/about";
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
    <div className="pt-28 pb-20 bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 border-b border-slate-800 bg-grid-pattern opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-red-500 bg-red-950/80 px-3 py-1 rounded border border-red-800/60">
            About Our Department
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {aboutData.heroHeading}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            {aboutData.heroSubheading}
          </p>
        </div>
      </section>

      {/* Who We Are & Mission / Vision Section */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Who We Are */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {aboutData.whoWeAreTitle}
              </h2>
              <div className="space-y-4 text-slate-300 leading-relaxed text-base">
                {aboutData.whoWeAreParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Right: Mission & Vision Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-red-500 shadow-xl space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-red-400">
                  Our Mission
                </span>
                <p className="text-lg font-semibold text-white leading-relaxed">
                  &quot;{aboutData.mission}&quot;
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-blue-500 shadow-xl space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-blue-400">
                  Our Vision
                </span>
                <p className="text-lg font-semibold text-white leading-relaxed">
                  &quot;{aboutData.vision}&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our Core Values
            </h2>
            <p className="text-slate-400 text-base">
              The ethical and operational foundation guiding our software development and data governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.values.map((val) => (
              <div
                key={val.number}
                className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/40 transition-all duration-300 space-y-4"
              >
                <span className="text-3xl font-black font-mono text-red-500">
                  {val.number}
                </span>
                <h3 className="text-xl font-bold text-white">{val.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Step Visual Approach */}
      <section className="py-24 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono">
              Humanitarian Innovation Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our 6-Step Approach
            </h2>
            <p className="text-slate-400 text-base">
              From field immersion to continuous telemetry monitoring, how we build technology for extreme environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {aboutData.approach.map((step) => {
              const Icon = iconMap[step.iconName as keyof typeof iconMap] || Search;

              return (
                <div
                  key={step.step}
                  className="relative p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-red-500">
                        0{step.step}
                      </span>
                      <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800/50 text-red-400">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones / Transformation Journey Timeline */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono flex items-center justify-center gap-2">
              <Flag className="w-4 h-4" /> Timeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Digital Transformation Journey
            </h2>
            <p className="text-slate-400 text-base">
              Key milestones in our evolution into a leading humanitarian technology powerhouse.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto space-y-8 before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-800">
            {aboutData.milestones.map((m) => (
              <div
                key={m.year}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-600 text-white font-mono text-xs font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {m.year.slice(2)}
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-red-400">
                    {m.year}
                  </span>
                  <h3 className="text-lg font-bold text-white">{m.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
