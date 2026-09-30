import Image from "next/image";
import { AfricaMap } from "@/components/geography/AfricaMap";
import { CountryMarquee } from "@/components/geography/CountryMarquee";
import { getCountries } from "@/lib/get-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Where We Work | Regional Reach & Geographic Operations",
  description:
    "Interactive map and country breakdown of Kenya Red Cross Digital Transformation operations across 47 Kenyan counties and East Africa.",
};

export default async function WhereWeWorkPage() {
  const countries = await getCountries();

  return (
    <div className="pt-25 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="relative py-15 md:py-15 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">

        {/* Dark mode only: full-bleed background image + gradient overlays */}
        <div className="absolute inset-0 z-0 hidden dark:block">
          <Image
            src="/assets/images/dt_updates/meeting.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
        </div>

        {/* Light mode only: decorative radial blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 w-[600px] h-[600px] dark:hidden translate-x-1/3 -translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(238,36,53,0.12) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 bottom-0 w-[400px] h-[400px] dark:hidden -translate-x-1/3 translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }}
        />

        {/* Two-column layout: text left, image right (light) / text only (dark) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

            {/* ── Left: Text content ── */}
            <div className="flex-1 space-y-7">
              

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
                Our{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-red-600 dark:text-red-500">reach.</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-3 rounded-full opacity-20 bg-red-400 dark:bg-red-600 blur-sm"
                  />
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Digital transformation supporting humanitarian action across 47 Kenyan counties and 8 East & Horn of Africa nations.
              </p>
            </div>

            {/* ── Right: Image square — light mode only, zero gradient overlay ── */}
            <div className="block dark:hidden lg:flex-shrink-0 lg:w-[420px] xl:w-[480px] w-full">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                <Image
                  src="/assets/images/dt_updates/meeting.jpg"
                  alt="Humanitarian Technology & Field Operations"
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

      {/* Interactive Map Showcase */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AfricaMap countries={countries} isCompact={true} />
        </div>
      </section>

      {/* Country Operations Marquee */}
      <CountryMarquee countries={countries} />
    </div>
  );
}
