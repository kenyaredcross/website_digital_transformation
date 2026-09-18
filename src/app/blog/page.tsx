import Image from "next/image";
import { BlogFilterableGrid } from "@/components/blog/BlogFilterableGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Field Stories | Kenya Red Cross Digital",
  description:
    "Field case studies, technical breakdowns and lessons learned from deploying early warning systems, mobile cash transfer and spatial intelligence across Kenya and East Africa.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-28 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-950 md:py-28">
        {/* Dark mode: full-bleed field photograph behind the headline */}
        <div className="absolute inset-0 z-0 hidden dark:block">
          <Image
            src="/assets/images/distro/lake3.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <div className="flex-1 space-y-7">
              <h1 className="max-w-[16ch] text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
                What we learn in the field
              </h1>

              <p className="max-w-[58ch] text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
                Case studies, technical breakdowns and honest post-mortems from
                building digital tools for humanitarian response across Kenya and
                East Africa.
              </p>

              {/* A single red rule, carrying the brand without a badge or pill */}
              <div aria-hidden className="h-1 w-24 rounded-full bg-red-600" />
            </div>

            {/* Light mode: the same photograph, held in a frame */}
            <div className="w-full dark:hidden lg:w-[420px] lg:shrink-0 xl:w-[480px]">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200">
                <Image
                  src="/assets/images/distro/lake3.jpg"
                  alt="A Kenya Red Cross field team working beside a flooded riverbank"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stories ────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogFilterableGrid />
        </div>
      </section>
    </div>
  );
}
