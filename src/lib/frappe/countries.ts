import { frappeList, frappeGet, frappeFileUrl } from "./client";
import type { Country } from "@/types";

export interface FrappeCountryDoc {
  name: string;
  external_id?: string;
  code: string;
  country_name?: string;
  region: string;
  is_active?: boolean | number;
  short_description?: string;
  active_initiatives_count?: number;
  digital_products_count?: number;
  data_services_count?: number;
  key_initiatives?: string[] | string;
  coordinates?: { lat: number; lng: number } | string;
  partner?: string;
  since?: number;
  image?: string;
  image_alt?: string;
  field_note?: string;
}

function parseJsonOrArray<T>(val: T[] | string | undefined | null): T[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return val.split(",").map((s) => s.trim()).filter(Boolean) as T[];
    }
  }
  return [];
}

function parseCoordinates(
  val: { lat: number; lng: number } | string | undefined | null
): { lat: number; lng: number } {
  if (
    val &&
    typeof val === "object" &&
    typeof val.lat === "number" &&
    typeof val.lng === "number"
  ) {
    return val;
  }
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (
        parsed &&
        typeof parsed.lat === "number" &&
        typeof parsed.lng === "number"
      ) {
        return parsed;
      }
    } catch {
      // ignore JSON parse error
    }
  }
  return { lat: 0, lng: 0 };
}

function formatImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("/files/") || path.startsWith("files/")) {
    return frappeFileUrl(path);
  }
  return path;
}

function mapCountry(raw: FrappeCountryDoc & Record<string, unknown>): Country {
  const id = String(raw.external_id || raw.id || raw.name || "");
  const code = String(raw.code || "").toUpperCase();
  const name = String(raw.country_name || raw.name || "");
  const region = String(raw.region || "");
  const isActive = Boolean(raw.is_active ?? true);
  const shortDescription = String(raw.short_description || raw.shortDescription || "");
  const activeInitiativesCount = Number(raw.active_initiatives_count || raw.activeInitiativesCount || 0);
  const digitalProductsCount = Number(raw.digital_products_count || raw.digitalProductsCount || 0);
  const dataServicesCount = Number(raw.data_services_count || raw.dataServicesCount || 0);
  const keyInitiatives = parseJsonOrArray<string>(
    (raw.key_initiatives || raw.keyInitiatives) as string[] | string | undefined
  );
  const coordinates = parseCoordinates(
    raw.coordinates as { lat: number; lng: number } | string | undefined
  );
  const partner = String(raw.partner || "");
  const since = Number(raw.since || 2020);
  const rawImage = String(raw.image || "");
  const image = formatImageUrl(rawImage);
  const imageAlt = String(raw.image_alt || raw.imageAlt || "");
  const fieldNote = String(raw.field_note || raw.fieldNote || "");

  return {
    id,
    code,
    name,
    region,
    isActive,
    shortDescription,
    activeInitiativesCount,
    digitalProductsCount,
    dataServicesCount,
    keyInitiatives,
    coordinates,
    partner,
    since,
    image,
    imageAlt,
    fieldNote,
  };
}

export async function getCountries(): Promise<Country[]> {
  const response = await frappeList<FrappeCountryDoc>("Countries", {
    limit: 100,
  });
  return response.data.map((item) =>
    mapCountry(item as FrappeCountryDoc & Record<string, unknown>)
  );
}

export async function getCountry(idOrCode: string): Promise<Country | null> {
  const countries = await getCountries();
  const found = countries.find(
    (c) =>
      c.id.toLowerCase() === idOrCode.toLowerCase() ||
      c.code.toLowerCase() === idOrCode.toLowerCase()
  );
  if (found) {
    return found;
  }
  try {
    const raw = await frappeGet<FrappeCountryDoc>("Countries", idOrCode);
    return mapCountry(raw as FrappeCountryDoc & Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  return getCountry(code);
}
