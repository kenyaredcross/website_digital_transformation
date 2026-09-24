import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Mono } from "next/font/google";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getSiteConfig } from "@/lib/frappe/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  // Load the weights we'll actually use for headings
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.shortName}`,
    },
    description: siteConfig.description,
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
      title: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
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
