import { notFound } from "next/navigation";
import Link from "next/link";
import { people } from "@/data/people";
import { projects } from "@/data/projects";
import { ArrowLeft, ArrowRight, Mail, Globe, ExternalLink, Layers, Award, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return people.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const person = people.find((p) => p.slug === resolvedParams.slug);

  if (!person) {
    return { title: "Team Profile Not Found" };
  }

  return {
    title: `${person.name} — ${person.role}`,
    description: person.bio,
  };
}

export default async function PersonProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const person = people.find((p) => p.slug === resolvedParams.slug);

  if (!person) {
    notFound();
  }

  // Projects built by this person (project.teamIds includes person.id)
  const personProjects = projects.filter((p) => p.teamIds.includes(person.id));

  return (
    <div className="pt-28 pb-20 bg-slate-950 text-white min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-slate-800 bg-grid-pattern opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/people"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-red-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Team Directory
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-red-950 text-red-400 font-mono font-black text-3xl flex items-center justify-center border-2 border-red-800 shadow-xl shrink-0">
                {person.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 text-red-400 border border-slate-800 inline-block mb-2">
                  {person.department}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {person.name}
                </h1>
                <p className="text-base font-mono text-slate-400 font-semibold mt-1">
                  {person.role}
                </p>
              </div>
            </div>

            {/* Contact & Social Links */}
            <div className="flex items-center gap-3">
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-red-500 transition-colors"
                  title="Send Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-red-500 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
              {person.github && (
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-red-500 transition-colors"
                  title="GitHub Profile"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Profile Details & Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Bio & Expertise */}
            <div className="lg:col-span-8 space-y-10">
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h2 className="text-2xl font-bold text-white">Biography</h2>
                <p className="text-slate-300 text-base leading-relaxed">
                  {person.bio}
                </p>
              </div>

              {/* Specialization & Expertise */}
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-red-500" />
                  <span>Key Specializations & Technical Expertise</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {person.expertise.map((exp) => (
                    <div
                      key={exp}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-sm font-semibold text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Worked On */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-red-500" />
                  <span>Projects & Contributions ({personProjects.length})</span>
                </h2>

                {personProjects.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    No public portfolio projects currently associated with this profile.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {personProjects.map((project) => (
                      <div
                        key={project.id}
                        className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs font-mono">
                            <span className="text-red-400 font-bold">{project.category}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-400">{project.year}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white">{project.title}</h3>
                          <p className="text-xs text-slate-300 line-clamp-2 max-w-xl">
                            {project.description}
                          </p>
                        </div>

                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shrink-0 flex items-center gap-1.5"
                        >
                          <span>Explore Case Study</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-800 pb-2">
                  Departmental Role
                </span>

                <div className="space-y-3 text-xs text-slate-300">
                  <div>
                    <span className="block font-mono text-slate-500">Full Name</span>
                    <span className="font-bold text-white">{person.name}</span>
                  </div>
                  <div>
                    <span className="block font-mono text-slate-500">Title</span>
                    <span className="font-semibold text-red-400">{person.role}</span>
                  </div>
                  <div>
                    <span className="block font-mono text-slate-500">Unit / Department</span>
                    <span className="font-semibold text-white">{person.department}</span>
                  </div>
                  {person.email && (
                    <div>
                      <span className="block font-mono text-slate-500">Official Email</span>
                      <a href={`mailto:${person.email}`} className="text-red-400 hover:underline">
                        {person.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
