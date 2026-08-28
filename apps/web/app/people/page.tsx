import { ArrowUpRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DataUnavailable } from "@/components/ui/data-unavailable";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Pagination } from "@/components/ui/pagination";
import { SearchForm } from "@/components/ui/search-form";
import { getPeoplePage } from "@/lib/api";

export const metadata: Metadata = { title: "People" };
export const dynamic = "force-dynamic";

interface PeoplePageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function PeoplePage({ searchParams }: PeoplePageProps) {
  const parameters = await searchParams;
  const query = parameters.q?.trim() ?? "";
  const page = Math.max(1, Number(parameters.page) || 1);
  const result = await getPeoplePage({ query, page, limit: 12 }).catch(
    () => null,
  );

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 xl:px-10">
      <PageHeader
        eyebrow="People explorer"
        title="People and experience"
        description="Browse professionals and follow their skills, projects, employers and technology experience."
        action={
          <SearchForm
            defaultValue={query}
            placeholder="Search people"
            label="Search people"
          />
        }
      />
      {!result ? (
        <DataUnavailable />
      ) : result.data.length === 0 ? (
        <EmptyState
          title="No people found"
          description="Try a different name or clear the search to view everyone in the network."
        />
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-500">
            {result.meta.total} {result.meta.total === 1 ? "person" : "people"}{" "}
            found
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {result.data.map((person) => (
              <Link
                key={person.id}
                href={`/people/${person.id}`}
                className="group border border-slate-200 bg-white p-5 transition-colors hover:border-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                    {person.name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <ArrowUpRight
                    className="text-slate-400 transition-colors group-hover:text-blue-700"
                    size={18}
                  />
                </div>
                <h2 className="mt-5 font-semibold text-slate-950">
                  {person.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-blue-700">
                  {person.title}
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                  {person.bio}
                </p>
                <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin aria-hidden="true" size={14} /> {person.location}
                </p>
              </Link>
            ))}
          </div>
          <Pagination
            page={result.meta.page}
            totalPages={result.meta.totalPages}
            query={query}
          />
        </>
      )}
    </div>
  );
}
