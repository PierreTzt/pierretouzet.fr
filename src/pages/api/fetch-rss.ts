import type { APIRoute } from 'astro';
import { promises as dns } from 'node:dns';
import net from 'node:net';
import { isAuthenticated } from '../../utils/auth';

export const prerender = false;

const FETCH_TIMEOUT_MS = 5000;
const MAX_RESPONSE_BYTES = 2 * 1024 * 1024; // 2 MB
const MAX_REDIRECTS = 3;

function ipToBigInt(ip: string): bigint {
  if (net.isIPv4(ip)) {
    return ip.split('.').reduce((acc, part) => (acc << 8n) + BigInt(parseInt(part, 10)), 0n);
  }
  // IPv6 — expand and convert
  const full = expandIPv6(ip);
  return full.split(':').reduce((acc, part) => (acc << 16n) + BigInt(parseInt(part || '0', 16)), 0n);
}

function expandIPv6(ip: string): string {
  if (!ip.includes('::')) return ip;
  const [head, tail] = ip.split('::');
  const headParts = head ? head.split(':') : [];
  const tailParts = tail ? tail.split(':') : [];
  const missing = 8 - headParts.length - tailParts.length;
  return [...headParts, ...Array(missing).fill('0'), ...tailParts].join(':');
}

function inRange(ip: bigint, start: string, prefix: number, isV6: boolean): boolean {
  const startInt = ipToBigInt(start);
  const total = isV6 ? 128 : 32;
  const mask = ((1n << BigInt(prefix)) - 1n) << BigInt(total - prefix);
  return (ip & mask) === (startInt & mask);
}

function isPrivateOrReservedIP(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const n = ipToBigInt(ip);
    const ranges: [string, number][] = [
      ['0.0.0.0', 8],       // current network
      ['10.0.0.0', 8],      // RFC1918
      ['100.64.0.0', 10],   // CGNAT
      ['127.0.0.0', 8],     // loopback
      ['169.254.0.0', 16],  // link-local (includes 169.254.169.254 IMDS)
      ['172.16.0.0', 12],   // RFC1918
      ['192.0.0.0', 24],    // IETF
      ['192.0.2.0', 24],    // documentation
      ['192.168.0.0', 16],  // RFC1918
      ['198.18.0.0', 15],   // benchmarking
      ['198.51.100.0', 24], // documentation
      ['203.0.113.0', 24],  // documentation
      ['224.0.0.0', 4],     // multicast
      ['240.0.0.0', 4],     // reserved
    ];
    return ranges.some(([start, prefix]) => inRange(n, start, prefix, false));
  }
  if (net.isIPv6(ip)) {
    const expanded = expandIPv6(ip.toLowerCase());
    const n = ipToBigInt(expanded);
    const ranges: [string, number][] = [
      ['::1', 128],             // loopback
      ['::ffff:0:0', 96],       // IPv4-mapped (blocked here; re-check embedded v4 below)
      ['64:ff9b::', 96],        // IPv4/IPv6 translation
      ['100::', 64],            // discard
      ['fc00::', 7],            // ULA
      ['fe80::', 10],           // link-local
      ['ff00::', 8],            // multicast
      ['::', 128],              // unspecified
    ];
    if (ranges.some(([start, prefix]) => inRange(n, start, prefix, true))) return true;
    // IPv4-mapped IPv6: extract and re-check
    const v4MappedMatch = expanded.match(/^0{1,4}(?::0{1,4}){4}:ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
    if (v4MappedMatch) {
      const hi = parseInt(v4MappedMatch[1], 16);
      const lo = parseInt(v4MappedMatch[2], 16);
      const v4 = `${(hi >> 8) & 0xff}.${hi & 0xff}.${(lo >> 8) & 0xff}.${lo & 0xff}`;
      return isPrivateOrReservedIP(v4);
    }
    return false;
  }
  return true; // not a valid IP string → reject
}

async function resolveToPublicIP(hostname: string): Promise<string | null> {
  try {
    const results = await dns.lookup(hostname, { all: true, verbatim: true });
    if (results.length === 0) return null;
    for (const { address } of results) {
      if (isPrivateOrReservedIP(address)) return null;
    }
    return results[0].address;
  } catch {
    return null;
  }
}

function isAllowedUrlShape(urlStr: string): URL | null {
  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== 'https:') return null;
    const host = parsed.hostname.toLowerCase();
    if (host.endsWith('.internal') || host.endsWith('.local') || host.endsWith('.localhost')) return null;
    if (['metadata.google.internal', 'metadata', 'localhost'].includes(host)) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function safeFetch(url: string, depth = 0): Promise<Response | { error: string; status: number }> {
  if (depth > MAX_REDIRECTS) return { error: 'Trop de redirections', status: 400 };

  const parsed = isAllowedUrlShape(url);
  if (!parsed) return { error: 'URL non autorisée (schéma ou hostname)', status: 400 };

  const resolved = await resolveToPublicIP(parsed.hostname);
  if (!resolved) return { error: 'URL non autorisée (résolution DNS privée ou échec)', status: 400 };

  const res = await fetch(url, {
    headers: { 'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml' },
    redirect: 'manual',
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (res.status >= 300 && res.status < 400) {
    const location = res.headers.get('location');
    if (!location) return { error: 'Redirection sans Location', status: 502 };
    const nextUrl = new URL(location, url).toString();
    return safeFetch(nextUrl, depth + 1);
  }

  return res;
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

async function readCapped(res: Response, maxBytes: number): Promise<string | null> {
  const declared = Number(res.headers.get('content-length') || '0');
  if (declared && declared > maxBytes) return null;

  const reader = res.body?.getReader();
  if (!reader) return null;

  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder('utf-8').decode(Buffer.concat(chunks.map((c) => Buffer.from(c))));
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

  if (!url || typeof url !== 'string') {
    return new Response(JSON.stringify({ error: 'URL requise' }), { status: 400 });
  }

  try {
    const result = await safeFetch(url);
    if ('error' in result) {
      return new Response(JSON.stringify({ error: result.error }), { status: result.status, headers: { 'Content-Type': 'application/json' } });
    }

    if (!result.ok) {
      return new Response(JSON.stringify({ error: `Erreur HTTP ${result.status}` }), { status: 502 });
    }

    const xml = await readCapped(result, MAX_RESPONSE_BYTES);
    if (xml === null) {
      return new Response(JSON.stringify({ error: 'Réponse trop volumineuse' }), { status: 413 });
    }

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
