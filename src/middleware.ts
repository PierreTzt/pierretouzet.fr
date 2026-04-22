/**
 * MIDDLEWARE — s'exécute AVANT chaque requête SSR (pages admin + routes /api).
 *
 * Rôle :
 *   1. Rate-limit : bloque une IP qui envoie > 5 tentatives de login en 1 min (HTTP 429).
 *   2. Protection /admin : redirige vers /admin/login si le cookie admin-auth
 *      est absent ou invalide (sauf pour la page /admin/login elle-même).
 *
 * Note novice : le middleware ne tourne PAS pour les pages statiques (SSG).
 * Seules les pages ayant `export const prerender = false` passent par ici.
 *
 * Pour en savoir plus : voir DEVELOPER_GUIDE.md §13.
 */
import { defineMiddleware } from 'astro:middleware';
import { verifySessionToken } from './utils/auth';

// --- Rate limiting for login endpoint ---
// Map en mémoire. Partagée entre requêtes tant que l'instance Lambda est chaude.
// Simple mais suffisant pour un portfolio à faible trafic.
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count++;
  if (entry.count > 5) return true;
  return false;
}

function cleanupAttempts() {
  const now = Date.now();
  for (const [ip, entry] of loginAttempts) {
    if (now > entry.resetAt) loginAttempts.delete(ip);
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  // Rate limit login endpoint
  if (context.url.pathname === '/api/login' && context.request.method === 'POST') {
    cleanupAttempts();
    const ip = context.request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || context.request.headers.get('x-real-ip')
      || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Trop de tentatives. Réessayez dans une minute.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Only protect /admin routes
  if (!context.url.pathname.startsWith('/admin')) {
    return next();
  }

  // Login page is always accessible
  if (context.url.pathname === '/admin/login') {
    return next();
  }

  // Check auth cookie using HMAC token verification
  const secret = import.meta.env.ADMIN_PASSWORD;
  const cookie = context.cookies.get('admin-auth');
  if (secret && cookie?.value && verifySessionToken(cookie.value, secret)) {
    return next();
  }

  // Redirect to login
  return context.redirect('/admin/login');
});
