<script lang="ts">
  import { t, lang } from '$lib/stores/lang';
  import { fetchCSV } from '$lib/utils/csv';
  import WorkCard from '$lib/components/WorkCard.svelte';
  import { translateCat } from '$lib/utils/categories';
  import { onMount } from 'svelte';

  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRcOnYaiOQtk2Fvt-FQfvwSYkY1OCctGqWapiAejAER-Oq1CdCuIMCjmiDwzrsc6z1fJ8VgIlRXjNdX/pub?output=csv';

  type Work = {
    slug: string; cover: string; category: string; technologies: string;
    title_pt: string; title_en: string; description_pt: string; description_en: string;
    url: string; date: string;
  };

  let works: Work[] = [];
  let loading = true;
  let error = false;
  let activeFilter = 'all';

  onMount(async () => {
    try {
      const rows = await fetchCSV(CSV_URL);
      works = (rows as Work[]).sort((a, b) => b.date.localeCompare(a.date));
    } catch {
      error = true;
    } finally {
      loading = false;
    }
  });

  $: allCategories = (() => {
    const cats = new Set<string>();
    works.forEach(w => w.category.split(';').forEach(c => { if (c.trim()) cats.add(c.trim()); }));
    return Array.from(cats).sort().map(raw => ({ raw, label: translateCat(raw, $lang) }));
  })();

  $: filtered = activeFilter === 'all'
    ? works
    : works.filter(w => w.category.split(';').map(c => c.trim()).includes(activeFilter));
</script>

<svelte:head>
  <title>{$t.works.title} — Cátia Barros</title>
  <meta name="description" content={$t.works.subtitle} />
  <meta property="og:title" content="{$t.works.title} — Cátia Barros" />
  <meta property="og:description" content={$t.works.subtitle} />
  <meta property="og:url" content="https://catia.pt/works" />
</svelte:head>

<div class="page section">
  <div class="container">
    <header class="page-header">
      <h1>{$t.works.title}</h1>
      <p class="subtitle">{$t.works.subtitle}</p>
    </header>

    {#if !loading && !error && works.length > 0}
      <div class="filters" role="group" aria-label="Filtrar por categoria">
        <button class="filter-btn" class:active={activeFilter === 'all'} on:click={() => activeFilter = 'all'}>
          {$t.works.all}<span class="count">{works.length}</span>
        </button>
        {#each allCategories as cat}
          <button class="filter-btn" class:active={activeFilter === cat.raw} on:click={() => activeFilter = cat.raw}>
            {cat.label}<span class="count">{works.filter(w => w.category.split(';').map(c=>c.trim()).includes(cat.raw)).length}</span>
          </button>
        {/each}
      </div>
    {/if}

    {#if loading}
      <div class="state"><div class="spinner" aria-hidden="true"></div><p>{$t.works.loading}</p></div>
    {:else if error}
      <div class="state"><p>{$t.works.error}</p></div>
    {:else if filtered.length === 0}
      <div class="state"><p>{$t.works.noResults}</p></div>
    {:else}
      <ul class="work-list" role="list">
        {#each filtered as work (work.slug)}<li><WorkCard {...work} /></li>{/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .page-header { margin-bottom: 3rem; }
  .page-header h1 { margin-bottom: 0.75rem; }
  .subtitle { color: var(--text-2); font-size: 1.05rem; max-width: 60ch; }
  .filters { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
  .filter-btn { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 500; padding: 0.45em 0.9em; border: 1.5px solid var(--border); background: transparent; color: var(--text-2); cursor: pointer; transition: all 0.15s ease; }
  .filter-btn:hover { border-color: var(--green); color: var(--green); }
  .filter-btn.active { background: var(--green); border-color: var(--green); color: #fff; }
  .count { font-family: var(--font-mono); font-size: 0.7em; opacity: 0.75; }
  .filter-btn.active .count { opacity: 1; }
  .work-list { display: flex; flex-direction: column; max-width: 860px; border-top: 1px solid var(--border); }
  .state { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 4rem 0; color: var(--text-2); }
  .spinner { width: 32px; height: 32px; border: 2.5px solid var(--border); border-top-color: var(--green); border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
