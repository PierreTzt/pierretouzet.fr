/**
 * AUTHENTIFICATION — helpers pour la session admin.
 *
 * Principe (pour novices) :
 *   - Un token de session = "timestamp.signature" où signature = HMAC-SHA256(timestamp, secret).
 *   - Le secret est ADMIN_PASSWORD (variable d'env).
 *   - Personne ne peut forger un token sans connaître le secret.
 *   - Le token expire après 24 h (vérification du timestamp).
 *
 * Le cookie `admin-auth` contient ce token. Il est posé par /api/login et
 * vérifié par le middleware + chaque endpoint sensible (garde-fou).
 *
 * timingSafeEqual : comparaison en temps constant. Évite qu'un attaquant
 * puisse deviner une signature caractère par caractère en mesurant le temps
 * de réponse (timing attack).
 *
 * Voir DEVELOPER_GUIDE.md §14.
 */
import type { AstroCookies } from 'astro';
import { createHmac, timingSafeEqual } from 'crypto';

const SESSION_MAX_AGE = 24 * 60 * 60 * 1000; // 24h in ms

export function createSessionToken(secret: string): string {
  const payload = Date.now().toString();
  const sig = createHmac('sha256', secret).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string, secret: string): boolean {
  const dotIndex = token.indexOf('.');
  if (dotIndex === -1) return false;
  const payload = token.substring(0, dotIndex);
  const sig = token.substring(dotIndex + 1);
  const expected = createHmac('sha256', secret).update(payload).digest('hex');
  if (sig.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const age = Date.now() - parseInt(payload, 10);
  return age >= 0 && age < SESSION_MAX_AGE;
}

export function isAuthenticated(request: Request, cookies: AstroCookies): boolean {
  const secret = import.meta.env.ADMIN_PASSWORD;
  if (!secret) {
    console.error('[auth] ADMIN_PASSWORD not set');
    return false;
  }

  // Try Astro cookies helper first
  const astroCookie = cookies.get('admin-auth')?.value;
  if (astroCookie && verifySessionToken(astroCookie, secret)) return true;

  // Fallback: parse raw Cookie header
  const raw = request.headers.get('cookie') || '';
  const match = raw.match(/admin-auth=([^;]+)/);
  if (match && verifySessionToken(decodeURIComponent(match[1]), secret)) return true;

  return false;
}
