import { ArrowLeft, CheckCircle2, CodeXml } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Tag } from "@/components/ui/tag";
import { ApiError, getRole } from "@/lib/api";

export default async function RolePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let data;
  try {
    data = await getRole(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/roles"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700"
      >
        <ArrowLeft size={16} /> Back to roles
      </Link>
      <header className="mt-6 border-b border-slate-200 pb-7">
        <Tag>{data.role.level}</Tag>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          {data.role.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          {data.role.description}
        </p>
      </header>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-950">Required skills</h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {data.skills.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center gap-3 px-5 py-3.5"
              >
                <CheckCircle2 className="text-blue-700" size={17} />
                <span className="text-sm font-medium text-slate-800">
                  {String(skill.name)}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-950">Technologies</h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {data.technologies.map((technology) => (
              <li
                key={technology.id}
                className="flex items-center gap-3 px-5 py-3.5"
              >
                <CodeXml className="text-slate-500" size={17} />
                <span className="text-sm font-medium text-slate-800">
                  {String(technology.name)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
