"use client";

import { Menu, Network, X } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { Navigation } from "./navigation";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="SkillGraph home"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-blue-700 text-white">
            <Network aria-hidden="true" size={19} strokeWidth={2} />
          </span>
          <span className="text-base font-semibold tracking-tight">
            SkillGraph
          </span>
        </Link>
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          aria-label={navigationOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={navigationOpen}
          onClick={() => setNavigationOpen((current) => !current)}
        >
          {navigationOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {navigationOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
          aria-label="Close navigation"
          onClick={() => setNavigationOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          navigationOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="SkillGraph home"
            onClick={() => setNavigationOpen(false)}
          >
            <span className="flex size-10 items-center justify-center rounded-md bg-blue-700 text-white">
              <Network aria-hidden="true" size={21} strokeWidth={2} />
            </span>
            <span>
              <span className="block text-base font-semibold tracking-tight">
                SkillGraph
              </span>
              <span className="block text-xs text-slate-500">
                Career intelligence
              </span>
            </span>
          </Link>
        </div>
        <Navigation onNavigate={() => setNavigationOpen(false)} />
        <div className="absolute inset-x-0 bottom-0 border-t border-slate-100 p-5">
          <p className="text-xs leading-5 text-slate-500">
            Connected career data powered by CognoDB.
          </p>
        </div>
      </aside>

      <main className="min-w-0 lg:pl-72">{children}</main>
    </div>
  );
}
