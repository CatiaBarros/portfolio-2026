<script lang="ts">
  import '../app.css';
  import { theme } from '$lib/stores/theme';
  import { lang } from '$lib/stores/lang';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    theme.init();
  });

  $: if (typeof document !== 'undefined') document.documentElement.lang = $lang;
</script>

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
