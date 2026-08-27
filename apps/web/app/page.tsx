import { Network } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-5 py-16 sm:px-8">
      <section aria-labelledby="page-title" className="max-w-2xl">
        <div className="mb-6 inline-flex items-center gap-2 border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium">
          <Network aria-hidden="true" className="size-4 text-[var(--accent)]" />
          Graph-powered career intelligence
        </div>
        <h1 id="page-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
          SkillGraph foundation is ready.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
          The web and API workspaces are initialized. CognoDB connectivity and graph data are added
          in the next phases.
        </p>
      </section>
    </main>
  );
}
