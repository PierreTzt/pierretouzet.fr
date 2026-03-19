import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../utils/auth';
import { generateLinkedInVisual } from '../../utils/linkedin-visual';

export const prerender = false;

interface SlideInput {
  headline: string;
  subtitle?: string;
}

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

  const { slides, format } = body;

  if (!slides || !Array.isArray(slides) || slides.length < 2) {
    return new Response(JSON.stringify({ error: 'Au moins 2 slides requises' }), { status: 400 });
  }

  if (slides.length > 10) {
    return new Response(JSON.stringify({ error: 'Maximum 10 slides' }), { status: 400 });
  }

  try {
    const totalSlides = slides.length;
    const images: string[] = [];

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i] as SlideInput;
      if (!slide.headline) continue;

      const png = await generateLinkedInVisual({
        headline: slide.headline,
        subtitle: slide.subtitle || undefined,
        format: format || 'analyse',
        width: 1080,
        height: 1350,
        slideNumber: i + 1,
        totalSlides,
      });
      images.push(png.toString('base64'));
    }

    return new Response(JSON.stringify({ images }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[generate-linkedin-carousel] Error:', err);
    return new Response(JSON.stringify({ error: 'Erreur lors de la génération du carousel' }), { status: 500 });
  }
};
