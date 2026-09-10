"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { mainNav } from "@/data/navigation";
import { Menu, X, ArrowRight, Globe } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800/60 py-3"
          : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/40 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <BrandLogo variant={isScrolled ? "dark" : "light"} size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {mainNav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 font-semibold"
                      : "text-slate-700 hover:text-red-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA, Theme Toggle & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <ThemeToggle isScrolled={isScrolled} />

            <Link
              href="/portfolio"
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold shadow-sm transition-all hover:shadow hover:-translate-y-0.5 ${
                isScrolled
                  ? "text-white bg-red-600 hover:bg-red-700 active:bg-red-800"
                  : "text-white bg-red-600 hover:bg-red-700 active:bg-red-800"
              }`}
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg focus:outline-none transition-colors text-slate-700 hover:text-red-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl px-4 py-6 transition-all animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {mainNav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 font-bold"
                      : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{item.title}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-600" />}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Switch Theme</span>
                <ThemeToggle isScrolled={true} />
              </div>

              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://www.redcross.or.ke"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Official Kenya Red Cross Portal</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
