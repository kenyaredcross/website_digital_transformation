"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { people } from "@/data/people";
import { ArrowRight, Users } from "lucide-react";

export function PeoplePreview() {
  const featuredPeople = people.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 font-mono flex items-center gap-2">
              <Users className="w-4 h-4" /> Team & Innovators
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              The people behind the transformation.
            </h2>
          </div>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            Technology is built by people. Meet the software engineers, data scientists, GIS experts, and field operational leads behind our digital work.
          </p>
        </div>

        {/* Grid of Team Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPeople.map((person, idx) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl bg-slate-50 dark:bg-slate-950 p-6 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-square rounded-xl bg-slate-200 dark:bg-slate-900 mb-6 border border-slate-200 dark:border-slate-800 group-hover:scale-[1.02] transition-transform overflow-hidden">
                  <Image
                    src={person.avatar}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {person.name}
                </h3>

                <p className="text-xs font-mono font-semibold text-red-600 dark:text-red-400 mb-3">
                  {person.role}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {person.shortBio}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {person.expertise.slice(0, 2).map((exp) => (
                    <span
                      key={exp}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/people/${person.slug}`}
                  className="mt-4 w-full flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 pt-2 transition-colors"
                >
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/people"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 dark:bg-red-600 dark:hover:bg-red-700 shadow-md transition-all"
          >
            <span>Meet the Full Team & Contributors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
