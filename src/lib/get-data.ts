import { getEntityData } from "@/lib/data-store";
import { BlogPost, Partner, Testimonial, Country, ThematicArea, SiteConfig, AboutData } from "@/types";

import { getBlogs as getFrappeBlogs, getBlogBySlug as getFrappeBlogBySlug } from "@/lib/frappe/blogs";

export async function getBlogs(): Promise<BlogPost[]> {
  return getFrappeBlogs();
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  return getFrappeBlogBySlug(slug);
}

import { getPartners as getFrappePartners } from "@/lib/frappe/partners";

export async function getPartners(): Promise<Partner[]> {
  return getFrappePartners();
}

export function getTestimonials(): Testimonial[] {
  return getEntityData<Testimonial[]>("testimonials");
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

export function getAboutData(): AboutData {
  return getEntityData<AboutData>("about");
}
