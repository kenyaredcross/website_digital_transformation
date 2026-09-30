"use client";

import { useRef } from "react";
import Image from "next/image";
import { Country } from "@/types";
import { MapPin, CheckCircle2 } from "lucide-react";

/* ── Flag path resolver (same logic as CountryCard) ──────── */
function getFlagSrc(country: Country): string {
  return `https://flagcdn.com/w320/${country.code.toLowerCase()}.png`;
}

/* ── Individual marquee card ─────────────────────────────── */
function MarqueeCard({ country }: { country: Country }) {
  const flagSrc = getFlagSrc(country);

  return (
    /* The card is a fixed-width box. Details are hidden by default and
       revealed when an ancestor gets the [data-paused] attribute. */
    <div
      className="
        marquee-card
        relative flex-shrink-0 w-72
        rounded-2xl overflow-hidden
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        shadow-sm
        transition-all duration-300
        hover:border-red-500/60 hover:shadow-2xl
        cursor-pointer
        select-none
      "
    >
      {/* ── Flag layer — always fills the card, full opacity by default ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={flagSrc}
          alt={`${country.name} flag`}
          fill
          unoptimized
          sizes="288px"
          className="object-cover object-center scale-105"
        />
        {/* Overlay: opaque in marquee-moving state → semi-transparent when paused */}
        <div
          className="
            absolute inset-0
            bg-white/95 dark:bg-slate-900/95
            marquee-card-overlay
            transition-all duration-500
          "
        />
      </div>

      {/* ── Card content — hidden in moving state, revealed when paused ── */}
      <div
        className="
          relative z-10
          p-6 flex flex-col gap-4
          marquee-card-content
          transition-all duration-500
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {country.name}
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-red-600 dark:text-red-400 border border-slate-200 dark:border-slate-700">
            {country.code}
          </span>
        </div>

        {/* Region */}
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 -mt-2">
          {country.region}
        </span>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium line-clamp-3">
          {country.shortDescription}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="block text-sm font-black font-mono text-slate-900 dark:text-white">
              {country.activeInitiativesCount}
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 block">Initiatives</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="block text-sm font-black font-mono text-red-600 dark:text-red-400">
              {country.digitalProductsCount}
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 block">Products</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="block text-sm font-black font-mono text-blue-600 dark:text-blue-400">
              {country.dataServicesCount}
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 block">Data Feeds</span>
          </div>
        </div>

        {/* Key initiatives */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Key Initiatives
          </span>
          <ul className="space-y-1">
            {country.keyInitiatives.slice(0, 3).map((init) => (
              <li key={init} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-3 h-3 text-red-600 dark:text-red-500 shrink-0" />
                <span className="truncate">{init}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Flag-only state overlay: shown when moving, hidden when paused ── */}
      {/* This sits on top in moving state and shows the big flag + country name */}
      <div
        className="
          marquee-card-flag-face
          absolute inset-0 z-20
          flex flex-col items-center justify-center gap-3
          transition-all duration-500
        "
      >
        {/* Flag image — crisp, centered */}
        <div className="relative w-24 h-16 rounded-md overflow-hidden shadow-lg ring-2 ring-white/60 dark:ring-slate-700/60">
          <Image
            src={flagSrc}
            alt={`${country.name} flag`}
            fill
            unoptimized
            sizes="96px"
            className="object-cover"
          />
        </div>
        {/* Country name */}
        <span className="text-base font-black text-slate-900 dark:text-white tracking-tight">
          {country.name}
        </span>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          {country.region}
        </span>
      </div>
    </div>
  );
}

/* ── The marquee wrapper ─────────────────────────────────── */
export function CountryMarquee({ countries }: { countries: Country[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Duplicate the list so the loop is seamless
  const doubled = [...countries, ...countries];

  return (
    <div className="py-24">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Country Operations Directory
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            Hover over the carousel to pause and reveal country details.
          </p>
        </div>
      </div>

      {/*
        The marquee wrapper. On hover:
        - [data-paused] attribute is set → CSS targets it to pause animation + reveal details
        We use a CSS approach so there's zero JS lag on hover.
      */}
      <div
        ref={wrapperRef}
        className="marquee-wrapper relative overflow-hidden"
        onMouseEnter={() => wrapperRef.current?.setAttribute("data-paused", "true")}
        onMouseLeave={() => wrapperRef.current?.removeAttribute("data-paused")}
        aria-label="Country operations directory marquee — hover to pause and explore"
      >
        {/* Left fade edge */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-30 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent" />
        {/* Right fade edge */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-30 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent" />

        {/* The scrolling track */}
        <div className="marquee-track flex gap-5 w-max py-4 px-6">
          {doubled.map((country, idx) => (
            <MarqueeCard key={`${country.id}-${idx}`} country={country} />
          ))}
        </div>
      </div>

      {/* Inline styles — isolated, no global pollution */}
      <style>{`
        /* ── Marquee scroll animation ────────────────────────── */
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
        }

        /* Pause animation when wrapper is hovered */
        .marquee-wrapper[data-paused] .marquee-track {
          animation-play-state: paused;
        }

        /* ── Card states: MOVING (default) ───────────────────── */

        /* Overlay: very opaque → mostly transparent card surface */
        .marquee-card-overlay {
          /* keep a slight white/dark tint so flag isn't too loud */
          opacity: 1;
        }

        /* Details content: invisible while moving */
        .marquee-card-content {
          opacity: 0;
          pointer-events: none;
        }

        /* Flag face: fully visible while moving */
        .marquee-card-flag-face {
          opacity: 1;
          pointer-events: none;
          background: transparent;
        }

        /* ── Card states: PAUSED (marquee-wrapper has data-paused) ── */

        /* Reveal the card surface — flag bleeds through at ~2% */
        .marquee-wrapper[data-paused] .marquee-card-overlay {
          opacity: 0.98;
        }

        /* Reveal all the details */
        .marquee-wrapper[data-paused] .marquee-card-content {
          opacity: 1;
          pointer-events: auto;
        }

        /* Hide the flag-only face */
        .marquee-wrapper[data-paused] .marquee-card-flag-face {
          opacity: 0;
        }

        /* Make cards taller when paused to fit all content */
        .marquee-card {
          height: 340px;
          transition: height 0.4s ease;
        }
        .marquee-wrapper[data-paused] .marquee-card {
          height: 420px;
        }
      `}</style>
    </div>
  );
}
