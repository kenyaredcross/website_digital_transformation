import { Navigation } from "lucide-react";

const MAP_EMBED_URL = "https://maps.google.com/maps?q=Kenya+Red+Cross+Society+Headquarters,+South+C+(Bellevue),+Red+Cross+Road,+off+Popo+Road,+Nairobi,+Kenya&t=&z=16&ie=UTF8&iwloc=&output=embed";
const DIRECTIONS_URL = "https://www.google.com/maps/search/?api=1&query=Kenya+Red+Cross+Society+Headquarters+South+C+Nairobi";

export function ContactMap() {
  return (
    <section className="py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div><h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Visit Our Headquarters</h2><p className="text-sm text-slate-600 dark:text-slate-400">South C (Bellevue), Red Cross Road, Nairobi</p></div>
          <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md w-fit"><Navigation className="w-4 h-4" /><span>Get Directions</span></a>
        </div>
        <div className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl"><iframe src={MAP_EMBED_URL} title="Kenya Red Cross Headquarters Location Map" className="w-full h-full border-0" allowFullScreen loading="lazy" /></div>
      </div>
    </section>
  );
}
