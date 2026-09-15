import Image from "next/image";
import { PeopleDirectory } from "@/components/people/PeopleDirectory";
import { getPeople } from "@/lib/get-data";
import { Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "People & Innovators | Kenya Red Cross Digital Transformation",
  description:
    "Meet the software engineers, data scientists, GIS specialists, and field innovation officers behind Kenya Red Cross digital solutions.",
};

export default function PeoplePage() {
  const initialPeople = getPeople();

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
            className="object-cover object-center opacity-0 dark:opacity-100"
          />
          {/* Light mode: white washes; Dark mode: slate-950 overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/10 dark:from-slate-950 dark:via-slate-950/60 dark:to-slate-950/20 transition-colors duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80 dark:from-slate-950 dark:via-transparent dark:to-slate-950/70 transition-colors duration-300" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-950/90 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/70 shadow-md backdrop-blur-md w-fit">
            <Users className="w-4 h-4" /> Team & Contributors
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            The people behind the work.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-200 max-w-3xl leading-relaxed">
            Technology is built by people. Meet the team, contributors, and field innovators behind our digital transformation work.
          </p>
        </div>
      </section>

      {/* Directory Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PeopleDirectory initialPeople={initialPeople} />
        </div>
      </section>
    </div>
  );
}
