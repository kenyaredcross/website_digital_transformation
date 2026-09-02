"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, ShieldCheck, Activity, Radio, Cpu, Layers } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950 text-white">
      {/* Background Ambient Grids & Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Department Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold tracking-wide text-red-400 shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Kenya Red Cross Society — Digital Transformation</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white"
            >
              Digital innovation for a more{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-300">
                resilient Kenya.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Explore the people, products, data and partnerships transforming humanitarian action across Kenya and the Greater Horn of Africa.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-lg shadow-red-600/25 transition-all hover:shadow-red-600/40 hover:-translate-y-0.5"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/people"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all hover:border-slate-700"
              >
                <Users className="w-4 h-4 text-red-400" />
                <span>Meet the Team</span>
              </Link>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 border-t border-slate-900 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left"
            >
              <div>
                <span className="block text-2xl font-black text-white font-mono">20+</span>
                <span className="text-xs text-slate-400 font-medium">Digital Products</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-white font-mono">15+</span>
                <span className="text-xs text-slate-400 font-medium">Data Services</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-red-400 font-mono">47</span>
                <span className="text-xs text-slate-400 font-medium">Kenyan Counties</span>
              </div>
            </motion.div>
          </div>

         
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 border border-slate-800 shadow-2xl overflow-hidden">
              {/* Top Bar Decoration */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">krcs-telemetry://live-node-ke</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Floating Live Telemetry Cards */}
              <div className="space-y-4">
                {/* Live Early Warning Telemetry Card */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 hover:border-red-500/40 transition-colors">
                  <div className="p-2.5 rounded-lg bg-red-600/10 border border-red-500/30 text-red-400 shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-white uppercase">Hazina Flood Warning</span>
                      <span className="text-[10px] font-mono text-slate-400">Tana River Basin</span>
                    </div>
                    <p className="text-xs text-slate-300 truncate">Water level sensor gauge: +2.4m crest threshold breached</p>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-red-400 font-semibold font-mono">72h Early Action Triggered</span>
                      <span className="text-slate-400 font-mono">45k Household Alerts</span>
                    </div>
                  </div>
                </div>

                {/* Cash Voucher Disbursement Node Card */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 hover:border-blue-500/40 transition-colors">
                  <div className="p-2.5 rounded-lg bg-blue-600/10 border border-blue-500/30 text-blue-400 shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-white uppercase">BomaCare Cash Aid</span>
                      <span className="text-[10px] font-mono text-emerald-400">Sync Complete</span>
                    </div>
                    <p className="text-xs text-slate-300 truncate">Mobile wallet batch payment disbursed via M-PESA API</p>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-400 font-semibold font-mono">99.8% Verification</span>
                      <span className="text-slate-400 font-mono">Latency: 6 Hours</span>
                    </div>
                  </div>
                </div>

                {/* Spatial Mapping Layer Card */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 hover:border-purple-500/40 transition-colors">
                  <div className="p-2.5 rounded-lg bg-purple-600/10 border border-purple-500/30 text-purple-400 shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-white uppercase">ResilienceMap GIS</span>
                      <span className="text-[10px] font-mono text-purple-300">Sentinel-2 Sync</span>
                    </div>
                    <p className="text-xs text-slate-300 truncate">High-resolution vulnerability layer updated across 47 counties</p>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-slate-300 font-mono">2.5M Building Footprints</span>
                      <span className="text-slate-400 font-mono">QGIS Server</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Badge */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-red-400" /> Grounded in Field Science
                </span>
                <span className="font-mono text-[10px] text-slate-500">v3.4 Production Ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
