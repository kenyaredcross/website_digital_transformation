import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us | Kenya Red Cross Digital Transformation",
  description:
    "Learn about the Kenya Red Cross Digital Transformation Department, its mission, vision, values, priorities, and people-centred approach to humanitarian technology.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
