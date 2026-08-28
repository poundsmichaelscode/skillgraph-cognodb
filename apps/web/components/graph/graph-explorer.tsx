"use client";

import { CircleAlert, RotateCcw } from "lucide-react";
import { useState } from "react";

import { ApiError, getGraph } from "@/lib/api";
import type { GraphNode, GraphResult, PersonSummary } from "@/types/api";

import { GraphCanvas } from "./graph-canvas";
import { NodeDetails } from "./node-details";

interface GraphExplorerProps {
  initialGraph: GraphResult;
  people: PersonSummary[];
}

export function GraphExplorer({ initialGraph, people }: GraphExplorerProps) {
  const [startingGraph, setStartingGraph] = useState(initialGraph);
  const [graph, setGraph] = useState(initialGraph);
  const [selectedNode, setSelectedNode] = useState<GraphNode>(
    initialGraph.center,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadGraph(
    type: GraphNode["type"],
    id: string,
  ): Promise<GraphResult | null> {
    setLoading(true);
    setError(null);
    try {
      return await getGraph(type, id);
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? caught.message
          : "These connections could not be loaded.",
      );
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function changePerson(personId: string) {
    if (!personId || personId === startingGraph.center.id) return;
    const nextGraph = await loadGraph("person", personId);
    if (!nextGraph) return;

    setStartingGraph(nextGraph);
    setGraph(nextGraph);
    setSelectedNode(nextGraph.center);
  }

  async function exploreSelectedNode() {
    if (selectedNode.id === graph.center.id) return;
    const nextGraph = await loadGraph(selectedNode.type, selectedNode.id);
    if (!nextGraph) return;

    setGraph(nextGraph);
    setSelectedNode(nextGraph.center);
  }

  function resetGraph() {
    setGraph(startingGraph);
    setSelectedNode(startingGraph.center);
    setError(null);
  }

  return (
    <section className="mt-8 overflow-hidden border border-slate-200 bg-white">
      <div className="grid gap-4 border-b border-slate-200 px-5 py-4 sm:px-6 lg:grid-cols-[minmax(220px,360px)_1fr_auto] lg:items-end">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800">
            Starting person
          </span>
          <select
            value={startingGraph.center.id}
            disabled={loading}
            onChange={(event) => void changePerson(event.target.value)}
            className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-wait disabled:bg-slate-100"
          >
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name} — {person.title}
              </option>
            ))}
          </select>
        </label>

        <div className="min-w-0">
          <h2 className="truncate font-semibold text-slate-950">
            {graph.center.label}&apos;s network
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {graph.nodes.length} nodes · {graph.edges.length} relationships
          </p>
        </div>

        <button
          type="button"
          onClick={resetGraph}
          disabled={loading}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-wait disabled:text-slate-400"
        >
          <RotateCcw aria-hidden="true" size={15} />
          Reset graph
        </button>
      </div>

      {error ? (
        <div
          className="flex items-start gap-3 border-b border-amber-200 bg-amber-50 px-5 py-4"
          role="alert"
        >
          <CircleAlert
            className="mt-0.5 shrink-0 text-amber-700"
            aria-hidden="true"
            size={18}
          />
          <p className="text-sm text-slate-700">{error}</p>
        </div>
      ) : null}

      <div className="grid min-w-0 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div
          className={`min-w-0 bg-slate-50 transition-opacity ${loading ? "pointer-events-none opacity-60" : ""}`}
        >
          <GraphCanvas
            graph={graph}
            selectedId={selectedNode.id}
            onSelect={setSelectedNode}
          />
        </div>
        <NodeDetails
          node={selectedNode}
          isCenter={selectedNode.id === graph.center.id}
          loading={loading}
          onExplore={exploreSelectedNode}
        />
      </div>
    </section>
  );
}
