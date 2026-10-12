import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { ContactInformation } from "@/components/contact/ContactInformation";
import { ContactMap } from "@/components/contact/ContactMap";
import { getSiteConfig } from "@/lib/get-data";

export const metadata: Metadata = {
  title: "Contact & Inquiries | Kenya Red Cross Digital Transformation",
  description:
    "Contact the Kenya Red Cross Digital Transformation team, submit a partnership proposal, or share feedback about our digital services.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();
  return (
    <>
      <ContactPageClient contactInformation={<ContactInformation siteConfig={siteConfig} />} />
      <ContactMap />
    </>
  );
}
