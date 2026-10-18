import Image from "next/image";
import { PeopleDirectory } from "@/components/people/PeopleDirectory";
import { getPeople } from "@/lib/frappe/people";
import { ContentErrorState } from "@/components/ui/ContentErrorState";
import type { Metadata } from "next";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "People & Innovators | Kenya Red Cross Digital Transformation",
  description:
    "Meet the software engineers, data scientists, GIS specialists, and field innovation officers behind Kenya Red Cross digital solutions.",
};

export default async function PeoplePage() {
  await connection();
  let people;
  try {
    people = await getPeople();
  } catch (error) {
    console.error("Failed to load people directory:", error);
    people = null;
  }

  return (
    <div className="pt-20 sm:pt-25 pb-14 sm:pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="relative py-10 sm:py-15 md:py-15 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">

        {/* Dark mode only: full-bleed background image + gradient overlays */}
        <div className="absolute inset-0 z-0 hidden dark:block">
          <Image
            src="/assets/images/distro/hands1.jpg"
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
          <div className="flex flex-col lg:flex-row lg:items-center gap-7 sm:gap-12 lg:gap-16">

            {/* ── Left: Text content ── */}
            <div className="min-w-0 flex-1 space-y-5 sm:space-y-7">
              

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
                The people{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-red-600 dark:text-red-500">behind the work.</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-3 rounded-full opacity-20 bg-red-400 dark:bg-red-600 blur-sm"
                  />
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Technology is built by people. Meet the team, contributors, and field innovators behind our digital transformation work.
              </p>
            </div>

            {/* ── Right: Image square — light mode only, zero gradient overlay ── */}
            <div className="block dark:hidden lg:flex-shrink-0 lg:w-[420px] xl:w-[480px] w-full">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                <Image
                  src="/assets/images/distro/hands1.jpg"
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

      {/* Directory Section */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {people === null ? <ContentErrorState title="The team directory couldn’t load" /> : <PeopleDirectory people={people} />}
        </div>
      </section>
    </div>
  );
}
