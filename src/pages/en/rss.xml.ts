/**
 * /en/rss.xml — flux RSS des articles anglais (pendant du rss.xml français).
 */
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => data.lang === 'en' && !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Pierre Touzet — Blog',
    description: 'Articles on pedagogical engineering, digital innovation, and AI in education',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/en/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
