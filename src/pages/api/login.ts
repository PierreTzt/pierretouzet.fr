import type { APIRoute } from 'astro';
import { createSessionToken } from '../../utils/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Corps JSON invalide' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const { password } = body;

  if (password === import.meta.env.ADMIN_PASSWORD) {
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
