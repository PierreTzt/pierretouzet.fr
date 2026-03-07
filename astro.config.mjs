// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.pierretouzet.fr',
  adapter: vercel(),
  integrations: [
    tailwind(),
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
        item.lastmod = new Date();

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
