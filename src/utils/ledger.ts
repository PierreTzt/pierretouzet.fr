/**
 * CARNET D'EXPÉRIENCES — dérivation du score.
 *
 * Le score affiché sur la home (« N paris lancés depuis 2025 ») n'est jamais
 * saisi à la main : il est calculé en comptant les statuts des entrées des
 * clusters. Cette contrainte rend structurellement impossible un score qui
 * contredirait le carnet.
 *
 * Seuls les statuts de LEDGER_STATUSES comptent comme des paris. Les entrées
 * en 'active' / 'paused' / 'archived' (études de cas, ce portfolio) sont
 * volontairement exclues du décompte.
 */
import type { ProjectStatus } from '../data/types';

export const LEDGER_STATUSES = ['revenue', 'published', 'relaunching', 'unsold', 'poc'] as const;

export type LedgerStatus = (typeof LEDGER_STATUSES)[number];

export function isLedgerStatus(status: ProjectStatus | undefined): status is LedgerStatus {
  return status !== undefined && (LEDGER_STATUSES as readonly string[]).includes(status);
}
