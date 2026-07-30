import { describe, it, expect } from 'vitest';
import { LEDGER_STATUSES, isLedgerStatus } from '../utils/ledger';
import { getStatusDisplay } from '../utils/status-display';
import { data as frData } from '../data/fr';
import { data as enData } from '../data/en';
import { resolveStudioEntry } from '../utils/studio';
import type { SiteData, ProjectStatus } from '../data/types';

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
