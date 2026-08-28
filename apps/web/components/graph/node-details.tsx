import { ArrowRight, Network } from "lucide-react";

import type { GraphNode } from "@/types/api";

interface NodeDetailsProps {
  node: GraphNode;
  isCenter: boolean;
  loading: boolean;
  onExplore: () => void;
}

function displayValue(value: unknown): string | null {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }
  return null;
}

export function NodeDetails({
  node,
  isCenter,
  loading,
  onExplore,
}: NodeDetailsProps) {
  const properties = Object.entries(node.properties)
    .filter(([key, value]) => key !== "id" && displayValue(value) !== null)
    .slice(0, 7);

  return (
    <aside
      className="border-t border-slate-200 bg-white p-5 xl:border-t-0 xl:border-l xl:p-6"
      aria-label="Selected node details"
    >
      <div className="flex items-center gap-2 text-blue-700">
        <Network aria-hidden="true" size={18} />
        <p className="text-xs font-semibold tracking-[0.12em] uppercase">
          Selected node
        </p>
      </div>
      <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">
        {node.label}
      </h2>
      <p className="mt-1 text-sm capitalize text-slate-500">
        {node.type.replace(/([A-Z])/g, " $1")}
      </p>

      {properties.length > 0 ? (
        <dl className="mt-6 divide-y divide-slate-100 border-y border-slate-100">
          {properties.map(([key, value]) => (
            <div key={key} className="py-3">
              <dt className="text-[11px] font-semibold tracking-[0.08em] text-slate-400 uppercase">
                {key.replace(/([A-Z])/g, " $1")}
              </dt>
              <dd className="mt-1 break-words text-sm leading-5 text-slate-700">
                {displayValue(value)}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-6 text-sm text-slate-500">
          No additional details are available.
        </p>
      )}

      <button
        type="button"
        disabled={isCenter || loading}
        onClick={onExplore}
        className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
      >
        {isCenter
          ? "Current starting node"
          : loading
            ? "Loading connections…"
            : "Explore connections"}
        {!isCenter && !loading ? (
          <ArrowRight aria-hidden="true" size={16} />
        ) : null}
      </button>
    </aside>
  );
}
