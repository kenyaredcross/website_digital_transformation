import { frappeListAll } from "./client";
import type { InnovationProject } from "@/data/innovationData";

export interface FrappeInnovationDoc {
  name: string;
  external_id?: string;
  title: string;
  category: string;
  status: InnovationProject["status"];
  period: string;
  location: string;
  lead: string;
  team: string;
  what_we_tested: string;
  why_we_tested: string;
  what_we_learned: string;
  what_worked: string[] | string;
  what_didnt_work: string[] | string;
  what_to_improve: string[] | string;
  recommendation: string;
}

interface FrappeCountryRef {
  name: string;
  external_id?: string;
  country_name?: string;
}

interface FrappePersonRef {
  name: string;
  external_id?: string;
  full_name?: string;
}

function parseJsonIfNeeded<T>(val: unknown, fallback: T): T {
  if (typeof val === "string") {
    try {
      return (JSON.parse(val) as T) ?? fallback;
    } catch {
      return fallback;
    }
  }
  if (val !== null && val !== undefined) {
    return val as T;
  }
  return fallback;
}

export async function getInnovations(): Promise<InnovationProject[]> {
  const [records, countries, people] = await Promise.all([
    frappeListAll<FrappeInnovationDoc>("Innovations", { limit: 100 }),
    frappeListAll<FrappeCountryRef>("Countries", { limit: 500 }),
    frappeListAll<FrappePersonRef>("Person", { limit: 500 }),
  ]);

  const countryNames = new Map<string, string>();
  for (const country of countries) {
    const label = country.country_name || country.name;
    countryNames.set(country.name, label);
    if (country.external_id) countryNames.set(country.external_id, label);
  }

  const personNames = new Map<string, string>();
  for (const person of people) {
    const label = person.full_name || person.name;
    personNames.set(person.name, label);
    if (person.external_id) personNames.set(person.external_id, label);
  }

  if (records.length > 0) {
    return records.map((doc) => {
        const extId = doc.external_id || doc.name;
        const whatWorked = parseJsonIfNeeded<string[]>(doc.what_worked, []);
        const whatDidntWork = parseJsonIfNeeded<string[]>(doc.what_didnt_work, []);
        const whatToImprove = parseJsonIfNeeded<string[]>(doc.what_to_improve, []);

        return {
          id: extId,
          title: doc.title || "",
          status: doc.status || "Ongoing",
          category: doc.category || "Research",
          period: doc.period || "",
          location: countryNames.get(doc.location) || doc.location || "",
          lead: personNames.get(doc.lead) || doc.lead || "",
          team: doc.team || "Digital Transformation Team",
          partnerOrgs: [],
          cover: "/assets/images/dt_updates/app_phone.jpg",
          tagline: doc.what_we_tested?.split(/[.!?]/, 1)[0] || "",
          whatWeTested: doc.what_we_tested || "",
          whyWeTested: doc.why_we_tested || "",
          whatWeLearned: doc.what_we_learned || "",
          whatWorked: Array.isArray(whatWorked) ? whatWorked : [String(whatWorked)],
          whatDidntWork: Array.isArray(whatDidntWork) ? whatDidntWork : [String(whatDidntWork)],
          whatToImprove: Array.isArray(whatToImprove) ? whatToImprove : [String(whatToImprove)],
          recommendation: doc.recommendation || "",
          tags: [],
          featured: false,
          color: "blue",
        };
    });
  }

  return [];
}
