<script lang="ts">
  import { t } from '$lib/stores/lang';
  import { fetchCSV } from '$lib/utils/csv';
  import { onMount } from 'svelte';

  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS2YmVZLjtjCrLNp7HxCpp5NAaYqdcmgulUZu4oO8k_xHhKpYtbKIu2wCvJ5NlxrmPF9tBbIAaz7BKc/pub?output=csv';

  type AcadWork = { title: string; type: string; container: string; publisher: string; year: string; url: string; };

  let works: AcadWork[] = [];
  let loading = true;
  let error = false;

  onMount(async () => {
    try {
      const rows = await fetchCSV(CSV_URL);
      works = (rows as AcadWork[]).sort((a, b) => b.year.localeCompare(a.year));
    } catch {
      error = true;
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{$t.academic.title} — Cátia Barros</title>
  <meta name="description" content={$t.academic.subtitle} />
  <meta property="og:title" content="{$t.academic.title} — Cátia Barros" />
  <meta property="og:description" content={$t.academic.subtitle} />
  <meta property="og:url" content="https://catia.pt/academic" />
</svelte:head>

<div class="page section">
  <div class="container">
    <header class="page-header">
      <h1>{$t.academic.title}</h1>
      <p class="subtitle">{$t.academic.subtitle}</p>
    </header>

    {#if loading}
      <div class="state"><div class="spinner" aria-hidden="true"></div></div>
    {:else if error}
      <div class="state"><p>Não foi possível carregar as publicações.</p></div>
    {:else}
      <ul class="pub-list" role="list">
        {#each works as pub}
          <li class="pub-item">
            {#if pub.year}<time class="pub-year mono" datetime={pub.year}>{pub.year}</time>{/if}
            <p class="pub-title">
              {#if pub.url}
                <a href={pub.url} target="_blank" rel="noopener noreferrer">{pub.title}</a>
              {:else}
                {pub.title}
              {/if}
            </p>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .page-header { margin-bottom: 3rem; }
  .page-header h1 { margin-bottom: 0.75rem; }
  .subtitle { color: var(--text-2); font-size: 1.05rem; max-width: 60ch; }
  .pub-list { display: flex; flex-direction: column; max-width: 800px; border-top: 1px solid var(--border); }
  .pub-item { display: flex; align-items: baseline; gap: 1.5rem; padding: 1rem 0; border-bottom: 1px solid var(--border); }
  .pub-year { font-size: 0.75rem; color: var(--text-3); flex-shrink: 0; width: 36px; }
  .pub-title { font-size: 0.975rem; font-weight: 400; line-height: 1.45; max-width: none; }
  .pub-title a { color: var(--text); transition: color 0.15s ease; }
  .pub-title a:hover { color: var(--green); }
  .state { display: flex; justify-content: center; padding: 4rem 0; }
  .spinner { width: 32px; height: 32px; border: 2.5px solid var(--border); border-top-color: var(--green); border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
