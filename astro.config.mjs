// @ts-check
/**
 * CONFIGURATION ASTRO — lue au build et en dev.
 *
 * Ce fichier contrôle :
 *   - site : URL canonique du site (utilisée pour canonical, sitemap, OG)
 *   - adapter : Vercel (SSR fonctions + CDN statique)
 *     `includeFiles` bundle les polices nécessaires aux fonctions SSR
 *   - vite.plugins : Tailwind v4 via @tailwindcss/vite (remplace l'ancien
 *     integration @astrojs/tailwind)
 *   - integrations.sitemap : génère sitemap.xml avec priorités par type de page
 *   - i18n : déclare FR (défaut) + EN avec préfixes d'URL obligatoires
 *
 * Voir DEVELOPER_GUIDE.md §18.
 */
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Sentry: uncomment when SENTRY_DSN is configured in Vercel
// import sentry from '@sentry/astro';

export default defineConfig({
  site: 'https://www.pierretouzet.fr',
  adapter: vercel({
    includeFiles: [
      './node_modules/@fontsource/inter/files/inter-latin-400-normal.woff',
      './node_modules/@fontsource/inter/files/inter-latin-700-normal.woff',
      './node_modules/@fontsource/sora/files/sora-latin-700-normal.woff',
    ],
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    // sentry({ sourcemaps: { disable: true }, telemetry: false }),
    sitemap({
      filter: (page) => !page.includes('/admin/'),
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR',
          en: 'en-US',
        },
      },
      serialize(item) {
        const url = item.url.replace('https://www.pierretouzet.fr', '');

        // Home pages
        if (url === '/fr/' || url === '/en/') {
          item.changefreq = 'monthly';
          item.priority = 1.0;
        }
        // Blog posts
        else if (url.match(/\/blog\/[^/]+\//)) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        }
        // Project detail pages
        else if (url.match(/\/(projets|projects)\/[^/]+\//)) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        }
        // List pages
        else if (url.match(/\/(projets|projects|experiences|competences|skills|blog)\//)) {
          item.changefreq = 'monthly';
          item.priority = 0.7;
        }
        // Contact
        else if (url.includes('/contact/')) {
          item.changefreq = 'yearly';
          item.priority = 0.6;
        }
        // Legal
        else if (url.match(/\/(mentions-legales|legal)\//)) {
          item.changefreq = 'yearly';
          item.priority = 0.3;
        }
        // Default
        else {
          item.changefreq = 'monthly';
          item.priority = 0.5;
        }

        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
