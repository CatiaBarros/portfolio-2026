import { writable, derived } from 'svelte/store';

export type Lang = 'pt' | 'en';

const translations = {
  pt: {
    nav: {
      works: 'Trabalhos',
      academic: 'Academia',
      cv: 'CV',
      blog: 'Blog',
    },
    hero: {
      role: 'Jornalista de Dados e Interatividade · Expresso',
      bio: [
        'É jornalista de dados e interatividade no Expresso, na equipa de Multimédia, onde o seu trabalho vive no cruzamento entre o jornalismo, a análise de dados e o desenvolvimento web. Recolhe e trata dados, desenha visualizações e constrói peças interativas, de scrollytelling e mapas a quizzes e newsgames.',
        'Estudou Ciências da Comunicação na Universidade do Minho, especializou-se em Design de Interação, Web e Jogos na Universidade do Porto e concluiu o mestrado em Informação e Jornalismo. Boa parte da sua técnica é autodidata. Aprendeu a programar pelo gosto de perceber as coisas por dentro, certa de que às vezes se entende melhor um problema quando se brinca com ele.',
        'Interessa-lhe sobretudo o que os dados conseguem explicar quando deixam de ser uma tabela e passam a ser algo com que o leitor pode mexer. Trabalha em R para recolher, tratar e analisar os dados, e em Svelte e D3 para construir peças interativas à medida. Para gráficos e mapas mais rápidos, recorre ao Datawrapper e ao Flourish.',
      ],
      contact: 'Contacto',
      email_work: 'Email (Expresso)',
      email_personal: 'Email pessoal',
    },
    works: {
      title: 'Trabalhos',
      subtitle: 'Jornalismo de dados, interativos e newsgames publicados no Expresso.',
      all: 'Todos',
      view: 'Ver projeto →',
      noResults: 'Nenhum trabalho encontrado para este filtro.',
      loading: 'A carregar trabalhos…',
      error: 'Não foi possível carregar os trabalhos.',
      techs: 'Tecnologias',
      categories: {
        data: 'Dados',
        interactive: 'Interativo',
        newsgame: 'Newsgame',
        webdev: 'Web Dev',
      },
    },
    academic: {
      title: 'Academia',
      subtitle: 'Relatório de estágio, capítulos de livro e outras publicações académicas.',
      types: {
        thesis: 'Tese',
        chapter: 'Capítulo',
        article: 'Artigo',
        paper: 'Paper',
      },
      view: 'Ver publicação →',
    },
    cv: {
      title: 'CV',
      playMode: 'Modo jogo',
      staticMode: 'Modo estático',
      gameInstructions: 'Usa ← → para mover e ↑ ou Espaço para saltar.',
      gameInstructionsMobile: 'Usa os botões abaixo para jogar.',
      gameHint: 'Sobe para as plataformas para descobrires a minha história.',
      download: 'Descarregar CV (PDF)',
      sections: {
        experience: 'Experiência',
        education: 'Formação',
        skills: 'Competências',
        publications: 'Publicações',
      },
      experience: [
        {
          role: 'Jornalista de Dados e Interatividade',
          org: 'Expresso',
          period: 'fev 2023 – presente',
          desc: 'Foco em jornalismo de dados e interatividade. Produção de newsgames, interativos e visualizações de dados para o maior semanário português.',
        },
        {
          role: 'Estágio curricular (mestrado)',
          org: 'Expresso',
          period: 'set 2022 – dez 2022',
          desc: 'Publicou o primeiro newsgame e produziu trabalhos interativos e de jornalismo de dados.',
        },
        {
          role: 'Colaboração em part-time',
          org: 'Expresso',
          period: 'mai 2021 – fev 2023',
          desc: 'Revista de imprensa.',
        },
        {
          role: 'Estágio extracurricular',
          org: 'Rádio Renascença — equipa de Online',
          period: '2020',
          desc: '',
        },
        {
          role: 'Bolseira de investigação',
          org: 'OberCom / ISCTE',
          period: 'dez 2021 – dez 2022',
          desc: 'Redação de artigos científicos, web scraping e construção e codificação de bases de dados. Análise estatística com R.',
        },
        {
          role: 'Subdiretora e editora de Sociedade',
          org: 'ComUM — Jornal académico da Universidade do Minho',
          period: '2017 – 2020',
          desc: 'Redatora de Cultura, Sociedade e Multimédia (2017–2019). Editora de Sociedade (2018–2019). Subdiretora e editora de Sociedade (2019–2020).',
        },
      ],
      education: [
        {
          degree: 'Mestrado em Ciências da Comunicação (Jornalismo e Informação)',
          org: 'Universidade do Minho',
          period: '2021 – jan 2024',
          desc: 'Tese: "O jornalismo interativo como estratégia para fidelizar um público jovem: o caso do Expresso".',
        },
        {
          degree: 'Especialização em Design de Interação, Web e Jogos',
          org: 'Universidade do Porto',
          period: '2020 – 2021',
          desc: 'Pós-graduação focada em UX, design de interação e desenvolvimento de jogos para a web.',
        },
        {
          degree: 'Licenciatura em Ciências da Comunicação (Informação e Jornalismo)',
          org: 'Universidade do Minho',
          period: '2017 – 2020',
          desc: '',
        },
      ],
      extraEducation: [
        'The Complete Web Developer in 2021: Zero to Mastery (Udemy)',
        'As Ferramentas do Cientista de Dados, Johns Hopkins University (Coursera)',
        'Data Storytelling and Visualisation, The Economist (Economist Education)',
      ],
      skills: ['R', 'Svelte', 'JavaScript', 'D3.js', 'Datawrapper', 'Flourish', 'Web scraping', 'Git', 'Google Sheets'],
    },
    blog: {
      title: 'Blog',
      subtitle: 'O mundo aos olhos da geração Z: reflexões sobre jornalismo, tecnologia e o que aprendo pelo caminho.',
      readMore: 'Ler mais →',
      back: '← Voltar',
      empty: 'Brevemente.',
    },
    footer: {
      copy: '© Cátia Barros',
      made: 'Feito com Svelte',
    },
  },
  en: {
    nav: {
      works: 'Works',
      academic: 'Academic',
      cv: 'CV',
      blog: 'Blog',
    },
    hero: {
      role: 'Data & Interactivity Journalist · Expresso',
      bio: [
        'Data and interactivity journalist at Expresso\'s Multimedia team, where her work sits at the intersection of journalism, data analysis and web development. She collects and cleans data, designs visualisations and builds interactive pieces — from scrollytelling and maps to quizzes and newsgames.',
        'She studied Communication Sciences at Universidade do Minho, specialised in Interaction, Web and Game Design at Universidade do Porto, and completed her Master\'s in Journalism and Information. Much of her technique is self-taught. She learned to code out of curiosity, convinced that you sometimes understand a problem better when you play with it.',
        'She is most interested in what data can explain when it stops being a spreadsheet and becomes something the reader can interact with. She works in R to collect, clean and analyse data, and in Svelte and D3 to build bespoke interactive pieces. For quicker charts and maps, she uses Datawrapper and Flourish.',
      ],
      contact: 'Contact',
      email_work: 'Work email',
      email_personal: 'Personal email',
    },
    works: {
      title: 'Works',
      subtitle: 'Data journalism, interactives and newsgames published at Expresso.',
      all: 'All',
      view: 'View project →',
      noResults: 'No works found for this filter.',
      loading: 'Loading works…',
      error: 'Could not load works.',
      techs: 'Technologies',
      categories: {
        data: 'Data',
        interactive: 'Interactive',
        newsgame: 'Newsgame',
        webdev: 'Web Dev',
      },
    },
    academic: {
      title: 'Academic',
      subtitle: 'Internship report, book chapters and other academic publications.',
      types: {
        thesis: 'Thesis',
        chapter: 'Chapter',
        article: 'Article',
        paper: 'Paper',
      },
      view: 'View publication →',
    },
    cv: {
      title: 'CV',
      playMode: 'Play mode',
      staticMode: 'Static mode',
      gameInstructions: 'Use ← → to move and ↑ or Space to jump.',
      gameInstructionsMobile: 'Use the buttons below to play.',
      gameHint: 'Jump on platforms to discover my story.',
      download: 'Download CV (PDF)',
      sections: {
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills',
        publications: 'Publications',
      },
      experience: [
        {
          role: 'Data and Interactivity Journalist',
          org: 'Expresso',
          period: 'Feb 2023 – present',
          desc: 'Focus on data journalism and interactivity. Producing newsgames, interactives and data visualisations for Portugal\'s largest weekly newspaper.',
        },
        {
          role: 'Curricular internship (Master\'s)',
          org: 'Expresso',
          period: 'Sep 2022 – Dec 2022',
          desc: 'Published the first newsgame and produced interactive and data journalism pieces.',
        },
        {
          role: 'Part-time collaboration',
          org: 'Expresso',
          period: 'May 2021 – Feb 2023',
          desc: 'Press review.',
        },
        {
          role: 'Extracurricular internship',
          org: 'Rádio Renascença — Online team',
          period: '2020',
          desc: '',
        },
        {
          role: 'Research fellow',
          org: 'OberCom / ISCTE',
          period: 'Dec 2021 – Dec 2022',
          desc: 'Writing scientific articles, web scraping, database construction and coding. Statistical analysis in R.',
        },
        {
          role: 'Deputy director & Society editor',
          org: 'ComUM — Universidade do Minho student newspaper',
          period: '2017 – 2020',
          desc: 'Writer in Culture, Society and Multimedia (2017–2019). Society editor (2018–2019). Deputy director and Society editor (2019–2020).',
        },
      ],
      education: [
        {
          degree: 'Master\'s in Communication Sciences (Journalism and Information)',
          org: 'Universidade do Minho',
          period: '2021 – Jan 2024',
          desc: 'Thesis: "Interactive journalism as a strategy for retaining a young audience: the Expresso case".',
        },
        {
          degree: 'Specialisation in Interaction, Web and Game Design',
          org: 'Universidade do Porto',
          period: '2020 – 2021',
          desc: 'Postgraduate programme focused on UX, interaction design and web game development.',
        },
        {
          degree: 'BA in Communication Sciences (Journalism and Information)',
          org: 'Universidade do Minho',
          period: '2017 – 2020',
          desc: '',
        },
      ],
      extraEducation: [
        'The Complete Web Developer in 2021: Zero to Mastery (Udemy)',
        'Data Science Tools, Johns Hopkins University (Coursera)',
        'Data Storytelling and Visualisation, The Economist (Economist Education)',
      ],
      skills: ['R', 'Svelte', 'JavaScript', 'D3.js', 'Datawrapper', 'Flourish', 'Web scraping', 'Git', 'Google Sheets'],
    },
    blog: {
      title: 'Blog',
      subtitle: 'The world through Gen Z eyes: reflections on journalism, technology and what I learn along the way.',
      readMore: 'Read more →',
      back: '← Back',
      empty: 'Coming soon.',
    },
    footer: {
      copy: '© Cátia Barros',
      made: 'Made with Svelte',
    },
  },
} as const;

export type Translations = typeof translations.pt;

function getLangFromStorage(): Lang {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'pt' || saved === 'en') return saved;
  }
  if (typeof navigator !== 'undefined') {
    return navigator.language.startsWith('pt') ? 'pt' : 'en';
  }
  return 'pt';
}

function createLangStore() {
  const { subscribe, set, update } = writable<Lang>(getLangFromStorage());

  return {
    subscribe,
    toggle() {
      update(l => {
        const next = l === 'pt' ? 'en' : 'pt';
        localStorage.setItem('lang', next);
        return next;
      });
    },
    set(l: Lang) {
      localStorage.setItem('lang', l);
      set(l);
    }
  };
}

export const lang = createLangStore();
export const t = derived(lang, $lang => translations[$lang]);
