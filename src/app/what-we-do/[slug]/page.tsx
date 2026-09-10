import { notFound } from "next/navigation";
import Link from "next/link";
import { getThematicAreas, getProjects } from "@/lib/get-data";
import { CheckCircle2, ArrowLeft, ArrowRight, Layers, Sparkles } from "lucide-react";
import type { Metadata } from "next";

// Allow slugs not pre-rendered at build time to be SSR'd on demand
export const dynamicParams = true;

export function generateStaticParams() {
  const thematicAreas = getThematicAreas();
  return thematicAreas.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const thematicAreas = getThematicAreas();
  const area = thematicAreas.find((a) => a.slug === resolvedParams.slug);

  if (!area) {
    return { title: "Thematic Area Not Found" };
  }

  return {
    title: `${area.title} | Kenya Red Cross Digital Transformation`,
    description: area.description,
  };
}

export default async function ThematicAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const thematicAreas = getThematicAreas();
  const projects = getProjects();
  const area = thematicAreas.find((a) => a.slug === resolvedParams.slug);

  if (!area) {
    notFound();
  }

  // Related projects belonging to this thematic area
  const relatedProjects = projects.filter((p) => p.thematicAreaSlug === area.slug);

  return (
    <div className="pt-28 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Header & Hero */}
      <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/what-we-do"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Thematic Areas
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-black font-mono text-red-600 dark:text-red-500">
              {area.number}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
              {area.shortTitle}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {area.title}
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {area.tagline}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Main Column */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Overview & Capability Focus
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                  {area.detailedDescription}
                </p>
              </div>

              {/* Capabilities Detailed Breakdown */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Core Capabilities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {area.capabilities.map((cap) => (
                    <div
                      key={cap.title}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                        <CheckCircle2 className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
                        <span>{cap.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                        {cap.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Flagship Projects */}
              <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <Layers className="w-5 h-5 text-red-600 dark:text-red-500" />
                    <span>Related Projects</span>
                  </h2>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {relatedProjects.length} Flagship Projects Built
                  </span>
                </div>

                <div className="space-y-6">
                  {relatedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="text-red-600 dark:text-red-400 font-bold">{project.category}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 dark:text-slate-400">{project.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 max-w-xl">
                          {project.description}
                        </p>
                      </div>

                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shrink-0 flex items-center gap-1.5"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar Stats & Metrics */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block border-b border-slate-200 dark:border-slate-800 pb-3">
                  Pillar Impact Metrics
                </span>

                <div className="space-y-4">
                  {area.impactMetrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80"
                    >
                      <span className="block text-2xl font-black font-mono text-slate-900 dark:text-white mb-1">
                        {m.value}
                      </span>
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
                <Sparkles className="w-8 h-8 text-red-600 dark:text-red-500 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Collaborate With Us</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Are you interested in testing or deploying tools within {area.title}?
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-block px-4 py-3 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Contact Thematic Lead
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
