import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Tag } from "@/components/ui/tag";
import { ApiError, getSkill } from "@/lib/api";

export default async function SkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let data;
  try {
    data = await getSkill(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
  const groups = [
    { title: "People with this skill", items: data.people, property: "name" },
    { title: "Projects requiring it", items: data.projects, property: "name" },
    { title: "Roles requiring it", items: data.roles, property: "title" },
  ];
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/skills"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700"
      >
        <ArrowLeft size={16} /> Back to skills
      </Link>
      <header className="mt-6 border-b border-slate-200 pb-7">
        <Tag>{data.skill.category}</Tag>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          {data.skill.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          {data.skill.description}
        </p>
      </header>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {groups.map((group) => (
          <section
            key={group.title}
            className="border border-slate-200 bg-white"
          >
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-950">{group.title}</h2>
              <p className="mt-1 text-xs text-slate-500">
                {group.items.length} connected
              </p>
            </div>
            <ul className="divide-y divide-slate-100">
              {group.items.map((item) => (
                <li
                  key={item.id}
                  className="px-5 py-3 text-sm font-medium text-slate-700"
                >
                  {String(item[group.property] ?? "")}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {data.technologies.length > 0 ? (
        <section className="mt-6 border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-950">Related technologies</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.technologies.map((technology) => (
              <Tag key={technology.id}>{technology.name}</Tag>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
