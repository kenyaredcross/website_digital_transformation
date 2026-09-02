import { AfricaMap } from "@/components/geography/AfricaMap";
import { countries } from "@/data/countries";
import { MapPin, Globe2, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Where We Work | Regional Reach & Geographic Operations",
  description:
    "Interactive map and country breakdown of Kenya Red Cross Digital Transformation operations across 47 Kenyan counties and East Africa.",
};

export default function WhereWeWorkPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-slate-800 bg-grid-pattern opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500 bg-red-950/80 px-3 py-1 rounded border border-red-800/60 flex items-center gap-2 w-fit">
            <Globe2 className="w-4 h-4" /> Geographic Footprint
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Our reach.
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Digital transformation supporting humanitarian action across 47 Kenyan counties and 8 East & Horn of Africa nations.
          </p>
        </div>
      </section>

      {/* Interactive Map Showcase */}
      <section className="py-16 border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AfricaMap isCompact={true} />
        </div>
      </section>

      {/* Country Breakdown Cards Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                Active Operational Hubs
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
                Country Operations Directory
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Hover over or click individual country records below to review local initiatives and data feeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country) => (
              <div
                key={country.id}
                className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-red-500" />
                      <h3 className="text-2xl font-bold text-white">
                        {country.name}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-slate-800 text-red-400 border border-slate-700">
                      {country.code}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-400 block mb-4">
                    Region: {country.region}
                  </span>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {country.shortDescription}
                  </p>

                  {/* Quantitative Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center mb-6">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="block text-base font-black font-mono text-white">
                        {country.activeInitiativesCount}
                      </span>
                      <span className="text-[9px] text-slate-400 block font-medium">
                        Initiatives
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="block text-base font-black font-mono text-red-400">
                        {country.digitalProductsCount}
                      </span>
                      <span className="text-[9px] text-slate-400 block font-medium">
                        Products
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="block text-base font-black font-mono text-blue-400">
                        {country.dataServicesCount}
                      </span>
                      <span className="text-[9px] text-slate-400 block font-medium">
                        Data Feeds
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Initiatives */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Key Deployed Initiatives
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {country.keyInitiatives.slice(0, 3).map((init) => (
                      <li key={init} className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="truncate">{init}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
