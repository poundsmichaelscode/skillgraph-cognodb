'use client';

import { BriefcaseBusiness, LayoutDashboard, Lightbulb, Target, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  onNavigate?: () => void;
}

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/people', label: 'People', icon: Users },
  { href: '/skills', label: 'Skills', icon: Lightbulb },
  { href: '/roles', label: 'Job roles', icon: BriefcaseBusiness },
  { href: '/career', label: 'Career gap', icon: Target },
];

export function Navigation({ onNavigate }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="px-4 py-6" aria-label="Primary navigation">
      <p className="px-3 pb-2 text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
        Workspace
      </p>
      <ul className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                {...(onNavigate ? { onClick: onNavigate } : {})}
                {...(active ? { 'aria-current': 'page' as const } : {})}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                  active
                    ? 'bg-blue-50 text-blue-800'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
