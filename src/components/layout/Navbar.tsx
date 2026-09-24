"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { mainNav } from "@/data/navigation";
import { Menu, X, ArrowRight, Globe, ChevronDown, BookOpen, FlaskConical, Newspaper, BookText, Radio } from "lucide-react";

const DROPDOWN_ICONS: Record<string, React.ElementType> = {
  "/knowledge-hub": BookOpen,
  "/innovation-research": FlaskConical,
  "/stories/digital-stories": Radio,
  "/blog": BookText,
  "/stories/news-updates": Newspaper,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

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
          <BrandLogo variant="dark" size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" ref={dropdownRef}>
            {mainNav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href)) ||
                item.children?.some(
                  (child) =>
                    pathname === child.href ||
                    (child.href !== "/" && pathname.startsWith(child.href))
                );

              if (item.children && item.children.length > 0) {
                const isOpen = openDropdown === item.href;
                return (
                  <div key={item.href} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(isOpen ? null : item.href)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 font-semibold"
                          : "text-slate-700 hover:text-red-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
                      }`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:no-underline"
                      >
                        {item.title}
                      </Link>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown panel */}
                    {isOpen && (
                      <div className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="p-2 space-y-1">
                          {/* Parent link */}
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            All {item.title} →
                          </Link>
                          <div className="h-px bg-slate-100 dark:bg-slate-800 mx-2" />
                          {item.children.map((child) => {
                            const ChildIcon = DROPDOWN_ICONS[child.href];
                            const isChildActive =
                              pathname === child.href ||
                              (child.href !== "/" && pathname.startsWith(child.href));
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-colors group ${
                                  isChildActive
                                    ? "bg-red-50 dark:bg-red-950/40"
                                    : "hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                              >
                                {ChildIcon && (
                                  <div
                                    className={`p-2 rounded-lg shrink-0 mt-0.5 transition-colors ${
                                      isChildActive
                                        ? "bg-red-100 dark:bg-red-900/50"
                                        : "bg-slate-100 dark:bg-slate-800 group-hover:bg-red-50 dark:group-hover:bg-red-950/40"
                                    }`}
                                  >
                                    <ChildIcon
                                      className={`w-4 h-4 ${
                                        isChildActive
                                          ? "text-red-600 dark:text-red-400"
                                          : "text-slate-500 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400"
                                      }`}
                                    />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p
                                    className={`text-sm font-semibold leading-tight ${
                                      isChildActive
                                        ? "text-red-600 dark:text-red-400"
                                        : "text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400"
                                    }`}
                                  >
                                    {child.title}
                                  </p>
                                  {child.description && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                                      {child.description}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

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
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl px-4 py-6 transition-all animate-in slide-in-from-top duration-200 overflow-y-auto max-h-[calc(100vh-65px)]">
          <nav className="flex flex-col space-y-1">
            {mainNav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href)) ||
                item.children?.some(
                  (child) =>
                    pathname === child.href ||
                    (child.href !== "/" && pathname.startsWith(child.href))
                );

              return (
                <div key={item.href}>
                  <Link
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

                  {/* Mobile sub-items */}
                  {item.children && item.children.length > 0 && (
                    <div className="ml-4 mt-1 mb-2 pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-1">
                      {item.children.map((child) => {
                        const ChildIcon = DROPDOWN_ICONS[child.href];
                        const isChildActive =
                          pathname === child.href ||
                          (child.href !== "/" && pathname.startsWith(child.href));
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              isChildActive
                                ? "text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 font-semibold"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          >
                            {ChildIcon && <ChildIcon className="w-4 h-4 shrink-0" />}
                            <span>{child.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
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
