"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/theme/ThemeProvider";

interface BrandLogoProps {
  variant?: "light" | "dark"; // kept for API compatibility, not used for logo selection
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ size = "md" }: BrandLogoProps) {
  const { theme } = useTheme();

  const imgSizes = {
    sm: { w: 100, h: 36, cls: "h-9 w-auto" },
    md: { w: 160, h: 52, cls: "h-12 w-auto" },
    lg: { w: 200, h: 64, cls: "h-16 w-auto" },
  };

  const { w, h, cls } = imgSizes[size];

  // logoB.png — white/light version for dark mode
  // KRCS_logo.png — full-colour version for light mode
  const logoSrc =
    theme === "dark"
      ? "/images/logo/logoB.png"
      : "/images/logo/KRCS_logo.png";

  return (
    <Link
      href="/"
      className="group flex items-center transition-opacity hover:opacity-90"
      aria-label="Kenya Red Cross Society – Home"
    >
      <div className={`relative ${cls} shrink-0`}>
        <Image
          src={logoSrc}
          alt="Kenya Red Cross Society logo"
          width={w}
          height={h}
          //style={{ height: "auto" }}
          className="object-contain w-full h-full transition-all duration-300"
          priority
        />
      </div>
    </Link>
  );
}
