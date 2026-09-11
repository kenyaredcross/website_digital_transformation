"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { Quote, MapPin, HeartHandshake } from "lucide-react";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const current = testimonials[activeIndex];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative border-t border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      {/* Background image with theme responsive radial overlay */}
      <Image
        src="/assets/images/testimonials/testimonials.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-0 dark:opacity-90"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.88)_4%,rgba(248,250,252,0.4)_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.86)_42%,rgba(2,6,23,0.35)_100%)] pointer-events-none transition-colors duration-300" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 font-mono flex items-center justify-center gap-2">
            <HeartHandshake className="w-4 h-4" /> Voice of the Field
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Voices from the frontlines of transformation.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            How digital tools, predictive early warning, and mobile cash transfers impact communities, county directors, and field volunteers.
          </p>
        </div>

        {/* Testimonials Carousel - Single Column Flow */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden p-8 md:p-12 rounded-3xl bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 shadow-2xl min-h-[320px] transition-colors duration-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className="space-y-8"
              >
                <Quote className="w-12 h-12 text-red-600/40 dark:text-red-500/40" />

                <p className="text-xl sm:text-2xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed italic">
                  &quot;{current.quote}&quot;
                </p>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 font-mono font-bold text-base flex items-center justify-center shrink-0">
                      {current.authorName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{current.authorName}</h3>
                      <p className="text-xs font-mono font-semibold text-red-600 dark:text-red-400">
                        {current.authorRole} • {current.organization}
                      </p>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500" /> {current.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-8 bg-red-600 dark:bg-red-500"
                      : "w-4 bg-slate-300 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>

         
        </div>
      </div>
    </section>
  );
}
