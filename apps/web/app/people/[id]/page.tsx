import { ArrowLeft, Building2, FolderKanban, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Tag } from "@/components/ui/tag";
import { ApiError, getPerson } from "@/lib/api";

interface PersonPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PersonPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getPerson(id).catch(() => null);
  return { title: data?.person.name ?? "Person" };
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { id } = await params;
  let data;
  try {
    data = await getPerson(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/people"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700"
      >
        <ArrowLeft size={16} /> Back to people
      </Link>
      <header className="mt-6 border-b border-slate-200 pb-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg font-semibold text-blue-800">
            {data.person.name
              .split(" ")
              .slice(0, 2)
              .map((part) => part[0])
              .join("")}
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              {data.person.name}
            </h1>
            <p className="mt-1 font-medium text-blue-700">
              {data.person.title}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              {data.person.bio}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={15} /> {data.person.location}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          <section className="border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-base font-semibold text-slate-950">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <Tag key={skill.id}>{String(skill.name)}</Tag>
              ))}
            </div>
          </section>
          <section className="border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="font-semibold text-slate-950">Projects</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {data.projects.map((project) => (
                <article key={project.id} className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <FolderKanban
                      className="mt-0.5 shrink-0 text-slate-400"
                      size={18}
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {String(project.name)}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {String(project.summary ?? "")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <Tag key={technology.id}>{technology.name}</Tag>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
        <aside className="h-fit border border-slate-200 bg-white p-5 sm:p-6">
          <Building2 className="text-blue-700" size={20} />
          <h2 className="mt-4 text-sm font-semibold text-slate-950">
            Current company
          </h2>
          <p className="mt-2 text-base font-semibold text-slate-900">
            {data.company ? String(data.company.name) : "Not specified"}
          </p>
          {data.company ? (
            <p className="mt-1 text-sm text-slate-500">
              {String(data.company.industry ?? "")}
            </p>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
