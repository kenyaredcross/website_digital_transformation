import { partners } from "@/data/partners";
import { projects } from "@/data/projects";
import { Handshake, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners & Collaborations | Kenya Red Cross Digital",
  description:
    "Explore our strategic, technology, funding, and implementation partnerships across global humanitarian and tech ecosystems.",
};

export default function PartnersPage() {
  const categories = ["Strategic", "Technology", "Implementation", "Funding"] as const;

  return (
    <div className="pt-28 pb-20 bg-slate-950 text-white min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-slate-800 bg-grid-pattern opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500 bg-red-950/80 px-3 py-1 rounded border border-red-800/60 flex items-center gap-2 w-fit">
            <Handshake className="w-4 h-4" /> Global Collaborations
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Partners in transformation.
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Collaborating with global tech pioneers, UN agencies, research institutions, and telecommunications networks to scale digital humanitarian impact.
          </p>
        </div>
      </section>

      {/* Partners Categorized Breakdown */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {categories.map((cat) => {
            const categoryPartners = partners.filter((p) => p.category === cat);
            if (categoryPartners.length === 0) return null;

            return (
              <div key={cat} className="space-y-8">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <h2 className="text-2xl font-extrabold text-white uppercase font-mono tracking-wider">
                    {cat} Partners
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {categoryPartners.map((partner) => {
                    const relatedProjects = projects.filter((p) =>
                      p.partnerIds?.includes(partner.id)
                    );

                    return (
                      <div
                        key={partner.id}
                        className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-slate-950 text-red-400 border border-slate-800">
                              {partner.category} Partner
                            </span>
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                            >
                              <span>Official Site</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>

                          <h3 className="text-2xl font-bold text-white">
                            {partner.name}
                          </h3>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            {partner.description}
                          </p>

                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono">
                            <span className="text-slate-500 block mb-0.5">Collaboration Focus:</span>
                            <span className="text-red-400 font-bold">{partner.collaborationFocus}</span>
                          </div>
                        </div>

                        {/* Related Projects */}
                        {relatedProjects.length > 0 && (
                          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                              Joint Projects
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {relatedProjects.map((rp) => (
                                <Link
                                  key={rp.id}
                                  href={`/portfolio/${rp.slug}`}
                                  className="px-2.5 py-1 rounded text-xs font-mono bg-slate-800 hover:bg-red-950 text-slate-200 hover:text-red-400 transition-colors border border-slate-700/60 inline-flex items-center gap-1"
                                >
                                  <span>{rp.title}</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
