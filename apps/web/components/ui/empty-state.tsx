import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <SearchX
        className="mx-auto text-slate-400"
        aria-hidden="true"
        size={28}
      />
      <h2 className="mt-4 text-base font-semibold text-slate-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}
