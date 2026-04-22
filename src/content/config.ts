/**
 * Schéma des articles de blog (content collection).
 *
 * Zod valide chaque frontmatter .md au build. Si un article oublie un
 * champ obligatoire ou met une valeur du mauvais type, le build échoue
 * avec un message précis — c'est une sécurité contre les bugs silencieux.
 *
 * NB : Astro 5 attend ce fichier à la racine src/ (src/content.config.ts).
 * On garde aussi src/content/config.ts pour compat ; les deux ont le même
 * contenu.
 */
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(['fr', 'en']),
    tags: z.array(z.string()),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
