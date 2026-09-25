import { frappeList } from "./client";
import { INNOVATION_PROJECTS, type InnovationProject } from "@/data/innovationData";

export interface FrappeInnovationDoc {
  name: string;
  external_id?: string;
  title: string;
  what_we_tested: string;
  why_we_tested: string;
  what_we_learned: string;
  what_worked: string[] | string;
  what_didnt_work: string[] | string;
  what_to_improve: string[] | string;
  recommendation: string;
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
  try {
    const response = await frappeList<FrappeInnovationDoc>("Innovations", {
      limit: 100,
    });

    if (response?.data && response.data.length > 0) {
      return response.data.map((doc) => {
        const extId = doc.external_id || doc.name;
        const staticItem = INNOVATION_PROJECTS.find((p) => p.id === extId);

        const whatWorked = parseJsonIfNeeded<string[]>(doc.what_worked, staticItem?.whatWorked || []);
        const whatDidntWork = parseJsonIfNeeded<string[]>(doc.what_didnt_work, staticItem?.whatDidntWork || []);
        const whatToImprove = parseJsonIfNeeded<string[]>(doc.what_to_improve, staticItem?.whatToImprove || []);

        return {
          id: extId,
          title: doc.title || staticItem?.title || "",
          status: staticItem?.status || "Scaled",
          category: staticItem?.category || "Artificial Intelligence",
          period: staticItem?.period || "",
          location: staticItem?.location || "",
          lead: staticItem?.lead || "",
          team: staticItem?.team || "",
          partnerOrgs: staticItem?.partnerOrgs || [],
          cover: staticItem?.cover || "/assets/images/dt_updates/app_phone.jpg",
          tagline: staticItem?.tagline || "",
          whatWeTested: doc.what_we_tested || staticItem?.whatWeTested || "",
          whyWeTested: doc.why_we_tested || staticItem?.whyWeTested || "",
          whatWeLearned: doc.what_we_learned || staticItem?.whatWeLearned || "",
          whatWorked: Array.isArray(whatWorked) ? whatWorked : [String(whatWorked)],
          whatDidntWork: Array.isArray(whatDidntWork) ? whatDidntWork : [String(whatDidntWork)],
          whatToImprove: Array.isArray(whatToImprove) ? whatToImprove : [String(whatToImprove)],
          recommendation: doc.recommendation || staticItem?.recommendation || "",
          tags: staticItem?.tags || [],
          featured: staticItem?.featured ?? true,
          color: staticItem?.color || "blue",
        };
      });
    }
  } catch (err) {
    console.warn("Failed to fetch Innovations from Frappe, using local fallback:", err);
  }

  return INNOVATION_PROJECTS;
}
