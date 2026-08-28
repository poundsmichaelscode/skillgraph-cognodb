import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DataUnavailable } from "@/components/ui/data-unavailable";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Pagination } from "@/components/ui/pagination";
import { SearchForm } from "@/components/ui/search-form";
import { Tag } from "@/components/ui/tag";
import { getRolesPage } from "@/lib/api";

export const metadata: Metadata = { title: "Job roles" };
export const dynamic = "force-dynamic";

export default async function RolesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const parameters = await searchParams;
  const query = parameters.q?.trim() ?? "";
  const page = Math.max(1, Number(parameters.page) || 1);
  const result = await getRolesPage({ query, page }).catch(() => null);
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 xl:px-10">
      <PageHeader
        eyebrow="Role explorer"
        title="Explore career roles"
        description="Inspect the skills and technologies expected for each role in the graph."
        action={
          <SearchForm
            defaultValue={query}
            placeholder="Search roles"
            label="Search roles"
          />
        }
      />
      {!result ? (
        <DataUnavailable />
      ) : result.data.length === 0 ? (
        <EmptyState
          title="No roles found"
          description="Try another job title or clear the current search."
        />
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-500">
            {result.meta.total} roles found
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {result.data.map((role) => (
              <Link
                key={role.id}
                href={`/roles/${role.id}`}
                className="group border border-slate-200 bg-white p-5 hover:border-blue-300 sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <Tag>{role.level}</Tag>
                  <ArrowUpRight
                    className="text-slate-400 group-hover:text-blue-700"
                    size={18}
                  />
                </div>
                <h2 className="mt-5 font-semibold text-slate-950">
                  {role.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {role.description}
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
