import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-[0.12em] text-blue-700 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          {description}
        </p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
