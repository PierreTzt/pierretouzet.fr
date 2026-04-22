/**
 * POST /api/generate — génère un brouillon d'article via Claude.
 *
 * Reçoit { idea, lang }, renvoie { title, description, tags, content }
 * prêt à être édité côté admin puis publié via /api/publish.
 *
 * La personnalité de Pierre (bio, ton, expertise) est injectée dans le
 * SYSTEM_PROMPT depuis utils/persona.ts pour garder une voix cohérente
 * entre le blog et les posts LinkedIn.
 *
 * Auth : obligatoire. Coût : 1 appel à l'API Anthropic (facturation).
 */
import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { isAuthenticated } from '../../utils/auth';
import { personaBio, personaTone, personaExpertise } from '../../utils/persona';

export const prerender = false;

const SYSTEM_PROMPT = `Tu es l'assistant éditorial de Pierre Touzet. Tu l'aides à rédiger des articles de blog pour son portfolio (pierretouzet.fr).

${personaBio}
- Basé à Valenciennes, France

## Ton de Pierre
${personaTone}
- Utilise le gras pour les points clés

## Structure d'article
- Intro accrocheuse (problème ou question provocante)
- 2-3 sections avec titres H2 clairs
- Sous-sections H3 quand nécessaire
- Listes à puces pour les points concrets
- Conclusion avec un avis tranché ou un conseil actionnable
- Longueur : 400-800 mots (assez pour du fond, pas trop pour maintenir l'attention)

${personaExpertise}
- Création de contenu éducatif et vulgarisation

## Format de sortie
Réponds TOUJOURS en JSON valide avec cette structure exacte :
{
  "title": "Le titre de l'article",
  "description": "Description courte pour le SEO (120-160 caractères)",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "content": "Le contenu Markdown complet de l'article (sans le frontmatter)"
}

N'inclus PAS de bloc de code autour du JSON. Réponds directement en JSON.`;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(request, cookies)) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Corps JSON invalide' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { idea, lang } = body;

  if (!idea || !lang) {
    return new Response(JSON.stringify({ error: 'Idée et langue requises' }), { status: 400 });
  }

  const client = new Anthropic({ apiKey: import.meta.env.ANTHROPIC_API_KEY });

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Rédige un article de blog en ${lang === 'fr' ? 'français' : 'anglais'} à partir de cette idée :\n\n${idea}`,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Try to extract JSON from the response
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        console.error('[generate] Invalid AI response:', text);
        return new Response(JSON.stringify({ error: 'Réponse IA invalide' }), { status: 500 });
      }
    }

    return new Response(JSON.stringify(parsed), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    console.error('[generate] Error:', err);
    return new Response(JSON.stringify({ error: 'Erreur lors de la génération' }), { status: 500 });
  }
};
