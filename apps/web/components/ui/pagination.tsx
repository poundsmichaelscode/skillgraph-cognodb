import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  query: string;
}

function pageHref(page: number, query: string): string {
  const parameters = new URLSearchParams({ page: String(page) });
  if (query) parameters.set("q", query);
  return `?${parameters.toString()}`;
}

export function Pagination({ page, totalPages, query }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5"
      aria-label="Pagination"
    >
      {page > 1 ? (
        <Link
          href={pageHref(page - 1, query)}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <ChevronLeft aria-hidden="true" size={16} /> Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm text-slate-500">
        Page <strong className="font-semibold text-slate-800">{page}</strong> of{" "}
        {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={pageHref(page + 1, query)}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Next <ChevronRight aria-hidden="true" size={16} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
