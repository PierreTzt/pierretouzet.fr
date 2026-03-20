import { describe, it, expect } from 'vitest';
import {
  getLangFromUrl,
  getLocalizedPath,
  getOppositeLang,
  getData,
  getHreflangUrl,
} from '../i18n/utils';
import type { Lang } from '../i18n/utils';
import { data as frData } from '../data/fr';
import { data as enData } from '../data/en';

// ---------------------------------------------------------------------------
// getLangFromUrl
// ---------------------------------------------------------------------------
describe('getLangFromUrl', () => {
  it('returns "fr" for a /fr/ root URL', () => {
    expect(getLangFromUrl(new URL('https://pierretouzet.fr/fr/'))).toBe('fr');
  });

  it('returns "en" for an /en/ root URL', () => {
    expect(getLangFromUrl(new URL('https://pierretouzet.fr/en/'))).toBe('en');
  });

  it('returns "fr" for a French subpage', () => {
    expect(getLangFromUrl(new URL('https://pierretouzet.fr/fr/projets/'))).toBe('fr');
  });

  it('returns "en" for an English subpage', () => {
    expect(getLangFromUrl(new URL('https://pierretouzet.fr/en/projects/'))).toBe('en');
  });

  it('returns "en" for a deep English path (blog article)', () => {
    expect(getLangFromUrl(new URL('https://pierretouzet.fr/en/blog/some-article/'))).toBe('en');
  });

  it('returns "fr" for a deep French path', () => {
    expect(getLangFromUrl(new URL('https://pierretouzet.fr/fr/blog/un-article/'))).toBe('fr');
  });

  it('defaults to "fr" when the first segment is neither "fr" nor "en"', () => {
    expect(getLangFromUrl(new URL('https://pierretouzet.fr/admin/blog/'))).toBe('fr');
  });

  it('defaults to "fr" for the site root "/"', () => {
    expect(getLangFromUrl(new URL('https://pierretouzet.fr/'))).toBe('fr');
  });
});

// ---------------------------------------------------------------------------
// getOppositeLang
// ---------------------------------------------------------------------------
describe('getOppositeLang', () => {
  it('returns "en" when given "fr"', () => {
    expect(getOppositeLang('fr')).toBe('en');
  });

  it('returns "fr" when given "en"', () => {
    expect(getOppositeLang('en')).toBe('fr');
  });
});

// ---------------------------------------------------------------------------
// getData
// ---------------------------------------------------------------------------
describe('getData', () => {
  it('returns French data for "fr"', () => {
    const result = getData('fr');
    expect(result).toBe(frData);
    expect(result.personal.name).toBe('Pierre Touzet');
    expect(result.personal.title).toContain('complexe accessible');
  });

  it('returns English data for "en"', () => {
    const result = getData('en');
    expect(result).toBe(enData);
    expect(result.personal.name).toBe('Pierre Touzet');
    expect(result.personal.title).toContain('complex accessible');
  });

  it('returns data with the same number of projects in both languages', () => {
    expect(getData('fr').projects.length).toBe(getData('en').projects.length);
  });

  it('returns data with the same number of experiences in both languages', () => {
    expect(getData('fr').experiences.length).toBe(getData('en').experiences.length);
  });
});

// ---------------------------------------------------------------------------
// getLocalizedPath — page slug mapping
// ---------------------------------------------------------------------------
describe('getLocalizedPath', () => {
  // ---- FR -> EN page slug mapping ----
  describe('FR -> EN page slug mapping', () => {
    const cases: [string, string][] = [
      ['/fr/projets/', '/en/projects/'],
      ['/fr/competences/', '/en/skills/'],
      ['/fr/experiences/', '/en/experiences/'],
      ['/fr/contact/', '/en/contact/'],
      ['/fr/mentions-legales/', '/en/legal/'],
      ['/fr/speaker/', '/en/speaker/'],
      ['/fr/consulting/', '/en/consulting/'],
      ['/fr/recrutement/', '/en/hiring/'],
      ['/fr/bonjour/', '/en/hello/'],
      ['/fr/blog/', '/en/blog/'],
    ];

    it.each(cases)('maps %s -> %s', (frPath, expectedEnPath) => {
      expect(getLocalizedPath(frPath, 'en')).toBe(expectedEnPath);
    });
  });

  // ---- EN -> FR page slug mapping ----
  describe('EN -> FR page slug mapping', () => {
    const cases: [string, string][] = [
      ['/en/projects/', '/fr/projets/'],
      ['/en/skills/', '/fr/competences/'],
      ['/en/experiences/', '/fr/experiences/'],
      ['/en/contact/', '/fr/contact/'],
      ['/en/legal/', '/fr/mentions-legales/'],
      ['/en/speaker/', '/fr/speaker/'],
      ['/en/consulting/', '/fr/consulting/'],
      ['/en/hiring/', '/fr/recrutement/'],
      ['/en/hello/', '/fr/bonjour/'],
      ['/en/blog/', '/fr/blog/'],
    ];

    it.each(cases)('maps %s -> %s', (enPath, expectedFrPath) => {
      expect(getLocalizedPath(enPath, 'fr')).toBe(expectedFrPath);
    });
  });

  // ---- Root / index paths ----
  describe('root and index paths', () => {
    it('maps /fr/ to /en/', () => {
      expect(getLocalizedPath('/fr/', 'en')).toBe('/en/');
    });

    it('maps /en/ to /fr/', () => {
      expect(getLocalizedPath('/en/', 'fr')).toBe('/fr/');
    });

    it('handles empty path by returning /{lang}/', () => {
      expect(getLocalizedPath('', 'en')).toBe('/en/');
      expect(getLocalizedPath('', 'fr')).toBe('/fr/');
    });

    it('handles "/" by returning /{lang}/', () => {
      expect(getLocalizedPath('/', 'en')).toBe('/en/');
      expect(getLocalizedPath('/', 'fr')).toBe('/fr/');
    });
  });

  // ---- Project slug mapping ----
  describe('project slug mapping', () => {
    it('maps FR project detail path to EN equivalent (gradly)', () => {
      // gradly -> gradly (same slug in both languages)
      expect(getLocalizedPath('/fr/projets/gradly/', 'en')).toBe('/en/projects/gradly/');
    });

    it('maps EN project detail path to FR equivalent (gradly)', () => {
      expect(getLocalizedPath('/en/projects/gradly/', 'fr')).toBe('/fr/projets/gradly/');
    });

    it('maps FR innovation-pedagogique to EN pedagogical-innovation', () => {
      expect(getLocalizedPath('/fr/projets/innovation-pedagogique/', 'en')).toBe(
        '/en/projects/pedagogical-innovation/'
      );
    });

    it('maps EN pedagogical-innovation to FR innovation-pedagogique', () => {
      expect(getLocalizedPath('/en/projects/pedagogical-innovation/', 'fr')).toBe(
        '/fr/projets/innovation-pedagogique/'
      );
    });

    it('maps FR youtube-impots to EN youtube-taxes', () => {
      expect(getLocalizedPath('/fr/projets/youtube-impots/', 'en')).toBe(
        '/en/projects/youtube-taxes/'
      );
    });

    it('maps EN youtube-taxes to FR youtube-impots', () => {
      expect(getLocalizedPath('/en/projects/youtube-taxes/', 'fr')).toBe(
        '/fr/projets/youtube-impots/'
      );
    });

    it('maps FR ebook-ia-education to EN ebook-ai-education', () => {
      expect(getLocalizedPath('/fr/projets/ebook-ia-education/', 'en')).toBe(
        '/en/projects/ebook-ai-education/'
      );
    });

    it('maps FR accompagnement-entrepreneurial to EN entrepreneurial-mentoring', () => {
      expect(getLocalizedPath('/fr/projets/accompagnement-entrepreneurial/', 'en')).toBe(
        '/en/projects/entrepreneurial-mentoring/'
      );
    });
  });

  // ---- Blog paths ----
  describe('blog paths', () => {
    it('maps /fr/blog/mon-article/ to /en/blog/mon-article/', () => {
      // Blog article slugs are not mapped (no project slug mapping at segment[2] for blog),
      // but the blog slug at segment[2] is checked against projectSlugs which won't match,
      // so it stays the same
      expect(getLocalizedPath('/fr/blog/mon-article/', 'en')).toBe('/en/blog/mon-article/');
    });

    it('maps /en/blog/my-article/ to /fr/blog/my-article/', () => {
      expect(getLocalizedPath('/en/blog/my-article/', 'fr')).toBe('/fr/blog/my-article/');
    });
  });

  // ---- Edge cases ----
  describe('edge cases', () => {
    it('preserves trailing slash format', () => {
      const result = getLocalizedPath('/fr/competences/', 'en');
      expect(result).toMatch(/\/$/);
    });

    it('handles path without leading lang prefix by prepending target lang', () => {
      // If the first segment is not fr/en, it unshifts targetLang
      expect(getLocalizedPath('/admin/blog/', 'en')).toBe('/en/admin/blog/');
    });

    it('returns same lang path when target matches current', () => {
      // /fr/projets/ with target 'fr' — segment[0] becomes 'fr', then tries reversePageSlugMap on 'projets'
      // reversePageSlugMap has 'projects' -> 'projets', not 'projets' -> anything
      // so segment[1] stays 'projets'
      expect(getLocalizedPath('/fr/projets/', 'fr')).toBe('/fr/projets/');
    });
  });
});

// ---------------------------------------------------------------------------
// getHreflangUrl
// ---------------------------------------------------------------------------
describe('getHreflangUrl', () => {
  const siteUrl = 'https://www.pierretouzet.fr';

  it('generates correct EN hreflang URL from FR path', () => {
    expect(getHreflangUrl('/fr/', 'en', siteUrl)).toBe('https://www.pierretouzet.fr/en/');
  });

  it('generates correct FR hreflang URL from EN path', () => {
    expect(getHreflangUrl('/en/', 'fr', siteUrl)).toBe('https://www.pierretouzet.fr/fr/');
  });

  it('maps page slugs in hreflang URLs', () => {
    expect(getHreflangUrl('/fr/competences/', 'en', siteUrl)).toBe(
      'https://www.pierretouzet.fr/en/skills/'
    );
  });

  it('maps project slugs in hreflang URLs', () => {
    expect(getHreflangUrl('/fr/projets/innovation-pedagogique/', 'en', siteUrl)).toBe(
      'https://www.pierretouzet.fr/en/projects/pedagogical-innovation/'
    );
  });

  it('works with a site URL that has no trailing slash', () => {
    expect(getHreflangUrl('/fr/', 'en', 'https://www.pierretouzet.fr')).toBe(
      'https://www.pierretouzet.fr/en/'
    );
  });

  it('works with a site URL that has a trailing slash', () => {
    expect(getHreflangUrl('/fr/', 'en', 'https://www.pierretouzet.fr/')).toBe(
      'https://www.pierretouzet.fr/en/'
    );
  });
});

// ---------------------------------------------------------------------------
// buildProjectSlugMap (tested indirectly via getLocalizedPath)
// ---------------------------------------------------------------------------
describe('buildProjectSlugMap (indirect)', () => {
  it('creates correct pairings for all projects by verifying round-trips', () => {
    // For each FR project, go FR->EN->FR and expect the original slug
    for (const frProject of frData.projects) {
      const frPath = `/fr/projets/${frProject.slug}/`;
      const enPath = getLocalizedPath(frPath, 'en');
      const roundTrip = getLocalizedPath(enPath, 'fr');
      expect(roundTrip).toBe(frPath);
    }
  });

  it('creates correct pairings for all EN projects by verifying round-trips', () => {
    // For each EN project, go EN->FR->EN and expect the original slug
    for (const enProject of enData.projects) {
      const enPath = `/en/projects/${enProject.slug}/`;
      const frPath = getLocalizedPath(enPath, 'fr');
      const roundTrip = getLocalizedPath(frPath, 'en');
      expect(roundTrip).toBe(enPath);
    }
  });

  it('pairs projects by array index (FR[i] <-> EN[i])', () => {
    const len = Math.min(frData.projects.length, enData.projects.length);
    for (let i = 0; i < len; i++) {
      const frSlug = frData.projects[i].slug;
      const enSlug = enData.projects[i].slug;
      const frPath = `/fr/projets/${frSlug}/`;
      const result = getLocalizedPath(frPath, 'en');
      expect(result).toBe(`/en/projects/${enSlug}/`);
    }
  });

  it('FR and EN project arrays have the same length', () => {
    expect(frData.projects.length).toBe(enData.projects.length);
  });
});
