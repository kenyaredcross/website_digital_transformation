import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center px-4 py-16 text-center">
      <div className="max-w-lg space-y-5">
        <SearchX aria-hidden="true" className="mx-auto h-11 w-11 text-red-600" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">404 · Page not found</p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">We can&apos;t find that page</h1>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">The link may be old, or the page may have moved. Choose a section to keep exploring.</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Go to homepage
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">Contact us</Link>
        </div>
      </div>
    </main>
  );
}
