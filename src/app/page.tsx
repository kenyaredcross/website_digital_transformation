import { Hero } from "@/components/home/Hero";
import { ThematicAreas } from "@/components/home/ThematicAreas";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { WhereWeWorkPreview } from "@/components/home/WhereWeWorkPreview";
import { PeoplePreview } from "@/components/home/PeoplePreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PartnersPreview } from "@/components/home/PartnersPreview";
import { getPeople } from "@/lib/frappe/people";
import {
  getProjects,
  getTestimonials,
  getCountries,
  getThematicAreas,
  getPartners,
} from "@/lib/get-data";
import type { Metadata } from "next";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Kenya Red Cross Society — Digital Transformation",
  description:
    "Digital innovation for a more resilient Kenya. Explore the people, products, data and partnerships transforming humanitarian action across Kenya and East Africa.",
};

export default async function HomePage() {
  await connection();
  const [people, projects, testimonials, countries, thematicAreas, partners] =
    await Promise.all([
      getPeople(),
      getProjects(),
      getTestimonials(),
      getCountries(),
      getThematicAreas(),
      getPartners(),
    ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

     

      {/* Thematic Areas */}
      <ThematicAreas thematicAreas={thematicAreas} />

      {/* Featured Projects Showcase */}
      <FeaturedProjects projects={projects} />

      {/* Where We Work Geographic Reach Preview */}
      <WhereWeWorkPreview countries={countries} />

      {/* People Preview */}
      <PeoplePreview people={people} />

      {/* Testimonials Showcase */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Partners Preview */}
      <PartnersPreview partners={partners} />
      
    </div>
  );
}
