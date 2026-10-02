import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import type { SiteConfig } from "@/types";

export function ContactInformation({ siteConfig }: { siteConfig: SiteConfig }) {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-2xl transition-colors duration-300">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Contact Information</h2>
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" /><div><span className="block font-bold text-slate-900 dark:text-white">Headquarters</span><span className="text-xs text-slate-500 dark:text-slate-400">{siteConfig.contact.location}, {siteConfig.contact.city}, {siteConfig.contact.country}</span></div></div>
          <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" /><div><span className="block font-bold text-slate-900 dark:text-white">Digital Team Email</span><a href={`mailto:${siteConfig.contact.email}`} className="text-xs text-red-600 dark:text-red-400 hover:underline">{siteConfig.contact.email}</a></div></div>
          <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" /><div><span className="block font-bold text-slate-900 dark:text-white">Emergency Toll Free</span><span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Hotline: {siteConfig.contact.emergencyLine}</span></div></div>
          <div className="flex items-start gap-3"><Clock className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" /><div><span className="block font-bold text-slate-900 dark:text-white">Working Hours</span><span className="text-xs text-slate-500 dark:text-slate-400">{siteConfig.contact.workingHours}</span></div></div>
        </div>
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300"><ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /><span>Kenya Red Cross Society Authorized Portal</span></div>
      </div>
    </div>
  );
}
