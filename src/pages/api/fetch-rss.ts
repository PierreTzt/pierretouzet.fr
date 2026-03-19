import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../utils/auth';

export const prerender = false;

function isAllowedUrl(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== 'https:') return false;
    const host = parsed.hostname.toLowerCase();
    const blocked = ['169.254.169.254', 'metadata.google.internal', 'localhost', '127.0.0.1', '0.0.0.0', '::1'];
    if (blocked.includes(host)) return false;
    if (host.endsWith('.internal') || host.endsWith('.local')) return false;
    if (/^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/.test(host)) return false;
    return true;
  } catch { return false; }
}

interface RssItem {
  title: string;
  link: string;
  date: string;
  description: string;
}

function extractItems(xml: string): RssItem[] {
  const items: RssItem[] = [];

  // Handle RSS 2.0 <item> and Atom <entry>
  const itemRegex = /<(?:item|entry)[\s>]([\s\S]*?)<\/(?:item|entry)>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    const title = block.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i)?.[1]?.trim() || '';
    const linkHref = block.match(/<link[^>]*href="([^"]*)"/);
    const linkText = block.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
    const link = linkHref?.[1] || linkText?.[1]?.trim() || '';
    const date = block.match(/<(?:pubDate|published|updated)[^>]*>([\s\S]*?)<\/(?:pubDate|published|updated)>/i)?.[1]?.trim() || '';
    const description = block.match(/<(?:description|summary|content)[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/(?:description|summary|content)>/i)?.[1]?.trim() || '';

    // Strip HTML tags from description
    const cleanDesc = description.replace(/<[^>]+>/g, '').slice(0, 200);

    if (title) {
      items.push({ title, link, date, description: cleanDesc });
    }
  }

  return items.slice(0, 10);
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

  const { url } = body;

  if (!url) {
    return new Response(JSON.stringify({ error: 'URL requise' }), { status: 400 });
  }

  if (!isAllowedUrl(url)) {
    return new Response(JSON.stringify({ error: 'URL non autorisée' }), { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { 'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml' },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `Erreur HTTP ${res.status}` }), { status: 502 });
    }

    const xml = await res.text();
    const items = extractItems(xml);

    if (items.length === 0) {
      return new Response(JSON.stringify({ error: 'Aucun article trouvé dans le flux' }), { status: 422 });
    }

    return new Response(JSON.stringify({ items }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération du flux' }), { status: 500 });
  }
};
