import type { Metadata } from "next";
import Link from "next/link";
import { getDigitalStories } from "@/lib/frappe/knowledge-content";
import {
  Users,
  Lightbulb,
  Target,
  Heart,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Calendar,
  Tag,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Stories | Kenya Red Cross Digital",
  description:
    "People behind the transformation. Stories and case studies exploring how staff, volunteers, partners and communities interact with digital tools to improve humanitarian work.",
};

const SECTION_META = [
  { key: "challenge", icon: Target, label: "The Challenge" },
  { key: "people", icon: Users, label: "The People" },
  { key: "solution", icon: Lightbulb, label: "The Solution" },
  { key: "experience", icon: Heart, label: "Their Experience" },
  { key: "learning", icon: BookOpen, label: "What We Learned" },
  { key: "impact", icon: TrendingUp, label: "The Impact" },
] as const;

export default async function DigitalStoriesPage() {
  const digitalStories = await getDigitalStories();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pb-24 pt-24">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-20 md:py-24">
        {/* Decorative gradient orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-red-600/5 dark:bg-red-600/10 blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span className="text-xs font-semibold text-red-600 dark:text-red-400 tracking-wide uppercase">
                Digital Stories
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl font-[var(--font-playfair)]">
              People Behind the{" "}
              <span className="text-red-600">Transformation</span>
            </h1>

            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl max-w-[58ch]">
              Digital transformation is about people, not only systems. Through
              stories and case studies, we share how staff, volunteers, partners
              and communities interact with digital tools and contribute to
              improving humanitarian work.
            </p>

            <div aria-hidden className="h-1 w-24 rounded-full bg-red-600" />
          </div>
        </div>
      </section>

      {/* ── Stories Grid ─────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {digitalStories.map((story, index) => (
            <article
              key={story.id}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Story header */}
              <div className="p-8 md:p-10 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <Tag className="w-3 h-3" />
                        {story.tag}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(story.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-snug font-[var(--font-playfair)]">
                      {story.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-[64ch]">
                      {story.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50">
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {story.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {story.author}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {story.authorRole}
                    </p>
                  </div>
                </div>
              </div>

              {/* Story sections */}
              <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SECTION_META.map(({ key, icon: Icon, label }) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30">
                        <Icon className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {story[key as keyof typeof story] as string}
                    </p>
                  </div>
                ))}
              </div>

              {/* Safeguarding note */}
              {story.safeguardingNote && (
                <div className="px-8 md:px-10 pb-8 md:pb-10">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                      🔒 <strong>Safeguarding:</strong> {story.safeguardingNote}
                    </p>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-red-600 to-red-700 p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-playfair)]">
                Have a story to tell?
              </h2>
              <p className="text-red-100 max-w-[48ch]">
                If you are a KRCS staff member, volunteer, or partner with a
                digital transformation story, we&apos;d love to hear from you.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-red-600 font-semibold text-sm hover:bg-red-50 transition-colors shadow-md"
            >
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
