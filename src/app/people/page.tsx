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
    <div className="pt-28 pb-20 bg-slate-950 text-white min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-slate-800 bg-grid-pattern opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500 bg-red-950/80 px-3 py-1 rounded border border-red-800/60 flex items-center gap-2 w-fit">
            <Users className="w-4 h-4" /> Team & Contributors
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            The people behind the work.
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
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
