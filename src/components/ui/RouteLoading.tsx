interface RouteLoadingProps {
  title: string;
  cards?: number;
  kind?: "cards" | "article" | "map";
}

export function RouteLoading({ title, cards = 3, kind = "cards" }: RouteLoadingProps) {
  return (
    <main aria-busy="true" aria-live="polite" className="min-h-[60vh] bg-slate-50 pb-12 pt-20 dark:bg-slate-950 sm:pb-16 sm:pt-24">
      <span className="sr-only">Loading {title}</span>
      <section className="border-b border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950 sm:py-14">
        <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-5 h-10 max-w-xl rounded-lg bg-slate-200 dark:bg-slate-800 sm:h-14" />
          <div className="mt-4 h-4 max-w-2xl rounded bg-slate-100 dark:bg-slate-900" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {kind === "map" ? (
          <div className="h-[420px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-900 sm:h-[560px]" />
        ) : kind === "article" ? (
          <div className="space-y-6 animate-pulse">
            <div className="aspect-[16/9] rounded-2xl bg-slate-200 dark:bg-slate-900" />
            <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-900" />
            <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-900" />
            <div className="h-4 w-5/6 rounded bg-slate-100 dark:bg-slate-900" />
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: cards }, (_, index) => (
              <div key={index} className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="aspect-[16/9] bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-5 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="h-3 w-2/3 rounded bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
