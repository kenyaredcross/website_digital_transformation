import Image from "next/image";
import { FlaskConical, Lightbulb } from "lucide-react";
import type { Metadata } from "next";
import { InnovationResearchSection } from "@/components/knowledge-hub/InnovationResearchSection";

export const metadata: Metadata = {
  title: "Innovation & Research | Kenya Red Cross Digital Transformation",
  description:
    "Discover how Kenya Red Cross explores emerging technologies and new approaches for humanitarian action — through research, experimentation, and structured knowledge sharing documented across 7 key dimensions.",
};

export default function InnovationResearchPage() {
  return (
    <div className="pt-20 min-h-screen bg-background text-foreground transition-colors duration-300">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-card py-20 md:py-24 transition-colors duration-300">

        {/* Dark mode: full-bleed background photograph */}
        <div className="absolute inset-0 z-0 hidden dark:block">
          <Image
            src="/assets/images/dt_updates/meeting.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        </div>

        {/* Light mode: decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 w-[700px] h-[700px] dark:hidden translate-x-1/3 -translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(238,36,53,0.1) 0%, transparent 65%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 bottom-0 w-[450px] h-[450px] dark:hidden -translate-x-1/3 translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)" }}
        />
        <div aria-hidden className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

            {/* Left: Text */}
            <div className="flex-1 space-y-7">
              <div className="flex flex-wrap gap-2">
                <span className="kh-step kh-step-1 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/80 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/70 shadow-sm backdrop-blur-md">
                  <FlaskConical className="w-3.5 h-3.5" />
                  Innovation &amp; Research
                </span>
                <span className="kh-step kh-step-1 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-3.5 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/70 shadow-sm backdrop-blur-md">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Emerging Technologies
                </span>
              </div>

              <h1 className="kh-step kh-step-2 text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.05]">
                Exploring New{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-red-600 dark:text-red-500">Possibilities.</span>
                  <span
                    aria-hidden
                    className="hero-underline absolute -bottom-1 left-0 right-0 h-3 rounded-full opacity-20 bg-red-400 dark:bg-red-600 blur-sm"
                  />
                </span>
              </h1>

              <p className="kh-step kh-step-3 text-xl text-muted-foreground leading-relaxed max-w-[60ch]">
                We explore how emerging technologies and new approaches can contribute to
                humanitarian action — through research, experimentation, knowledge sharing,
                and collaboration with staff, volunteers, communities, and partners.
              </p>

              <div className="kh-step kh-step-3 flex flex-wrap gap-3 pt-2">
                <a
                  href="#experiments"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow"
                >
                  Browse Experiments ↓
                </a>
                <a
                  href="/knowledge-hub"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card hover:bg-muted text-foreground text-sm font-semibold border border-border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow"
                >
                  Knowledge Hub →
                </a>
              </div>
            </div>

            {/* Right: Image (light mode only) */}
            <div className="kh-step kh-step-2 block dark:hidden lg:shrink-0 lg:w-[420px] xl:w-[480px] w-full">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border">
                <Image
                  src="/assets/images/dt_updates/meeting.jpg"
                  alt="Kenya Red Cross innovation and research in action"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-card/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-border/60">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/50">
                        <FlaskConical className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Documented Framework</p>
                        <p className="text-base font-bold text-foreground">7 Key Dimensions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Innovation & Research Content ─────────────────────────────────── */}
      <InnovationResearchSection />

    </div>
  );
}
