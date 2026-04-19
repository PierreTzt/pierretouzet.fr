import type { SiteData, StudioEntryRef, Project, StudioExternalSite } from '../data/types';

export type ResolvedStudioEntry =
  | { type: 'project'; data: Project }
  | { type: 'external'; data: StudioExternalSite };

export function resolveStudioEntry(
  ref: StudioEntryRef,
  data: SiteData,
): ResolvedStudioEntry | null {
  if (ref.kind === 'project') {
    const project = data.projects.find((p) => p.slug === ref.projectSlug);
    return project ? { type: 'project', data: project } : null;
  }
  const site = data.studioSites.find((s) => s.slug === ref.siteSlug);
  return site ? { type: 'external', data: site } : null;
}
