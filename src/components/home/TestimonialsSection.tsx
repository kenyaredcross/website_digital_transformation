"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { Quote, ChevronLeft, ChevronRight, MapPin, HeartHandshake } from "lucide-react";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section className="py-24 bg-slate-900 text-white relative border-t border-slate-800 overflow-hidden">
      {/* Background Subtle Patterns */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono flex items-center justify-center gap-2">
            <HeartHandshake className="w-4 h-4" /> Voice of the Field
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Voices from the frontlines of transformation.
          </h2>
          <p className="text-slate-400 text-base">
            How digital tools, predictive early warning, and mobile cash transfers impact communities, county directors, and field volunteers.
          </p>
        </div>

        {/* Testimonials Carousel & Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-8">
            <Quote className="w-12 h-12 text-red-500/40" />

            <p className="text-xl sm:text-2xl font-medium text-slate-100 leading-relaxed italic">
              &quot;{current.quote}&quot;
            </p>

            <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                {/* Avatar graphic fallback */}
                <div className="w-12 h-12 rounded-full bg-red-950 text-red-400 border border-red-800 font-mono font-bold text-base flex items-center justify-center shrink-0">
                  {current.authorName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{current.authorName}</h3>
                  <p className="text-xs font-mono font-semibold text-red-400">
                    {current.authorRole} • {current.organization}
                  </p>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-500" /> {current.location}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows & Indicators */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-red-500 transition-colors"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-slate-400 px-2">
                  0{activeIndex + 1} / 0{testimonials.length}
                </span>
                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-red-500 transition-colors"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Testimonial Category Pills Indicator */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {testimonials.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeIndex === idx
                    ? "bg-red-600 text-white font-bold shadow"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {item.category}: {item.authorName.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
