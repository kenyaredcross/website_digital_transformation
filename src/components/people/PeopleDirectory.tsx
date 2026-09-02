"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { people } from "@/data/people";
import { Search, Filter, ArrowRight } from "lucide-react";

export function PeopleDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");

  const departments = [
    "All",
    ...Array.from(new Set(people.map((p) => p.department))),
  ];

  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      if (selectedDepartment !== "All" && person.department !== selectedDepartment) {
        return false;
      }

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = person.name.toLowerCase().includes(q);
        const matchRole = person.role.toLowerCase().includes(q);
        const matchExpertise = person.expertise.some((e) => e.toLowerCase().includes(q));

        if (!matchName && !matchRole && !matchExpertise) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDepartment]);

  return (
    <div className="space-y-10">
      {/* Search & Department Filters */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search team member by name, role, or skill (e.g. Next.js, GIS, AI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-medium"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-red-500 font-mono"
            >
              <option value="All">All Departments / Specializations</option>
              {departments.filter((d) => d !== "All").map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Department:
          </span>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedDepartment === dept
                  ? "bg-red-600 text-white font-bold shadow"
                  : "bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredPeople.map((person) => (
          <div
            key={person.id}
            className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              {/* Graphic Avatar Box */}
              <div className="relative w-full aspect-square rounded-xl bg-slate-950 border border-slate-800 mb-6 flex items-center justify-center group-hover:border-red-500/30 transition-colors">
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-red-950 text-red-400 border border-red-800 font-mono font-black text-2xl flex items-center justify-center mx-auto mb-2">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    {person.department}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                {person.name}
              </h3>

              <p className="text-xs font-mono font-semibold text-red-400 mb-3">
                {person.role}
              </p>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                {person.shortBio}
              </p>
            </div>

            {/* Expertise & Links */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {person.expertise.slice(0, 3).map((exp) => (
                  <span
                    key={exp}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                  >
                    {exp}
                  </span>
                ))}
              </div>

              <Link
                href={`/people/${person.slug}`}
                className="w-full flex items-center justify-between text-xs font-bold text-white hover:text-red-400 pt-2 border-t border-slate-800/60 transition-colors"
              >
                <span>View Full Profile & Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
