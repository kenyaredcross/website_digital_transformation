import { PortfolioFilterableGrid } from "@/components/portfolio/PortfolioFilterableGrid";
import { Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Portfolio | Kenya Red Cross Society",
  description:
    "Explore our full directory of digital products, platforms, early warning systems, and data services built for humanitarian action.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-950 text-white min-h-screen">
      {/* Hero Header */}
      <section className="py-16 md:py-24 border-b border-slate-800 bg-grid-pattern opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500 bg-red-950/80 px-3 py-1 rounded border border-red-800/60 flex items-center gap-2 w-fit">
            <Layers className="w-4 h-4" /> Innovation Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Our digital portfolio.
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Explore the digital products, platforms, mobile tools, and data services developed to transform humanitarian operations across Kenya and the region.
          </p>
        </div>
      </section>

      {/* Main Filterable Portfolio Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioFilterableGrid />
        </div>
      </section>
    </div>
  );
}
