"use client";

import { useRef, useState, useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger index — each step adds 65 ms of delay (capped at 8). */
  index?: number;
  className?: string;
}

/**
 * Fades + lifts its children the first time they scroll into view.
 * Respects `prefers-reduced-motion` — skips animation when set.
 * Animation classes (`pf-reveal-idle`, `pf-reveal-in`) are defined in
 * `globals.css`.
 */
export function Reveal({ children, index = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={`${className} ${shown ? "pf-reveal-in" : "pf-reveal-idle"}`}
      style={
        shown && !reduced
          ? { animationDelay: `${Math.min(index, 8) * 65}ms` }
          : undefined
      }
    >
      {children}
    </div>
  );
}
