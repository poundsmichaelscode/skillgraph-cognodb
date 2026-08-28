"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react";
import { useMemo } from "react";

import type { GraphNode, GraphResult } from "@/types/api";

import { EntityNode, type EntityFlowNode } from "./entity-node";

interface GraphCanvasProps {
  graph: GraphResult;
  selectedId: string;
  onSelect: (node: GraphNode) => void;
}

const nodeTypes = { entity: EntityNode };

function layoutNodes(graph: GraphResult, selectedId: string): EntityFlowNode[] {
  const centerX = 420;
  const centerY = 290;
  const neighbours = graph.nodes.filter((node) => node.id !== graph.center.id);
  const radiusX = neighbours.length > 6 ? 360 : 300;
  const radiusY = neighbours.length > 6 ? 245 : 205;

  return graph.nodes.map((node) => {
    if (node.id === graph.center.id) {
      return {
        id: node.id,
        type: "entity",
        position: { x: centerX, y: centerY },
        data: { entity: node, selected: node.id === selectedId, center: true },
      };
    }

    const index = neighbours.findIndex((candidate) => candidate.id === node.id);
    const angle =
      (index / Math.max(neighbours.length, 1)) * Math.PI * 2 - Math.PI / 2;

    return {
      id: node.id,
      type: "entity",
      position: {
        x: centerX + Math.cos(angle) * radiusX,
        y: centerY + Math.sin(angle) * radiusY,
      },
      data: { entity: node, selected: node.id === selectedId, center: false },
    };
  });
}

function graphEdges(graph: GraphResult): Edge[] {
  return graph.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.type.replaceAll("_", " ").toLowerCase(),
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
    style: { stroke: "#94a3b8", strokeWidth: 1.5 },
    labelStyle: { fill: "#475569", fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: "#ffffff", fillOpacity: 0.92 },
    labelBgPadding: [5, 3],
    labelBgBorderRadius: 3,
  }));
}

export function GraphCanvas({ graph, selectedId, onSelect }: GraphCanvasProps) {
  const nodes = useMemo(
    () => layoutNodes(graph, selectedId),
    [graph, selectedId],
  );
  const edges = useMemo(() => graphEdges(graph), [graph]);

  const handleNodeClick: NodeMouseHandler<EntityFlowNode> = (_event, node) => {
    onSelect(node.data.entity);
  };

  return (
    <div
      className="h-[560px] min-h-[460px] w-full sm:h-[640px]"
      aria-label="Interactive relationship graph"
    >
      <ReactFlow
        key={graph.center.id}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.18, maxZoom: 1.15 }}
        minZoom={0.35}
        maxZoom={1.7}
        nodesConnectable={false}
        nodesDraggable
        elementsSelectable
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1}
          color="#cbd5e1"
        />
        <Controls position="bottom-left" showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
