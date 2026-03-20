import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email } = body;

  if (!name || !email) {
    return new Response(JSON.stringify({ error: 'Name and email are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email format' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Log the lead (visible in Vercel function logs)
  console.log(`[ebook-lead] ${new Date().toISOString()} | Name: ${name} | Email: ${email}`);

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
