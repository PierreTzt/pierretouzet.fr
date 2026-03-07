import type { APIRoute } from 'astro';

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
  const cookie = cookies.get('admin-auth')?.value;
  if (cookie !== import.meta.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401 });
  }

  const { title, description, tags, content, lang } = await request.json();

  if (!title || !content || !lang) {
    return new Response(JSON.stringify({ error: 'Titre, contenu et langue requis' }), { status: 400 });
  }

  const slug = slugify(title);
  const date = new Date().toISOString().split('T')[0];

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    `date: ${date}`,
    `lang: ${lang}`,
    `tags: [${tags.map((t: string) => `'${t}'`).join(', ')}]`,
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
      return new Response(JSON.stringify({ error: 'GitHub API error', details: err }), { status: 500 });
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
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
