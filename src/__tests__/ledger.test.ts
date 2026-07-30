import { describe, it, expect } from 'vitest';
import { LEDGER_STATUSES, isLedgerStatus, computeLedger } from '../utils/ledger';
import { getStatusDisplay } from '../utils/status-display';
import { data as frData } from '../data/fr';
import { data as enData } from '../data/en';
import { resolveStudioEntry } from '../utils/studio';
import type { SiteData, ProjectStatus, Project, StudioExternalSite } from '../data/types';

const ALL_STATUSES: ProjectStatus[] = [
  'revenue',
  'published',
  'relaunching',
  'unsold',
  'poc',
  'active',
  'paused',
  'archived',
];

function statusesInClusters(data: SiteData): (ProjectStatus | undefined)[] {
  return data.studioClusters.flatMap((cluster) =>
    cluster.entries.map((ref) => resolveStudioEntry(ref, data)?.data.status),
  );
}

describe('vocabulaire des statuts', () => {
  it('expose les cinq statuts du carnet dans l’ordre', () => {
    expect([...LEDGER_STATUSES]).toEqual(['revenue', 'published', 'relaunching', 'unsold', 'poc']);
  });

  it('rend chaque statut dans les deux langues', () => {
    for (const status of ALL_STATUSES) {
      for (const lang of ['fr', 'en'] as const) {
        const display = getStatusDisplay(status, lang);
        expect(display.label).toBeTruthy();
        expect(display.class).toBeTruthy();
      }
    }
  });

  it('n’utilise que des statuts connus dans les données FR et EN', () => {
    for (const data of [frData, enData]) {
      for (const status of statusesInClusters(data)) {
        if (status === undefined) continue;
        expect(ALL_STATUSES).toContain(status);
      }
    }
  });
});

describe('isLedgerStatus', () => {
  it('renvoie true pour chacun des cinq statuts du carnet', () => {
    for (const status of LEDGER_STATUSES) {
      expect(isLedgerStatus(status)).toBe(true);
    }
  });

  it('renvoie false pour les statuts hors carnet', () => {
    const nonLedgerStatuses = ['active', 'paused', 'archived'] as const;
    for (const status of nonLedgerStatuses) {
      expect(isLedgerStatus(status)).toBe(false);
    }
  });

  it('renvoie false pour undefined', () => {
    expect(isLedgerStatus(undefined)).toBe(false);
  });
});

function makeLedgerData(statuses: (ProjectStatus | undefined)[]): SiteData {
  const projects: Project[] = statuses.map((status, i) => ({
    id: `p${i}`,
    slug: `p${i}`,
    title: `Project ${i}`,
    shortDescription: '',
    longDescription: '',
    technologies: [],
    imageAlt: '',
    featured: false,
    status,
  }));
  return {
    personal: {} as never,
    social: [],
    experiences: [],
    projects,
    studioSites: [] as StudioExternalSite[],
    studioClusters: [
      {
        id: 'c1',
        title: 'Cluster',
        description: '',
        entries: projects.map((p) => ({ kind: 'project' as const, projectSlug: p.slug })),
      },
    ],
    skillCategories: [],
    ui: {} as never,
  } as unknown as SiteData;
}

describe('computeLedger', () => {
  it('compte les paris par statut', () => {
    const ledger = computeLedger(makeLedgerData(['revenue', 'poc', 'poc', 'poc']));
    expect(ledger.total).toBe(4);
    expect(ledger.counts).toEqual([
      { status: 'revenue', count: 1 },
      { status: 'poc', count: 3 },
    ]);
  });

  it('ordonne les compteurs selon LEDGER_STATUSES', () => {
    const ledger = computeLedger(makeLedgerData(['poc', 'revenue', 'unsold']));
    expect(ledger.counts.map((c) => c.status)).toEqual(['revenue', 'unsold', 'poc']);
  });

  it('exclut les statuts hors carnet du décompte', () => {
    const ledger = computeLedger(makeLedgerData(['revenue', 'active', 'paused', undefined]));
    expect(ledger.total).toBe(1);
    expect(ledger.counts).toEqual([{ status: 'revenue', count: 1 }]);
  });

  it('omet les compteurs à zéro', () => {
    expect(computeLedger(makeLedgerData(['revenue'])).counts).toHaveLength(1);
  });

  it('retourne un carnet vide sans entrée', () => {
    expect(computeLedger(makeLedgerData([]))).toEqual({ total: 0, counts: [] });
  });

  it('ignore les références non résolues', () => {
    const data = makeLedgerData(['revenue']);
    data.studioClusters[0].entries.push({ kind: 'project', projectSlug: 'inexistant' });
    expect(computeLedger(data).total).toBe(1);
  });
});
