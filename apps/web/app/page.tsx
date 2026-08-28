import { Dashboard } from "@/components/dashboard/dashboard";
import { DataUnavailable } from "@/components/ui/data-unavailable";
import { getDashboardStats, getPeople } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const result = await Promise.all([getDashboardStats(), getPeople(4)])
    .then(([stats, people]) => ({ stats, people }))
    .catch(() => null);

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 xl:px-10">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold tracking-[0.12em] text-blue-700 uppercase">
          SkillGraph workspace
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          Career network overview
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Explore how people, skills, technologies, projects and job roles
          connect across the professional graph.
        </p>
      </header>

      {result ? (
        <Dashboard stats={result.stats} people={result.people} />
      ) : (
        <DataUnavailable />
      )}
    </div>
  );
}
