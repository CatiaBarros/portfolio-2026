<script lang="ts">
  import { t, lang } from '$lib/stores/lang';
  import { parsePost, slugify, isEnFile } from '$lib/utils/markdown';
  import Newsletter from '$lib/components/Newsletter.svelte';

  const rawPosts = import.meta.glob('../../posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

  $: posts = (() => {
    const all = Object.entries(rawPosts).filter(([p]) => !slugify(p).startsWith('_'));
    const ptMap = new Map<string, string>();
    const enMap = new Map<string, string>();
    for (const [path, raw] of all) {
      const slug = slugify(path);
      if (isEnFile(path)) enMap.set(slug, raw);
      else ptMap.set(slug, raw);
    }
    const slugs = new Set([...ptMap.keys(), ...enMap.keys()]);
    return Array.from(slugs)
      .map(slug => {
        const raw = ($lang === 'en' && enMap.has(slug)) ? enMap.get(slug)! : (ptMap.get(slug) ?? enMap.get(slug)!);
        return parsePost(slug, raw);
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  })();

  function formatDate(dateStr: string, l: string) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(l === 'pt' ? 'pt-PT' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  }
</script>

<svelte:head>
  <title>{$t.blog.title} — Cátia Barros</title>
  <meta name="description" content={$t.blog.subtitle} />
  <meta property="og:title" content="{$t.blog.title} — Cátia Barros" />
  <meta property="og:description" content={$t.blog.subtitle} />
  <meta property="og:url" content="https://catia.pt/blog" />
</svelte:head>

<div class="page section">
  <div class="container">
    <header class="page-header">
      <h1>{$t.blog.title}</h1>
      <p class="subtitle">{$t.blog.subtitle}</p>
    </header>
    <div class="nl-wrap">
      <Newsletter />
    </div>

    {#if posts.length === 0}
      <p class="empty">{$t.blog.empty}</p>
    {:else}
      <ul class="post-list" role="list">
        {#each posts as post}
          <li class="post-item">
            <article>
              {#if post.date}
                <time class="post-date mono" datetime={post.date}>{formatDate(post.date, $lang)}</time>
              {/if}
              <h2 class="post-title"><a href="/blog/{post.slug}">{post.title}</a></h2>
              {#if post.description}<p class="post-desc">{post.description}</p>{/if}
              {#if post.tags && post.tags.length}
                <div class="post-tags">
                  {#each post.tags as tag}<span class="tag">{tag}</span>{/each}
                </div>
              {/if}
              <a href="/blog/{post.slug}" class="read-more">{$t.blog.readMore}</a>
            </article>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .nl-wrap :global(.newsletter) { margin-top: 0; border-top: none; padding-top: 0; margin-bottom: 2.5rem; }
  .page-header { margin-bottom: 3rem; }
  .page-header h1 { margin-bottom: 0.75rem; }
  .subtitle { color: var(--text-2); font-size: 1.05rem; max-width: 60ch; }
  .empty { color: var(--text-3); font-style: italic; font-size: 1.05rem; }
  .post-list { display: flex; flex-direction: column; }
  .post-item { border-bottom: 1px solid var(--border); padding: 2rem 0; }
  .post-date { display: block; font-size: 0.75rem; color: var(--text-3); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.06em; }
  .post-title { font-size: clamp(1.2rem, 3vw, 1.6rem); margin-bottom: 0.75rem; }
  .post-title a { color: var(--text); transition: color 0.15s ease; }
  .post-title a:hover { color: var(--green); }
  .post-desc { color: var(--text-2); font-size: 0.95rem; line-height: 1.65; margin-bottom: 0.75rem; max-width: 65ch; }
  .post-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem; }
  .read-more { font-size: 0.85rem; font-weight: 600; color: var(--green); transition: opacity 0.15s ease; }
  .read-more:hover { opacity: 0.75; }
</style>
