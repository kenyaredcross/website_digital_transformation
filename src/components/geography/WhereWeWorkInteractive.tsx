"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Country } from "@/types";
import { MapPin, CheckCircle2, Image as ImageIcon, Filter } from "lucide-react";

interface WhereWeWorkInteractiveProps {
  countries: Country[];
}

const countryImageMap: Record<string, string> = {
  KE: "/assets/images/distro/hands1.jpg",
  UG: "/assets/images/distro/lake2.jpg",
  TZ: "/assets/images/dt_updates/meeting.jpg",
  SO: "/assets/images/dt_updates/hunger.jpg",
  ET: "/assets/images/distro/lake4.jpg",
  SS: "/assets/images/distro/lake1.jpg",
  RW: "/assets/images/distro/presentation2.jpg",
  CD: "/assets/images/distro/presentation3.jpg",
  GM: "/assets/images/distro/presentation4.jpg",
  ZA: "/assets/images/distro/presentation5.jpg",
};

const fieldGalleryItems = [
  {
    id: "g1",
    title: "Tana River Early Warning & Drone Survey",
    location: "Garissa & Tana River, Kenya",
    category: "Flood Response",
    image: "/assets/images/distro/lake2.jpg",
    description: "Real-time river level monitoring and aerial survey for anticipatory cash assistance.",
  },
  {
    id: "g2",
    title: "Community Health Surveillance Training",
    location: "Turkana County, Kenya",
    category: "Surveillance",
    image: "/assets/images/dt_updates/teaching.jpg",
    description: "Frontline volunteers trained on mobile alert verification and disease telemetry.",
  },
  {
    id: "g3",
    title: "Regional Disaster Coordination Summit",
    location: "Nairobi Regional Hub",
    category: "Localization",
    image: "/assets/images/dt_updates/meeting.jpg",
    description: "National societies convening to standardize open-source humanitarian platforms.",
  },
  {
    id: "g4",
    title: "Mobile Cash & Aid Distribution",
    location: "Dadaab & Horn of Africa",
    category: "Cash Aid",
    image: "/assets/images/distro/presentation2.jpg",
    description: "Verifying aid recipients via digital tablets for automated mobile money transfers.",
  },
];

export function WhereWeWorkInteractive({ countries }: WhereWeWorkInteractiveProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const regions = ["All", ...Array.from(new Set(countries.map((c) => c.region)))];

  const filteredCountries = countries.filter(
    (c) => selectedRegion === "All" || c.region === selectedRegion
  );

  return (
    <div className="space-y-24">
      {/* Region Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            Filter Operations Region:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                selectedRegion === region
                  ? "bg-red-600 text-white font-bold shadow-md shadow-red-600/20"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Country Cards Grid with Animated Images & Motion */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredCountries.map((country, idx) => {
            const imgUrl = countryImageMap[country.code] || "/assets/images/distro/hands1.jpg";

            return (
              <motion.div
                key={country.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:shadow-red-600/5"
              >
                <div>
                  {/* Country Image Banner with Pulsing Live Status */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={imgUrl}
                      alt={`${country.name} operations`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Code & Region Overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950/80 text-white border border-slate-700/80 backdrop-blur-md flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {country.code}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-red-950/80 text-red-300 border border-red-800/80 backdrop-blur-md">
                        {country.region}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 z-10">
                      <h3 className="text-2xl font-black text-white flex items-center gap-2 drop-shadow-md">
                        <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                        {country.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-5">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[50px]">
                      {country.shortDescription}
                    </p>

                    {/* Animated Stats Badges */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 group-hover:border-red-500/20 transition-colors">
                        <span className="block text-base font-black font-mono text-slate-900 dark:text-white">
                          {country.activeInitiativesCount}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 block uppercase">
                          Initiatives
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 group-hover:border-red-500/20 transition-colors">
                        <span className="block text-base font-black font-mono text-red-600 dark:text-red-400">
                          {country.digitalProductsCount}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 block uppercase">
                          Products
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 group-hover:border-red-500/20 transition-colors">
                        <span className="block text-base font-black font-mono text-blue-600 dark:text-blue-400">
                          {country.dataServicesCount}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 block uppercase">
                          Data Feeds
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Deployed Initiatives List */}
                <div className="p-6 pt-0 border-t border-slate-200 dark:border-slate-800/80 mt-2 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block pt-4">
                    Key Deployed Systems
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {country.keyInitiatives.slice(0, 3).map((init) => (
                      <li key={init} className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 dark:text-red-500 shrink-0" />
                        <span className="truncate">{init}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Field Operations Visual Showcase Gallery */}
      <div className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Visual Evidence & Field Action
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Frontline Operations Gallery
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Documented footage of tech deployments, drone survey mapping, and digital cash verification across active field sites.
          </p>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {fieldGalleryItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="group rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-108 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-red-600/90 text-white backdrop-blur-md">
                  {item.category}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" /> {item.location}
                </span>
                <h4 className="text-base font-bold text-white leading-snug group-hover:text-red-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
