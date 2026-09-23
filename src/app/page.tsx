import { Hero } from "@/components/home/Hero";
import { ImpactStats } from "@/components/home/ImpactStats";
import { ThematicAreas } from "@/components/home/ThematicAreas";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { WhereWeWorkPreview } from "@/components/home/WhereWeWorkPreview";
import { PeoplePreview } from "@/components/home/PeoplePreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PartnersPreview } from "@/components/home/PartnersPreview";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kenya Red Cross Society — Digital Transformation",
  description:
    "Digital innovation for a more resilient Kenya. Explore the people, products, data and partnerships transforming humanitarian action across Kenya and East Africa.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

     

      {/* Thematic Areas */}
      <ThematicAreas />

      {/* Featured Projects Showcase */}
      <FeaturedProjects />

      {/* Where We Work Geographic Reach Preview */}
      <WhereWeWorkPreview />

      {/* People Preview */}
      <PeoplePreview />

      {/* Testimonials Showcase */}
      <TestimonialsSection />

      {/* Partners Preview */}
      <PartnersPreview />
      
    </div>
  );
}
