import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";

export function ContentErrorState({ title = "Content is temporarily unavailable", description = "We couldn’t load this information right now. Please try again shortly, or contact us if the problem continues." }: { title?: string; description?: string }) {
  return (
    <div role="alert" className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-10 text-center dark:border-amber-900/50 dark:bg-amber-950/20 sm:px-8">
      <AlertTriangle aria-hidden="true" className="mx-auto h-9 w-9 text-amber-700 dark:text-amber-400" />
      <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
      <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
        <button type="button" onClick={() => window.location.reload()} className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">Try again</button>
        <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">Contact us <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  );
}
