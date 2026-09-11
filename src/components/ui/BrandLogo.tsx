import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ variant = "dark", size = "md" }: BrandLogoProps) {
  const imgSizes = {
    sm: { w: 32, h: 32, cls: "w-8 h-8" },
    md: { w: 44, h: 44, cls: "w-11 h-11" },
    lg: { w: 56, h: 56, cls: "w-14 h-14" },
  };

  const textPrimary =
    variant === "light" ? "text-white" : "text-slate-900 dark:text-white";
  const textSecondary =
    variant === "light"
      ? "text-red-200"
      : "text-red-600 dark:text-red-400";

  const { w, h, cls } = imgSizes[size];

  return (
    <Link
      href="/"
      className="group flex items-center gap-3 transition-opacity hover:opacity-95"
    >
      {/* KRCS Logo */}
      <div
        className={`relative ${cls} shrink-0 rounded-full overflow-hidden bg-white shadow-sm ring-1 ring-slate-200/60`}
      >
        <Image
          src="/assets/images/logo/KRCS_logo.jpeg"
          alt="Kenya Red Cross Society logo"
          width={w}
          height={h}
          className="object-contain w-full h-full"
          priority
        />
      </div>

     
    </Link>
  );
}
