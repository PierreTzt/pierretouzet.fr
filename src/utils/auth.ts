import type { AstroCookies } from 'astro';

export function isAuthenticated(request: Request, cookies: AstroCookies): boolean {
  const password = import.meta.env.ADMIN_PASSWORD;
  if (!password) {
    console.error('[auth] ADMIN_PASSWORD not set');
    return false;
  }

  // Try Astro cookies helper first
  const astroCookie = cookies.get('admin-auth')?.value;
  if (astroCookie === password) return true;

  // Fallback: parse raw Cookie header
  const raw = request.headers.get('cookie') || '';
  const match = raw.match(/admin-auth=([^;]+)/);
  if (match && match[1] === password) return true;

  return false;
}
