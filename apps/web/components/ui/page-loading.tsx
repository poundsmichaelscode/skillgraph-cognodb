import { Skeleton } from "./skeleton";

export function PageLoading() {
  return (
    <div
      className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 xl:px-10"
      aria-busy="true"
      aria-label="Loading page"
    >
      <span className="sr-only">Loading SkillGraph data…</span>
      <header className="border-b border-slate-200 pb-6">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-3 h-9 w-full max-w-sm" />
        <Skeleton className="mt-3 h-4 w-full max-w-2xl" />
      </header>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="border border-slate-200 bg-white p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-4 h-8 w-20" />
              </div>
              <Skeleton className="size-10 rounded-md" />
            </div>
            <Skeleton className="mt-5 h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-3/4" />
          </div>
        ))}
      </div>
      <div className="mt-8 border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-3 h-4 w-full max-w-md" />
        </div>
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex items-center gap-4 p-5 sm:px-6">
              <Skeleton className="size-10 shrink-0 rounded-md" />
              <div className="flex-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="mt-2 h-3 w-full max-w-xs" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
