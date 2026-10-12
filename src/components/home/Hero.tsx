"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Users, Sparkles, Award, Clock, Heart } from "lucide-react";

const heroStats = [
  { icon: Sparkles, value: "300+", label: "Projects Completed", color: "text-red-500" },
  { icon: Award, value: "16+", label: "Awards Received", color: "text-amber-500" },

  { icon: Users, value: "34+", label: "Team Members", color: "text-purple-500" },
  { icon: Heart, value: "100k+", label: "Lives Impacted", color: "text-red-600" },
];

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 border-b border-slate-200/80 dark:border-slate-800/80">
      {/* ─────────────────────────────────────────────────────────────
          LIGHT MODE ONLY: Matches Partners Page Hero Visual Language
      ───────────────────────────────────────────────────────────── */}
      {/* Decorative radial blobs matching partners page */}
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

      <div className="dark:hidden relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 space-y-7">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08]"
            >
              Digital innovation for a more{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-red-600"> resilient Kenya.</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-3 rounded-full opacity-20 bg-red-400 blur-sm"
                />
              </span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-700 leading-relaxed font-normal"
            >
              Explore the people, products, data and partnerships transforming humanitarian action across Kenya and the Greater Horn of Africa.
            </motion.p>

            {/* Strategic Statement Box matching partners page */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-red-50/80 via-white to-slate-50 border border-red-200/80 shadow-lg relative overflow-hidden backdrop-blur-md"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-600 text-white shrink-0 shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
                    Humanitarian Tech & Data Acceleration
                  </span>
                  <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                    Co-creating, piloting, and scaling innovative technology, GIS spatial intelligence, and community-first digital tools across Kenya.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-lg shadow-red-600/25 transition-all hover:shadow-red-600/40 hover:-translate-y-0.5"
              >
                <span>Let&apos;s work together</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/people"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all hover:border-slate-400"
              >
                <Users className="w-4 h-4 text-red-600" />
                <span>Meet the Team</span>
              </Link>
            </motion.div>

            {/* Inline Stats Row matching partners page */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-6 pt-2"
            >
              {heroStats.map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <div>
                    <span className="block text-sm font-black text-slate-900 font-sans">{value}</span>
                    <span className="block text-[11px] font-mono text-slate-500">{label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Light-mode square crop from the team photo. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:flex-shrink-0 lg:w-[460px] xl:w-[520px] w-full"
          >
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-200">
              <Image
                src="/assets/images/hero/hero-square.jpg"
                alt="Kenya Red Cross team members standing together at an event"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          DARK MODE ONLY: Preserved Exactly As It Currently Is
      ───────────────────────────────────────────────────────────── */}
      <div className="hidden dark:block">
        {/* Background image and readability overlays */}
        <Image
          src="/assets/images/hero/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60 pointer-events-none"
        />
        <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/35 to-slate-950/80 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-600/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="lg:col-span-12 space-y-5 sm:space-y-6 pt-4 sm:pt-10 text-center">
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] sm:leading-[1.1] text-white max-w-4xl mx-auto"
              >
                Digital innovation for a more resilient Kenya.
              </motion.h1>

              {/* Supporting Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto"
              >
                Explore the people, products, data and partnerships transforming humanitarian action across Kenya and the Greater Horn of Africa.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 max-w-xs sm:max-w-none mx-auto"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-lg shadow-red-600/25 transition-all hover:shadow-red-600/40 hover:-translate-y-0.5"
                >
                  <span>Let&apos;s work together</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/people"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all hover:border-slate-700"
                >
                  <Users className="w-4 h-4 text-red-400" />
                  <span>Meet the Team</span>
                </Link>
              </motion.div>

              {/* Quick Metrics Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-6 sm:pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-4xl mx-auto text-center"
              >
                <div className="p-2 sm:p-0">
                  <span className="block text-xl sm:text-2xl font-black text-white font-sans">
                    300+
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                    projects completed
                  </span>
                </div>
                <div className="p-2 sm:p-0">
                  <span className="block text-xl sm:text-2xl font-black text-white font-sans">
                    16+
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                    awards received
                  </span>
                </div>
                <div className="p-2 sm:p-0">
                  <span className="block text-xl sm:text-2xl font-black text-white font-sans">
                    12+
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                    years experience
                  </span>
                </div>
                <div className="p-2 sm:p-0">
                  <span className="block text-xl sm:text-2xl font-black text-white font-sans">
                    34+
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                    team members
                  </span>
                </div>
                <div className="p-2 sm:p-0 col-span-2 sm:col-span-1">
                  <span className="block text-xl sm:text-2xl font-black text-red-400 font-sans">
                    100k+
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                    lives impacted
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
