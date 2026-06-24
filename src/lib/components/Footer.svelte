<script lang="ts">
  import { t, lang } from '$lib/stores/lang';
</script>

<footer class="footer">
  <div class="container inner">

    <div class="col col-brand">
      <p class="brand">Cátia Barros</p>
      <a class="role mono" href="https://expresso.pt/autores/2022-06-16-catia-barros-8c61cad2" target="_blank" rel="noopener noreferrer">{$t.hero.role}</a>
    </div>

    <nav class="col col-nav" aria-label="Mapa do site">
      <p class="col-label mono">{$lang === 'pt' ? 'Páginas' : 'Pages'}</p>
      <a href="/">{$lang === 'pt' ? 'Início' : 'Home'}</a>
      <a href="/works">{$t.nav.works}</a>
      <a href="/academic">{$t.nav.academic}</a>
      <a href="/cv">{$t.nav.cv}</a>
      <a href="/blog">{$t.nav.blog}</a>
    </nav>

    <div class="col col-contact">
      <p class="col-label mono">{$lang === 'pt' ? 'Contacto' : 'Contact'}</p>
      <a href="mailto:cbarros@expresso.impresa.pt">cbarros@expresso.impresa.pt</a>
      <a href="mailto:catia.s.g.barros@gmail.com">catia.s.g.barros@gmail.com</a>
      <a href="https://linkedin.com/in/cátia-barros-8b8247162" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="https://bsky.app/profile/catia.pt" target="_blank" rel="noopener noreferrer">Bluesky</a>
    </div>

  </div>
</footer>

<style>
  .footer { border-top: 1px solid var(--border); margin-top: auto; padding-top: 3rem; padding-bottom: 1.5rem; }
  .inner { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; padding-bottom: 2.5rem; }
  @media (max-width: 640px) { .inner { grid-template-columns: 1fr 1fr; } .col-brand { grid-column: 1 / -1; } }
  .brand { font-family: var(--font-display); font-size: 0.9rem; font-weight: 600; color: var(--text); margin-bottom: 0.25rem; max-width: none; }
  .role { font-size: 0.7rem; color: var(--text-3); line-height: 1.5; max-width: 28ch; transition: color 0.15s; }
  .role:hover { color: var(--green); }
  .col { display: flex; flex-direction: column; gap: 0.35rem; }
  .col-label { font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 0.4rem; max-width: none; }
  .col-nav a, .col-contact a { font-size: 0.82rem; color: var(--text-2); transition: color 0.15s; max-width: none; width: fit-content; }
  .col-nav a:hover, .col-contact a:hover { color: var(--green); }
</style>
