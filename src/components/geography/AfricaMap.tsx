"use client";

import { useState, useEffect, useRef } from "react";
import { africaGeoJSON } from "african-countries";
import { countries } from "@/data/countries";
import { Country } from "@/types";
import {
  MapPin,
  ArrowRight,
  Activity,
  Layers,
  Database,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Target,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

export function AfricaMap({ isCompact = false }: { isCompact?: boolean }) {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("KE");
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
  const [hoveredMapCountryCode, setHoveredMapCountryCode] = useState<string | null>(null);

  // Zoom and Pan State
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Animation Stage: 'flag' -> 'details'
  const [animStage, setAnimStage] = useState<"flag" | "details">("details");
  const [flagPathIndex, setFlagPathIndex] = useState<number>(0);
  const [hasFlagError, setHasFlagError] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedCountry = countries.find((c) => c.code === selectedCountryCode) || countries[0];
  const flagCandidates = getFlagCandidates(selectedCountry);
  const currentFlagSrc = flagCandidates[flagPathIndex] || flagCandidates[0];

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
      if (timerRef.current) clearTimeout(timerRef.current);
      setSelectedCountryCode(countryCode);
      setFlagPathIndex(0);
      setHasFlagError(false);
      setAnimStage("flag");

      // Auto breakaway after 1800ms for a relaxed, clear hold on the flag
      timerRef.current = setTimeout(() => {
        setAnimStage("details");
      }, 1800);
    }
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.6, 4.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.6, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Quick preset button to easily target Gambia (West Africa)
  const handleFocusGambia = () => {
    selectCountry("GM");
    setZoomLevel(3.2);
    setPanOffset({ x: 180, y: 120 });
  };

  // Dragging / Panning handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      const dx = (e.clientX - dragStart.x) * (mapDimensions.width / 540 / zoomLevel);
      const dy = (e.clientY - dragStart.y) * (mapDimensions.height / 405 / zoomLevel);
      setPanOffset((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleImageError = () => {
    if (flagPathIndex < flagCandidates.length - 1) {
      setFlagPathIndex((prev) => prev + 1);
    } else {
      setHasFlagError(true);
    }
  };

  // Dynamic ViewBox Calculation based on Zoom & Pan
  const viewBoxWidth = mapDimensions.width / zoomLevel;
  const viewBoxHeight = mapDimensions.height / zoomLevel;
  const centerX = mapDimensions.width / 2;
  const centerY = mapDimensions.height / 2;

  const maxPanX = (mapDimensions.width - viewBoxWidth) / 2;
  const maxPanY = (mapDimensions.height - viewBoxHeight) / 2;

  const clampedPanX = Math.max(-maxPanX, Math.min(maxPanX, panOffset.x));
  const clampedPanY = Math.max(-maxPanY, Math.min(maxPanY, panOffset.y));

  const viewBoxX = centerX - viewBoxWidth / 2 - clampedPanX;
  const viewBoxY = centerY - viewBoxHeight / 2 - clampedPanY;

  const dynamicViewBox = `${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`;

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
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center py-4 select-none">
          {/* Top Quick Target Bar */}
          <div className="w-full max-w-[540px] flex items-center justify-between mb-2 px-1 text-xs">
           
            {zoomLevel > 1 && (
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 animate-pulse">
                Click & drag canvas to pan
              </span>
            )}
          </div>

          <div
            className="relative w-full max-w-[540px] aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-slate-200/60 dark:ring-slate-800/60 bg-slate-50/50 dark:bg-slate-950/50"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
          >
            {/* Floating Zoom Control Panel */}
            <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 dark:bg-slate-950/95 border border-slate-700/80 shadow-2xl text-white backdrop-blur-md">
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 4.5}
                className="p-1.5 rounded-lg hover:bg-slate-800 active:scale-95 disabled:opacity-30 transition-all text-slate-200 hover:text-white"
                title="Zoom In (+)"
                aria-label="Zoom in map"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono font-bold px-1.5 text-red-400 min-w-[34px] text-center">
                {zoomLevel.toFixed(1)}x
              </span>
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-1.5 rounded-lg hover:bg-slate-800 active:scale-95 disabled:opacity-30 transition-all text-slate-200 hover:text-white"
                title="Zoom Out (-)"
                aria-label="Zoom out map"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                disabled={zoomLevel === 1 && panOffset.x === 0 && panOffset.y === 0}
                className="p-1.5 rounded-lg hover:bg-slate-800 active:scale-95 disabled:opacity-30 transition-all text-slate-200 hover:text-white border-l border-slate-700/80 pl-2"
                title="Reset Zoom & Pan"
                aria-label="Reset map zoom"
              >
                <RotateCcw className="w-4 h-4 text-slate-300 hover:text-red-400" />
              </button>
            </div>

            <svg
              viewBox={dynamicViewBox}
              className="h-full w-full drop-shadow-xl transition-all duration-300 ease-out"
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
                    strokeWidth={isSelected ? 2 / Math.sqrt(zoomLevel) : 1 / Math.sqrt(zoomLevel)}
                    strokeLinejoin="round"
                    className="cursor-pointer transition-colors duration-150 focus:outline-none"
                    role="button"
                    tabIndex={0}
                    aria-label={`${country.name}${isOperationalCountry ? ", active operational hub" : ""}`}
                    onClick={(e) => {
                      // Don't trigger click selection if user was dragging map
                      if (!isDragging) {
                        selectCountry(country.code);
                      }
                    }}
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

        {/* Selected Country Details Side Panel (lg:col-span-5) with Two-Stage Framer Motion Animation */}
        <div className="lg:col-span-5 min-h-[420px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {animStage === "flag" ? (
              <motion.div
                key={`${selectedCountryCode}-flag`}
                initial={{ opacity: 0, scale: 0.88, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5 } }}
                exit={{
                  opacity: 0,
                  scale: 1.4,
                  filter: "blur(14px)",
                  transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
                }}
                onClick={() => setAnimStage("details")}
                className="relative cursor-pointer p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 ring-1 ring-slate-200 dark:ring-slate-800/80 shadow-2xl shadow-slate-300/40 dark:shadow-red-950/30 backdrop-blur-md space-y-4 overflow-hidden group"
              >
                {/* Stage 1 Header */}
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-500 animate-ping" />
                    <span className="text-[10px] font-mono font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">
                      Target Operational Hub
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {selectedCountry.code}
                  </span>
                </div>

                {/* Flag Card Frame */}
                <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800 bg-slate-100 dark:bg-slate-900 flex items-center justify-center shadow-inner">
                  {!hasFlagError ? (
                    <Image
                      src={currentFlagSrc}
                      alt={`${selectedCountry.name} Flag`}
                      fill
                      priority
                      loading="eager"
                      sizes="(max-width: 1024px) 100vw, 480px"
                      unoptimized={currentFlagSrc.startsWith("http")}
                      onError={handleImageError}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <span className="text-4xl font-black font-mono tracking-wider text-red-600 dark:text-red-500">
                        {selectedCountry.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 mt-1">
                        {selectedCountry.name}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-4">
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                      <h4 className="text-2xl font-black tracking-tight">{selectedCountry.name}</h4>
                    </div>
                  </div>
                </div>

                {/* Telemetry Progress Bar & Skip Hint */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 font-medium text-red-600 dark:text-red-400">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" /> Fetching Hub Data...
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">Click to reveal</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.8, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`${selectedCountryCode}-details`}
                initial={{ opacity: 0, scale: 0.9, y: 18, filter: "blur(8px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                }}
                className="space-y-5 bg-slate-50 dark:bg-slate-950/90 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-red-950/20 ring-1 ring-slate-200/50 dark:ring-slate-800/80"
              >
                {/* Details Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-red-600 dark:text-red-400 uppercase tracking-widest font-bold">
                      Selected Country
                    </span>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
                      <span>{selectedCountry.name}</span>
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {!hasFlagError && (
                      <div className="relative w-7 h-5 rounded overflow-hidden border border-slate-300 dark:border-slate-700 shadow-sm shrink-0">
                        <Image
                          src={currentFlagSrc}
                          alt={`${selectedCountry.name} flag icon`}
                          fill
                          sizes="28px"
                          unoptimized={currentFlagSrc.startsWith("http")}
                          onError={handleImageError}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                      ISO: {selectedCountry.code}
                    </span>
                  </div>
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
