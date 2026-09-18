"use client";

import Image from "next/image";
import { partners } from "@/data/partners";

export function PartnerMarquee() {
  // Duplicate for seamless loop
  const doubled = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden py-6 border-y border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white dark:from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white dark:from-slate-950 to-transparent" />

      <div
        className="flex gap-10 w-max"
        style={{
          animation: "marquee 30s linear infinite",
        }}
      >
        {doubled.map((partner, i) => (
          <div
            key={`${partner.id}-${i}`}
            className="relative h-10 w-28 shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              sizes="112px"
              className="object-contain"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
