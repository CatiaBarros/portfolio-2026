import { parsePost, slugify, isEnFile } from '$lib/utils/markdown';

export const prerender = true;

const SITE = 'https://catia.pt';
const CHANNEL_TITLE = 'Cátia Barros — Blog';
const CHANNEL_DESC =
  'O mundo aos olhos da geração Z: reflexões sobre jornalismo, tecnologia e o que aprendo pelo caminho.';

const rawPosts = import.meta.glob('../../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Make root-relative URLs (images, links) absolute so they resolve inside emails.
function absolutize(html: string): string {
  return html.replace(/(src|href)="\/(?!\/)/g, `$1="${SITE}/`);
}

// Guard against a stray "]]>" prematurely closing the CDATA section.
function cdata(html: string): string {
  return `<![CDATA[${html.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

export function GET() {
  const posts = Object.entries(rawPosts)
    .filter(([path]) => !isEnFile(path) && !slugify(path).startsWith('_'))
    .map(([path, raw]) => parsePost(slugify(path), raw))
    .filter((post) => post.date)
    .sort((a, b) => b.date.localeCompare(a.date));

  const items = posts
    .map((post) => {
      const link = `${SITE}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const content = absolutize(post.html);
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>${
        post.description ? `\n      <description>${xmlEscape(post.description)}</description>` : ''
      }
      <content:encoded>${cdata(content)}</content:encoded>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(CHANNEL_TITLE)}</title>
    <link>${SITE}/blog</link>
    <description>${xmlEscape(CHANNEL_DESC)}</description>
    <language>pt-PT</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  });
}
