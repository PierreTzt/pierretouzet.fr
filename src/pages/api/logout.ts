/**
 * POST /api/logout — ferme la session admin.
 *
 * Supprime le cookie `admin-auth` côté navigateur. Pas d'invalidation
 * serveur nécessaire : le token contient l'expiration dans sa payload.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete('admin-auth', { path: '/' });
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
