import { parsePost, slugify, isEnFile } from '$lib/utils/markdown';
import { buildFeed, feedHeaders } from '$lib/utils/rss';

export const prerender = true;

const rawPosts = import.meta.glob('../../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export function GET() {
  // English feed: only posts that have an English (.en.md) version.
  const posts = Object.entries(rawPosts)
    .filter(([path]) => isEnFile(path) && !slugify(path).startsWith('_'))
    .map(([path, raw]) => parsePost(slugify(path), raw))
    .filter((post) => post.date)
    .sort((a, b) => b.date.localeCompare(a.date));

  const xml = buildFeed(posts, {
    title: 'Cátia Barros — Blog',
    description:
      "The world through Gen Z eyes: notes on journalism, technology and what I learn along the way.",
    language: 'en-GB',
    selfPath: '/rss.en.xml',
  });

  return new Response(xml, { headers: feedHeaders });
}
