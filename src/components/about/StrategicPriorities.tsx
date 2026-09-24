"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

interface StrategicPriority {
  number: string;
  title: string;
  summary: string;
  details: string;
  areas: string[];
  icon: LucideIcon;
  accent: string;
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

const accentStyles: Record<string, { icon: string; number: string; border: string }> = {
  red: {
    icon: "bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400",
    number: "text-red-600 dark:text-red-400",
    border: "hover:border-red-400 dark:hover:border-red-500/70",
  },
  blue: {
    icon: "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
    number: "text-blue-600 dark:text-blue-400",
    border: "hover:border-blue-400 dark:hover:border-blue-500/70",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    number: "text-emerald-600 dark:text-emerald-400",
    border: "hover:border-emerald-400 dark:hover:border-emerald-500/70",
  },
  amber: {
    icon: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400",
    number: "text-amber-700 dark:text-amber-400",
    border: "hover:border-amber-400 dark:hover:border-amber-500/70",
  },
  violet: {
    icon: "bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400",
    number: "text-violet-600 dark:text-violet-400",
    border: "hover:border-violet-400 dark:hover:border-violet-500/70",
  },
  cyan: {
    icon: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-400",
    number: "text-cyan-700 dark:text-cyan-400",
    border: "hover:border-cyan-400 dark:hover:border-cyan-500/70",
  },
};

function PriorityCard({ priority }: { priority: StrategicPriority }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = priority.icon;
  const styles = accentStyles[priority.accent];

  return (
    <motion.article
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onFocus={() => setIsExpanded(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsExpanded(false);
        }
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group relative min-h-[360px] overflow-hidden rounded-2xl border bg-white p-7 shadow-sm transition-colors duration-300 dark:bg-slate-900 ${styles.border} ${isExpanded ? "shadow-lg dark:shadow-black/20" : "border-slate-200 dark:border-slate-800"}`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className={`font-mono text-3xl font-black ${styles.number}`}>{priority.number}</span>
          <div className={`rounded-xl p-3 ${styles.icon}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <h3 className="mt-7 text-xl font-bold leading-tight text-slate-900 dark:text-white">{priority.title}</h3>
        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">{priority.summary}</p>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="mt-5 border-t border-slate-200 pt-5 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400">
                {priority.details}
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2 text-xs text-slate-600 dark:text-slate-400">
                {priority.areas.map((area) => (
                  <li key={area} className="flex items-start gap-2">
                    <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${styles.number.replace("text-", "bg-")}`} />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <span className="mt-auto pt-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {isExpanded ? "Move away to collapse" : "Hover to explore"}
        </span>
      </div>
    </motion.article>
  );
}

export function StrategicPriorities() {
  return (
    <section id="strategic-priorities" className="border-b border-slate-200 bg-white py-24 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500">Our Strategy</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Our Strategic Priorities</h2>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Six strategic areas guide how Kenya Red Cross uses data and digital transformation to strengthen humanitarian action and serve communities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strategicPriorities.map((priority) => (
            <PriorityCard key={priority.number} priority={priority} />
          ))}
        </div>
      </div>
    </section>
  );
}