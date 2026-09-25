import { BlogPost, Partner, Testimonial, Country, ThematicArea, SiteConfig, AboutData } from "@/types";

import { getBlogs as getFrappeBlogs, getBlogBySlug as getFrappeBlogBySlug } from "@/lib/frappe/blogs";

export async function getBlogs(): Promise<BlogPost[]> {
  return getFrappeBlogs();
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  return getFrappeBlogBySlug(slug);
}

import { getPartners as getFrappePartners, getPartner as getFrappePartner } from "@/lib/frappe/partners";

export async function getPartners(): Promise<Partner[]> {
  return getFrappePartners();
}

export async function getPartner(id: string): Promise<Partner | undefined> {
  try {
    return await getFrappePartner(id);
  } catch {
    return undefined;
  }
}

import { getProjects as getFrappeProjects, getProject as getFrappeProject, getProjectBySlug as getFrappeProjectBySlug } from "@/lib/frappe/projects";
import { Project } from "@/types";

export async function getProjects(): Promise<Project[]> {
  return getFrappeProjects();
}

export async function getProject(idOrSlug: string): Promise<Project | null> {
  return getFrappeProject(idOrSlug);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return getFrappeProjectBySlug(slug);
}

import { getTestimonials as getFrappeTestimonials } from "@/lib/frappe/testimonials";

export async function getTestimonials(): Promise<Testimonial[]> {
  return getFrappeTestimonials();
}

import { getCountries as getFrappeCountries } from "@/lib/frappe/countries";

export async function getCountries(): Promise<Country[]> {
  return getFrappeCountries();
}

import { getThematicAreas as getFrappeThematicAreas, getThematicAreaBySlug as getFrappeThematicAreaBySlug } from "@/lib/frappe/thematic-areas";

export async function getThematicAreas(): Promise<ThematicArea[]> {
  return getFrappeThematicAreas();
}

export async function getThematicAreaBySlug(slug: string): Promise<ThematicArea | undefined> {
  return getFrappeThematicAreaBySlug(slug);
}

import { getSiteConfig as getFrappeSiteConfig } from "@/lib/frappe/site";

export async function getSiteConfig(): Promise<SiteConfig> {
  return getFrappeSiteConfig();
}

import { getInnovations as getFrappeInnovations } from "@/lib/frappe/innovations";
import { InnovationProject } from "@/data/innovationData";

export async function getInnovations(): Promise<InnovationProject[]> {
  return getFrappeInnovations();
}

import { aboutData } from "@/data/about";

export function getAboutData(): AboutData {
  return aboutData;
}

