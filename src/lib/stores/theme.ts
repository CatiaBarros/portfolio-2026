import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

function getInitial(): Theme {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
  }
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>(getInitial());

  return {
    subscribe,
    toggle() {
      update(t => {
        const next = t === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        document.documentElement.setAttribute('data-theme', next);
        return next;
      });
    },
    init() {
      const t = getInitial();
      document.documentElement.setAttribute('data-theme', t);
      set(t);
    }
  };
}

export const theme = createThemeStore();
