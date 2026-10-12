"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Users,
  Wrench,
  ChevronRight,
  CheckCircle2,
  X,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface StrategicPriority {
  number: string;
  title: string;
  summary: string;
  details: string;
  areas: string[];
  icon: LucideIcon;
  accent: "red" | "blue" | "emerald" | "amber" | "violet" | "cyan";
}

const strategicPriorities: StrategicPriority[] = [
  {
    number: "01",
    title: "Empowered People",
    summary: "Digital transformation starts with people.",
    details:
      "We help staff and volunteers build the confidence, skills and support needed to participate in the organisation's digital transformation journey.",
    areas: ["Digital and data literacy", "Cybersecurity awareness", "Mentorship and peer learning", "Support for digital volunteers"],
    icon: Users,
    accent: "red",
  },
  {
    number: "02",
    title: "Inclusive Digital Systems",
    summary: "Technology should respond to people and context.",
    details:
      "We work towards accessible, usable, inclusive, user-centred and sustainable systems that reflect organisational and community needs.",
    areas: ["User involvement", "Accessibility", "Multiple languages", "Assistive technologies"],
    icon: Wrench,
    accent: "blue",
  },
  {
    number: "03",
    title: "Responsible Data",
    summary: "Collect what is needed. Protect what is collected. Use data responsibly.",
    details:
      "Responsible data use is central to our work because KRCS manages information that may include personal and sensitive data.",
    areas: ["Data governance", "Privacy and protection", "Information management", "Security and access controls"],
    icon: ShieldCheck,
    accent: "emerald",
  },
  {
    number: "04",
    title: "Partnerships & Sustainable Transformation",
    summary: "Digital transformation cannot happen in isolation.",
    details:
      "We collaborate with technology, academic, civil society, government, humanitarian, private-sector and National Society partners.",
    areas: ["Expertise and research", "Funding and technology", "Capacity development", "Partner with us"],
    icon: Handshake,
    accent: "amber",
  },
  {
    number: "05",
    title: "Innovation for Humanitarian Action",
    summary: "Technology can help humanitarian organisations make better-informed decisions.",
    details:
      "We explore data and digital technologies according to their suitability for an identified organisational or humanitarian need.",
    areas: ["Data analytics", "Digital mapping", "Artificial intelligence", "Research and development"],
    icon: Lightbulb,
    accent: "violet",
  },
  {
    number: "06",
    title: "Community-Centred Transformation",
    summary: "Our digital transformation work ultimately exists to support communities.",
    details:
      "Community members and stakeholders should help shape the design and improvement of digital products and services.",
    areas: ["Inclusive digital access", "Participation and feedback", "Accountability", "Co-creation and localisation"],
    icon: BookOpen,
    accent: "cyan",
  },
];

const accentStyles: Record<
  StrategicPriority["accent"],
  {
    bgActive: string;
    borderActive: string;
    badge: string;
    iconActive: string;
    iconInactive: string;
    textActive: string;
    accentBar: string;
    bulletBg: string;
  }
> = {
  red: {
    bgActive: "bg-red-600 dark:bg-red-600 text-white border-red-700 shadow-xl shadow-red-900/30",
    borderActive: "border-red-500 dark:border-red-500",
    badge: "bg-red-700 text-red-100",
    iconActive: "bg-red-500 text-white",
    iconInactive: "bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400",
    textActive: "text-red-600 dark:text-red-400",
    accentBar: "from-red-500 to-rose-600",
    bulletBg: "bg-red-500",
  },
  blue: {
    bgActive: "bg-blue-600 dark:bg-blue-600 text-white border-blue-700 shadow-xl shadow-blue-900/30",
    borderActive: "border-blue-500 dark:border-blue-500",
    badge: "bg-blue-700 text-blue-100",
    iconActive: "bg-blue-500 text-white",
    iconInactive: "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
    textActive: "text-blue-600 dark:text-blue-400",
    accentBar: "from-blue-500 to-indigo-600",
    bulletBg: "bg-blue-500",
  },
  emerald: {
    bgActive: "bg-emerald-600 dark:bg-emerald-600 text-white border-emerald-700 shadow-xl shadow-emerald-900/30",
    borderActive: "border-emerald-500 dark:border-emerald-500",
    badge: "bg-emerald-700 text-emerald-100",
    iconActive: "bg-emerald-500 text-white",
    iconInactive: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    textActive: "text-emerald-600 dark:text-emerald-400",
    accentBar: "from-emerald-500 to-teal-600",
    bulletBg: "bg-emerald-500",
  },
  amber: {
    bgActive: "bg-amber-600 dark:bg-amber-600 text-white border-amber-700 shadow-xl shadow-amber-900/30",
    borderActive: "border-amber-500 dark:border-amber-500",
    badge: "bg-amber-700 text-amber-100",
    iconActive: "bg-amber-500 text-white",
    iconInactive: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400",
    textActive: "text-amber-600 dark:text-amber-400",
    accentBar: "from-amber-500 to-orange-600",
    bulletBg: "bg-amber-500",
  },
  violet: {
    bgActive: "bg-violet-600 dark:bg-violet-600 text-white border-violet-700 shadow-xl shadow-violet-900/30",
    borderActive: "border-violet-500 dark:border-violet-500",
    badge: "bg-violet-700 text-violet-100",
    iconActive: "bg-violet-500 text-white",
    iconInactive: "bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400",
    textActive: "text-violet-600 dark:text-violet-400",
    accentBar: "from-violet-500 to-purple-600",
    bulletBg: "bg-violet-500",
  },
  cyan: {
    bgActive: "bg-cyan-600 dark:bg-cyan-600 text-white border-cyan-700 shadow-xl shadow-cyan-900/30",
    borderActive: "border-cyan-500 dark:border-cyan-500",
    badge: "bg-cyan-700 text-cyan-100",
    iconActive: "bg-cyan-500 text-white",
    iconInactive: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-400",
    textActive: "text-cyan-600 dark:text-cyan-400",
    accentBar: "from-cyan-500 to-teal-600",
    bulletBg: "bg-cyan-500",
  },
};

export function StrategicPriorities() {
  const [activeNumber, setActiveNumber] = useState<string>(strategicPriorities[0].number);

  const activePriority =
    strategicPriorities.find((p) => p.number === activeNumber) ?? strategicPriorities[0];

  const handleSelect = (num: string) => {
    setActiveNumber((prev) => (prev === num ? num : num));
  };

  const handleMobileToggle = (num: string) => {
    setActiveNumber((prev) => (prev === num ? "" : num));
  };

  return (
    <section id="strategic-priorities" className="border-b border-slate-200 bg-white py-14 sm:py-24 dark:border-slate-800 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-10 sm:mb-16 max-w-3xl space-y-3 text-center">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
            Strategic Pillars
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Our Strategic Priorities
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Click on any priority to explore how Kenya Red Cross uses data and digital solutions to strengthen humanitarian action.
          </p>
        </div>

        {/* ── MOBILE LAYOUT (< lg): Accordion style (opens directly below clicked title) ── */}
        <div className="block lg:hidden space-y-3">
          {strategicPriorities.map((priority) => {
            const Icon = priority.icon;
            const isActive = activeNumber === priority.number;
            const style = accentStyles[priority.accent];

            return (
              <div key={priority.number} className="flex flex-col gap-3">
                {/* Minimized Title Button */}
                <button
                  type="button"
                  onClick={() => handleMobileToggle(priority.number)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? style.bgActive
                      : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-sans font-black px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? style.badge
                          : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {priority.number}
                    </span>
                    <div
                      className={`p-2 rounded-xl transition-colors ${
                        isActive ? style.iconActive : style.iconInactive
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold leading-snug">{priority.title}</span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                      isActive ? "rotate-90 text-white" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Mobile Expanded Details — Opens right below the title */}
                {isActive && (
                  <div className="mb-2">
                    <PriorityDetailCard
                      priority={priority}
                      onClose={() => setActiveNumber("")}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── DESKTOP LAYOUT (>= lg): 2 Columns ──
            Left Column: Extra-minimized title cards
            Right Column: Active priority details panel
        */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column (5 cols): Minimized Title Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3">
            {strategicPriorities.map((priority) => {
              const Icon = priority.icon;
              const isActive = activeNumber === priority.number;
              const style = accentStyles[priority.accent];

              return (
                <button
                  key={priority.number}
                  type="button"
                  onClick={() => handleSelect(priority.number)}
                  className={`group relative flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? `${style.bgActive} scale-[1.01]`
                      : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 shadow-sm text-slate-900 dark:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Number Badge */}
                    <span
                      className={`text-xs font-sans font-black px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? style.badge
                          : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {priority.number}
                    </span>

                    {/* Icon */}
                    <div
                      className={`p-2.5 rounded-xl transition-colors ${
                        isActive ? style.iconActive : style.iconInactive
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Title */}
                    <div>
                      <p className="text-sm font-bold leading-snug">{priority.title}</p>
                      <p
                        className={`text-xs mt-0.5 line-clamp-1 ${
                          isActive ? "text-slate-100" : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {priority.summary}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                      isActive ? "translate-x-1 text-white" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column (7 cols): Active Priority Detailed Card */}
          <div className="lg:col-span-7 sticky top-28">
            {activePriority ? (
              <PriorityDetailCard priority={activePriority} onClose={() => setActiveNumber("")} />
            ) : (
              <div className="rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400">
                Select a strategic priority from the left to view detailed information.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

{/* ── Detailed Priority Card Component ── */}
function PriorityDetailCard({
  priority,
  onClose,
}: {
  priority: StrategicPriority;
  onClose: () => void;
}) {
  const Icon = priority.icon;
  const style = accentStyles[priority.accent];

  return (
    <div className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-300">


      <div className="p-6 sm:p-8 lg:p-10 space-y-6">

        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className={`text-2xl sm:text-3xl font-black font-sans ${style.textActive}`}>
              {priority.number}
            </span>
            <div className={`rounded-2xl p-3 ${style.iconInactive}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-slate-400">
                Priority Area
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {priority.title}
              </h3>
            </div>
          </div>

          {/* Close / Collapse button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close detail"
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Summary Statement */}
        <p className={`text-base sm:text-lg font-bold italic leading-relaxed pl-4 border-l-4 ${style.textActive} border-slate-300 dark:border-slate-700`}>
          &quot;{priority.summary}&quot;
        </p>

        {/* Detailed Explanation */}
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {priority.details}
        </p>

        {/* Strategic Focus Areas */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
            Key Strategic Focus Areas
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {priority.areas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${style.textActive}`} />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
