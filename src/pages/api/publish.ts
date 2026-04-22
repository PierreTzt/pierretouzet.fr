/**
 * POST /api/publish — publie un article de blog en commitant le fichier
 * .md directement dans le repo GitHub.
 *
 * Flux (pour novices) :
 *   1. Admin envoie { title, description, tags, content, lang }
 *   2. On slugify le titre pour obtenir un nom de fichier sûr
 *   3. On échappe les caractères dangereux du frontmatter (quotes, \n, ---)
 *   4. On concatène frontmatter + contenu
 *   5. On appelle l'API GitHub (PUT /repos/.../contents/...) avec le fichier
 *      encodé en base64
 *   6. GitHub crée un commit, Vercel détecte le push, redeploie le site
 *
 * Auth : obligatoire (isAuthenticated), c'est un write public sur le repo.
 */
import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../utils/auth';

export const prerender = false;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
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

  const { title, description, tags, content, lang } = body;

  if (!title || !content || !lang) {
    return new Response(JSON.stringify({ error: 'Titre, contenu et langue requis' }), { status: 400 });
  }

  const slug = slugify(title);
  const date = new Date().toISOString().split('T')[0];

  const safeTitle = title.replace(/[\n\r]/g, ' ').replace(/---/g, '').replace(/"/g, '\\"').trim();
  const safeDescription = (description || '').replace(/[\n\r]/g, ' ').replace(/---/g, '').replace(/"/g, '\\"').trim();
  const safeTags = (tags || []).map((t: string) => t.replace(/['\n\r\[\]{}]/g, '').trim()).filter(Boolean);

  const frontmatter = [
    '---',
    `title: "${safeTitle}"`,
    `description: "${safeDescription}"`,
    `date: ${date}`,
    `lang: ${lang}`,
    `tags: [${safeTags.map((t: string) => `'${t}'`).join(', ')}]`,
    '---',
    '',
  ].join('\n');

  const fileContent = frontmatter + content;
  const filePath = `src/content/blog/${slug}.md`;

  // Commit to GitHub via API
  const repo = import.meta.env.GITHUB_REPO || 'PierreTzt/portfolio';
  const token = import.meta.env.GITHUB_TOKEN;

  if (!token) {
    return new Response(JSON.stringify({ error: 'GitHub token non configuré' }), { status: 500 });
  }

  try {
    // Check if file already exists
    let sha: string | undefined;
    try {
      const existing = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      if (existing.ok) {
        const data = await existing.json();
        sha = data.sha;
      }
    } catch {}

    // Create or update the file
    const body: Record<string, unknown> = {
      message: `Publier l'article : ${title}`,
      content: Buffer.from(fileContent).toString('base64'),
      branch: 'main',
    };
    if (sha) body.sha = sha;

    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('[publish] GitHub API error:', err);
      return new Response(JSON.stringify({ error: 'Erreur lors de la publication' }), { status: 500 });
    }

    const result = await response.json();
    const blogUrl = `/${lang}/blog/${slug}/`;

    return new Response(JSON.stringify({
      success: true,
      slug,
      url: blogUrl,
      commitUrl: result.commit?.html_url,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[publish] Error:', err);
    return new Response(JSON.stringify({ error: 'Erreur lors de la publication' }), { status: 500 });
  }
};
