/**
 * INTERNATIONALISATION (i18n) — helpers pour gérer FR et EN.
 *
 * Ce fichier fournit 4 fonctions clés :
 *   - getLangFromUrl(url)          → devine la langue depuis l'URL ('/fr/...' ou '/en/...')
 *   - getData(lang)                → renvoie les données FR ou EN
 *   - getLocalizedPath(path, lang) → transforme une URL vers sa version dans l'autre langue
 *                                    (utilise pageSlugMap pour traduire "competences" ↔ "skills")
 *   - getHreflangUrl(path, lang, site) → URL absolue utilisée dans les balises <link hreflang>
 *
 * Quand tu ajoutes une page bilingue dont le slug change entre FR et EN,
 * ajoute une entrée dans pageSlugMap ci-dessous.
 *
 * Voir DEVELOPER_GUIDE.md §8.
 */
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
  competences: 'skills',
  experiences: 'experiences',
  contact: 'contact',
  'mentions-legales': 'legal',
  speaker: 'speaker',
  consulting: 'consulting',
  recrutement: 'hiring',
  bonjour: 'hello',
  blog: 'blog',
  faq: 'faq',
  ebook: 'ebook',
};

// Reverse: EN -> FR
const reversePageSlugMap: Record<string, string> = Object.fromEntries(
  Object.entries(pageSlugMap).map(([k, v]) => [v, k]),
);

// Project slug mapping between FR and EN (matched by canonical id)
function buildProjectSlugMap(): { frToEn: Record<string, string>; enToFr: Record<string, string> } {
  const frToEn: Record<string, string> = {};
  const enToFr: Record<string, string> = {};
  for (const frProject of frData.projects) {
    const enProject = enData.projects.find((p) => p.id === frProject.id);
    if (enProject) {
      frToEn[frProject.slug] = enProject.slug;
      enToFr[enProject.slug] = frProject.slug;
    }
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
