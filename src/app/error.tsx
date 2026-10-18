"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public page rendering failed:", error);
  }, [error]);

  return (
    <main role="alert" className="flex min-h-[60vh] items-center justify-center px-4 py-20 text-center">
      <div className="max-w-lg space-y-5">
        <AlertTriangle aria-hidden="true" className="mx-auto h-10 w-10 text-amber-600" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">This page couldn&apos;t load</h1>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          We couldn&apos;t load this page&apos;s content right now. Please try again in a moment.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          <RefreshCw aria-hidden="true" className="h-4 w-4" />
          Try again
        </button>
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 underline-offset-4 hover:text-red-600 hover:underline dark:text-slate-300">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
