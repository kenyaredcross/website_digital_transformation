import type { Metadata } from "next";
import Link from "next/link";
import { newsItems } from "@/data/newsUpdates";
import { Calendar, Tag, User, Building2, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Updates | Kenya Red Cross Digital",
  description:
    "The latest news, announcements, and updates from the Kenya Red Cross Digital Transformation Unit — digital projects, partnerships, events, and policy developments.",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Digital Projects":
    "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50",
  Innovation:
    "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/50",
  Partnerships:
    "bg-green-50 text-green-700 border-green-100 dark:bg-green-950/40 dark:text-green-400 dark:border-green-900/50",
  Events:
    "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50",
  Policy:
    "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
};

export default function NewsUpdatesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pb-24 pt-24">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-20 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-slate-900/3 dark:bg-white/3 blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 dark:bg-slate-400" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wide uppercase">
                News &amp; Updates
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl font-[var(--font-playfair)]">
              Progress, Documented
            </h1>

            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl max-w-[58ch]">
              Announcements, milestones, partnerships, and events from the Kenya
              Red Cross Digital Transformation Unit. Real progress, honestly
              reported.
            </p>

            <div aria-hidden className="h-1 w-24 rounded-full bg-red-600" />
          </div>
        </div>
      </section>

      {/* ── News List ────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {newsItems.map((item) => {
            const catClass =
              CATEGORY_COLORS[item.category] ??
              "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";

            return (
              <article
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Header */}
                <div className="p-8 md:p-10 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${catClass}`}
                        >
                          <Tag className="w-3 h-3" />
                          {item.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-snug font-[var(--font-playfair)]">
                        {item.title}
                      </h2>

                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-[70ch]">
                        {item.summary}
                      </p>

                      {/* Author row */}
                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <User className="w-3 h-3" />
                          {item.author}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <Building2 className="w-3 h-3" />
                          {item.department}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 space-y-5">
                  {item.content.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: para
                          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                          .replace(/^- (.+)$/gm, "• $1"),
                      }}
                    />
                  ))}

                  {/* Resources */}
                  {item.resources && item.resources.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                        Resources
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {item.resources.map((r) => (
                          <a
                            key={r.label}
                            href={r.url}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-red-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {r.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Subscribe CTA ─────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-900 dark:bg-slate-800 p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-playfair)]">
                Stay in the loop
              </h2>
              <p className="text-slate-400 max-w-[48ch]">
                Get updates on KRCS digital transformation milestones,
                partnerships, and events delivered to your inbox.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors shadow-md"
            >
              Contact us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
