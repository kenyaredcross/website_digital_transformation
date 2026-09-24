"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { countries as staticCountries, FALLBACK_COUNTRY_IMAGE } from "@/data/countries";
import { useReveal } from "@/hooks/useReveal";
import { Country } from "@/types";

interface CountryRosterProps {
  countries?: Country[];
}

export function CountryRoster({ countries = [] }: CountryRosterProps) {
  const activeCountries = countries.length > 0 ? countries : staticCountries;
  const [region, setRegion] = useState<string>("All");

  const dynamicRegions = useMemo(
    () => Array.from(new Set(activeCountries.map((c) => c.region))),
    [activeCountries]
  );

  const visible = useMemo(
    () =>
      region === "All"
        ? activeCountries
        : activeCountries.filter((c) => c.region === region),
    [region, activeCountries]
  );

  const filters = ["All", ...dynamicRegions];

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by region">
        {filters.map((item) => {
          const active = item === region;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setRegion(item)}
              aria-pressed={active}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE2435]",
                active
                  ? "bg-[#011E41] text-white dark:bg-white dark:text-[#011E41]"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/[0.06] dark:text-white/70 dark:hover:bg-white/[0.12]",
              ].join(" ")}
            >
              {item}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-slate-500 dark:text-white/50">
          No countries in this region yet. Choose another region to keep browsing.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((country, index) => (
            <CountryRecord key={country.id} country={country} index={index} />
          ))}
        </ul>
      )}
    </div>
  );
}

function CountryRecord({ country, index }: { country: Country; index: number }) {
  const { ref, inView } = useReveal<HTMLLIElement>();
  const [src, setSrc] = useState(country.image);

  return (
    <li
      ref={ref}
      className={`krc-reveal ${inView ? "is-in" : ""} group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]`}
      style={{ transitionDelay: `${Math.min(index, 5) * 70}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-white/5">
        <Image
          src={src}
          alt={country.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          onError={() => setSrc(FALLBACK_COUNTRY_IMAGE)}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#011E41] via-[#011E41]/60 to-transparent p-5 pt-16">
          <h3 className="text-2xl font-semibold tracking-tight text-white">{country.name}</h3>
          <p className="text-sm text-white/70">{country.partner}</p>
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-[#011E41]">
          Since {country.since}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <p className="max-w-[44ch] text-sm leading-relaxed text-slate-600 dark:text-white/70">
          {country.fieldNote}
        </p>

        <dl className="flex items-end gap-6 border-t border-slate-200 pt-4 dark:border-white/10">
          <Figure value={country.activeInitiativesCount} label="Initiatives" accent />
          <Figure value={country.digitalProductsCount} label="Products" />
          <Figure value={country.dataServicesCount} label="Data feeds" />
        </dl>

        <ul className="mt-auto space-y-2 text-sm text-slate-600 dark:text-white/70">
          {country.keyInitiatives.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-2.5">
              <span
                className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#EE2435]"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function Figure({
  value,
  label,
  accent = false,
}: {
  value: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd
        className={`text-2xl font-semibold tabular-nums ${
          accent ? "text-[#EE2435]" : "text-[#011E41] dark:text-white"
        }`}
      >
        {value}
      </dd>
      <span aria-hidden className="text-xs text-slate-500 dark:text-white/50">
        {label}
      </span>
    </div>
  );
}
