import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-12 sm:px-6">
      <section
        className="w-full border border-slate-200 bg-white p-6 sm:p-10"
        aria-labelledby="not-found-title"
      >
        <span className="flex size-11 items-center justify-center rounded-md bg-blue-50 text-blue-700">
          <SearchX aria-hidden="true" size={22} />
        </span>
        <p className="mt-6 text-xs font-semibold tracking-[0.12em] text-blue-700 uppercase">
          Error 404
        </p>
        <h1
          id="not-found-title"
          className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
        >
          This page could not be found
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          The page may have moved, or the requested SkillGraph entity may no
          longer be available.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            <ArrowLeft aria-hidden="true" size={16} /> Return to dashboard
          </Link>
          <Link
            href="/people"
            className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Browse people
          </Link>
        </div>
      </section>
    </div>
  );
}
