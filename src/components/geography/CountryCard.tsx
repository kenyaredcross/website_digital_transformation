"use client";

import { useState } from "react";
import Image from "next/image";
import { Country } from "@/types";
import { MapPin, CheckCircle2 } from "lucide-react";

function getFlagCandidates(country: Country): string[] {
  const codeLower = country.code.toLowerCase();
  const idClean = country.id.toLowerCase().replace(/-/g, "");
  const idRaw = country.id.toLowerCase();
  let specificLocalName = idClean;
  if (idRaw === "drc" || idRaw === "cd") specificLocalName = "congo";

  return [
    `/assets/images/flags/${codeLower}.svg`,
    `/assets/images/flags/${codeLower}.png`,
    `/assets/images/flags/${specificLocalName}.png`,
    `/assets/images/flags/${idRaw}.png`,
    `https://flagcdn.com/w320/${codeLower}.png`,
  ];
}

export function CountryCard({ country }: { country: Country }) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [flagPathIndex, setFlagPathIndex] = useState<number>(0);
  const [hasFlagError, setHasFlagError] = useState<boolean>(false);

  const flagCandidates = getFlagCandidates(country);
  const currentFlagSrc = flagCandidates[flagPathIndex] || flagCandidates[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageError = () => {
    if (flagPathIndex < flagCandidates.length - 1) {
      setFlagPathIndex((prev) => prev + 1);
    } else {
      setHasFlagError(true);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/60 transition-colors duration-300 flex flex-col justify-between shadow-sm hover:shadow-2xl overflow-hidden"
    >
      {/* Dynamic Cursor Spotlight Reveal Flag Layer */}
      {!hasFlagError && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-out"
          style={{
            opacity: isHovered ? 1 : 0,
            WebkitMaskImage: `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, black 0%, rgba(0,0,0,0.65) 50%, transparent 85%)`,
            maskImage: `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, black 0%, rgba(0,0,0,0.65) 50%, transparent 85%)`,
          }}
        >
          {/* National Flag Background */}
          <div className="relative w-full h-full">
            <Image
              src={currentFlagSrc}
              alt={`${country.name} flag backdrop`}
              fill
              unoptimized={currentFlagSrc.startsWith("http")}
              onError={handleImageError}
              className="object-cover object-center opacity-90 filter brightness-95 contrast-105 scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Soft Ambient Tint for Contrast & Text Readability */}
            <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/75 backdrop-blur-[1px]" />
          </div>
        </div>
      )}

      {/* Card Foreground Content */}
      <div className="relative z-10 flex flex-col justify-between h-full pointer-events-auto">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {country.name}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-slate-100/90 dark:bg-slate-800/90 text-red-600 dark:text-red-400 border border-slate-200 dark:border-slate-700 shadow-xs backdrop-blur-sm">
              {country.code}
            </span>
          </div>

          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-4">
            Region: {country.region}
          </span>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium">
            {country.shortDescription}
          </p>

          {/* Quantitative Stats Grid */}
          <div className="grid grid-cols-3 gap-2 text-center mb-6">
            <div className="p-2.5 rounded-lg bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xs shadow-xs">
              <span className="block text-base font-black font-mono text-slate-900 dark:text-white">
                {country.activeInitiativesCount}
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-medium">
                Initiatives
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xs shadow-xs">
              <span className="block text-base font-black font-mono text-red-600 dark:text-red-400">
                {country.digitalProductsCount}
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-medium">
                Products
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xs shadow-xs">
              <span className="block text-base font-black font-mono text-blue-600 dark:text-blue-400">
                {country.dataServicesCount}
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-medium">
                Data Feeds
              </span>
            </div>
          </div>
        </div>

        {/* Key Initiatives List */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Key Deployed Initiatives
          </span>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            {country.keyInitiatives.slice(0, 3).map((init) => (
              <li key={init} className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-600 dark:text-red-500 shrink-0" />
                <span className="truncate">{init}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
