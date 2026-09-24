import Link from "next/link";
import Image from "next/image";
import { getThematicAreas } from "@/lib/frappe/thematic-areas";
import {
  Smartphone,
  BarChart3,
  MapPin,
  Cpu,
  Layers,
  Sparkles,
  GraduationCap,
  Users,
  Handshake,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What We Do | Thematic Areas",
  description:
    "Explore Kenya Red Cross Digital Transformation's 7 thematic pillars: Digital Systems, Data & Analytics, Innovation, Digital Skills, Community Digital Transformation, Partnerships, and Resources & Knowledge.",
};

const iconMap = {
  Smartphone,
  BarChart3,
  MapPin,
  Cpu,
  Layers,
  Sparkles,
  GraduationCap,
  Users,
  Handshake,
  BookOpen,
};

export default async function WhatWeDoPage() {
  const thematicAreas = await getThematicAreas();
  return (
    <div className="pt-25 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="relative py-15 md:py-15 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">

        {/* Dark mode only: full-bleed background image + gradient overlays */}
        <div className="absolute inset-0 z-0 hidden dark:block">
          <Image
            src="/assets/images/distro/presentation3.jpg"
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
              {/* Label */}
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/80 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/70 shadow-sm backdrop-blur-md w-fit">
                Core Capabilities
              </span>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
                What We{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-red-600 dark:text-red-500">Do</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-3 rounded-full opacity-20 bg-red-400 dark:bg-red-600 blur-sm"
                  />
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Building resilient digital infrastructure, spatial analytics, early warning models, and frontier AI for humanitarian action across East Africa.
              </p>
            </div>

            {/* ── Right: Image square — light mode only, zero gradient overlay ── */}
            <div className="block dark:hidden lg:flex-shrink-0 lg:w-[420px] xl:w-[480px] w-full">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                <Image
                  src="/assets/images/distro/presentation3.jpg"
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

      {/* Large Editorial Layout for 4 Thematic Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {thematicAreas.map((area) => {
            const Icon = iconMap[area.iconName as keyof typeof iconMap] || Smartphone;

            return (
              <div
                key={area.id}
                className="group p-8 md:p-12 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-all duration-300 shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-black font-mono text-red-600 dark:text-red-500">
                        {area.number}
                      </span>
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-red-600 dark:text-red-400 border border-slate-200 dark:border-slate-700">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {area.title}
                    </h2>

                    <p className="text-lg text-red-700 dark:text-red-300/90 font-medium leading-relaxed">
                      &quot;{area.tagline}&quot;
                    </p>

                    <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                      {area.detailedDescription}
                    </p>

                    {/* Capabilities grid */}
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {area.capabilities.map((cap) => (
                        <div
                          key={cap.title}
                          className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1"
                        >
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                            <CheckCircle2 className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0" />
                            <span>{cap.title}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                            {cap.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Thematic image & detail CTA */}
                  <div className="lg:col-span-4 space-y-5">
                    <Link
                      href={`/what-we-do/${area.slug}`}
                      className="relative block aspect-square overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 shadow-xl"
                      aria-label={`Explore ${area.title}`}
                    >
                      <Image
                        src={area.featuredImageUrl}
                        alt={`${area.title} in action`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                      <span className="absolute inset-x-5 bottom-5 text-sm font-bold text-white">
                        {area.shortTitle}
                      </span>
                    </Link>

                    <div>
                      <Link
                        href={`/what-we-do/${area.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg"
                      >
                        <span>Detailed Thematic Overview</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
