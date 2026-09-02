import Link from "next/link";

interface BrandLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ variant = "dark", size = "md" }: BrandLogoProps) {
  const emblemSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textPrimary = variant === "light" ? "text-white" : "text-slate-900 dark:text-white";
  const textSecondary = variant === "light" ? "text-red-200" : "text-red-600 dark:text-red-400";

  return (
    <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-95">
      {/* Official-style Red Cross Emblem */}
      <div className={`relative flex items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200/80 ${emblemSizes[size]} shrink-0`}>
        {/* Outer Red Ring */}
        <div className="absolute inset-0.5 rounded-full border-2 border-[#D32F2F]/20" />
        {/* Red Cross Icon */}
        <svg viewBox="0 0 100 100" className="w-3/5 h-3/5 text-[#D32F2F]" fill="currentColor">
          {/* Vertical Bar */}
          <rect x="38" y="10" width="24" height="80" rx="2" />
          {/* Horizontal Bar */}
          <rect x="10" y="38" width="80" height="24" rx="2" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight uppercase ${size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base"} ${textPrimary}`}>
            Kenya Red Cross
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5 leading-none">
          <span className={`font-semibold tracking-wider text-[10px] md:text-[11px] uppercase ${textSecondary}`}>
            Digital Transformation
          </span>
          <span className={`hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-bold rounded bg-red-600/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/20`}>
            DEPT
          </span>
        </div>
      </div>
    </Link>
  );
}
