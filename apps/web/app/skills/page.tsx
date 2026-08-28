import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DataUnavailable } from "@/components/ui/data-unavailable";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Pagination } from "@/components/ui/pagination";
import { SearchForm } from "@/components/ui/search-form";
import { Tag } from "@/components/ui/tag";
import { getSkillsPage } from "@/lib/api";

export const metadata: Metadata = { title: "Skills" };
export const dynamic = "force-dynamic";

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const parameters = await searchParams;
  const query = parameters.q?.trim() ?? "";
  const page = Math.max(1, Number(parameters.page) || 1);
  const result = await getSkillsPage({ query, page }).catch(() => null);
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 xl:px-10">
      <PageHeader
        eyebrow="Skills explorer"
        title="Skills across the network"
        description="See which people, projects, technologies and roles connect through each capability."
        action={
          <SearchForm
            defaultValue={query}
            placeholder="Search skills"
            label="Search skills"
          />
        }
      />
      {!result ? (
        <DataUnavailable />
      ) : result.data.length === 0 ? (
        <EmptyState
          title="No skills found"
          description="Try another skill name or clear the current search."
        />
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-500">
            {result.meta.total} skills found
          </p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {result.data.map((skill) => (
              <Link
                key={skill.id}
                href={`/skills/${skill.id}`}
                className="group border border-slate-200 bg-white p-5 hover:border-blue-300 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <Tag>{skill.category}</Tag>
                  <ArrowUpRight
                    className="text-slate-400 group-hover:text-blue-700"
                    size={18}
                  />
                </div>
                <h2 className="mt-5 font-semibold text-slate-950">
                  {skill.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {skill.description}
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
