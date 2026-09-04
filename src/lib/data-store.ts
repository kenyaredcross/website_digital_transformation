import fs from "fs";
import path from "path";
import { blogs as initialBlogs } from "@/data/blogs";
import { projects as initialProjects } from "@/data/projects";
import { people as initialPeople } from "@/data/people";
import { partners as initialPartners } from "@/data/partners";
import { testimonials as initialTestimonials } from "@/data/testimonials";
import { countries as initialCountries } from "@/data/countries";
import { thematicAreas as initialThematicAreas } from "@/data/thematicAreas";
import { siteConfig as initialSiteConfig } from "@/data/site";
import { aboutData as initialAboutData } from "@/data/about";

const STORAGE_DIR = path.join(process.cwd(), "src", "data", "storage");

function ensureStorageDir() {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}

function getFilePath(entity: string): string {
  ensureStorageDir();
  return path.join(STORAGE_DIR, `${entity}.json`);
}

const INITIAL_DATA_MAP: Record<string, unknown> = {
  blogs: initialBlogs,
  projects: initialProjects,
  people: initialPeople,
  partners: initialPartners,
  testimonials: initialTestimonials,
  countries: initialCountries,
  thematicAreas: initialThematicAreas,
  site: initialSiteConfig,
  about: initialAboutData,
};

export function getEntityData<T = unknown>(entity: string): T {
  const filePath = getFilePath(entity);

  if (!fs.existsSync(filePath)) {
    const initialData = INITIAL_DATA_MAP[entity] || [];
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData as T;
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent) as T;
  } catch (error) {
    console.error(`Error reading storage for ${entity}:`, error);
    return (INITIAL_DATA_MAP[entity] || []) as T;
  }
}

export function saveEntityData(entity: string, data: unknown): void {
  const filePath = getFilePath(entity);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function createEntityItem(entity: string, item: Record<string, unknown>): Record<string, unknown> {
  const data = getEntityData<Record<string, unknown>[]>(entity);
  if (!Array.isArray(data)) {
    throw new Error(`Entity ${entity} is not an array model.`);
  }

  const newItem = {
    ...item,
    id: item.id || `${entity.slice(0, 3)}_${Date.now()}`,
  };

  data.unshift(newItem);
  saveEntityData(entity, data);
  return newItem;
}

export function updateEntityItem(entity: string, id: string, updatedFields: Record<string, unknown>): unknown {
  const data = getEntityData(entity);

  if (!Array.isArray(data)) {
    // Single object model like site or about
    const updatedData = { ...(data as Record<string, unknown>), ...updatedFields };
    saveEntityData(entity, updatedData);
    return updatedData;
  }

  const list = data as Record<string, unknown>[];
  const index = list.findIndex((item) => String(item.id) === String(id));
  if (index === -1) {
    throw new Error(`Item with id ${id} not found in ${entity}`);
  }

  const updatedItem = { ...list[index], ...updatedFields };
  list[index] = updatedItem;
  saveEntityData(entity, list);
  return updatedItem;
}

export function deleteEntityItem(entity: string, id: string): boolean {
  const data = getEntityData<Record<string, unknown>[]>(entity);
  if (!Array.isArray(data)) {
    throw new Error(`Entity ${entity} is not an array model.`);
  }

  const filteredData = data.filter((item) => String(item.id) !== String(id));
  if (filteredData.length === data.length) {
    return false;
  }

  saveEntityData(entity, filteredData);
  return true;
}
