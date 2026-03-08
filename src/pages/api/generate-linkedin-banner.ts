import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../utils/auth';
import { generateLinkedInBanner } from '../../utils/linkedin-visual';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(request, cookies)) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401 });
  }

  const { tagline, keywords } = await request.json();

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
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
