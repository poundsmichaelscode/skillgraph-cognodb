import {
  Building2,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Lightbulb,
  UserRound,
  Wrench,
} from "lucide-react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

import type { GraphNode } from "@/types/api";

export interface EntityNodeData extends Record<string, unknown> {
  entity: GraphNode;
  selected: boolean;
  center: boolean;
}

export type EntityFlowNode = Node<EntityNodeData, "entity">;

const presentation = {
  person: {
    icon: UserRound,
    className: "border-blue-700 bg-blue-700 text-white",
  },
  skill: {
    icon: Lightbulb,
    className: "border-cyan-700 bg-cyan-50 text-cyan-950",
  },
  technology: {
    icon: Wrench,
    className: "border-teal-700 bg-teal-50 text-teal-950",
  },
  project: {
    icon: FolderKanban,
    className: "border-amber-600 bg-amber-50 text-amber-950",
  },
  role: {
    icon: BriefcaseBusiness,
    className: "border-blue-500 bg-blue-50 text-blue-950",
  },
  company: {
    icon: Building2,
    className: "border-slate-500 bg-slate-50 text-slate-950",
  },
  learningResource: {
    icon: GraduationCap,
    className: "border-emerald-600 bg-emerald-50 text-emerald-950",
  },
} as const;

export function EntityNode({ data }: NodeProps<EntityFlowNode>) {
  const style = presentation[data.entity.type] ?? presentation.technology;
  const Icon = style.icon;

  return (
    <div
      className={`w-48 rounded-md border-2 px-3 py-3 shadow-sm transition-shadow ${style.className} ${
        data.selected ? "ring-4 ring-blue-200 ring-offset-2" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-2 !border-white !bg-slate-500"
      />
      <div className="flex items-start gap-2.5">
        <Icon className="mt-0.5 shrink-0" aria-hidden="true" size={17} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{data.entity.label}</p>
          <p className="mt-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase opacity-70">
            {data.center
              ? "Starting node"
              : data.entity.type.replace(/([A-Z])/g, " $1")}
          </p>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!size-2 !border-white !bg-slate-500"
      />
    </div>
  );
}
