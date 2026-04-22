/**
 * POST /api/login — ouvre une session admin.
 *
 * Reçoit { password } en JSON. Si le mot de passe matche ADMIN_PASSWORD,
 * pose un cookie `admin-auth` signé HMAC (voir utils/auth.ts) valide 24h.
 * Sinon, renvoie 401.
 *
 * Note novice :
 *   - rate-limit 5 tentatives/minute par IP : appliqué par le middleware (src/middleware.ts).
 *   - prerender = false : route SSR, recalculée à chaque appel.
 */
import type { APIRoute } from 'astro';
import { createSessionToken } from '../../utils/auth';
import { timingSafeEqual } from 'crypto';

export const prerender = false;

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export const POST: APIRoute = async ({ request, cookies }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Corps JSON invalide' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { password } = body;

  if (password && safeCompare(password, import.meta.env.ADMIN_PASSWORD)) {
    cookies.set('admin-auth', createSessionToken(import.meta.env.ADMIN_PASSWORD), {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    });
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: false }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
};
