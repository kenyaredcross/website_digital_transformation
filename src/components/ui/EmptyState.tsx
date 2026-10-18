import type { LucideIcon } from "lucide-react";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  tone?: "empty" | "error";
}

export function EmptyState({ title, description, icon: Icon = SearchX, action, tone = "empty" }: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-12">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-red-500/5 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${tone === "error" ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400" : "border-red-100 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"}`}>
          <Icon aria-hidden className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        {action}
      </div>
    </div>
  );
}
