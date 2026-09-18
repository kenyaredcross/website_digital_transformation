"use client";

import { useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { PointerCard } from "./PointerCard";
import type { Project } from "@/types";

interface DeckViewProps {
  projects: Project[];
  deckIndex: number;
  deckDir: "forward" | "back";
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Renders projects as a swipeable card deck — one card at a time in the
 * foreground, with two ghost cards stacked behind it for depth. Supports
 * keyboard (← →) and touch-swipe navigation.
 */
export function DeckView({ projects, deckIndex, deckDir, onNext, onPrev }: DeckViewProps) {
  const total = projects.length;
  const touchStartX = useRef<number | null>(null);

  const deckStack = useMemo(
    () => [0, 1, 2].map((offset) => projects[(deckIndex + offset) % total]),
    [projects, deckIndex, total]
  );

  const handleDeckKeys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); onNext(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); onPrev(); }
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 48) (dx < 0 ? onNext : onPrev)();
      touchStartX.current = null;
    },
    [onNext, onPrev]
  );

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Projects, one card at a time"
      onKeyDown={handleDeckKeys}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="space-y-8"
    >
      {/* The stack */}
      <div className="relative mx-auto w-full max-w-3xl min-h-[560px] sm:min-h-[600px] pb-16">
        {deckStack.map((project, offset) => {
          const isFront = offset === 0;
          return (
            <div
              key={isFront ? `front-${project.id}-${deckIndex}` : `ghost-${offset}`}
              aria-hidden={!isFront}
              className={
                isFront
                  ? "pf-deck-card relative"
                  : "pf-deck-ghost absolute inset-x-0 top-0 pointer-events-none select-none"
              }
              data-dir={isFront && deckDir === "back" ? "back" : undefined}
              style={
                isFront
                  ? undefined
                  : {
                      transform: `translateY(${offset * 16}px) scale(${1 - offset * 0.045}) rotate(${offset % 2 === 0 ? 1.2 : -1.4}deg)`,
                      opacity: 0.55 - (offset - 1) * 0.2,
                      zIndex: -offset,
                    }
              }
            >
              {isFront ? (
                <PointerCard
                  tiltStrength={7}
                  className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-black/40"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="relative block aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset"
                    aria-label={`View ${project.title} case study`}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-fill transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    <span className="pf-sheen" aria-hidden />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent pointer-events-none" />
                  </Link>

                  {/* Body */}
                  <div className="p-8 space-y-5">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                        {project.category}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">{project.year}</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {project.countries.join(", ")}
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-prose">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
                    </Link>
                  </div>
                </PointerCard>
              ) : (
                /* Ghost cards — pure decoration */
                <div className="rounded-3xl h-[560px] sm:h-[600px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg" />
              )}
            </div>
          );
        })}
      </div>

      {/* Deck controls */}
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={onPrev}
          className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          aria-label="Previous project"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="w-40 sm:w-56 space-y-2">
          <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-red-600 transition-[width] duration-500 ease-out motion-reduce:transition-none"
              style={{ width: `${((deckIndex + 1) / total) * 100}%` }}
            />
          </div>
          <p className="text-center text-xs font-mono text-slate-500 dark:text-slate-400">
            {deckIndex + 1} / {total} — use arrow keys or swipe
          </p>
        </div>

        <button
          onClick={onNext}
          className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          aria-label="Next project"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Screen-reader live announcement */}
      <p className="sr-only" aria-live="polite">
        {projects[deckIndex]?.title}, card {deckIndex + 1} of {total}
      </p>
    </section>
  );
}
