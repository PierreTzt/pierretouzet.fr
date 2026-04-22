/**
 * POST /api/generate-linkedin-visual — génère l'image d'un post LinkedIn.
 *
 * Formats supportés : 1200×1200 (carré), 1080×1350 (portrait), 1200×627 (paysage).
 * Image renvoyée en base64 dans le JSON de réponse ; pas de stockage serveur.
 * Pipeline réel dans src/utils/linkedin-visual.ts (Satori + Sharp + Twemoji).
 *
 * Auth : obligatoire.
 */
import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../utils/auth';
import { generateLinkedInVisual } from '../../utils/linkedin-visual';

export const prerender = false;

const VALID_SIZES: Record<string, { width: number; height: number }> = {
  '1200x1200': { width: 1200, height: 1200 },
  '1080x1350': { width: 1080, height: 1350 },
  '1200x627': { width: 1200, height: 627 },
};

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

  const { headline, subtitle, format, size } = body;

  if (!headline || !size) {
    return new Response(JSON.stringify({ error: 'Headline et size requis' }), { status: 400 });
  }

  const dimensions = VALID_SIZES[size];
  if (!dimensions) {
    return new Response(JSON.stringify({ error: 'Taille invalide' }), { status: 400 });
  }

  try {
    const png = await generateLinkedInVisual({
      headline,
      subtitle: subtitle || undefined,
      format: format || 'analyse',
      ...dimensions,
    });

    return new Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `inline; filename="linkedin-visual-${size}.png"`,
      },
    });
  } catch (err: any) {
    console.error('[generate-linkedin-visual] Error:', err);
    return new Response(JSON.stringify({ error: 'Erreur lors de la génération du visuel' }), { status: 500 });
  }
};
