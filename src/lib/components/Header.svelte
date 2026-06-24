<script lang="ts">
  import { t, lang } from '$lib/stores/lang';
  import { theme } from '$lib/stores/theme';
  import { page } from '$app/stores';

  let menuOpen = false;
  function closeMenu() { menuOpen = false; }
  $: currentPath = $page.url.pathname;
</script>

<header class="header">
  <div class="container inner">

    <a href="/" class="logo" on:click={closeMenu}>Cátia Barros</a>

    <nav class="nav" aria-label="Navegação principal">
      <a href="/works"    class:active={currentPath === '/works'}           on:click={closeMenu}>{$t.nav.works}</a>
      <a href="/academic" class:active={currentPath === '/academic'}        on:click={closeMenu}>{$t.nav.academic}</a>
      <a href="/cv"       class:active={currentPath === '/cv'}              on:click={closeMenu}>{$t.nav.cv}</a>
      <a href="/blog"     class:active={currentPath.startsWith('/blog')}   on:click={closeMenu}>{$t.nav.blog}</a>
    </nav>

    <div class="controls">
      <button class="ctrl mono" on:click={lang.toggle} aria-label="Mudar idioma">
        {$lang === 'pt' ? 'EN' : 'PT'}
      </button>
      <span class="divider" aria-hidden="true">/</span>
      <button class="ctrl" on:click={theme.toggle} aria-label={$theme === 'dark' ? 'Modo claro' : 'Modo escuro'}>
        {#if $theme === 'dark'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        {:else}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        {/if}
      </button>
      <button class="hamburger" aria-label={menuOpen ? 'Fechar' : 'Menu'} aria-expanded={menuOpen} on:click={() => menuOpen = !menuOpen}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
          {#if menuOpen}
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          {:else}
            <line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/>
          {/if}
        </svg>
      </button>
    </div>

  </div>

  {#if menuOpen}
    <div class="mobile-nav" role="navigation" aria-label="Menu móvel">
      <div class="container">
        <a href="/works"    on:click={closeMenu}>{$t.nav.works}</a>
        <a href="/academic" on:click={closeMenu}>{$t.nav.academic}</a>
        <a href="/cv"       on:click={closeMenu}>{$t.nav.cv}</a>
        <a href="/blog"     on:click={closeMenu}>{$t.nav.blog}</a>
      </div>
    </div>
  {/if}
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    height: var(--header-h);
  }

  .inner {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 2.5rem;
  }

  .logo {
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--text);
    flex-shrink: 0;
    transition: color 0.15s;
  }
  .logo:hover { color: var(--green); }

  .nav { display: none; gap: 1.75rem; flex: 1; }
  @media (min-width: 768px) { .nav { display: flex; } }

  .nav a {
    font-family: var(--font-display);
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-3);
    transition: color 0.15s;
    position: relative;
    padding-bottom: 2px;
  }
  .nav a:hover { color: var(--text); }
  .nav a.active { color: var(--text); }
  .nav a.active::after {
    content: '';
    position: absolute;
    left: 0; right: 0; bottom: -3px;
    height: 1px;
    background: var(--green);
  }

  .controls { margin-left: auto; display: flex; align-items: center; gap: 0.6rem; }

  .ctrl {
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    color: var(--text-3);
    display: flex;
    align-items: center;
    transition: color 0.15s;
    padding: 0;
    line-height: 1;
  }
  .ctrl:hover { color: var(--text); }

  .divider { font-size: 0.7rem; color: var(--border); user-select: none; }

  .hamburger { display: flex; align-items: center; color: var(--text-3); transition: color 0.15s; }
  .hamburger:hover { color: var(--text); }
  @media (min-width: 768px) { .hamburger { display: none; } }

  .mobile-nav { border-bottom: 1px solid var(--border); background: var(--bg); }
  .mobile-nav .container { display: flex; flex-direction: column; padding-top: 1rem; padding-bottom: 1rem; }
  .mobile-nav a {
    font-family: var(--font-display);
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-2);
    padding: 0.6rem 0;
    border-bottom: 1px solid var(--border);
    transition: color 0.15s;
  }
  .mobile-nav a:last-child { border-bottom: none; }
  .mobile-nav a:hover { color: var(--green); }
</style>
