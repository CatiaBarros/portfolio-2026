import type { Post } from './markdown';

export const SITE = 'https://catia.pt';

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

export interface FeedOptions {
  title: string;
  description: string;
  language: string; // e.g. 'pt-PT' | 'en-GB'
  selfPath: string; // e.g. '/rss.xml'
}

export function buildFeed(posts: Post[], opts: FeedOptions): string {
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

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(opts.title)}</title>
    <link>${SITE}/blog</link>
    <description>${xmlEscape(opts.description)}</description>
    <language>${opts.language}</language>
    <atom:link href="${SITE}${opts.selfPath}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

export const feedHeaders = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'max-age=0, s-maxage=3600',
};
