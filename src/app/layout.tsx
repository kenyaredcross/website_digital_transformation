import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Mono } from "next/font/google";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getSiteConfig } from "@/lib/get-data";
import { EMPTY_SITE_CONFIG } from "@/lib/frappe/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "ui-sans-serif", "sans-serif"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  fallback: ["Georgia", "ui-serif", "serif"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  fallback: ["ui-monospace", "Courier New", "monospace"],
});

export async function generateMetadata(): Promise<Metadata> {
  // Site metadata can use a static fallback during builds where the public
  // Frappe origin is not configured. Runtime content pages still fetch Frappe.
  const siteConfig = process.env.NEXT_PUBLIC_FRAPPE_API_URL
    ? await getSiteConfig()
    : EMPTY_SITE_CONFIG;
  const siteName = siteConfig.name || "Kenya Red Cross Society — Digital Transformation";
  const shortName = siteConfig.shortName || "Kenya Red Cross Digital";
  const description =
    siteConfig.description ||
    "Digital innovation for a more resilient Kenya. Explore the people, products, data and partnerships transforming humanitarian action across Kenya and East Africa.";

  return {
    title: {
      default: siteName,
      template: `%s | ${shortName}`,
    },
    description,
    keywords: [
      "Kenya Red Cross",
      "Digital Transformation",
      "Humanitarian Innovation",
      "Data Services",
      "Early Warning System",
      "GIS Spatial Intelligence",
      "Cash Assistance",
      "Humanitarian Tech Africa",
    ],
    authors: [{ name: "Kenya Red Cross Society" }],
    openGraph: {
      title: siteName,
      description,
      ...(siteConfig.url ? { url: siteConfig.url } : {}),
      siteName,
      locale: "en_KE",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${dmMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans transition-colors duration-300">
        <ThemeProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
