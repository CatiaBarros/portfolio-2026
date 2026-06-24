<script lang="ts">
  import { t, lang } from '$lib/stores/lang';
  import { parsePost, slugify, isEnFile } from '$lib/utils/markdown';
  import Newsletter from '$lib/components/Newsletter.svelte';
  import { page } from '$app/stores';

  const rawPosts = import.meta.glob('../../../posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

  $: slug = $page.params.slug;

  $: post = (() => {
    const entries = Object.entries(rawPosts).filter(([p]) => slugify(p) === slug);
    const enEntry = entries.find(([p]) => isEnFile(p));
    const ptEntry = entries.find(([p]) => !isEnFile(p));
    const entry = ($lang === 'en' && enEntry) ? enEntry : (ptEntry ?? enEntry);
    return entry ? parsePost(slug, entry[1]) : null;
  })();

  $: title = post?.title ?? '';

  function formatDate(dateStr: string, l: string) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(l === 'pt' ? 'pt-PT' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function splitAfterFirstParagraph(html: string): [string, string] {
    const idx = html.indexOf('</p>');
    if (idx === -1) return ['', html];
    return [html.slice(0, idx + 4), html.slice(idx + 4)];
  }

  $: [firstPara, restOfPost] = post?.html ? splitAfterFirstParagraph(post.html) : ['', ''];

  $: postUrl = `https://catia.pt/blog/${slug}`;
  $: shareText = encodeURIComponent(title);
  $: shareUrl  = encodeURIComponent(postUrl);

  const canShare = typeof navigator !== 'undefined' && !!navigator.share;
  function nativeShare() { navigator.share({ title, url: postUrl }).catch(() => {}); }
</script>

<svelte:head>
  <title>{title} — Cátia Barros</title>
  {#if post?.description}
    <meta name="description" content={post.description} />
    <meta property="og:description" content={post.description} />
  {/if}
  <meta property="og:title" content="{title} — Cátia Barros" />
  <meta property="og:url" content={postUrl} />
  <meta property="og:type" content="article" />
</svelte:head>

<div class="page section">
  <div class="container">
    <a href="/blog" class="back">{$t.blog.back}</a>

    {#if !post}
      <p class="not-found">Post não encontrado.</p>
    {:else}
      <div class="post-layout">
        <article class="post">
          <header class="post-header">
            {#if post.date}
              <time class="post-date mono" datetime={post.date}>{formatDate(post.date, $lang)}</time>
            {/if}
            <h1 class="post-title">{title}</h1>
            {#if post.tags && post.tags.length}
              <div class="post-tags">
                {#each post.tags as tag}<span class="tag">{tag}</span>{/each}
              </div>
            {/if}
          </header>

          <div class="post-body">
            {@html firstPara}

            <div class="share-inline">
              <span class="share-label mono">{$lang === 'pt' ? 'Partilhar' : 'Share'}</span>
              <div class="share-links">
                <a href="https://bsky.app/intent/compose?text={shareText}%20{shareUrl}" target="_blank" rel="noopener noreferrer" aria-label="Partilhar no Bluesky" title="Bluesky">
                  <svg width="18" height="18" viewBox="0 0 568 501" fill="currentColor" aria-hidden="true"><path d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.209C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.853-185.702-70.329-2.479-7.225-3.641-10.587-3.631-7.725.01 2.862-1.152 6.224-3.631 7.725C266.939 422.467 214.527 576.312 94.667 453.32 31.556 388.56 60.778 323.8 175.653 304.25c-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.66 0 75.293 0 57.947c0-86.853 76.134-59.558 123.121-24.283z"/></svg>
                </a>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url={shareUrl}" target="_blank" rel="noopener noreferrer" aria-label="Partilhar no LinkedIn" title="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://x.com/intent/tweet?text={shareText}&url={shareUrl}" target="_blank" rel="noopener noreferrer" aria-label="Partilhar no X" title="X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://wa.me/?text={shareText}%20{shareUrl}" target="_blank" rel="noopener noreferrer" aria-label="Partilhar no WhatsApp" title="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                </a>
                {#if canShare}
                  <button class="share-native" on:click={nativeShare} aria-label="Mais opções">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </button>
                {/if}
              </div>
            </div>

            {@html restOfPost}
          </div>

          <div class="nl-mobile"><Newsletter /></div>

          <aside class="post-contact">
            <p class="contact-prompt">
              {$lang === 'pt' ? 'Tens alguma reação a este post? Fala comigo.' : 'Got a reaction to this post? Get in touch.'}
            </p>
            <div class="contact-links">
              <a href="mailto:catia.s.g.barros@gmail.com">catia.s.g.barros@gmail.com</a>
              <a href="https://bsky.app/profile/catia.pt" target="_blank" rel="noopener noreferrer">Bluesky</a>
              <a href="https://linkedin.com/in/cátia-barros-8b8247162" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </aside>
        </article>

        <aside class="post-sidebar">
          <div class="sidebar-sticky"><Newsletter /></div>
        </aside>
      </div>
    {/if}
  </div>
</div>

<style>
  .post-layout { display: grid; grid-template-columns: 1fr; gap: 4rem; align-items: start; }
  @media (min-width: 1024px) { .post-layout { grid-template-columns: 68ch 200px; gap: 3rem; } }
  .nl-mobile { display: block; }
  .post-sidebar { display: none; }
  @media (min-width: 1024px) {
    .nl-mobile { display: none; }
    .post-sidebar { display: block; }
    .sidebar-sticky { position: sticky; top: calc(var(--header-h) + 2rem); max-height: calc(100vh - var(--header-h) - 4rem); overflow-y: auto; }
  }
  .back { display: inline-flex; align-items: center; font-size: 0.85rem; font-weight: 500; color: var(--text-3); margin-bottom: 2.5rem; transition: color 0.15s ease; }
  .back:hover { color: var(--green); }
  .not-found { color: var(--text-3); }
  .post { max-width: 68ch; min-width: 0; overflow-x: hidden; }
  .post-header { margin-bottom: 3rem; }
  .post-date { display: block; font-size: 0.75rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.75rem; }
  .post-title { font-size: clamp(1.8rem, 5vw, 3rem); margin-bottom: 1rem; }
  .post-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
  .post-body :global(h2) { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; margin: 2.5rem 0 1rem; letter-spacing: -0.02em; }
  .post-body :global(h3) { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; margin: 2rem 0 0.75rem; }
  .post-body :global(p) { font-size: 1.05rem; line-height: 1.75; color: var(--text-2); margin-bottom: 1.25rem; max-width: 68ch; }
  .post-body :global(a) { color: var(--green); text-decoration: underline; text-underline-offset: 3px; }
  .post-body :global(code) { font-family: var(--font-mono); font-size: 0.85em; background: var(--bg-2); border: 1px solid var(--border); padding: 0.1em 0.4em; border-radius: var(--radius-sm); }
  .post-body :global(pre) { background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; overflow-x: auto; margin-bottom: 1.5rem; }
  .post-body :global(pre code) { background: none; border: none; padding: 0; font-size: 0.875rem; }
  .post-body :global(blockquote) { border-left: 3px solid var(--green); padding-left: 1.25rem; margin: 1.5rem 0; color: var(--text-2); font-style: italic; }
  .post-body :global(ul), .post-body :global(ol) { padding-left: 1.5rem; margin-bottom: 1.25rem; }
  .post-body :global(li) { font-size: 1.05rem; line-height: 1.75; color: var(--text-2); margin-bottom: 0.35rem; list-style: disc; max-width: 68ch; }
  .post-body :global(ol li) { list-style: decimal; }
  .post-body :global(hr) { border: none; border-top: 1px solid var(--border); margin: 2.5rem 0; }
  .post-body :global(img) { border-radius: var(--radius); margin: 1.5rem 0; max-width: 100%; height: auto; display: block; }
  .share-inline { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin: 1.75rem 0; padding: 1rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .share-label { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); flex-shrink: 0; }
  .share-links { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }
  .share-links a, .share-native { color: var(--text-3); display: flex; align-items: center; transition: color 0.15s; background: transparent; border: none; cursor: pointer; padding: 0; }
  .share-links a:hover, .share-native:hover { color: var(--green); }
  .post-contact { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
  .contact-prompt { font-size: 0.95rem; color: var(--text-2); margin-bottom: 0.75rem; }
  .contact-links { display: flex; gap: 1.25rem; flex-wrap: wrap; }
  .contact-links a { font-size: 0.85rem; color: var(--green); text-decoration: underline; text-underline-offset: 3px; transition: opacity 0.15s; }
  .contact-links a:hover { opacity: 0.75; }
</style>
