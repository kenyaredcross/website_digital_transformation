"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background image and readability overlays */}
      <Image
        src="/assets/images/hero/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-100 dark:opacity-60"
      />
      <div className="absolute inset-0 bg-white/10 dark:bg-slate-950/40 pointer-events-none transition-colors duration-300" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-white dark:from-slate-950/60 dark:via-slate-950/35 dark:to-slate-950/80 pointer-events-none transition-colors duration-300" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-red-600/10 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-12 space-y-6 text-center">
           

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white max-w-4xl mx-auto"
            >
              Digital innovation for a more resilient Kenya.
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto"
            >
              Explore the people, products, data and partnerships transforming humanitarian action across Kenya and the Greater Horn of Africa.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-lg shadow-red-600/25 transition-all hover:shadow-red-600/40 hover:-translate-y-0.5"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/people"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 transition-all hover:border-slate-400 dark:hover:border-slate-700"
              >
                <Users className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Meet the Team</span>
              </Link>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 border-t border-slate-200 dark:border-slate-900 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center"
            >
              <div>
                <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">20+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Digital Products</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">15+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Data Services</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-red-600 dark:text-red-400 font-mono">47</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kenyan Counties</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
