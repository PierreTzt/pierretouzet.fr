/**
 * POST /api/generate-linkedin — génère un post LinkedIn via Claude.
 *
 * Reçoit { input, lang, format }, renvoie un post rédigé avec le ton
 * de Pierre (anti-storytelling, direct, expert). Le contenu n'est PAS
 * publié automatiquement : l'admin le copie-colle dans LinkedIn.
 *
 * Auth : obligatoire.
 */
import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { isAuthenticated } from '../../utils/auth';
import { personaBio, personaTone, personaExpertise } from '../../utils/persona';

export const prerender = false;

const SYSTEM_PROMPT = `Tu es l'assistant LinkedIn de Pierre Touzet. Tu l'aides à rédiger des posts LinkedIn percutants.

${personaBio}

## Ton de Pierre sur LinkedIn
${personaTone}

## ANTI-STORYTELLING — RÈGLE ABSOLUE
- JAMAIS de "Il y a 3 ans, j'ai tout quitté..."
- JAMAIS de suspense artificiel ou de cliffhanger
- JAMAIS de fausse vulnérabilité calculée
- JAMAIS de "Et devinez quoi ?" ou de teasing vide
- La première phrase doit DÉLIVRER de la valeur, pas accrocher artificiellement
- Le ton est celui d'un expert qui partage, pas d'un influenceur qui vend

## Formats de posts

### Analyse courte
- Première ligne : le sujet/source + pourquoi c'est important
- 2-3 points clés avec ton analyse personnelle
- Conclusion : ce que ça implique concrètement pour le terrain
- Longueur : 800-1200 caractères

### Prise de position
- Première ligne : ton opinion, claire et directe
- 2-3 arguments appuyés par ton expérience
- Un angle contrarian ou une nuance que les autres n'ont pas
- Conclusion : appel à la discussion (pas un CTA marketing)
- Longueur : 800-1500 caractères

### Fait marquant
- Première ligne : le chiffre/stat/fait, mis en valeur
- Contexte : d'où ça vient, pourquoi c'est significatif
- Ton analyse d'expert : ce que ça signifie vraiment
- Longueur : 600-1000 caractères

### Veille hebdo
- Titre récurrent : "La veille de Pierre #[numéro]"
- Format : 3 actus commentées, chacune avec :
  - Le sujet/source en une ligne
  - Mon commentaire en 1-2 lignes, direct et expert
- Séparateur visuel entre chaque actu (ligne vide)
- Conclusion courte : tendance ou fil conducteur entre les actus
- Longueur : 1000-1800 caractères

### Newsletter LinkedIn
- Format plus développé pour la fonctionnalité Newsletter de LinkedIn
- Introduction accrocheuse qui pose le sujet
- 2-3 sections avec des sous-titres clairs (texte brut, pas de Markdown)
- Analyse approfondie avec exemples concrets du terrain
- Conclusion avec un avis tranché et une ouverture
- Longueur : 2000-4000 caractères (plus long qu'un post classique)

## Règles de formatage LinkedIn
- Texte BRUT uniquement (pas de Markdown, pas de **gras**, pas de # titres)
- Sauts de ligne entre chaque paragraphe (critique pour la lisibilité)
- Emojis : maximum 3-4 par post, utilisés stratégiquement, pas décoratifs
- Pas de hashtags dans le texte. Les hashtags seront ajoutés séparément.
- Longueur optimale : 800-1500 caractères

${personaExpertise}

## Format de sortie
Réponds TOUJOURS en JSON valide avec cette structure exacte :
{
  "text": "Le texte complet du post LinkedIn (texte brut avec sauts de ligne \\n)",
  "headline": "Titre court et percutant pour le visuel (max 80 caractères)",
  "subtitle": "Sous-titre ou chiffre clé pour le visuel (max 60 caractères, optionnel)"
}

N'inclus PAS de bloc de code autour du JSON. Réponds directement en JSON.`;

const FORMAT_INSTRUCTIONS: Record<string, string> = {
  analyse:
    "Rédige un post LinkedIn au format 'Analyse courte'. Pierre partage son analyse d'expert sur ce sujet/source.",
  opinion:
    "Rédige un post LinkedIn au format 'Prise de position'. Pierre donne son opinion tranchée et argumentée.",
  fait: "Rédige un post LinkedIn au format 'Fait marquant'. Pierre met en avant un chiffre ou fait clé avec son analyse.",
  veille:
    "Rédige un post LinkedIn au format 'Veille hebdo'. Pierre partage sa curation de 3 actus de la semaine avec ses commentaires d'expert. Les actus sont fournies ci-dessous.",
  newsletter:
    "Rédige un contenu pour la Newsletter LinkedIn de Pierre. Format plus développé et approfondi qu'un post classique. Pierre approfondit un sujet avec son expertise terrain.",
};

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

  const { input, format, preferences } = body;

  if (!input || !format) {
    return new Response(JSON.stringify({ error: 'Input et format requis' }), { status: 400 });
  }

  const formatInstruction = FORMAT_INSTRUCTIONS[format] || FORMAT_INSTRUCTIONS.analyse;

  const isUrl = /^https?:\/\//.test(input.trim());
  let userMessage = isUrl
    ? `${formatInstruction}\n\nPierre partage cette source : ${input}\n\nBasé sur l'URL et ton analyse, génère le post LinkedIn.`
    : `${formatInstruction}\n\nIdée/sujet de Pierre :\n\n${input}`;

  // Inject tone preferences from feedback history
  if (preferences && preferences.length > 0) {
    userMessage +=
      '\n\n## Préférences de ton (retours précédents de Pierre) :\n' +
      preferences.map((p: string) => `- ${p}`).join('\n') +
      '\n\nRespecte impérativement ces préférences.';
  }

  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY non configurée' }), {
      status: 500,
    });
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    const rawText = message.content[0].type === 'text' ? message.content[0].text : '';

    if (!rawText) {
      return new Response(JSON.stringify({ error: 'Réponse IA vide' }), { status: 500 });
    }

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // Try extracting JSON from code blocks or surrounding text
      const match = rawText.match(/\{[\s\S]*?\n\}/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]);
        } catch {
          console.error('[generate-linkedin] Invalid JSON in response:', rawText.slice(0, 500));
          return new Response(JSON.stringify({ error: 'JSON invalide dans la réponse' }), {
            status: 500,
          });
        }
      } else {
        console.error('[generate-linkedin] No JSON found in response:', rawText.slice(0, 500));
        return new Response(JSON.stringify({ error: 'Pas de JSON trouvé dans la réponse' }), {
          status: 500,
        });
      }
    }

    // Ensure required fields exist
    if (!parsed.text) {
      console.error('[generate-linkedin] Missing "text" field in response:', rawText.slice(0, 500));
      return new Response(JSON.stringify({ error: 'Champ "text" manquant dans la réponse' }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({
        text: parsed.text,
        headline: parsed.headline || '',
        subtitle: parsed.subtitle || '',
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (err: any) {
    console.error('[generate-linkedin] Error:', err);
    return new Response(JSON.stringify({ error: 'Erreur lors de la génération' }), { status: 500 });
  }
};
