"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  FlaskConical, Lightbulb, CheckCircle2, XCircle, Wrench, Rocket,
  MapPin, Users, Calendar, Tag, ChevronDown, X, BookOpen,
  Microscope, Zap, Filter,
} from "lucide-react";
import {
  INNOVATION_PROJECTS,
  INNOVATION_DIMENSIONS,
  STATUS_CONFIG,
  CATEGORY_COLORS,
  INNOVATION_CATEGORIES,
  type InnovationProject,
} from "@/data/innovationData";
import { getInnovations } from "@/lib/get-data";

// ── Variants ──────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.96 },
};

// ── Dimension pillar card ─────────────────────────────────────────────────────

const DIM_COLORS: Record<string, { bg: string; border: string; badge: string; text: string }> = {
  blue:    { bg: "bg-blue-50 dark:bg-blue-950/30",    border: "border-blue-200 dark:border-blue-800/50",    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",    text: "text-blue-700 dark:text-blue-300" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-950/30",  border: "border-amber-200 dark:border-amber-800/50",  badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300",  text: "text-amber-700 dark:text-amber-300" },
  purple:  { bg: "bg-purple-50 dark:bg-purple-950/30",border: "border-purple-200 dark:border-purple-800/50",badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300",text: "text-purple-700 dark:text-purple-300" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/30",border: "border-emerald-200 dark:border-emerald-800/50",badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300",text: "text-emerald-700 dark:text-emerald-300" },
  red:     { bg: "bg-red-50 dark:bg-red-950/30",      border: "border-red-200 dark:border-red-800/50",      badge: "bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300",      text: "text-red-700 dark:text-red-300" },
  orange:  { bg: "bg-orange-50 dark:bg-orange-950/30",border: "border-orange-200 dark:border-orange-800/50",badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/60 dark:text-orange-300",text: "text-orange-700 dark:text-orange-300" },
  teal:    { bg: "bg-teal-50 dark:bg-teal-950/30",    border: "border-teal-200 dark:border-teal-800/50",    badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300",    text: "text-teal-700 dark:text-teal-300" },
};

// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({ project, onSelect }: { project: InnovationProject; onSelect: () => void }) {
  const sc = STATUS_CONFIG[project.status];
  const catColor = CATEGORY_COLORS[project.category] ?? "bg-slate-100 text-slate-700";

  return (
    <motion.article
      layout
      variants={cardIn}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl hover:border-red-300 dark:hover:border-red-800 transition-all duration-300 cursor-pointer"
      onClick={onSelect}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      aria-label={`View ${project.title}`}
    >
      {/* Cover image */}
      <div className="relative h-44 overflow-hidden bg-muted">
        <Image
          src={project.cover}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

        {/* Status badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-sm ${sc.bg} ${sc.text} ${sc.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          {sc.label}
        </div>

        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-900/70 backdrop-blur-sm px-2 py-0.5 rounded-full border border-amber-600/40">
              <Zap className="w-2.5 h-2.5 fill-current" /> Featured
            </span>
          </div>
        )}

        {/* Category on image bottom */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm ${catColor}`}>
            {project.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 flex-1 italic">
          "{project.tagline}"
        </p>

        {/* Meta strip */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.period}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{project.location}</span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{project.team}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">#{t}</span>
          ))}
        </div>

        <button className="mt-1 w-full flex items-center justify-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 px-4 py-2 rounded-xl transition-colors">
          <BookOpen className="w-3.5 h-3.5" /> Read Full Documentation
        </button>
      </div>
    </motion.article>
  );
}

// ── Project Row (List view) ───────────────────────────────────────────────────

function ProjectRow({ project, onSelect }: { project: InnovationProject; onSelect: () => void }) {
  const sc = STATUS_CONFIG[project.status];
  const catColor = CATEGORY_COLORS[project.category] ?? "bg-slate-100 text-slate-700";

  return (
    <motion.article
      layout
      variants={cardIn}
      className="group flex items-start gap-5 p-5 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-red-300 dark:hover:border-red-800 transition-all duration-300 cursor-pointer"
      onClick={onSelect}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      aria-label={`View ${project.title}`}
    >
      {/* Thumbnail */}
      <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-muted">
        <Image
          src={project.cover}
          alt=""
          fill
          sizes="96px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
            {sc.label}
          </span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${catColor}`}>
            {project.category}
          </span>
        </div>

        <h3 className="font-bold text-foreground text-sm leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-1">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-xs leading-relaxed italic line-clamp-1">
          &ldquo;{project.tagline}&rdquo;
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.period}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{project.location}</span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{project.team}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">#{t}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        className="shrink-0 self-center hidden sm:flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 px-4 py-2 rounded-xl transition-colors border border-red-100 dark:border-red-900/40 whitespace-nowrap"
        tabIndex={-1}
      >
        <BookOpen className="w-3.5 h-3.5" /> Read Docs
      </button>
    </motion.article>
  );
}

// ── Detail Modal ──────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: InnovationProject; onClose: () => void }) {
  const sc = STATUS_CONFIG[project.status];

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={project.title}
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-3xl bg-card rounded-3xl overflow-hidden shadow-2xl border border-border max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero */}
          <div className="relative h-56 shrink-0 bg-muted">
            <Image src={project.cover} alt="" fill sizes="768px" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 transition-colors border border-white/20"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="absolute bottom-4 left-5 right-5">
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border mb-2 ${sc.bg} ${sc.text} ${sc.border}`}>
                <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
                {sc.label}
              </div>
              <h2 className="text-white font-black text-xl leading-snug">{project.title}</h2>
              <p className="text-white/70 text-sm mt-1 italic">"{project.tagline}"</p>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1 p-6 space-y-6">

            {/* Meta grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-muted/50 border border-border">
              {[
                { label: "Period",   value: project.period,   Icon: Calendar },
                { label: "Location", value: project.location, Icon: MapPin },
                { label: "Lead",     value: project.lead,     Icon: Users },
                { label: "Team",     value: project.team,     Icon: Tag },
              ].map(({ label, value, Icon }) => (
                <div key={label}>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                    <Icon className="w-3 h-3" />{label}
                  </div>
                  <div className="text-foreground text-xs font-semibold">{value}</div>
                </div>
              ))}
            </div>

            {/* Partners */}
            {project.partnerOrgs.length > 0 && (
              <div>
                <p className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest mb-2">Partners</p>
                <div className="flex flex-wrap gap-2">
                  {project.partnerOrgs.map((p) => (
                    <span key={p} className="text-xs px-2.5 py-1 rounded-full border border-border bg-card text-foreground font-medium">{p}</span>
                  ))}
                </div>
              </div>
            )}

            {/* 7 documentation dimensions */}
            <div className="space-y-4">
              {/* What we tested */}
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <Microscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide">What We Tested</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{project.whatWeTested}</p>
              </div>

              {/* Why we tested */}
              <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">Why We Tested It</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{project.whyWeTested}</p>
              </div>

              {/* What we learned */}
              <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-800/50 bg-purple-50 dark:bg-purple-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wide">What We Learned</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{project.whatWeLearned}</p>
              </div>

              {/* What worked + didn't + improve — 3 col grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/20">
                  <div className="flex items-center gap-1.5 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">What Worked</span>
                  </div>
                  <ul className="space-y-1.5">
                    {project.whatWorked.map((w, i) => (
                      <li key={i} className="text-xs text-foreground leading-snug flex gap-1.5">
                        <span className="text-emerald-500 mt-0.5">•</span>{w}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-950/20">
                  <div className="flex items-center gap-1.5 mb-3">
                    <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-wide">What Did Not Work</span>
                  </div>
                  <ul className="space-y-1.5">
                    {project.whatDidntWork.map((w, i) => (
                      <li key={i} className="text-xs text-foreground leading-snug flex gap-1.5">
                        <span className="text-red-500 mt-0.5">•</span>{w}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl border border-orange-200 dark:border-orange-800/50 bg-orange-50 dark:bg-orange-950/20">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Wrench className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wide">What To Improve</span>
                  </div>
                  <ul className="space-y-1.5">
                    {project.whatToImprove.map((w, i) => (
                      <li key={i} className="text-xs text-foreground leading-snug flex gap-1.5">
                        <span className="text-orange-500 mt-0.5">•</span>{w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendation */}
              <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-800/50 bg-teal-50 dark:bg-teal-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wide">Recommendation — Adapt, Scale, or Discontinue?</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed font-medium">{project.recommendation}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium border border-border">#{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main Section Component ────────────────────────────────────────────────────

export function InnovationResearchSection() {
  const [projects, setProjects] = useState<InnovationProject[]>(INNOVATION_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<InnovationProject | null>(null);

  useEffect(() => {
    getInnovations().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  const statuses = ["All", "Scaled", "Adapted", "Pilot", "Ongoing", "Discontinued"];

  const filtered = projects.filter((p) => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchStat = selectedStatus === "All" || p.status === selectedStatus;
    return matchCat && matchStat;
  });

  const stats = [
    { value: `${projects.length}`, label: "Experiments Documented" },
    { value: `${projects.filter(p => p.status === "Scaled").length}`, label: "Solutions Scaled" },
    { value: "7", label: "Documentation Dimensions" },
    { value: `${projects.filter(p => p.featured).length}`, label: "Featured Projects" },
  ];

  return (
    <>
      {/* ── How We Work Section ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-card border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {/* Left */}
            <div className="space-y-6">
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/60 shadow-sm">
                  <FlaskConical className="w-3.5 h-3.5" />
                  Our Approach
                </span>
              </motion.div>

              <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                We explore how emerging{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-red-600 dark:text-red-500">technologies</span>
                  <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-2.5 rounded-full opacity-20 bg-red-400 dark:bg-red-500 blur-sm" />
                </span>{" "}
                can serve humanity.
              </motion.h2>

              <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                Our innovation work includes research, experimentation, knowledge sharing and
                collaboration with staff, volunteers, communities and partners. Every experiment
                is documented so the whole organisation can learn — whether it succeeds or fails.
              </motion.p>

              {/* Stats row */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 pt-2">
                {stats.map((s) => (
                  <div key={s.label} className="p-4 rounded-2xl border border-border bg-background text-center">
                    <p className="text-3xl font-black text-red-600 dark:text-red-500">{s.value}</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: 7 dimensions grid */}
            <motion.div variants={fadeUp} className="space-y-3">
              <p className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                What We Document — 7 Key Dimensions
              </p>
              <div className="grid grid-cols-1 gap-2">
                {INNOVATION_DIMENSIONS.map((dim, i) => {
                  const c = DIM_COLORS[dim.color];
                  return (
                    <motion.div
                      key={dim.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border ${c.bg} ${c.border}`}
                    >
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm font-semibold ${c.text}`}>{dim.label}</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Closing callout */}
              <div className="mt-4 p-4 rounded-2xl border border-dashed border-red-300 dark:border-red-800 bg-gradient-to-br from-red-50 to-card dark:from-red-950/20 dark:to-card">
                <p className="text-sm text-foreground leading-relaxed">
                  <span className="font-bold text-red-600 dark:text-red-400">Together, these seven dimensions</span> build an
                  organisational knowledge base that supports informed decision-making — guiding what to adapt, scale, or discontinue.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Experiments Library ────────────────────────────────────────────── */}
      <section id="experiments" className="py-20 md:py-28 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            className="mb-12 space-y-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-800/60 shadow-sm">
              <Microscope className="w-3.5 h-3.5" />
              Experiment Registry
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
              Our Innovation{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-red-600 dark:text-red-500">Experiments</span>
                <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-2.5 rounded-full opacity-20 bg-red-400 dark:bg-red-500 blur-sm" />
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Every initiative we test is documented using our 7-dimension framework. Click any experiment to read the full documentation.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mb-8 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Category pills */}
              <div className="flex flex-wrap gap-2 flex-1">
                {["All", ...INNOVATION_CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      selectedCategory === cat
                        ? "bg-foreground text-background border-foreground"
                        : "bg-card text-muted-foreground border-border hover:border-muted-foreground"
                    }`}
                  >
                    {cat === "All" ? "All Categories" : cat}
                  </button>
                ))}
              </div>

              {/* Status filter */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors shrink-0 ${
                  showFilters || selectedStatus !== "All"
                    ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                    : "border-border bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                <Filter className="w-4 h-4" />
                Status
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 flex flex-wrap gap-2">
                    {statuses.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedStatus(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                          selectedStatus === s
                            ? "bg-foreground text-background border-foreground"
                            : "bg-card text-muted-foreground border-border hover:border-muted-foreground"
                        }`}
                      >
                        {s === "All" ? "All Statuses" : STATUS_CONFIG[s as keyof typeof STATUS_CONFIG]?.label ?? s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Showing <span className="font-bold text-foreground">{filtered.length}</span> of {projects.length} experiments
              </span>
              {(selectedCategory !== "All" || selectedStatus !== "All") && (
                <button
                  onClick={() => { setSelectedCategory("All"); setSelectedStatus("All"); }}
                  className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 font-semibold"
                >
                  <X className="w-3 h-3" /> Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="py-24 text-center"
              >
                <div className="text-5xl mb-4">🔬</div>
                <h3 className="text-lg font-bold text-foreground mb-2">No experiments found</h3>
                <p className="text-muted-foreground text-sm">Try adjusting your filters.</p>
              </motion.div>
            ) : (
              <motion.div
                key={`${selectedCategory}-${selectedStatus}`}
                className="flex flex-col gap-3"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {filtered.map((p) => (
                  <ProjectRow key={p.id} project={p} onSelect={() => setSelected(p)} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
