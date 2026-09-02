"use client";

import { useState } from "react";
import { countries } from "@/data/countries";
import { Country } from "@/types";
import { MapPin, ArrowRight, Activity, Layers, Database } from "lucide-react";
import Link from "next/link";

// Simplified high-precision vector SVG representation for African operational countries & continent outline
interface SVGCountryPath {
  code: string;
  name: string;
  d: string;
  labelX: number;
  labelY: number;
}

const africaPaths: SVGCountryPath[] = [
  {
    code: "KE",
    name: "Kenya",
    d: "M 520,380 L 550,385 L 560,420 L 535,445 L 505,430 L 500,400 Z",
    labelX: 530,
    labelY: 410,
  },
  {
    code: "UG",
    name: "Uganda",
    d: "M 480,390 L 505,390 L 505,425 L 475,420 Z",
    labelX: 490,
    labelY: 405,
  },
  {
    code: "TZ",
    name: "Tanzania",
    d: "M 505,430 L 535,445 L 535,490 L 490,490 L 480,445 Z",
    labelX: 510,
    labelY: 460,
  },
  {
    code: "SO",
    name: "Somalia",
    d: "M 550,345 L 610,330 L 585,395 L 550,385 Z",
    labelX: 575,
    labelY: 360,
  },
  {
    code: "ET",
    name: "Ethiopia",
    d: "M 500,320 L 560,325 L 550,380 L 515,375 L 485,340 Z",
    labelX: 525,
    labelY: 345,
  },
  {
    code: "SS",
    name: "South Sudan",
    d: "M 445,345 L 490,345 L 480,390 L 440,385 Z",
    labelX: 465,
    labelY: 365,
  },
  {
    code: "RW",
    name: "Rwanda",
    d: "M 470,420 L 482,420 L 482,432 L 470,432 Z",
    labelX: 476,
    labelY: 426,
  },
  {
    code: "CD",
    name: "DR Congo",
    d: "M 390,370 L 440,370 L 465,420 L 430,460 L 375,420 Z",
    labelX: 420,
    labelY: 410,
  },
];

// Muted outline path representing broader Africa landmass
const africaContinentPath =
  "M 260,180 L 360,120 L 460,140 L 540,210 L 620,330 L 580,420 L 530,520 L 480,600 L 430,640 L 400,600 L 370,480 L 320,440 L 250,340 L 220,260 Z";

export function AfricaMap({ isCompact = false }: { isCompact?: boolean }) {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("KE");
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);

  const selectedCountry = countries.find((c) => c.code === selectedCountryCode) || countries[0];

  return (
    <div className="relative w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl overflow-hidden text-white">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <h3 className="text-base font-extrabold text-white tracking-wide uppercase font-mono">
              Regional Operations Map
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Active digital products and data feeds deployed across East & Horn of Africa
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-600 border border-red-400" />
            <span className="text-slate-300">Active Operational Hub</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700" />
            <span className="text-slate-500">Muted Landmass</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Interactive Canvas */}
        <div className="lg:col-span-7 relative flex justify-center items-center py-4">
          <div className="relative w-full max-w-[540px] aspect-[4/3]">
            <svg
              viewBox="200 100 440 560"
              className="w-full h-full drop-shadow-2xl"
              aria-label="Interactive Africa Vector Map"
            >
              {/* Continent Muted Base Layer */}
              <path
                d={africaContinentPath}
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="1.5"
                strokeLinejoin="round"
                opacity="0.7"
              />

              {/* Active Country Vector Paths */}
              {africaPaths.map((item) => {
                const countryData = countries.find((c) => c.code === item.code);
                const isSelected = selectedCountryCode === item.code;
                const isHovered = hoveredCountry?.code === item.code;

                return (
                  <g key={item.code} className="cursor-pointer">
                    <path
                      d={item.d}
                      fill={
                        isSelected
                          ? "#D32F2F"
                          : isHovered
                          ? "#EF4444"
                          : item.code === "KE"
                          ? "#B91C1C"
                          : "#334155"
                      }
                      stroke={isSelected ? "#FFFFFF" : "#475569"}
                      strokeWidth={isSelected ? "2.5" : "1.5"}
                      className="transition-all duration-200 hover:opacity-90"
                      onClick={() => setSelectedCountryCode(item.code)}
                      onMouseEnter={() => setHoveredCountry(countryData || null)}
                      onMouseLeave={() => setHoveredCountry(null)}
                    />
                    {/* SVG Label Pin */}
                    <circle
                      cx={item.labelX}
                      cy={item.labelY}
                      r={isSelected ? "5" : "3.5"}
                      fill={isSelected ? "#FFFFFF" : "#F8FAFC"}
                      className="pointer-events-none"
                    />
                    <text
                      x={item.labelX + 8}
                      y={item.labelY + 4}
                      fill={isSelected ? "#FFFFFF" : "#94A3B8"}
                      fontSize={isSelected ? "14" : "11"}
                      fontWeight={isSelected ? "bold" : "normal"}
                      fontFamily="monospace"
                      className="pointer-events-none select-none"
                    >
                      {item.code}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredCountry && (
              <div className="absolute top-2 left-2 z-20 px-3 py-1.5 rounded-lg bg-slate-950/95 border border-red-500/40 text-xs font-mono text-white shadow-xl pointer-events-none animate-in fade-in duration-150">
                <span className="font-bold text-red-400">{hoveredCountry.name}</span>
                <span className="block text-[10px] text-slate-400">
                  {hoveredCountry.activeInitiativesCount} Active Digital Initiatives
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Selected Country Details Side Panel */}
        <div className="lg:col-span-5 space-y-5 bg-slate-950/90 p-6 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold">
                Selected Country
              </span>
              <h4 className="text-2xl font-black text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>{selectedCountry.name}</span>
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-red-950 text-red-400 border border-red-800">
              ISO: {selectedCountry.code}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedCountry.shortDescription}
          </p>

          {/* Statistics Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <Activity className="w-4 h-4 text-red-400 mx-auto mb-1" />
              <span className="block text-lg font-black font-mono text-white">
                {selectedCountry.activeInitiativesCount}
              </span>
              <span className="text-[9px] text-slate-400 block font-medium">
                Initiatives
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <Layers className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <span className="block text-lg font-black font-mono text-white">
                {selectedCountry.digitalProductsCount}
              </span>
              <span className="text-[9px] text-slate-400 block font-medium">
                Products
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <Database className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <span className="block text-lg font-black font-mono text-white">
                {selectedCountry.dataServicesCount}
              </span>
              <span className="text-[9px] text-slate-400 block font-medium">
                Data Feeds
              </span>
            </div>
          </div>

          {/* Key Initiatives List */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Key Deployed Initiatives
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedCountry.keyInitiatives.map((item) => (
                <li key={item} className="flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {!isCompact && (
            <div className="pt-2">
              <Link
                href="/where-we-work"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow"
              >
                <span>Explore Full Regional Reach</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
