"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  isScrolled?: boolean;
}

export function ThemeToggle({ className = "", isScrolled = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center ${
        theme === "dark"
          ? isScrolled
            ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700 hover:border-amber-400/50"
            : "bg-slate-900/80 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-amber-400/50 backdrop-blur-md"
          : isScrolled
          ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900 hover:border-slate-400"
          : "bg-white/90 border-slate-200 text-slate-800 hover:bg-white hover:border-slate-400 shadow-sm backdrop-blur-md"
      } ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 transition-transform duration-500 rotate-0 hover:rotate-90 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-500 rotate-0 hover:-rotate-12 text-slate-700" />
      )}
    </button>
  );
}
