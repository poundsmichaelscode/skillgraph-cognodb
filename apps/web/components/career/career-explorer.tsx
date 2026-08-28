'use client';

import {
  ArrowRight,
  BookOpen,
  Check,
  CircleAlert,
  ExternalLink,
  LoaderCircle,
  Target,
  X,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';

import { ApiError, getCareerPath } from '@/lib/api';
import type { CareerPathResult, CareerSkill, PersonSummary, RoleSummary } from '@/types/api';

import { Tag } from '../ui/tag';

interface CareerExplorerProps {
  people: PersonSummary[];
  roles: RoleSummary[];
}

function SkillList({ skills, tone }: { skills: CareerSkill[]; tone: 'existing' | 'missing' }) {
  const Icon = tone === 'existing' ? Check : X;

  return (
    <ul className="divide-y divide-slate-100">
      {skills.map((skill) => (
        <li key={skill.id} className="flex items-start gap-3 px-5 py-4 sm:px-6">
          <span
            className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
              tone === 'existing' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}
          >
            <Icon aria-hidden="true" size={14} strokeWidth={2.5} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">{skill.name}</p>
            <p className="mt-1 text-xs text-slate-500">
              {skill.category ?? 'General'}
              {skill.requiredLevel ? ` · Requires ${skill.requiredLevel}` : ''}
              {skill.currentLevel ? ` · Current ${skill.currentLevel}` : ''}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CareerResults({ result }: { result: CareerPathResult }) {
  return (
    <div className="mt-8 space-y-6" aria-live="polite">
      <section className="border border-slate-200 bg-white p-5 sm:p-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-blue-700 uppercase">
              Career readiness
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              {result.person.name} → {result.role.title}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {result.existingSkills.length} of{' '}
              {result.existingSkills.length + result.missingSkills.length} required skills matched
            </p>
          </div>
          <div className="min-w-40">
            <div className="flex items-end justify-between gap-4">
              <span className="text-sm font-medium text-slate-600">Readiness</span>
              <strong className="text-3xl font-semibold tracking-tight text-slate-950 tabular-nums">
                {result.readinessPercentage}%
              </strong>
            </div>
            <div
              className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-label="Career readiness"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={result.readinessPercentage}
            >
              <div
                className="h-full rounded-full bg-blue-700 transition-[width] duration-500"
                style={{ width: `${result.readinessPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-950">Skills already matched</h2>
            <p className="mt-1 text-sm text-slate-500">
              Existing capabilities that support this role.
            </p>
          </div>
          {result.existingSkills.length > 0 ? (
            <SkillList skills={result.existingSkills} tone="existing" />
          ) : (
            <p className="px-5 py-8 text-sm text-slate-500 sm:px-6">
              No required skills currently overlap with this role.
            </p>
          )}
        </section>

        <section className="border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-950">Skills to develop</h2>
            <p className="mt-1 text-sm text-slate-500">
              Missing capabilities identified through the graph.
            </p>
          </div>
          {result.missingSkills.length > 0 ? (
            <SkillList skills={result.missingSkills} tone="missing" />
          ) : (
            <p className="px-5 py-8 text-sm text-emerald-700 sm:px-6">
              This person currently matches every required skill.
            </p>
          )}
        </section>
      </div>

      {result.missingSkills.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <section className="border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="font-semibold text-slate-950">Associated technologies</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Technologies connected to work that requires the missing skills.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {result.technologies.length > 0 ? (
                result.technologies.map((technology) => (
                  <Tag key={technology.id}>{technology.name}</Tag>
                ))
              ) : (
                <p className="text-sm text-slate-500">No associated technologies found.</p>
              )}
            </div>
          </section>

          <section className="border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2">
                <BookOpen className="text-blue-700" aria-hidden="true" size={19} />
                <h2 className="font-semibold text-slate-950">Recommended learning</h2>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Resources that directly teach one or more missing skills.
              </p>
            </div>
            {result.recommendations.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {result.recommendations.map((resource) => (
                  <li key={resource.id} className="px-5 py-4 sm:px-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{resource.title}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {resource.format ?? 'Resource'} · Covers {resource.teachesSkillIds.length}{' '}
                          {resource.teachesSkillIds.length === 1 ? 'skill' : 'skills'}
                        </p>
                      </div>
                      {resource.url ? (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${resource.title}`}
                          className="shrink-0 text-slate-400 transition-colors hover:text-blue-700"
                        >
                          <ExternalLink aria-hidden="true" size={17} />
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-5 py-8 text-sm text-slate-500 sm:px-6">
                No learning resources currently cover these missing skills.
              </p>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}

export function CareerExplorer({ people, roles }: CareerExplorerProps) {
  const [personId, setPersonId] = useState('');
  const [roleId, setRoleId] = useState('');
  const [result, setResult] = useState<CareerPathResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!personId || !roleId) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      setResult(await getCareerPath(personId, roleId));
    } catch (caught) {
      setError(
        caught instanceof ApiError ? caught.message : 'The career analysis could not be completed.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={analyze} className="border border-slate-200 bg-white p-5 sm:p-7">
        <div className="grid items-end gap-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto]">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800">Current person</span>
            <select
              value={personId}
              onChange={(event) => setPersonId(event.target.value)}
              className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select a person</option>
              {people.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name} — {person.title}
                </option>
              ))}
            </select>
          </label>

          <span className="hidden h-11 items-center justify-center text-slate-400 lg:flex">
            <ArrowRight aria-hidden="true" size={20} />
          </span>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800">Target role</span>
            <select
              value={roleId}
              onChange={(event) => setRoleId(event.target.value)}
              className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.title} — {role.level}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            disabled={!personId || !roleId || loading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" size={17} />
            ) : (
              <Target aria-hidden="true" size={17} />
            )}
            {loading ? 'Analyzing…' : 'Analyze gap'}
          </button>
        </div>
      </form>

      {error ? (
        <div
          className="mt-6 flex items-start gap-3 border border-amber-200 bg-amber-50 p-4"
          role="alert"
        >
          <CircleAlert className="mt-0.5 shrink-0 text-amber-700" aria-hidden="true" size={18} />
          <p className="text-sm text-slate-700">{error}</p>
        </div>
      ) : null}

      {result ? <CareerResults result={result} /> : null}
    </>
  );
}
