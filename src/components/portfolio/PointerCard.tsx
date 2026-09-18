"use client";

import { useRef, useCallback } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface PointerCardProps {
  children: React.ReactNode;
  className?: string;
  /**
   * How many degrees the card tilts toward the pointer.
   * Lower = more subtle. Defaults to 6.
   */
  tiltStrength?: number;
}

/**
 * Wraps a card and tracks the pointer to drive:
 * - A soft red spotlight (`pf-card::after`)
 * - A very small parallax 3-D tilt
 *
 * All values are written directly to CSS custom properties so nothing
 * re-renders while the pointer moves. Animation class defined in `globals.css`.
 */
export function PointerCard({
  children,
  className = "",
  tiltStrength = 6,
}: PointerCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || reduced) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;

      el.style.setProperty("--pf-mx", `${px * 100}%`);
      el.style.setProperty("--pf-my", `${py * 100}%`);
      el.style.setProperty("--pf-rx", `${(0.5 - py) * tiltStrength}deg`);
      el.style.setProperty("--pf-ry", `${(px - 0.5) * tiltStrength}deg`);
      el.style.setProperty("--pf-glow", "1");
      el.style.setProperty("--pf-lift", "-4px");
    },
    [reduced, tiltStrength]
  );

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--pf-rx", "0deg");
    el.style.setProperty("--pf-ry", "0deg");
    el.style.setProperty("--pf-glow", "0");
    el.style.setProperty("--pf-lift", "0px");
  }, []);

  /* Keyboard users get the same spotlight emphasis, minus the tilt. */
  const handleFocus = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--pf-mx", "50%");
    el.style.setProperty("--pf-my", "30%");
    el.style.setProperty("--pf-glow", "1");
    el.style.setProperty("--pf-lift", "-4px");
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onFocusCapture={handleFocus}
      onBlurCapture={reset}
      className={`pf-card ${className}`}
    >
      {children}
    </div>
  );
}
