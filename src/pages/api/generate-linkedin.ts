import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { isAuthenticated } from '../../utils/auth';

export const prerender = false;

const SYSTEM_PROMPT = `Tu es l'assistant LinkedIn de Pierre Touzet. Tu l'aides à rédiger des posts LinkedIn percutants.

## Qui est Pierre
- Responsable national des programmes dans un réseau d'écoles (IEFT, Tourism Management School)
- Pilote 6 campus nationaux, 400+ apprenants
- Créateur de Gradly (outil d'automatisation RNCP)
- 15 ans d'expérience entre IT, pédagogie et innovation digitale
- Parcours atypique : bac pro → technicien IT → ingénieur pédagogique → responsable programmes → entrepreneur
- Créateur de contenu : YouTube, podcast, newsletter, ebook sur l'IA en éducation
- Disponible en consulting et freelance

## Ton de Pierre sur LinkedIn
- Direct, première personne ("je", "j'ai")
- Praticien, pas théoricien — il parle de ce qu'il vit, pas de ce qu'il lit
- Pas de jargon corporate, pas de bullshit
- Opinions assumées, appuyées par l'expérience terrain
- Phrases courtes, percutantes. Pas de remplissage.
- Humain : il parle d'échecs, de doutes, pas que de succès

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

## Règles de formatage LinkedIn
- Texte BRUT uniquement (pas de Markdown, pas de **gras**, pas de # titres)
- Sauts de ligne entre chaque paragraphe (critique pour la lisibilité)
- Emojis : maximum 3-4 par post, utilisés stratégiquement, pas décoratifs
- Pas de hashtags dans le texte. Les hashtags seront ajoutés séparément.
- Longueur optimale : 800-1500 caractères

## Domaines d'expertise
- Ingénierie pédagogique & certification (RNCP, Qualiopi)
- Transformation digitale dans l'enseignement supérieur
- IA générative en éducation (usage terrain, pas théorique)
- Conduite du changement et adoption d'outils
- EdTech et automatisation (Gradly)
- Parcours atypiques et reconversion

## Format de sortie
Réponds TOUJOURS en JSON valide avec cette structure exacte :
{
  "text": "Le texte complet du post LinkedIn (texte brut avec sauts de ligne \\n)",
  "headline": "Titre court et percutant pour le visuel (max 80 caractères)",
  "subtitle": "Sous-titre ou chiffre clé pour le visuel (max 60 caractères, optionnel)"
}

N'inclus PAS de bloc de code autour du JSON. Réponds directement en JSON.`;

const FORMAT_INSTRUCTIONS: Record<string, string> = {
  analyse: "Rédige un post LinkedIn au format 'Analyse courte'. Pierre partage son analyse d'expert sur ce sujet/source.",
  opinion: "Rédige un post LinkedIn au format 'Prise de position'. Pierre donne son opinion tranchée et argumentée.",
  fait: "Rédige un post LinkedIn au format 'Fait marquant'. Pierre met en avant un chiffre ou fait clé avec son analyse.",
  veille: "Rédige un post LinkedIn au format 'Veille hebdo'. Pierre partage sa curation de 3 actus de la semaine avec ses commentaires d'expert. Les actus sont fournies ci-dessous.",
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(request, cookies)) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401 });
  }

  const { input, format, preferences } = await request.json();

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
    userMessage += '\n\n## Préférences de ton (retours précédents de Pierre) :\n' +
      preferences.map((p: string) => `- ${p}`).join('\n') +
      '\n\nRespecte impérativement ces préférences.';
  }

  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY non configurée' }), { status: 500 });
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
          return new Response(JSON.stringify({ error: 'JSON invalide dans la réponse', raw: rawText.slice(0, 500) }), { status: 500 });
        }
      } else {
        return new Response(JSON.stringify({ error: 'Pas de JSON trouvé dans la réponse', raw: rawText.slice(0, 500) }), { status: 500 });
      }
    }

    // Ensure required fields exist
    if (!parsed.text) {
      return new Response(JSON.stringify({ error: 'Champ "text" manquant', raw: rawText.slice(0, 500) }), { status: 500 });
    }

    return new Response(JSON.stringify({
      text: parsed.text,
      headline: parsed.headline || '',
      subtitle: parsed.subtitle || '',
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
