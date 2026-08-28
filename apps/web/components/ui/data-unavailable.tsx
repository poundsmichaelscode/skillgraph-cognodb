import { CircleAlert, RefreshCw } from "lucide-react";
import Link from "next/link";

export function DataUnavailable() {
  return (
    <div
      className="border border-amber-200 bg-amber-50 p-6 sm:p-8"
      role="alert"
    >
      <div className="flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-amber-100 text-amber-800">
          <CircleAlert aria-hidden="true" size={20} />
        </span>
        <div>
          <h2 className="font-semibold text-slate-950">
            Graph data is temporarily unavailable
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
            SkillGraph could not reach its data service. Confirm that the API is
            running and try again. No database details have been exposed.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            <RefreshCw aria-hidden="true" size={16} />
            Try again
          </Link>
        </div>
      </div>
    </div>
  );
}
