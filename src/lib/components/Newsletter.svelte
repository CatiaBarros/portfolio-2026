<script lang="ts">
  import { lang } from '../stores/lang';

  let email = '';
  let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  async function subscribe() {
    if (!email) return;
    status = 'loading';
    try {
      const res = await fetch('https://buttondown.com/api/emails/embed-subscribe/catia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email }),
      });
      status = res.ok || res.status === 302 ? 'success' : 'error';
    } catch {
      status = 'error';
    }
  }
</script>

<aside class="newsletter">
  <p class="nl-label mono">{$lang === 'pt' ? 'Newsletter' : 'Newsletter'}</p>
  <p class="nl-desc">
    {$lang === 'pt'
      ? 'Recebe os novos artigos por email. Sem spam, só os posts.'
      : 'Get new articles by email. No spam, just the posts.'}
  </p>

  {#if status === 'success'}
    <p class="nl-success">
      {$lang === 'pt' ? 'Subscrito. Obrigada!' : 'Subscribed. Thank you!'}
    </p>
  {:else}
    <form class="nl-form" on:submit|preventDefault={subscribe}>
      <input
        type="email"
        bind:value={email}
        placeholder={$lang === 'pt' ? 'o teu email' : 'your email'}
        required
        class="nl-input mono"
      />
      <button type="submit" class="nl-btn" disabled={status === 'loading'}>
        {status === 'loading'
          ? '...'
          : $lang === 'pt' ? 'Subscrever' : 'Subscribe'}
      </button>
    </form>
    {#if status === 'error'}
      <p class="nl-error">
        {$lang === 'pt' ? 'Erro. Tenta outra vez.' : 'Something went wrong. Try again.'}
      </p>
    {/if}
  {/if}
</aside>

<style>
  .newsletter {
    border-top: 1px solid var(--border);
    padding-top: 2rem;
    margin-top: 3rem;
  }

  .nl-label {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-3);
    margin-bottom: 0.5rem;
  }

  .nl-desc {
    font-size: 0.95rem;
    color: var(--text-2);
    margin-bottom: 1.25rem;
    max-width: 48ch;
    line-height: 1.6;
  }

  .nl-form {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .nl-input {
    flex: 1;
    min-width: 200px;
    font-size: 0.875rem;
    padding: 0.55em 0.85em;
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text);
    outline: none;
    transition: border-color 0.15s;
  }

  .nl-input:focus { border-color: var(--green); }

  .nl-btn {
    font-size: 0.875rem;
    font-family: var(--font-display);
    font-weight: 500;
    padding: 0.55em 1.25em;
    background: var(--green);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .nl-btn:hover { opacity: 0.85; }
  .nl-btn:disabled { opacity: 0.5; cursor: default; }

  .nl-success { font-size: 0.9rem; color: var(--green); font-weight: 500; }
  .nl-error { font-size: 0.85rem; color: #c0392b; margin-top: 0.5rem; }
</style>
