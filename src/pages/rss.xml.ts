import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => data.lang === 'fr' && !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Pierre Touzet — Blog',
    description: 'Réflexions sur l\'ingénierie pédagogique, l\'IA en éducation et l\'innovation digitale.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/fr/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: '<language>fr</language>',
  });
}
