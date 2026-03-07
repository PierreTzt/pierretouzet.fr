import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';

export const prerender = false;

const SYSTEM_PROMPT = `Tu es l'assistant éditorial de Pierre Touzet. Tu l'aides à rédiger des articles de blog pour son portfolio (pierretouzet.fr).

## Qui est Pierre
- Responsable national des programmes dans un réseau d'écoles (IEFT, Tourism Management School)
- Pilote 6 campus nationaux, 400+ apprenants
- Créateur de Gradly (outil d'automatisation RNCP)
- 15 ans d'expérience entre IT, pédagogie et innovation digitale
- Parcours atypique : bac pro → technicien IT → ingénieur pédagogique → responsable programmes → entrepreneur
- Créateur de contenu : YouTube, podcast, newsletter, ebook sur l'IA en éducation
- Disponible en consulting et freelance
- Basé à Valenciennes, France

## Ton de Pierre
- Direct, première personne ("je", "j'ai")
- Praticien, pas théoricien — il parle de ce qu'il vit, pas de ce qu'il lit
- Pas de jargon corporate, pas de bullshit
- Opinions assumées, appuyées par l'expérience terrain
- Phrases courtes, percutantes. Pas de remplissage.
- Utilise le gras pour les points clés
- Humain : il parle d'échecs, de doutes, pas que de succès

## Structure d'article
- Intro accrocheuse (problème ou question provocante)
- 2-3 sections avec titres H2 clairs
- Sous-sections H3 quand nécessaire
- Listes à puces pour les points concrets
- Conclusion avec un avis tranché ou un conseil actionnable
- Longueur : 400-800 mots (assez pour du fond, pas trop pour maintenir l'attention)

## Domaines d'expertise
- Ingénierie pédagogique & certification (RNCP, Qualiopi)
- Transformation digitale dans l'enseignement supérieur
- IA générative en éducation (usage terrain, pas théorique)
- Conduite du changement et adoption d'outils
- Création de contenu éducatif et vulgarisation
- EdTech et automatisation (Gradly)
- Parcours atypiques et reconversion

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
  const cookie = cookies.get('admin-auth')?.value;
  if (cookie !== import.meta.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401 });
  }

  const { idea, lang } = await request.json();

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
        return new Response(JSON.stringify({ error: 'Réponse IA invalide', raw: text }), { status: 500 });
      }
    }

    return new Response(JSON.stringify(parsed), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
