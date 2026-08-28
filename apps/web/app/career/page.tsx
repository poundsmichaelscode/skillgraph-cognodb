import type { Metadata } from 'next';

import { CareerExplorer } from '@/components/career/career-explorer';
import { DataUnavailable } from '@/components/ui/data-unavailable';
import { PageHeader } from '@/components/ui/page-header';
import { getPeoplePage, getRolesPage } from '@/lib/api';

export const metadata: Metadata = { title: 'Career gap' };
export const dynamic = 'force-dynamic';

export default async function CareerPage() {
  const data = await Promise.all([getPeoplePage({ limit: 50 }), getRolesPage({ limit: 50 })]).catch(
    () => null,
  );

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 xl:px-10">
      <PageHeader
        eyebrow="Career intelligence"
        title="Career skill gap explorer"
        description="Compare a person's current capabilities with a target role and turn missing skills into a practical learning plan."
      />
      {data ? <CareerExplorer people={data[0].data} roles={data[1].data} /> : <DataUnavailable />}
    </div>
  );
}
