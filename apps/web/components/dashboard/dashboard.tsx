import {
  BriefcaseBusiness,
  CodeXml,
  FolderKanban,
  Lightbulb,
  Network,
  Users,
} from "lucide-react";

import type { DashboardStats, PersonSummary } from "@/types/api";

import { StatCard } from "../ui/stat-card";

interface DashboardProps {
  stats: DashboardStats;
  people: PersonSummary[];
}

export function Dashboard({ stats, people }: DashboardProps) {
  const cards = [
    {
      label: "People",
      value: stats.people,
      icon: Users,
      description: "Professionals represented in the network.",
    },
    {
      label: "Skills",
      value: stats.skills,
      icon: Lightbulb,
      description: "Capabilities connected to people and roles.",
    },
    {
      label: "Technologies",
      value: stats.technologies,
      icon: CodeXml,
      description: "Tools used across projects and job roles.",
    },
    {
      label: "Projects",
      value: stats.projects,
      icon: FolderKanban,
      description: "Realistic work contexts connecting the graph.",
    },
    {
      label: "Job roles",
      value: stats.roles,
      icon: BriefcaseBusiness,
      description: "Career targets with explicit requirements.",
    },
  ];

  return (
    <>
      <section aria-labelledby="network-overview">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2
              id="network-overview"
              className="text-base font-semibold text-slate-950"
            >
              Network overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Live totals from the CognoDB graph.
            </p>
          </div>
          <div className="hidden items-center gap-2 text-xs font-medium text-emerald-700 sm:flex">
            <span className="size-2 rounded-full bg-emerald-500" />
            Data service connected
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
        <section
          className="border border-slate-200 bg-white"
          aria-labelledby="people-heading"
        >
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2
              id="people-heading"
              className="text-base font-semibold text-slate-950"
            >
              People in the network
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A snapshot of professionals available for exploration.
            </p>
          </div>
          <ul className="divide-y divide-slate-100">
            {people.map((person) => (
              <li
                key={person.id}
                className="flex items-center gap-4 px-5 py-4 sm:px-6"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                  {person.name
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {person.name}
                  </p>
                  <p className="truncate text-sm text-slate-500">
                    {person.title} · {person.location}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside
          className="border border-blue-200 bg-blue-50 p-6"
          aria-labelledby="graph-value"
        >
          <span className="flex size-10 items-center justify-center rounded-md bg-blue-700 text-white">
            <Network aria-hidden="true" size={20} />
          </span>
          <h2
            id="graph-value"
            className="mt-5 text-base font-semibold text-slate-950"
          >
            Built for connected questions
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            SkillGraph connects people, work, technologies and role requirements
            so career readiness can be evaluated through relationships instead
            of isolated records.
          </p>
          <div className="mt-5 border-t border-blue-200 pt-4">
            <p className="text-xs font-semibold tracking-wide text-blue-800 uppercase">
              Strongest workflow
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Person → missing skills → learning resources
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
