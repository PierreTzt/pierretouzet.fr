import { describe, it, expect } from 'vitest';
import { getArticleTranslationPath, type TranslatableBlogEntry } from '../utils/blog-translation';

function makeEntry(
  slug: string,
  lang: 'fr' | 'en',
  translationKey?: string,
): TranslatableBlogEntry {
  return { slug, data: { lang, translationKey } };
}

// ---------------------------------------------------------------------------
// getArticleTranslationPath
// ---------------------------------------------------------------------------
describe('getArticleTranslationPath', () => {
  it('résout le chemin EN depuis un article FR de la même paire', () => {
    const fr = makeEntry(
      'chatgpt-a-ecrit-mon-personal-branding',
      'fr',
      'chatgpt-wrote-my-personal-branding',
    );
    const en = makeEntry(
      'chatgpt-wrote-my-personal-branding',
      'en',
      'chatgpt-wrote-my-personal-branding',
    );
    expect(getArticleTranslationPath(fr, [fr, en])).toBe(
      '/en/blog/chatgpt-wrote-my-personal-branding/',
    );
  });

  it('résout le chemin FR depuis un article EN de la même paire', () => {
    const fr = makeEntry(
      'chatgpt-a-ecrit-mon-personal-branding',
      'fr',
      'chatgpt-wrote-my-personal-branding',
    );
    const en = makeEntry(
      'chatgpt-wrote-my-personal-branding',
      'en',
      'chatgpt-wrote-my-personal-branding',
    );
    expect(getArticleTranslationPath(en, [fr, en])).toBe(
      '/fr/blog/chatgpt-a-ecrit-mon-personal-branding/',
    );
  });

  it('retourne null pour un article sans translationKey (pas de traduction)', () => {
    const orphan = makeEntry('quand-l-objectif-s-ecroule-a-2-semaines-de-la-ligne-d-arrive', 'fr');
    const other = makeEntry('some-other-article', 'en', 'some-other-key');
    expect(getArticleTranslationPath(orphan, [orphan, other])).toBeNull();
  });

  it("retourne null pour une translationKey orpheline (aucun article ne la partage dans l'autre langue)", () => {
    const lonely = makeEntry('lonely-article', 'fr', 'orphan-key');
    expect(getArticleTranslationPath(lonely, [lonely])).toBeNull();
  });

  it('retourne null quand la liste des articles est vide', () => {
    const post = makeEntry('some-article', 'fr', 'some-key');
    expect(getArticleTranslationPath(post, [])).toBeNull();
  });

  it('ignore un article de la même langue partageant la même translationKey', () => {
    // Un pendant valide doit être dans l'AUTRE langue — deux FR avec la
    // même clé ne doivent jamais se matcher entre eux.
    const frA = makeEntry('article-a', 'fr', 'shared-key');
    const frB = makeEntry('article-b', 'fr', 'shared-key');
    expect(getArticleTranslationPath(frA, [frA, frB])).toBeNull();
  });
});
