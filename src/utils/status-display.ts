/**
 * PRÉSENTATION DES STATUTS — source unique de vérité pour le rendu.
 *
 * Libellés et classes de badge d'un ProjectStatus, dans les deux langues.
 * StudioEntryCard et LedgerSection consomment tous deux ce module : ne jamais
 * redéfinir un libellé ou une couleur de statut ailleurs.
 */
import type { ProjectStatus } from '../data/types';
import type { Lang } from '../i18n/utils';

interface StatusDisplay {
  label: string;
  class: string;
}

const LABELS: Record<ProjectStatus, { fr: string; en: string }> = {
  revenue: { fr: 'Revenus', en: 'Revenue' },
  published: { fr: 'Publié', en: 'Published' },
  relaunching: { fr: 'Relance en cours', en: 'Relaunching' },
  unsold: { fr: 'Livré · non vendu', en: 'Shipped · unsold' },
  poc: { fr: 'POC · non lancé', en: 'POC · never launched' },
  active: { fr: 'Actif', en: 'Active' },
  paused: { fr: 'En pause', en: 'Paused' },
  archived: { fr: 'Archivé', en: 'Archived' },
};

const CLASSES: Record<ProjectStatus, string> = {
  revenue: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  published: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  relaunching: 'bg-accent-500/10 text-accent-600 dark:text-accent-400',
  unsold: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  poc: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400',
  active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  paused: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  archived: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400',
};

export function getStatusDisplay(status: ProjectStatus, lang: Lang): StatusDisplay {
  return { label: LABELS[status][lang], class: CLASSES[status] };
}
