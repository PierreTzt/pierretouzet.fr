/**
 * Route dynamique : génère /og/home-fr.png et /og/home-en.png — l'image de
 * partage de la page d'accueil, dans chaque langue.
 *
 * Contrairement aux articles (src/pages/og/[...slug].png.ts), le contenu de
 * la home peut changer sans que son URL change : cache plus court que les
 * articles (immutable), aligné sur celui de l'ancien repli statique
 * public/og-image.png dans vercel.json.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { generateHomeOgImage } from '../../utils/og-image';
import { getData, type Lang } from '../../i18n/utils';

export const getStaticPaths: GetStaticPaths = async () => {
  const langs: Lang[] = ['fr', 'en'];
  return langs.map((lang) => ({ params: { lang } }));
};

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang === 'en' ? 'en' : 'fr';
  const { personal } = getData(lang);

  const png = await generateHomeOgImage({
    name: personal.name,
    title: personal.title,
    signature: personal.signature,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
};
