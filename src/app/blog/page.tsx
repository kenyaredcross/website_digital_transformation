import { BlogFilterableGrid } from "@/components/blog/BlogFilterableGrid";
import { BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Field Case Studies | Kenya Red Cross Digital",
  description:
    "Explore in-depth articles, early warning tech deployments, mobile cash transfer case studies, and spatial intelligence stories from Kenya Red Cross.",
};

export default function BlogPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-950/80 px-3 py-1 rounded border border-red-200 dark:border-red-800/60 flex items-center gap-2 w-fit">
            <BookOpen className="w-4 h-4" /> Insights & Field Stories
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Humanitarian tech insights.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Stories, field case studies, technical breakdowns, and lessons learned from deploying digital tools across Kenya and East Africa.
          </p>
        </div>
      </section>

      {/* Main Filterable Stories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogFilterableGrid />
        </div>
      </section>
    </div>
  );
}
