import { notFound } from "next/navigation";
import Link from "next/link";
import { getPartners } from "@/lib/frappe/partners";
import { getThematicAreas, getCountries } from "@/lib/get-data";
import { getPeople } from "@/lib/frappe/people";
import { getProjects, getProject } from "@/lib/frappe/projects";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Users,
  Handshake,
} from "lucide-react";
import type { Metadata } from "next";

// Allow slugs not pre-rendered at build time to be SSR'd on demand
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);

  if (!project) {
    return { title: "Project Case Study Not Found" };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const projects = await getProjects();
  const people = await getPeople();
  const partners = await getPartners();
  const project = projects.find((p) => p.slug === resolvedParams.slug || p.id === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Resolve team members from teamIds
  const projectTeam = people.filter((p) => project.teamIds.includes(p.id));

  // Resolve partners from partnerIds
  const projectPartners = partners.filter((pt) => project.partnerIds?.includes(pt.id));

  const thematicAreas = await getThematicAreas();
  const countries = await getCountries();

  // Resolve thematic area
  const thematicArea = thematicAreas.find((t) => t.slug === project.thematicAreaSlug);

  // Resolve countries
  const projectCountries = countries.filter((c) => project.countries.includes(c.code));

  // Related projects
  const relatedProjects = projects
    .filter((p) => p.id !== project.id && (p.category === project.category || p.thematicAreaSlug === project.thematicAreaSlug))
    .slice(0, 3);

  return (
    <div className="pt-28 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Hero Header */}
      <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Year: {project.year}
            </span>
            {thematicArea && (
              <Link
                href={`/what-we-do/${thematicArea.slug}`}
                className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline"
              >
                Pillar: {thematicArea.shortTitle}
              </Link>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {project.title}
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {project.description}
          </p>

          {project.demoUrl && (
            <div className="pt-2 flex items-center gap-4">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg"
              >
                <span>Access Live Platform</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Challenge */}
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <span className="text-xs font-mono font-bold text-red-600 dark:text-red-500 uppercase tracking-widest block">
                  01 • The Challenge
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Operational Problem</h2>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                  02 • The Solution
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What Was Built</h2>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Impact & Quantifiable Metrics */}
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                  03 • Field Impact
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What Changed</h2>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  {project.impact}
                </p>

                {project.impactMetrics && project.impactMetrics.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    {project.impactMetrics.map((m) => (
                      <div key={m.label} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="block text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                          {m.value}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Team Members List */}
              {projectTeam.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-red-600 dark:text-red-500" />
                    <span>The Team Behind The Project</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projectTeam.map((person) => (
                      <Link
                        key={person.id}
                        href={`/people/${person.slug}`}
                        className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-all flex items-center gap-4 shadow-sm"
                      >
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 font-mono font-bold text-sm flex items-center justify-center border border-red-200 dark:border-red-800">
                          {person.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{person.name}</h4>
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{person.role}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Partners List */}
              {projectPartners.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                    <span>Collaborators & Partners</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projectPartners.map((partner) => (
                      <div
                        key={partner.id}
                        className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{partner.name}</h4>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{partner.category}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{partner.collaborationFocus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Metadata */}
            <div className="lg:col-span-4 space-y-6">
              {/* Tech Stack Box */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block border-b border-slate-200 dark:border-slate-800 pb-2">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Geographic Footprint */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block border-b border-slate-200 dark:border-slate-800 pb-2">
                  Operational Countries
                </span>
                <div className="space-y-2">
                  {projectCountries.map((c) => (
                    <div key={c.code} className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold">{c.name}</span>
                      <span className="font-mono text-slate-400 dark:text-slate-500">{c.code}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects Section */}
          {relatedProjects.length > 0 && (
            <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800 space-y-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Related Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((rp) => (
                  <div
                    key={rp.id}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-red-600 dark:text-red-400">{rp.category}</span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{rp.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{rp.description}</p>
                    </div>
                    <Link
                      href={`/portfolio/${rp.slug}`}
                      className="mt-4 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
