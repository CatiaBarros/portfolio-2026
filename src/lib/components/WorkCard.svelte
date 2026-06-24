<script lang="ts">
  import { lang } from '../stores/lang';
  import { translateCat } from '../utils/categories';

  export let slug: string;
  export let cover: string;
  export let category: string;
  export let technologies: string;
  export let title_pt: string;
  export let title_en: string;
  export let description_pt: string;
  export let description_en: string;
  export let url: string;
  export let date: string;

  $: title = $lang === 'pt' ? title_pt : title_en;
  $: description = $lang === 'pt' ? description_pt : description_en;
  $: cats = category.split(';').map(c => translateCat(c.trim(), $lang)).filter(Boolean);
  $: techs = technologies.split(';').map(t => t.trim()).filter(Boolean);
  $: year = date ? date.slice(0, 4) : '';

  let imgError = false;

  $: viewLabel = $lang === 'pt' ? 'Ver trabalho →' : 'View work →';
</script>

<article class="work-row">
  <div class="row-thumb">
    {#if cover && !imgError}
      <img
        src={cover}
        alt=""
        loading="lazy"
        on:error={() => imgError = true}
      />
    {:else}
      <div class="thumb-placeholder" aria-hidden="true">
        <span class="mono">{slug.slice(0, 2).toUpperCase()}</span>
      </div>
    {/if}
  </div>

  <div class="row-body">
    <div class="row-meta">
      {#if year}
        <time class="row-year mono" datetime={date}>{year}</time>
      {/if}
      <div class="row-cats">
        {#each cats as cat}
          <span class="tag">{cat}</span>
        {/each}
      </div>
    </div>

    <h3 class="row-title">{title}</h3>

    {#if description}
      <p class="row-desc">{description}</p>
    {/if}

    {#if techs.length}
      <div class="row-techs">
        {#each techs as tech}
          <span class="tech mono">{tech}</span>
        {/each}
      </div>
    {/if}

    {#if url}
      <div class="row-actions">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          class="btn-action primary"
        >
          {viewLabel}
        </a>
      </div>
    {/if}
  </div>
</article>

<style>
  .work-row {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 2rem;
    padding: 2rem 0;
    border-bottom: 1px solid var(--border);
    align-items: start;
  }

  .row-thumb {
    aspect-ratio: 4/3;
    background: var(--bg-2);
    overflow: hidden;
    border: 1px solid var(--border);
    flex-shrink: 0;
  }

  .row-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    display: block;
  }

  .work-row:hover .row-thumb img { transform: scale(1.03); }

  .thumb-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--green-xlight);
    color: var(--green);
    font-size: 1.4rem;
    font-weight: 700;
  }

  .row-body {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .row-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .row-year {
    font-size: 0.72rem;
    color: var(--text-3);
    letter-spacing: 0.04em;
  }

  .row-cats { display: flex; gap: 0.3rem; flex-wrap: wrap; }

  .row-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.3;
    color: var(--text);
  }

  .row-desc {
    font-size: 0.875rem;
    color: var(--text-2);
    line-height: 1.6;
    max-width: none;
  }

  .row-techs {
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
  }

  .tech {
    font-size: 0.65rem;
    color: var(--text-3);
    background: var(--bg-2);
    padding: 0.15em 0.5em;
    border: 1px solid var(--border);
  }

  .row-actions { padding-top: 0.25rem; }

  .btn-action {
    display: inline-flex;
    align-items: center;
    font-size: 0.82rem;
    font-weight: 500;
    padding: 0.45em 0.9em;
    border: 1px solid var(--green);
    color: var(--green);
    background: transparent;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
    font-family: var(--font-body);
  }

  .btn-action.primary:hover {
    background: var(--green);
    color: #fff;
  }

  @media (max-width: 640px) {
    .work-row {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .row-thumb { aspect-ratio: 16/9; }
  }
</style>
