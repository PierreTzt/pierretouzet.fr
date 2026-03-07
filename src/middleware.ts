import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  if (!context.url.pathname.startsWith('/admin')) {
    return next();
  }

  // API routes handle their own auth via header
  if (context.url.pathname.startsWith('/api/')) {
    return next();
  }

  const cookie = context.cookies.get('admin-auth');
  if (cookie?.value === import.meta.env.ADMIN_PASSWORD) {
    return next();
  }

  // Check if this is a login POST
  if (context.request.method === 'POST') {
    const formData = await context.request.formData();
    const password = formData.get('password');
    if (password === import.meta.env.ADMIN_PASSWORD) {
      context.cookies.set('admin-auth', import.meta.env.ADMIN_PASSWORD, {
        path: '/admin',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24h
      });
      return context.redirect(context.url.pathname);
    }
  }

  // Show login form
  return new Response(
    `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin — Pierre Touzet</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Inter, system-ui, sans-serif; background: #fafafa; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .card { background: white; padding: 2.5rem; max-width: 360px; width: 100%; border: 1px solid #e4e4e7; }
    h1 { font-size: 1.125rem; font-weight: 600; margin-bottom: 1.5rem; color: #18181b; }
    input { width: 100%; padding: 0.625rem 0.75rem; border: 1px solid #e4e4e7; font-size: 0.875rem; font-family: inherit; margin-bottom: 1rem; outline: none; }
    input:focus { border-color: #4f46e5; }
    button { width: 100%; padding: 0.625rem; background: #18181b; color: white; border: none; font-size: 0.875rem; font-family: inherit; cursor: pointer; }
    button:hover { background: #4f46e5; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Accès admin</h1>
    <form method="POST">
      <input type="password" name="password" placeholder="Mot de passe" autofocus required />
      <button type="submit">Entrer</button>
    </form>
  </div>
</body>
</html>`,
    { status: 401, headers: { 'Content-Type': 'text/html' } }
  );
});
