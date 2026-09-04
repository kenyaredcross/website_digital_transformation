import { getEntityData } from "@/lib/data-store";
import { BlogPost, Project, Person, Partner, Testimonial, Country, ThematicArea, SiteConfig, AboutData } from "@/types";

export function getBlogs(): BlogPost[] {
  return getEntityData<BlogPost[]>("blogs");
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const blogs = getBlogs();
  return blogs.find((b) => b.slug === slug || b.id === slug);
}

export function getProjects(): Project[] {
  return getEntityData<Project[]>("projects");
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug || p.id === slug);
}

export function getPeople(): Person[] {
  return getEntityData<Person[]>("people");
}

export function getPersonBySlug(slug: string): Person | undefined {
  const people = getPeople();
  return people.find((p) => p.slug === slug || p.id === slug);
}

export function getPartners(): Partner[] {
  return getEntityData<Partner[]>("partners");
}

export function getTestimonials(): Testimonial[] {
  return getEntityData<Testimonial[]>("testimonials");
}

export function getCountries(): Country[] {
  return getEntityData<Country[]>("countries");
}

export function getThematicAreas(): ThematicArea[] {
  return getEntityData<ThematicArea[]>("thematicAreas");
}

export function getThematicAreaBySlug(slug: string): ThematicArea | undefined {
  const areas = getThematicAreas();
  return areas.find((a) => a.slug === slug || a.id === slug);
}

export function getSiteConfig(): SiteConfig {
  return getEntityData<SiteConfig>("site");
}

export function getAboutData(): AboutData {
  return getEntityData<AboutData>("about");
}
