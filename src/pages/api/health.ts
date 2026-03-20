import type { APIRoute } from 'astro';
export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
