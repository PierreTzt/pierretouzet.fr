/**
 * Route dynamique : génère /og/<slug>.png pour chaque article de blog.
 *
 * Comment ça marche (pour novices) :
 *   1. getStaticPaths liste TOUS les articles publiés au BUILD (SSG).
 *   2. Pour chaque slug, Astro appelle GET et enregistre le PNG résultant
 *      dans dist/client/og/<slug>.png.
 *   3. Le <meta property="og:image"> des articles pointe vers cette URL,
 *      donc les réseaux sociaux récupèrent l'image directement depuis le CDN.
 *
 * Cache 1 an (immutable) car le slug d'un article ne change jamais —
 * si tu modifies le titre, tu changes le slug, donc nouvelle URL.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../utils/og-image';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;

  const dateStr = post.data.date.toLocaleDateString(post.data.lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const png = await generateOgImage({
    title: post.data.title,
    tags: post.data.tags,
    date: dateStr,
    lang: post.data.lang,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
