import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Only protect /admin routes
  if (!context.url.pathname.startsWith('/admin')) {
    return next();
  }

  // Login page is always accessible
  if (context.url.pathname === '/admin/login') {
    return next();
  }

  // Check auth cookie
  const cookie = context.cookies.get('admin-auth');
  if (cookie?.value === import.meta.env.ADMIN_PASSWORD) {
    return next();
  }

  // Redirect to login
  return context.redirect('/admin/login');
});
