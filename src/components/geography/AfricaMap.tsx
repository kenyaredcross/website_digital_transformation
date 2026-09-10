"use client";

import { useState } from "react";
import { africaGeoJSON } from "african-countries";
import { countries } from "@/data/countries";
import { Country } from "@/types";
import { MapPin, ArrowRight, Activity, Layers, Database } from "lucide-react";
import Link from "next/link";

type Position = [number, number];
type AfricaGeometry =
  | { type: "Polygon"; coordinates: Position[][] }
  | { type: "MultiPolygon"; coordinates: Position[][][] };

const mapBounds = {
  minLongitude: -17.625043,
  maxLongitude: 51.13387,
  minLatitude: -34.819166,
  maxLatitude: 37.349994,
};

const mapDimensions = { width: 620, height: 660, padding: 18 };

function projectPoint([longitude, latitude]: Position): [number, number] {
  const { minLongitude, maxLongitude, minLatitude, maxLatitude } = mapBounds;
  const { width, height, padding } = mapDimensions;

  const x = padding + ((longitude - minLongitude) / (maxLongitude - minLongitude)) * (width - padding * 2);
  const y = padding + ((maxLatitude - latitude) / (maxLatitude - minLatitude)) * (height - padding * 2);

  return [x, y];
}

function ringToPath(ring: Position[]) {
  return ring
    .map((point, index) => {
      const [x, y] = projectPoint(point);
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join("") + "Z";
}

function geometryToPath(geometry: AfricaGeometry) {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons.flatMap((polygon) => polygon.map(ringToPath)).join("");
}

const mapCountries = africaGeoJSON.features.map((feature) => ({
  code: feature.properties.alpha2,
  name: feature.properties.name,
  path: geometryToPath(feature.geometry as AfricaGeometry),
}));

export function AfricaMap({ isCompact = false }: { isCompact?: boolean }) {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("KE");
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
  const [hoveredMapCountryCode, setHoveredMapCountryCode] = useState<string | null>(null);

  const selectedCountry = countries.find((c) => c.code === selectedCountryCode) || countries[0];

  const handleCountryMouseEnter = (countryCode: string) => {
    const countryData = countries.find((c) => c.code === countryCode);
    setHoveredMapCountryCode(countryCode);
    setHoveredCountry(countryData || null);
  };

  const handleCountryMouseLeave = () => {
    setHoveredMapCountryCode(null);
    setHoveredCountry(null);
  };

  const selectCountry = (countryCode: string | null) => {
    if (countryCode && countries.some((country) => country.code === countryCode)) {
      setSelectedCountryCode(countryCode);
    }
  };

  return (
    <div className="relative w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 dark:bg-red-500 animate-ping" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-wide uppercase font-mono">
              Regional Operations Map
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Active digital products and data feeds deployed across East & Horn of Africa
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-600 border border-red-400" />
            <span className="text-slate-700 dark:text-slate-300">Active Operational Hub</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-300 dark:bg-slate-800 border border-slate-400 dark:border-slate-700" />
            <span className="text-slate-500 dark:text-slate-500">Muted Landmass</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Interactive Canvas */}
        <div className="lg:col-span-7 relative flex justify-center items-center py-4">
          <div className="relative w-full max-w-[540px] aspect-[4/3]">
            <svg
              viewBox={`0 0 ${mapDimensions.width} ${mapDimensions.height}`}
              className="h-full w-full drop-shadow-xl"
              role="group"
              aria-label="Interactive map of Africa"
            >
              {mapCountries.map((country) => {
                const isOperationalCountry = countries.some((item) => item.code === country.code);
                const isSelected = selectedCountryCode === country.code;
                const isHovered = hoveredMapCountryCode === country.code;

                return (
                  <path
                    key={country.name}
                    d={country.path}
                    fill={isSelected ? "#dc2626" : isHovered ? "#ef4444" : isOperationalCountry ? "#b91c1c" : "#94a3b8"}
                    stroke={isSelected ? "#ffffff" : "#64748b"}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeLinejoin="round"
                    className="cursor-pointer transition-colors duration-150 focus:outline-none"
                    role="button"
                    tabIndex={0}
                    aria-label={`${country.name}${isOperationalCountry ? ", active operational hub" : ""}`}
                    onClick={() => selectCountry(country.code)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectCountry(country.code);
                      }
                    }}
                    onMouseEnter={() => handleCountryMouseEnter(country.code || "")}
                    onMouseLeave={handleCountryMouseLeave}
                  >
                    <title>{country.name}</title>
                  </path>
                );
              })}
            </svg>
            
            {/* Hover Tooltip Overlay */}
            {hoveredCountry && (
              <div className="absolute top-2 left-2 z-20 px-3 py-1.5 rounded-lg bg-slate-900/95 dark:bg-slate-950/95 border border-red-500/40 text-xs font-mono text-white shadow-xl pointer-events-none animate-in fade-in duration-150">
                <span className="font-bold text-red-400">{hoveredCountry.name}</span>
                <span className="block text-[10px] text-slate-300 dark:text-slate-400">
                  {hoveredCountry.activeInitiativesCount} Active Digital Initiatives
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Selected Country Details Side Panel */}
        <div className="lg:col-span-5 space-y-5 bg-slate-50 dark:bg-slate-950/90 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-red-600 dark:text-red-400 uppercase tracking-widest font-bold">
                Selected Country
              </span>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600 dark:text-red-500" />
                <span>{selectedCountry.name}</span>
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
              ISO: {selectedCountry.code}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {selectedCountry.shortDescription}
          </p>

          {/* Statistics Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Activity className="w-4 h-4 text-red-600 dark:text-red-400 mx-auto mb-1" />
              <span className="block text-lg font-black font-mono text-slate-900 dark:text-white">
                {selectedCountry.activeInitiativesCount}
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-medium">
                Initiatives
              </span>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
              <span className="block text-lg font-black font-mono text-slate-900 dark:text-white">
                {selectedCountry.digitalProductsCount}
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-medium">
                Products
              </span>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Database className="w-4 h-4 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
              <span className="block text-lg font-black font-mono text-slate-900 dark:text-white">
                {selectedCountry.dataServicesCount}
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-medium">
                Data Feeds
              </span>
            </div>
          </div>

          {/* Key Initiatives List */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Key Deployed Initiatives
            </span>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {selectedCountry.keyInitiatives.map((item) => (
                <li key={item} className="flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 shrink-0" />
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
