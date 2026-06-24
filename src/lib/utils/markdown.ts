import { marked, Renderer } from 'marked';
import hljs from 'highlight.js/lib/core';
import r from 'highlight.js/lib/languages/r';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';

hljs.registerLanguage('r', r);
hljs.registerLanguage('javascript', js);
hljs.registerLanguage('typescript', ts);
hljs.registerLanguage('python', python);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);

const renderer = new Renderer();

renderer.link = ({ href, title, text }: { href: string; title?: string | null; text: string }) =>
  `<a href="${href}"${title ? ` title="${title}"` : ''} target="_blank" rel="noopener noreferrer">${text}</a>`;

renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

marked.use({ renderer });

export interface PostMeta {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  [key: string]: unknown;
}

export interface Post extends PostMeta {
  slug: string;
  html: string;
}

function parseFrontmatter(raw: string): { meta: PostMeta; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: { title: '', date: '' }, body: raw };
  const yaml = match[1];
  const body = match[2];
  const meta: Record<string, unknown> = {};
  for (const line of yaml.split('\n')) {
    const [key, ...rest] = line.split(':');
    if (!key.trim()) continue;
    const val = rest.join(':').trim().replace(/^["']|["']$/g, '');
    if (key.trim() === 'tags') {
      meta[key.trim()] = val.replace(/^\[|\]$/g, '').split(',').map(t => t.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      meta[key.trim()] = val;
    }
  }
  return { meta: meta as PostMeta, body };
}

export function parsePost(slug: string, raw: string): Post {
  const { meta, body } = parseFrontmatter(raw);
  const html = marked(body) as string;
  return { slug, html, ...meta };
}

export function slugify(path: string): string {
  return (path.split('/').pop() ?? path).replace(/\.en\.md$/, '').replace(/\.md$/, '');
}

export function isEnFile(path: string): boolean {
  return path.endsWith('.en.md');
}
