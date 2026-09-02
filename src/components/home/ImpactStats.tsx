"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { impactStats } from "@/data/impact";
import { Award, Zap, Globe2, Users2, ShieldCheck, HeartHandshake } from "lucide-react";

const icons = [Zap, Globe2, Award, Users2, ShieldCheck, HeartHandshake];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = Math.max(1, Math.floor(end / (duration / 16)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formattedCount =
    value >= 1000000
      ? (count / 1000000).toFixed(1) + "M"
      : value >= 1000
      ? count.toLocaleString()
      : count;

  return (
    <span ref={ref} className="font-black font-mono tracking-tight">
      {formattedCount}
      {suffix}
    </span>
  );
}

export function ImpactStats() {
  return (
    <section className="py-20 bg-slate-900 text-white relative border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono">
            Transformation At A Glance
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Humanitarian scale powered by digital precision.
          </p>
          <p className="text-slate-400 text-base">
            Measurable impact across products, data pipelines, field deployments, and partner ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactStats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-red-600/10 border border-red-500/20 text-red-500 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    Metrics 0{idx + 1}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-white mb-2">
                  <AnimatedCounter value={stat.numberValue} suffix={stat.suffix.replace(/[0-9M+]/g, "").trim() ? " " + stat.suffix.replace(/[0-9M+]/g, "").trim() : stat.suffix.includes("+") ? "+" : ""} />
                </div>

                <h3 className="text-lg font-bold text-slate-200 mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
