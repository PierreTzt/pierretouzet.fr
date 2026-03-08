import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../utils/auth';
import { generateLinkedInVisual } from '../../utils/linkedin-visual';

export const prerender = false;

const VALID_SIZES: Record<string, { width: number; height: number }> = {
  '1080x1080': { width: 1080, height: 1080 },
  '1080x1350': { width: 1080, height: 1350 },
  '1200x630': { width: 1200, height: 630 },
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(request, cookies)) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401 });
  }

  const { headline, subtitle, format, size } = await request.json();

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
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
