import { Handshake, Globe, ShieldCheck, Sparkles, Coins, ArrowRight, Building2, Layers, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PartnerMarquee } from "@/components/partners/PartnerMarquee";
import { PartnersShowcase } from "@/components/partners/PartnersShowcase";
import { getPartners } from "@/lib/frappe/partners";
import { getProjects } from "@/lib/frappe/projects";

export const metadata: Metadata = {
  title: "Our Partners | Building the Digital Ecosystem Together | Kenya Red Cross Digital",
  description:
    "We collaborate with organisations that contribute to data, technology, research, innovation, funding and capacity development to sustain digital transformation.",
};

const stats = [
  { icon: Globe, value: "47 Counties", label: "Operational Reach", color: "text-red-500" },
  { icon: Coins, value: "1M+ Transfers", label: "Aid Disbursements", color: "text-emerald-500" },
  { icon: ShieldCheck, value: "100K+ Responders", label: "Managed via VMMS", color: "text-blue-500" },
  { icon: Sparkles, value: "9 Partners", label: "Global Ecosystem", color: "text-amber-500" },
];

const collaborationAreas = [
  { label: "Data & Analytics", icon: Layers },
  { label: "Emerging Tech", icon: Building2 },
  { label: "Research & Evidence", icon: Sparkles },
  { label: "Innovation & Pilots", icon: Globe },
  { label: "Funding & Support", icon: Coins },
  { label: "Capacity Building", icon: HeartHandshake },
];

export default async function PartnersPage() {
  const partners = await getPartners();
  const projects = await getProjects();

  return (
    <div className="pt-25 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">

      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300 border-b border-slate-200/80 dark:border-slate-800/80">

        {/* Dark mode only: full-bleed background image + gradient overlays */}
        <div className="absolute inset-0 z-0 hidden dark:block">
          <Image
            src="/assets/images/dt_updates/hunger.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
        </div>

        {/* Light mode only: decorative radial blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 w-[600px] h-[600px] dark:hidden translate-x-1/3 -translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(238,36,53,0.12) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 bottom-0 w-[400px] h-[400px] dark:hidden -translate-x-1/3 translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

            {/* ── Left: Text content ── */}
            <div className="flex-1 space-y-7">
              {/* Label / Badge */}
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/80 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/70 shadow-sm backdrop-blur-md w-fit">
                <Handshake className="w-4 h-4 text-red-600 dark:text-red-400" /> Our Partners
              </span>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
                Building the Digital{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-red-600 dark:text-red-500">Ecosystem Together.</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-3 rounded-full opacity-20 bg-red-400 dark:bg-red-600 blur-sm"
                  />
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                We collaborate with organisations that contribute to data, technology, research, innovation, funding and capacity development.
              </p>

              {/* Strategy Statement Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-50/80 via-white to-slate-50 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-red-950/30 border border-red-200/80 dark:border-red-900/40 shadow-lg relative overflow-hidden backdrop-blur-md">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-red-600 text-white shrink-0 shadow-md">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                      Strategic Collaboration Framework
                    </span>
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Our strategy identifies collaboration with National Societies, private-sector organisations, academic institutions and civil society as important to sustaining digital transformation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Inline stats row */}
              <div className="flex flex-wrap gap-6 pt-2">
                {stats.map(({ icon: Icon, value, label, color }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <div>
                      <span className="block text-sm font-black text-slate-900 dark:text-white">{value}</span>
                      <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400">{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Image square — light mode image preview ── */}
            <div className="block dark:hidden lg:flex-shrink-0 lg:w-[420px] xl:w-[480px] w-full">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                <Image
                  src="/assets/images/dt_updates/hunger.jpg"
                  alt="Kenya Red Cross Digital Partners & Collaboration"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Scrolling logo marquee ──────────────────────────── */}
      <PartnerMarquee partners={partners} />

      {/* ── Animated Partner Cards ─────────────────────────── */}
      <PartnersShowcase partners={partners} projects={projects} />

      {/* ── Partner With Kenya Red Cross CTA Section ───────── */}
      <section id="partner-cta" className="py-20 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden transition-colors">
        {/* Decorative Background Gradients */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(238,36,53,0.8) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-slate-800/80 dark:bg-slate-900/90 border border-slate-700/80 dark:border-slate-800 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-400 bg-red-950/80 px-3.5 py-1.5 rounded-full border border-red-800/70 shadow-sm">
                <Sparkles className="w-4 h-4 text-red-400" /> Collaboration Opportunity
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Partner With Kenya Red Cross
              </h2>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
                If your organisation is interested in collaboration around data, technology, research, innovation or digital capacity development, get in touch with the Data and Digital Transformation team.
              </p>

              {/* Collaboration Focus Badges */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {collaborationAreas.map((item) => {
                  const Icon = item.icon;
                  return (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-xs font-mono text-slate-300"
                    >
                      <Icon className="w-3.5 h-3.5 text-red-400" />
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Right Action Button */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 items-stretch lg:items-end justify-center">
              <Link
                href="/contact?type=partner#partnering"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white bg-red-600 hover:bg-red-500 active:scale-95 transition-all shadow-xl shadow-red-600/30 group text-center"
              >
                <span>Get in Touch to Partner</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <span className="text-xs font-mono text-slate-400 text-center lg:text-right">
                Direct submissions logged to Frappe & MariaDB
              </span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
