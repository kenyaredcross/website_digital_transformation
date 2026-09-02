import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { siteConfig } from "@/data/site";
import { mainNav } from "@/data/navigation";
import { ExternalLink, Mail, Phone, MapPin, Heart, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner */}
      <div className="bg-red-700/90 text-white py-4 px-4 text-center text-xs sm:text-sm font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded text-[11px]">
            <Heart className="w-3.5 h-3.5 fill-current" /> Humanitarian Innovation
          </span>
          <span>Digital solutions powering Kenya Red Cross operations across 47 counties.</span>
          <a
            href={siteConfig.officialRedCrossUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-red-100 flex items-center gap-1 font-semibold"
          >
            Main Red Cross Site <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <BrandLogo variant="light" size="lg" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              The Digital Transformation Department drives technology adoption, spatial intelligence, AI, and data analytics across Kenya Red Cross Society interventions—transforming humanitarian action from reactive relief to anticipatory resilience.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.location}, {siteConfig.contact.city}, {siteConfig.contact.country}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>Emergency Hotline: <strong className="text-red-400 font-mono">{siteConfig.contact.emergencyLine}</strong></span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-red-500 pl-3">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {mainNav.map((nav) => (
                <li key={nav.href}>
                  <Link
                    href={nav.href}
                    className="text-slate-400 hover:text-red-400 transition-colors inline-block"
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-red-400 transition-colors inline-block"
                >
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Thematic Focus */}
          <div className="space-y-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-red-500 pl-3">
              Thematic Areas
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/what-we-do/digital-products" className="text-slate-400 hover:text-red-400 transition-colors">
                  Digital Products & Platforms
                </Link>
              </li>
              <li>
                <Link href="/what-we-do/data-services" className="text-slate-400 hover:text-red-400 transition-colors">
                  Data Services & Analytics
                </Link>
              </li>
              <li>
                <Link href="/what-we-do/gis-spatial" className="text-slate-400 hover:text-red-400 transition-colors">
                  GIS & Spatial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/what-we-do/innovation-ai" className="text-slate-400 hover:text-red-400 transition-colors">
                  Innovation & AI for Good
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Governance & Social */}
          <div className="space-y-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-red-500 pl-3">
              Connect & Ethics
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We adhere strictly to humanitarian data protection principles, non-discrimination, and ethical open-source standards.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISO & IFRC Data Compliant</span>
            </div>

            <div className="pt-3">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Official Red Cross Links
              </span>
              <a
                href={siteConfig.officialRedCrossUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 underline font-medium"
              >
                www.redcross.or.ke
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Kenya Red Cross Society — Digital Transformation Department.</p>
          <div className="flex items-center gap-6">
            <span>Built for humanitarian impact</span>
            <span className="inline-block w-1 h-1 rounded-full bg-slate-700" />
            <Link href="/contact" className="hover:text-slate-300">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
