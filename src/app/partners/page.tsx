import { partners } from "@/data/partners";
import { projects } from "@/data/projects";
import { Handshake, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners & Collaborations | Kenya Red Cross Digital",
  description:
    "Explore our strategic, technology, funding, and implementation partnerships across global humanitarian and tech ecosystems.",
};

export default function PartnersPage() {
  const categories = ["Strategic", "Technology", "Implementation", "Funding"] as const;

  return (
    <div className="pt-28 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Hero Section with lowered opacity hands1.jpg background */}
      <section className="relative py-20 md:py-28 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
        {/* Background Image hands1.jpg with lowered opacity */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/distro/hands1.jpg"
            alt="Humanitarian Technology & Field Operations"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-100 dark:opacity-100"
          />
          {/* Light mode: white washes; Dark mode: slate-950 overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/10 dark:from-slate-950 dark:via-slate-950/60 dark:to-slate-950/20 transition-colors duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80 dark:from-slate-950 dark:via-transparent dark:to-slate-950/70 transition-colors duration-300" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-950/90 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/70 shadow-md backdrop-blur-md w-fit">
            <Handshake className="w-4 h-4" /> Global Collaborations
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Partners in transformation.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-200 max-w-3xl leading-relaxed">
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
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="w-3 h-3 rounded-full bg-red-600 dark:bg-red-500" />
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
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
                        className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between shadow-sm"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-slate-50 dark:bg-slate-950 text-red-600 dark:text-red-400 border border-slate-200 dark:border-slate-800">
                              {partner.category} Partner
                            </span>
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                            >
                              <span>Official Site</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>

                          <div className="relative h-28 w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-white p-3 border border-slate-200 dark:border-transparent">
                            <Image
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-contain"
                            />
                          </div>

                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {partner.name}
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {partner.description}
                          </p>

                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-xs font-mono">
                            <span className="text-slate-500 block mb-0.5">Collaboration Focus:</span>
                            <span className="text-red-600 dark:text-red-400 font-bold">{partner.collaborationFocus}</span>
                          </div>
                        </div>

                        {/* Related Projects */}
                        {relatedProjects.length > 0 && (
                          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                              Joint Projects
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {relatedProjects.map((rp) => (
                                <Link
                                  key={rp.id}
                                  href={`/portfolio/${rp.slug}`}
                                  className="px-2.5 py-1 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-950 text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 transition-colors border border-slate-200 dark:border-slate-700/60 inline-flex items-center gap-1"
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
