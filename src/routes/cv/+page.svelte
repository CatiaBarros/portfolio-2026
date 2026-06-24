<script lang="ts">
  import { t, lang } from '$lib/stores/lang';
  import { onMount, tick } from 'svelte';

  let mode: 'chat' | 'static' = 'chat';

  interface Message { role: 'user' | 'catia'; text: string; typing?: boolean; }

  let messages: Message[] = [];
  let input = '';
  let inputEl: HTMLInputElement;
  let chatEl: HTMLElement;
  let thinking = false;
  let typingId = 0;

  const SUGGESTIONS = {
    pt: ['Onde trabalhas?', 'O que sabes fazer?', 'Qual é a tua formação?', 'O que são newsgames?', 'Como te contacto?'],
    en: ['Where do you work?', 'What are your skills?', 'What is your background?', 'What are newsgames?', 'How can I contact you?'],
  };

  function norm(s: string) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function score(text: string, terms: string[]): number { return terms.reduce((n, t) => n + (text.includes(t) ? 1 : 0), 0); }

  function getResponse(q: string): string {
    const l = $lang;
    const t = norm(q);

    if (score(t, ['ola', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'hi', 'hello', 'hey', 'good morning']) > 0 && t.length < 30)
      return l === 'pt' ? 'Olá! Podes perguntar-me o que quiseres — sobre o meu trabalho no Expresso, as minhas ferramentas, a minha formação ou como me contactar.' : 'Hi! Feel free to ask me anything — about my work at Expresso, my tools, my background, or how to get in touch.';

    if (score(t, ['obrigad', 'obrigado', 'obrigada', 'thanks', 'thank you', 'thx', 'cheers']) > 0 && t.length < 25)
      return l === 'pt' ? 'De nada! Há mais alguma coisa que queiras saber?' : "You're welcome! Anything else you'd like to know?";

    const topics: [string[], () => string][] = [
      [['quem es', 'quem e', 'quem e a catia', 'apresenta', 'fala sobre ti', 'sobre ti', 'who are you', 'about you', 'tell me about', 'introduce yourself', 'who is', 'catia barros'],
        () => l === 'pt' ? 'Sou a Cátia Barros, jornalista de dados e interatividade no Expresso. Acredito que os números, bem ouvidos, contam sempre uma boa história — e que às vezes se entende melhor um problema quando se brinca com ele. Aprendi a programar pelo gosto de perceber as coisas por dentro, e hoje o meu trabalho vive no cruzamento entre o jornalismo, a análise de dados e o desenvolvimento web.' : "I'm Cátia Barros, data and interactivity journalist at Expresso. I believe numbers, well listened to, always tell a good story — and that you sometimes understand a problem better when you play with it. I learned to code out of curiosity, and today my work sits at the intersection of journalism, data analysis and web development."],
      [['expresso', 'trabalha', 'trabalho', 'onde trabalha', 'empresa', 'jornal', 'multimedia', 'multimidia', 'jornalista', 'where do you work', 'employer', 'newspaper', 'journalist', 'job', 'what do you do', 'fazes no expresso', 'do you do at expresso'],
        () => l === 'pt' ? 'No Expresso faço parte da equipa de Multimédia. Na prática, o meu trabalho começa nos dados: recolha (muitas vezes via web scraping), limpeza e análise. Depois decido como contar a história — pode ser um gráfico interativo, um mapa, um scrollytelling, ou um newsgame. Programo as peças de raiz, normalmente em Svelte e D3.js.' : "At Expresso I'm part of the Multimedia team. In practice, my work starts with data: collection (often web scraping), cleaning and analysis. Then I decide how to tell the story — an interactive chart, a map, a scrollytelling, or a newsgame. I code pieces from scratch, usually in Svelte and D3.js."],
      [['newsgame', 'news game', 'jogo', 'game', 'quiz', 'interativ', 'scrollytelling', 'scrolly', 'what are newsgames', 'o que sao newsgames', 'formato'],
        () => l === 'pt' ? 'Newsgames são peças jornalísticas que usam mecânicas de jogo para contar histórias ou explicar fenómenos. Em vez de leres sobre um tema, jogas — e às vezes entendes melhor um problema quando és obrigado a tomar decisões dentro dele. É o meu formato favorito.' : "Newsgames are journalistic pieces that use game mechanics to tell stories or explain phenomena. Instead of reading about a topic, you play — and sometimes you understand a problem better when you're forced to make decisions within it."],
      [['skill', 'ferramenta', 'ferramentas', 'programar', 'programacao', 'codigo', 'tecnolog', 'sabes fazer', 'what can you do', 'tools', 'stack', 'use', 'usas', 'competencia', 'competencias', 'capacidade', 'saber'],
        () => l === 'pt' ? 'Trabalho principalmente em R para recolher, tratar e analisar dados — web scraping, bases de dados, estatística. Para construir peças interativas uso Svelte e D3.js. Para visualizações rápidas, Datawrapper e Flourish. Aprendi a maior parte de forma autodidata.' : 'I mainly work in R for data collection, cleaning and analysis — web scraping, databases, statistics. For interactive pieces I use Svelte and D3.js. For quick visualisations, Datawrapper and Flourish. Most of it self-taught.'],
      [['linguagem', 'language', 'r ', 'rstats', 'python', 'javascript', 'svelte', 'd3', 'sql', 'html', 'css', 'como programas', 'como codificas', 'how do you code', 'how do you program', 'programas', 'codificas'],
        () => l === 'pt' ? 'A linguagem que mais uso é o R — para web scraping, análise e estatística. Para o desenvolvimento das peças interativas no Expresso uso Svelte. D3.js entra quando preciso de visualizações mais personalizadas. Para gráficos rápidos, o Datawrapper é indispensável.' : "The language I use most is R — for web scraping, analysis and statistics. For building interactive pieces at Expresso I use Svelte. D3.js comes in for custom visualisations. For quick charts, Datawrapper is indispensable."],
      [['dados', 'data', 'jornalismo de dados', 'data journalism', 'analise', 'analysis', 'scraping', 'dataset', 'estatistica', 'statistics', 'investigacao', 'investigation'],
        () => l === 'pt' ? 'O jornalismo de dados é a base do meu trabalho. Começa na recolha — muitas vezes via web scraping em R — depois vem a limpeza e análise do dataset, e só então a decisão de como contar a história: um gráfico, um mapa, uma peça interativa.' : "Data journalism is the core of my work. It starts with collection — often web scraping in R — then cleaning and analysing the dataset, and only then deciding how to tell the story."],
      [['formacao', 'formac', 'estudaste', 'estudou', 'universidade', 'mestrado', 'licenciatura', 'curso', 'minho', 'porto', 'background', 'education', 'studied', 'degree', 'university', 'master', 'bachelor'],
        () => l === 'pt' ? 'Licenciei-me em Ciências da Comunicação na Universidade do Minho em 2020. Depois fiz uma especialização em Design de Interação, Web e Jogos na Universidade do Porto. Concluí o mestrado em Ciências da Comunicação na UMinho em janeiro de 2024, com uma tese sobre jornalismo interativo e públicos jovens no Expresso.' : "I graduated in Communication Sciences from Universidade do Minho in 2020, then did a specialisation in Interaction, Web and Game Design at Universidade do Porto. I completed my Master's at UMinho in January 2024, with a thesis on interactive journalism and young audiences at Expresso."],
      [['tese', 'thesis', 'publicac', 'publication', 'livro', 'book', 'capitulo', 'chapter', 'investigac', 'research', 'artigo', 'article', 'escreveste', 'wrote'],
        () => l === 'pt' ? 'A minha tese de mestrado chama-se "O jornalismo interativo como estratégia para fidelizar um público jovem: o caso do Expresso" (UMinho, 2024). Também tenho um capítulo de livro publicado: "Newsgames: Como Interagir Com a Informação", em "O Mundo na Escola" da UMinho Editora.' : 'My Master\'s thesis is "Interactive journalism as a strategy for retaining a young audience: the Expresso case" (UMinho, 2024). I also have a book chapter: "Newsgames: How to Interact With Information", in "O Mundo na Escola" by UMinho Editora.'],
      [['contacto', 'contact', 'email', 'mail', 'falar', 'fala', 'reach', 'get in touch', 'escrever', 'escreve', 'linkedin', 'bluesky', 'rede', 'social', 'redes sociais'],
        () => l === 'pt' ? 'Podes encontrar-me em cbarros@expresso.impresa.pt (trabalho) ou catia.s.g.barros@gmail.com (pessoal). Podes também falar comigo no [LinkedIn](https://linkedin.com/in/cátia-barros-8b8247162) ou no [Bluesky](https://bsky.app/profile/catia.pt).' : 'You can reach me at cbarros@expresso.impresa.pt (work) or catia.s.g.barros@gmail.com (personal). You can also find me on [LinkedIn](https://linkedin.com/in/cátia-barros-8b8247162) or [Bluesky](https://bsky.app/profile/catia.pt).'],
      [['percurso', 'carreira', 'experiencia', 'career', 'experience', 'historico', 'history', 'cv', 'curriculum', 'passado', 'past', 'ja trabalhou', 'have you worked'],
        () => l === 'pt' ? 'Comecei como redatora e editora no ComUM. Em 2020 estagiei na Rádio Renascença. Entrei no Expresso em 2021, primeiro numa colaboração em part-time, depois com um estágio curricular do mestrado. Estou na Multimédia a tempo inteiro desde fevereiro de 2023.' : "I started at ComUM, UMinho's student newspaper. In 2020 I interned at Rádio Renascença. I joined Expresso in 2021, first part-time, then as a curricular intern. I've been full-time at the Multimedia team since February 2023."],
      [['fora do trabalho', 'hobbies', 'hobby', 'vida pessoal', 'gosto', 'outside work', 'free time', 'tempo livre', 'interesses', 'interests', 'ballet', 'gata', 'cat', 'fregoli', 'ler', 'reading', 'livros', 'books'],
        () => l === 'pt' ? 'Gosto muito de ler e de ballet — um hobby que comecei em miúda e retomei já adulta. Tenho também uma gata com um nome estranho, a Fregoli.' : "I love reading and ballet — a hobby I started as a child and picked up again as an adult. I also have a cat with a strange name, Fregoli."],
      [['inspira', 'inspiration', 'referencias', 'references', 'admiras', 'admire', 'new york times', 'nyt', 'guardian', 'civio', 'who inspires', 'who do you follow'],
        () => l === 'pt' ? 'Gosto muito dos newsgames do New York Times e dos trabalhos de dados do The Guardian. Em Portugal também há bom trabalho espalhado pelas redações. E no país vizinho, a Civio.es faz coisas muito interessantes.' : "I'm a big fan of the New York Times' newsgames and The Guardian's data work. In Portugal there's also good work scattered across newsrooms. And in Spain, Civio.es does very interesting things."],
    ];

    let best: (() => string) | null = null;
    let bestScore = 0;
    for (const [keywords, respond] of topics) {
      const s = score(t, keywords);
      if (s > bestScore) { bestScore = s; best = respond; }
    }
    if (best && bestScore > 0) return best();

    const suggs = SUGGESTIONS[$lang as 'pt' | 'en'] ?? SUGGESTIONS.pt;
    const list = suggs.map(s => `— ${s}`).join('\n');
    return $lang === 'pt'
      ? `Não sei responder a isso. Podes tentar:\n${list}\n\nOu escreve-me diretamente para catia.s.g.barros@gmail.com.`
      : `I don't know how to answer that. You can try:\n${list}\n\nOr write to me directly at catia.s.g.barros@gmail.com.`;
  }

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || thinking) return;
    input = '';
    messages = [...messages, { role: 'user', text: q }];
    thinking = true;
    await tick(); scrollChat();
    await new Promise(r => setTimeout(r, 600 + Math.random() * 600));
    const response = getResponse(q);
    thinking = false;
    const id = ++typingId;
    messages = [...messages, { role: 'catia', text: '', typing: true }];
    await tick(); scrollChat();
    for (let i = 1; i <= response.length; i++) {
      if (typingId !== id) break;
      messages = messages.map((m, idx) => idx === messages.length - 1 ? { ...m, text: response.slice(0, i) } : m);
      if (i % 8 === 0) { await tick(); scrollChat(); }
      await new Promise(r => setTimeout(r, 12));
    }
    messages = messages.map((m, idx) => idx === messages.length - 1 ? { ...m, typing: false } : m);
  }

  function scrollChat() { if (chatEl) chatEl.scrollTop = chatEl.scrollHeight; }

  onMount(() => {
    const intro = $lang === 'pt'
      ? 'Olá, sou a Cátia Barros, jornalista de dados e interatividade. Pergunta-me sobre o meu percurso, o meu trabalho ou as ferramentas que uso.\nSem saber por onde começar? Escreve / para ver sugestões.'
      : "Hi, I'm Cátia Barros, data and interactivity journalist. Ask me about my background, my work or the tools I use.\nNot sure where to start? Type / to see suggestions.";
    messages = [{ role: 'catia', text: intro }];
    inputEl?.focus({ preventScroll: true });
  });

  $: suggestions = SUGGESTIONS[$lang as 'pt' | 'en'] ?? SUGGESTIONS.pt;
  $: showSlashMenu = input === '/';

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') { e.preventDefault(); send(); }
    if (e.key === 'Escape') { input = ''; }
  }

  function renderText(text: string): string {
    let out = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
      const isExternal = /^https?:\/\//.test(url);
      return isExternal ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>` : `<a href="${url}">${label}</a>`;
    });
    out = out.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, node) => {
      if (tag) return tag;
      if (!node) return '';
      return node.replace(/(https?:\/\/[^\s<),]+|(?:(?:www|linkedin|bsky|multimedia\.expresso|catia)\.(?:com|pt|app|net|org))[^\s<),]*)/g,
        (url: string) => { const href = url.startsWith('http') ? url : 'https://' + url; return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`; });
    });
    return out.replace(/\n/g, '<br>');
  }
</script>

<svelte:head>
  <title>{$t.cv.title} — Cátia Barros</title>
  <meta name="description" content={$lang === 'pt' ? 'Percurso, experiência e competências de Cátia Barros, jornalista de dados e interatividade no Expresso.' : 'Career, experience and skills of Cátia Barros, data and interactivity journalist at Expresso.'} />
  <meta property="og:title" content="{$t.cv.title} — Cátia Barros" />
  <meta property="og:url" content="https://catia.pt/cv" />
</svelte:head>

<div class="page section">
  <div class="container">
    <header class="page-header"><h1>{$t.cv.title}</h1></header>

    {#if mode === 'chat'}
      <div class="chat-wrap">
        <div class="chat-bar">
          <span class="chat-bar-label mono">{$lang === 'pt' ? 'Conversa' : 'Chat'}</span>
          <button class="chat-close-btn" on:click={() => mode = 'static'} aria-label={$lang === 'pt' ? 'Ver CV' : 'View CV'}>
            {$lang === 'pt' ? 'Ver CV' : 'View CV'}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="chat-messages" bind:this={chatEl} aria-live="polite">
          {#each messages as msg}
            <div class="msg-row" class:user={msg.role === 'user'}>
              {#if msg.role === 'catia'}<div class="avatar" aria-hidden="true">CB</div>{/if}
              <div class="bubble" class:user={msg.role === 'user'}>
                {#if msg.role === 'catia'}
                  {@html renderText(msg.text)}{#if msg.typing}<span class="type-cursor" aria-hidden="true">▊</span>{/if}
                {:else}{msg.text}{/if}
              </div>
            </div>
          {/each}
          {#if thinking}
            <div class="msg-row">
              <div class="avatar" aria-hidden="true">CB</div>
              <div class="bubble thinking">
                <span class="think-text mono">{$lang === 'pt' ? 'A pensar' : 'Thinking'}</span><span class="dot"></span><span class="dot"></span><span class="dot"></span>
              </div>
            </div>
          {/if}
        </div>

        {#if messages.length <= 1 && !thinking}
          <div class="suggestions">
            {#each suggestions as s}<button class="suggestion" on:click={() => send(s)}>{s}</button>{/each}
          </div>
        {/if}

        <div class="chat-input-wrap">
          {#if showSlashMenu}
            <div class="slash-menu" role="listbox">
              {#each suggestions as s}
                <button class="slash-item" role="option" aria-selected="false" on:click={() => { input = ''; send(s); }}>
                  <span class="slash-icon mono">/</span>{s}
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <div class="chat-input-row">
          <input bind:this={inputEl} bind:value={input} class="chat-input" type="text"
            placeholder={$lang === 'pt' ? 'Escreve uma pergunta ou / para sugestões…' : 'Ask a question or type / for suggestions…'}
            autocomplete="off" spellcheck="false" on:keydown={handleKeydown} disabled={thinking} />
          <button class="send-btn" on:click={() => send()} disabled={thinking || !input.trim()} aria-label={$lang === 'pt' ? 'Enviar' : 'Send'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    {/if}

    {#if mode === 'static'}
      <div class="cv-static">
        <button class="back-to-chat" on:click={() => mode = 'chat'}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          {$lang === 'pt' ? 'Conversar' : 'Chat'}
        </button>
        <section class="cv-section">
          <h2 class="cv-section-title">{$t.cv.sections.experience}</h2>
          {#each $t.cv.experience as exp}
            <div class="cv-entry">
              <span class="cv-period mono">{exp.period}</span>
              <div>
                <p class="cv-entry-role">{exp.role}</p>
                <p class="cv-entry-org">{exp.org}</p>
                {#if exp.desc}<p class="cv-entry-desc">{exp.desc}</p>{/if}
              </div>
            </div>
          {/each}
        </section>
        <section class="cv-section">
          <h2 class="cv-section-title">{$t.cv.sections.education}</h2>
          {#each $t.cv.education as edu}
            <div class="cv-entry">
              <span class="cv-period mono">{edu.period}</span>
              <div>
                <p class="cv-entry-role">{edu.degree}</p>
                <p class="cv-entry-org">{edu.org}</p>
                {#if edu.desc}<p class="cv-entry-desc">{edu.desc}</p>{/if}
              </div>
            </div>
          {/each}
        </section>
        <section class="cv-section">
          <h2 class="cv-section-title">{$lang === 'pt' ? 'Formação Complementar' : 'Continuing Education'}</h2>
          <ul class="extra-list">
            {#each $t.cv.extraEducation as item}<li class="extra-item">{item}</li>{/each}
          </ul>
        </section>
        <section class="cv-section">
          <h2 class="cv-section-title">{$t.cv.sections.skills}</h2>
          <div class="skills-grid">
            {#each $t.cv.skills as skill}<span class="skill-tag mono">{skill}</span>{/each}
          </div>
        </section>
        <section class="cv-section">
          <h2 class="cv-section-title">{$t.cv.sections.publications}</h2>
          <p class="cv-pub-text">
            {$lang === 'pt' ? 'Ver ' : 'See '}<a href="/academic" class="inline-link">{$t.nav.academic}</a>.
          </p>
        </section>
      </div>
    {/if}
  </div>
</div>

<style>
  .page-header { margin-bottom: 2rem; }
  .chat-wrap { max-width: 660px; display: flex; flex-direction: column; gap: 0; border: 1px solid var(--border); }
  .chat-bar { display: flex; align-items: center; justify-content: space-between; padding: 0.55rem 1rem; border-bottom: 1px solid var(--border); background: var(--bg-2); position: sticky; top: var(--header-h); z-index: 10; }
  .chat-bar-label { font-size: 0.72rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.08em; }
  .chat-close-btn { display: flex; align-items: center; gap: 0.4rem; font-size: 0.78rem; color: var(--text-3); font-family: var(--font-body); transition: color 0.15s ease; cursor: pointer; }
  .chat-close-btn:hover { color: var(--text); }
  .back-to-chat { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.78rem; color: var(--text-3); font-family: var(--font-body); border: 1px solid var(--border); padding: 0.35em 0.8em; margin-bottom: 2rem; cursor: pointer; transition: color 0.15s ease, border-color 0.15s ease; background: transparent; }
  .back-to-chat:hover { color: var(--green); border-color: var(--green); }
  .chat-messages { padding: 1.5rem; min-height: 340px; max-height: 480px; overflow-y: auto; display: flex; flex-direction: column; gap: 1.25rem; }
  .chat-messages::-webkit-scrollbar { width: 4px; }
  .chat-messages::-webkit-scrollbar-thumb { background: var(--border); }
  .msg-row { display: flex; align-items: flex-end; gap: 0.75rem; }
  .msg-row.user { flex-direction: row-reverse; }
  .avatar { font-family: var(--font-mono); font-size: 0.65rem; font-weight: 600; color: #fff; background: var(--green); width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; letter-spacing: 0.02em; }
  .bubble { font-size: 0.9rem; line-height: 1.65; padding: 0.75rem 1rem; background: var(--surface); border: 1px solid var(--border); color: var(--text); max-width: 82%; }
  .bubble.user { background: var(--green); border-color: var(--green); color: #fff; }
  .bubble :global(a) { color: var(--green); text-decoration: underline; text-underline-offset: 2px; word-break: break-all; }
  .bubble :global(a:hover) { opacity: 0.8; }
  .thinking { display: flex; align-items: center; gap: 4px; padding: 0.75rem 1rem; min-width: 52px; }
  .think-text { font-size: 0.75rem; color: var(--text-3); margin-right: 2px; }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--text-3); animation: bounce 1.2s ease-in-out infinite; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); opacity: 0.4; } 40% { transform: translateY(-6px); opacity: 1; } }
  .type-cursor { color: var(--green); animation: blink 0.8s step-end infinite; font-size: 0.75em; }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .suggestions { display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 0 1.5rem 1rem; }
  .suggestion { font-size: 0.8rem; font-family: var(--font-body); color: var(--text-2); border: 1px solid var(--border); padding: 0.35em 0.8em; background: transparent; cursor: pointer; transition: border-color 0.15s ease, color 0.15s ease; }
  .suggestion:hover { border-color: var(--green); color: var(--green); }
  .chat-input-wrap { position: relative; }
  .slash-menu { position: absolute; bottom: 0; left: 0; right: 0; background: var(--bg); border: 1px solid var(--border); border-bottom: none; display: flex; flex-direction: column; z-index: 20; transform: translateY(-100%); }
  .slash-item { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1rem; font-size: 0.85rem; font-family: var(--font-body); color: var(--text-2); text-align: left; background: transparent; border: none; border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.1s ease, color 0.1s ease; }
  .slash-item:last-child { border-bottom: none; }
  .slash-item:hover { background: var(--bg-2); color: var(--text); }
  .slash-icon { font-size: 0.72rem; color: var(--green); flex-shrink: 0; }
  .chat-input-row { display: flex; border-top: 1px solid var(--border); }
  .chat-input { flex: 1; border: none; outline: none; padding: 0.85rem 1rem; font-family: var(--font-body); font-size: 0.875rem; background: var(--bg); color: var(--text); }
  .chat-input::placeholder { color: var(--text-3); }
  .chat-input:disabled { opacity: 0.6; }
  .send-btn { padding: 0 1.1rem; border: none; border-left: 1px solid var(--border); background: var(--bg); color: var(--text-3); cursor: pointer; transition: color 0.15s ease, background 0.15s ease; display: flex; align-items: center; }
  .send-btn:hover:not(:disabled) { color: var(--green); background: var(--bg-2); }
  .send-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .cv-static { max-width: 680px; }
  .cv-section { margin-bottom: 3rem; }
  .cv-section-title { font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--green); margin-bottom: 1.25rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }
  .cv-entry { display: grid; grid-template-columns: 130px 1fr; gap: 1.5rem; padding: 1rem 0; border-bottom: 1px solid var(--border); align-items: start; }
  @media (max-width: 600px) { .cv-entry { grid-template-columns: 1fr; gap: 0.3rem; } }
  .cv-period { font-size: 0.75rem; color: var(--text-3); padding-top: 0.1rem; }
  .cv-entry-role { font-size: 0.975rem; font-weight: 600; margin-bottom: 0.15rem; }
  .cv-entry-org { font-size: 0.875rem; color: var(--green); margin-bottom: 0.3rem; max-width: none; }
  .cv-entry-desc { font-size: 0.85rem; color: var(--text-2); line-height: 1.6; max-width: 55ch; }
  .extra-list { display: flex; flex-direction: column; gap: 0.4rem; }
  .extra-item { font-size: 0.875rem; color: var(--text-2); padding-left: 1rem; position: relative; }
  .extra-item::before { content: '→'; position: absolute; left: 0; color: var(--green); font-size: 0.75rem; }
  .skills-grid { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .skill-tag { font-size: 0.78rem; color: var(--text-2); background: var(--bg-2); padding: 0.3em 0.7em; border: 1px solid var(--border); }
  .cv-pub-text { font-size: 0.95rem; color: var(--text-2); }
  .inline-link { color: var(--green); font-weight: 500; text-decoration: underline; text-underline-offset: 3px; }
</style>
