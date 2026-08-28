import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  description: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  description,
}: StatCardProps) {
  return (
    <article className="border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 tabular-nums">
            {value.toLocaleString()}
          </p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
          <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
        </span>
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">{description}</p>
    </article>
  );
}
