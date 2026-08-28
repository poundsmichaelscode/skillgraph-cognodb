import type { Metadata } from "next";

import { GraphExplorer } from "@/components/graph/graph-explorer";
import { DataUnavailable } from "@/components/ui/data-unavailable";
import { PageHeader } from "@/components/ui/page-header";
import { getGraph, getPeoplePage } from "@/lib/api";

export const metadata: Metadata = { title: "Graph explorer" };
export const dynamic = "force-dynamic";

const INITIAL_PERSON_ID = "person-adeleke-olaniyi";

export default async function GraphPage() {
  const data = await Promise.all([
    getGraph("person", INITIAL_PERSON_ID),
    getPeoplePage({ limit: 50 }),
  ]).catch(() => null);

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 xl:px-10">
      <PageHeader
        eyebrow="Connected data"
        title="Graph explorer"
        description="Inspect how people, skills, projects and companies connect. Select a node to review its details or continue exploring from it."
      />
      {data ? (
        <GraphExplorer initialGraph={data[0]} people={data[1].data} />
      ) : (
        <DataUnavailable />
      )}
    </div>
  );
}
