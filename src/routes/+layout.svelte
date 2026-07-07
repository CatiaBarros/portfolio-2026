<script lang="ts">
  import '../app.css';
  import { theme } from '$lib/stores/theme';
  import { lang } from '$lib/stores/lang';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  onMount(() => {
    theme.init();
  });

  $: if (typeof document !== 'undefined') document.documentElement.lang = $lang;

  // Individual blog posts define their own share image; everything else uses the site default.
  $: isPost = $page.url.pathname.startsWith('/blog/');
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="Cátia Barros — Blog (PT)" href="https://catia.pt/rss.xml" hreflang="pt" />
  <link rel="alternate" type="application/rss+xml" title="Cátia Barros — Blog (EN)" href="https://catia.pt/rss.en.xml" hreflang="en" />
  {#if !isPost}
    <meta property="og:image" content="https://catia.pt/og.png" />
    <meta name="twitter:image" content="https://catia.pt/og.png" />
  {/if}
</svelte:head>

<div data-theme={$theme} class="app">
  <Header />
  <main id="main-content">
    <slot />
  </main>
  <Footer />
</div>

<style>
  .app { display: flex; flex-direction: column; min-height: 100vh; }
  main { flex: 1; }
</style>
