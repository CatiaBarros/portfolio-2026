<script lang="ts">
  import { t, lang } from '$lib/stores/lang';

  const socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/c%C3%A1tia-barros-8b8247162/', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` },
    { label: 'Bluesky', href: 'https://bsky.app/profile/catia.pt', icon: `<svg width="18" height="18" viewBox="0 0 600 530" fill="currentColor" aria-hidden="true"><path d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.449-163.25-81.433C20.15 217.613 10 86.532 10 68.825c0-88.687 77.742-60.816 125.72-24.795z"/></svg>` },
    { label: 'Expresso', href: 'https://expresso.pt/autores/2022-06-16-catia-barros-8c61cad2', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>` },
  ];

  const emails = [
    { label: 'cbarros@expresso.impresa.pt', href: 'mailto:cbarros@expresso.impresa.pt', note: 'Expresso' },
    { label: 'catia.s.g.barros@gmail.com', href: 'mailto:catia.s.g.barros@gmail.com', note: 'Pessoal' },
  ];
</script>

<svelte:head>
  <title>Cátia Barros — {$t.hero.role}</title>
  <meta name="description" content={$t.hero.bio[0]} />
  <meta property="og:title" content="Cátia Barros — {$t.hero.role}" />
  <meta property="og:description" content={$t.hero.bio[0]} />
  <meta property="og:url" content="https://catia.pt" />
</svelte:head>

<div class="page">
  <section class="hero section" aria-labelledby="hero-name">
    <div class="container hero-inner">
      <div class="hero-content">
        <p class="role mono section-label">{$t.hero.role}</p>
        <h1 id="hero-name" class="name">Cátia Barros</h1>
        {#each $t.hero.bio as para}
          <p class="bio">{para}</p>
        {/each}
        <div class="ctas">
          <a href="/works" class="btn btn-primary">{$t.nav.works}</a>
          <a href="/cv" class="btn">{$t.nav.cv}</a>
        </div>
      </div>

      <div class="hero-side">
        <div class="contact-block">
          <p class="block-label mono">{$t.hero.contact}</p>
          <ul class="emails" role="list">
            {#each emails as email}
              <li>
                <a href={email.href} class="email-link">
                  <span class="email-note mono">{email.note}</span>
                  <span class="email-addr">{email.label}</span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
        <div class="socials-block">
          <ul class="socials" role="list">
            {#each socials as s}
              <li>
                <a href={s.href} target="_blank" rel="noopener noreferrer" class="social-link" aria-label={s.label}>
                  {@html s.icon}
                  <span>{s.label}</span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .page { min-height: calc(100vh - var(--header-h)); }
  .hero { padding-top: clamp(3rem, 8vw, 7rem); }
  .hero-inner { display: grid; grid-template-columns: 1fr; gap: 4rem; }
  @media (min-width: 900px) { .hero-inner { grid-template-columns: 1fr 320px; align-items: start; } }
  .role { font-size: 0.75rem; color: var(--green); margin-bottom: 1.25rem; letter-spacing: 0.08em; text-transform: uppercase; }
  .name { font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 1.5rem; color: var(--text); }
  .bio { font-size: 0.975rem; color: var(--text-2); line-height: 1.7; margin-bottom: 0.9rem; max-width: 56ch; }
  .bio:last-of-type { margin-bottom: 2rem; }
  .ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .hero-side { display: flex; flex-direction: column; gap: 2rem; }
  @media (min-width: 900px) { .hero-side { padding-top: 1rem; } }
  .contact-block, .socials-block { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem 1.5rem; }
  .block-label { font-size: 0.7rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; max-width: none; }
  .emails { display: flex; flex-direction: column; gap: 0.6rem; }
  .email-link { display: flex; flex-direction: column; gap: 0.1rem; padding: 0.4rem 0; border-bottom: 1px solid var(--border); transition: color 0.15s ease; }
  .emails li:last-child .email-link { border-bottom: none; }
  .email-link:hover { color: var(--green); }
  .email-note { font-size: 0.68rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.06em; }
  .email-addr { font-size: 0.85rem; word-break: break-all; }
  .socials { display: flex; flex-direction: column; gap: 0.25rem; }
  .social-link { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.25rem; border-radius: var(--radius); font-size: 0.9rem; font-weight: 500; color: var(--text-2); transition: color 0.15s ease, background 0.15s ease; }
  .social-link:hover { color: var(--green); background: var(--green-xlight); }
</style>
