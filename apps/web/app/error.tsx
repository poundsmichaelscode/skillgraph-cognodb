"use client";

import { CircleAlert, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-12 sm:px-6">
      <section
        className="w-full border border-slate-200 bg-white p-6 sm:p-10"
        aria-labelledby="error-title"
      >
        <span className="flex size-11 items-center justify-center rounded-md bg-amber-50 text-amber-700">
          <CircleAlert aria-hidden="true" size={22} />
        </span>
        <p className="mt-6 text-xs font-semibold tracking-[0.12em] text-blue-700 uppercase">
          Unable to load this page
        </p>
        <h1
          id="error-title"
          className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
        >
          Something went wrong
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          SkillGraph could not load this information right now. Your database
          credentials and internal error details remain protected.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          <RefreshCw aria-hidden="true" size={16} /> Try again
        </button>
      </section>
    </div>
  );
}
