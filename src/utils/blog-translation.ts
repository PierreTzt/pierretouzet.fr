/**
 * TRADUCTION DES ARTICLES DE BLOG — résolution de l'équivalent dans l'autre langue.
 *
 * Contrairement aux pages statiques (pageSlugMap dans src/i18n/utils.ts), les
 * articles de blog n'ont pas de règle de conversion de slug : chaque paire
 * FR/EN a des slugs indépendants (ex. "ia-education-terrain" /
 * "ai-education-field"). Le lien entre les deux se fait via le champ
 * optionnel `translationKey` du frontmatter (voir src/content.config.ts) —
 * les deux articles d'une paire partagent la même valeur.
 *
 * Volontairement découplé d'astro:content : la fonction accepte n'importe
 * quel objet ayant la forme minimale d'un CollectionEntry<'blog'>, ce qui la
 * rend testable avec de simples objets littéraux (voir
 * src/__tests__/blog-translation.test.ts).
 */

export interface TranslatableBlogEntry {
  slug: string;
  data: {
    lang: 'fr' | 'en';
    translationKey?: string;
  };
}

/**
 * Retourne le chemin absolu (ex. "/en/blog/mon-article/") de l'équivalent
 * d'un article dans l'autre langue, ou `null` s'il n'existe pas — absence de
 * `translationKey` sur l'article, ou clé qui ne trouve aucun pendant dans
 * `allPosts`.
 */
export function getArticleTranslationPath(
  post: TranslatableBlogEntry,
  allPosts: TranslatableBlogEntry[],
): string | null {
  const { translationKey, lang } = post.data;
  if (!translationKey) return null;

  const match = allPosts.find(
    (candidate) => candidate.data.translationKey === translationKey && candidate.data.lang !== lang,
  );

  return match ? `/${match.data.lang}/blog/${match.slug}/` : null;
}
