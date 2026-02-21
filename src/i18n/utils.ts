import { data as frData } from '../data/fr';
import { data as enData } from '../data/en';
import type { SiteData } from '../data/types';

export type Lang = 'fr' | 'en';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'fr';
}

export function getData(lang: Lang): SiteData {
  return lang === 'en' ? enData : frData;
}

// Page slug mapping: FR -> EN
const pageSlugMap: Record<string, string> = {
  projets: 'projects',
  competences: 'skills',
  experiences: 'experiences',
  contact: 'contact',
};

// Reverse: EN -> FR
const reversePageSlugMap: Record<string, string> = Object.fromEntries(
  Object.entries(pageSlugMap).map(([k, v]) => [v, k])
);

// Project slug mapping between FR and EN
function buildProjectSlugMap(): { frToEn: Record<string, string>; enToFr: Record<string, string> } {
  const frToEn: Record<string, string> = {};
  const enToFr: Record<string, string> = {};
  for (let i = 0; i < frData.projects.length; i++) {
    const frSlug = frData.projects[i].slug;
    const enSlug = enData.projects[i].slug;
    frToEn[frSlug] = enSlug;
    enToFr[enSlug] = frSlug;
  }
  return { frToEn, enToFr };
}

const projectSlugs = buildProjectSlugMap();

export function getLocalizedPath(currentPath: string, targetLang: Lang): string {
  const segments = currentPath.split('/').filter(Boolean);

  if (segments.length === 0) return `/${targetLang}/`;

  const currentLang = segments[0];
  if (currentLang === 'fr' || currentLang === 'en') {
    segments[0] = targetLang;
  } else {
    segments.unshift(targetLang);
  }

  // Map page slug (segment[1])
  if (segments.length >= 2) {
    const pageName = segments[1];
    const mapping = targetLang === 'en' ? pageSlugMap : reversePageSlugMap;
    if (mapping[pageName]) {
      segments[1] = mapping[pageName];
    }
  }

  // Map project slug (segment[2]) if on a project detail page
  if (segments.length >= 3) {
    const projectSlug = segments[2];
    const slugMap = targetLang === 'en' ? projectSlugs.frToEn : projectSlugs.enToFr;
    if (slugMap[projectSlug]) {
      segments[2] = slugMap[projectSlug];
    }
  }

  return '/' + segments.join('/') + '/';
}

export function getOppositeLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}

/**
 * Get the hreflang alternate URL for a given path and target language.
 */
export function getHreflangUrl(currentPath: string, targetLang: Lang, siteUrl: string): string {
  const localizedPath = getLocalizedPath(currentPath, targetLang);
  return new URL(localizedPath, siteUrl).href;
}
