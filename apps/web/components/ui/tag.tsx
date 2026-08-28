import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
      {children}
    </span>
  );
}
