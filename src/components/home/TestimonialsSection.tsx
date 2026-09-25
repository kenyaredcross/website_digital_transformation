"use client";

import Image from "next/image";
import { Testimonial } from "@/types";
import { HeartHandshake, Quote } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const testimonialsList = testimonials;

  if (!testimonialsList || testimonialsList.length === 0) {
    return null;
  }

  const row1 = testimonialsList.slice(0, Math.ceil(testimonialsList.length / 2));
  const row2 = testimonialsList.slice(Math.ceil(testimonialsList.length / 2));

  // Duplicate for seamless infinite scrolling loop
  const marqueeRow1 = [...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative border-t border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-64 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 font-mono inline-flex items-center gap-2 mb-2">
          <HeartHandshake className="w-4 h-4" /> Voices of Impact
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Frontline feedback on our digital solutions.
        </h2>
      </div>

      {/* Marquee Container with Gradient Edge Masks */}
      <div className="relative w-full overflow-hidden space-y-5">
        {/* Left/Right Edge Blur Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-20 pointer-events-none" />

        {/* Marquee Row 1 (Moving Left) */}
        <div className="flex w-max space-x-5 animate-marquee hover:[animation-play-state:paused]">
          {marqueeRow1.map((item, idx) => (
            <TestimonialCard key={`${item.id}-r1-${idx}`} item={item} />
          ))}
        </div>

        {/* Marquee Row 2 (Moving Right) */}
        <div className="flex w-max space-x-5 animate-marquee-reverse hover:[animation-play-state:paused]">
          {marqueeRow2.map((item, idx) => (
            <TestimonialCard key={`${item.id}-r2-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {/* Embedded CSS for smooth CSS keyframe animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee {
          animation: marquee 80s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 80s linear infinite;
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="w-[320px] sm:w-[380px] shrink-0 p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-red-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between select-none">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-800/50">
            {item.category}
          </span>
          <Quote className="w-4 h-4 text-red-500/40" />
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic line-clamp-3 mb-4">
          &quot;{item.quote}&quot;
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
          <Image
            src={item.avatar || "/assets/images/people/p1.jpeg"}
            alt={item.authorName}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
            {item.authorName}
          </h4>
          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
            {item.authorRole} • {item.organization}
          </p>
        </div>
      </div>
    </div>
  );
}

