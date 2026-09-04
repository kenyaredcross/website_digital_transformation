"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  Users,
  Handshake,
  MessageSquare,
  Globe2,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { fetchEntityData } from "@/lib/api-client";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    blogsCount: 0,
    projectsCount: 0,
    peopleCount: 0,
    partnersCount: 0,
    testimonialsCount: 0,
    countriesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [blogs, projects, people, partners, testimonials, countries] = await Promise.all([
          fetchEntityData("blogs").catch(() => []),
          fetchEntityData("projects").catch(() => []),
          fetchEntityData("people").catch(() => []),
          fetchEntityData("partners").catch(() => []),
          fetchEntityData("testimonials").catch(() => []),
          fetchEntityData("countries").catch(() => []),
        ]);

        setStats({
          blogsCount: Array.isArray(blogs) ? blogs.length : 0,
          projectsCount: Array.isArray(projects) ? projects.length : 0,
          peopleCount: Array.isArray(people) ? people.length : 0,
          partnersCount: Array.isArray(partners) ? partners.length : 0,
          testimonialsCount: Array.isArray(testimonials) ? testimonials.length : 0,
          countriesCount: Array.isArray(countries) ? countries.length : 0,
        });
      } catch (err) {
        console.error("Error loading dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const statCards = [
    {
      title: "Blog Posts",
      count: stats.blogsCount,
      href: "/admin/blogs",
      icon: FileText,
      color: "from-red-500/20 to-orange-500/20 text-[#EE2435]",
      border: "border-red-500/30",
    },
    {
      title: "Projects Portfolio",
      count: stats.projectsCount,
      href: "/admin/projects",
      icon: Briefcase,
      color: "from-blue-500/20 to-cyan-500/20 text-blue-400",
      border: "border-blue-500/30",
    },
    {
      title: "People & Team",
      count: stats.peopleCount,
      href: "/admin/people",
      icon: Users,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400",
      border: "border-emerald-500/30",
    },
    {
      title: "Partnerships",
      count: stats.partnersCount,
      href: "/admin/partners",
      icon: Handshake,
      color: "from-purple-500/20 to-pink-500/20 text-purple-400",
      border: "border-purple-500/30",
    },
    {
      title: "Testimonials",
      count: stats.testimonialsCount,
      href: "/admin/testimonials",
      icon: MessageSquare,
      color: "from-amber-500/20 to-yellow-500/20 text-amber-400",
      border: "border-amber-500/30",
    },
    {
      title: "Countries Active",
      count: stats.countriesCount,
      href: "/admin/countries",
      icon: Globe2,
      color: "from-indigo-500/20 to-blue-500/20 text-indigo-400",
      border: "border-indigo-500/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#011E41] via-slate-900 to-[#011E41] border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EE2435]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EE2435]/10 border border-[#EE2435]/30 rounded-full text-[#EE2435] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital Transformation Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Website Content Manager
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
              Real-time role-based administration portal. Edit, create, or remove content across all website pages and data files.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/blogs"
              className="px-4 py-2.5 bg-[#EE2435] hover:bg-[#d41c2c] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#EE2435]/25 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Blog Post</span>
            </Link>
            <Link
              href="/admin/projects"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Project</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#EE2435]" />
          <span>Active Data Resources</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} border ${card.border} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white group-hover:text-[#EE2435] transition-colors">
                      {loading ? "..." : card.count}
                    </div>
                    <div className="text-xs font-medium text-slate-400">{card.title}</div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-slate-800/80 group-hover:bg-[#EE2435] text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Role & Permission Matrix Info */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Role-Based Access Matrix Reference</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="font-bold text-red-400 mb-1">Super Admin Role</div>
            <div className="text-slate-400 leading-relaxed">
              Full access to edit/add/delete across all 12 data files, site configuration, and system settings.
            </div>
          </div>
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="font-bold text-blue-400 mb-1">Admin Role</div>
            <div className="text-slate-400 leading-relaxed">
              Full CRUD access to blogs, projects, team members, partners, testimonials, countries, and thematic areas.
            </div>
          </div>
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="font-bold text-purple-400 mb-1">Blogger Role</div>
            <div className="text-slate-400 leading-relaxed">
              Strictly restricted to accessing and managing Blog posts only (`/admin/blogs`).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
