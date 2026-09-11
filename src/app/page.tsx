import { Hero } from "@/components/home/Hero";
import { ImpactStats } from "@/components/home/ImpactStats";
import { ThematicAreas } from "@/components/home/ThematicAreas";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { WhereWeWorkPreview } from "@/components/home/WhereWeWorkPreview";
import { PeoplePreview } from "@/components/home/PeoplePreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PartnersPreview } from "@/components/home/PartnersPreview";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kenya Red Cross Society — Digital Transformation",
  description:
    "Digital innovation for a more resilient Kenya. Explore the people, products, data and partnerships transforming humanitarian action across Kenya and East Africa.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Impact Statistics */}
      <ImpactStats />

      {/* 4 Thematic Areas */}
      <ThematicAreas />

      {/* Featured Projects Showcase */}
      <FeaturedProjects />

      {/* Where We Work Geographic Reach Preview */}
      <WhereWeWorkPreview />

      {/* People Preview */}
      <PeoplePreview />

      {/* Testimonials Showcase */}
      <TestimonialsSection />

      {/* Partners Preview */}
      <PartnersPreview />

      {/* Final Homepage CTA Section */}
      <section className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 text-center relative overflow-hidden transition-colors duration-300">
        <Image
          src="/assets/images/cta/meeting.jpg"
          alt="Kenya Red Cross team collaborating"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-15 dark:opacity-55"
        />
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/75 pointer-events-none transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/95 dark:from-slate-900/75 dark:via-slate-950/60 dark:to-slate-950/90 pointer-events-none transition-colors duration-300" />
        <div className="absolute inset-0 bg-dots-pattern opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/60 text-xs font-mono font-bold text-red-600 dark:text-red-400">
            <Sparkles className="w-3.5 h-3.5" /> Shaping the Future of Humanitarian Action
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            The transformation continues.
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore the people, products and partnerships shaping the future of humanitarian action across Kenya and the region.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-xl shadow-red-600/30 transition-all hover:shadow-red-600/50 hover:-translate-y-0.5"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/people"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 transition-all hover:border-slate-400 dark:hover:border-slate-700"
            >
              <Users className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Meet the Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
