import { describe, it, expect } from 'vitest';
import { resolveStudioEntry } from '../utils/studio';
import type { SiteData, Project, StudioExternalSite } from '../data/types';

function makeData(partial: Partial<SiteData> = {}): SiteData {
  const baseProject: Project = {
    id: 'p1',
    slug: 'p1',
    title: 'Project 1',
    shortDescription: '',
    longDescription: '',
    technologies: [],
    imageAlt: '',
    featured: false,
  };
  const baseExternal: StudioExternalSite = {
    id: 's1',
    slug: 's1',
    title: 'Site 1',
    url: 'https://example.com',
    shortDescription: '',
    technologies: [],
    imageAlt: '',
  };
  return {
    personal: {} as never,
    social: [],
    experiences: [],
    projects: [baseProject],
    studioSites: [baseExternal],
    studioClusters: [],
    skillCategories: [],
    ui: {} as never,
    ...partial,
  } as SiteData;
}

describe('resolveStudioEntry', () => {
  it('resolves a project ref to the matching project', () => {
    const data = makeData();
    const result = resolveStudioEntry({ kind: 'project', projectSlug: 'p1' }, data);
    expect(result).toEqual({ type: 'project', data: data.projects[0] });
  });

  it('resolves an external ref to the matching studio site', () => {
    const data = makeData();
    const result = resolveStudioEntry({ kind: 'external', siteSlug: 's1' }, data);
    expect(result).toEqual({ type: 'external', data: data.studioSites[0] });
  });

  it('returns null when the project slug is missing', () => {
    const data = makeData();
    const result = resolveStudioEntry({ kind: 'project', projectSlug: 'does-not-exist' }, data);
    expect(result).toBeNull();
  });

  it('returns null when the external slug is missing', () => {
    const data = makeData();
    const result = resolveStudioEntry({ kind: 'external', siteSlug: 'does-not-exist' }, data);
    expect(result).toBeNull();
  });
});
