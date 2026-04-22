/**
 * POST /api/generate-linkedin-banner — génère la bannière de profil LinkedIn.
 *
 * Format fixe 1584×396 (ratio LinkedIn cover). L'admin la télécharge puis
 * l'upload manuellement sur LinkedIn. Pipeline dans utils/linkedin-visual.ts.
 *
 * Auth : obligatoire.
 */
import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../utils/auth';
import { generateLinkedInBanner } from '../../utils/linkedin-visual';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(request, cookies)) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Corps JSON invalide' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const { tagline, keywords } = body;

  if (!tagline) {
    return new Response(JSON.stringify({ error: 'Tagline requise' }), { status: 400 });
  }

  try {
    const png = await generateLinkedInBanner({
      tagline,
      keywords: keywords || [],
    });

    return new Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="linkedin-banner-1584x396.png"',
      },
    });
  } catch (err: any) {
    console.error('[generate-linkedin-banner] Error:', err);
    return new Response(JSON.stringify({ error: 'Erreur lors de la génération de la bannière' }), { status: 500 });
  }
};
