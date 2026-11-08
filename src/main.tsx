import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import './i18n';

import './styles/fonts';
import './styles/style.scss';

const STALE_CHUNK_RELOAD_KEY = 'stale-chunk-reload-at';
const STALE_CHUNK_RELOAD_COOLDOWN_MS = 10_000;

const reloadOnStaleChunk = () => {
  try {
    const lastReload = Number(sessionStorage.getItem(STALE_CHUNK_RELOAD_KEY));
    if (Date.now() - lastReload < STALE_CHUNK_RELOAD_COOLDOWN_MS) return;
    sessionStorage.setItem(STALE_CHUNK_RELOAD_KEY, String(Date.now()));
  } catch {
    return;
  }

  window.location.reload();
};

window.addEventListener('vite:preloadError', reloadOnStaleChunk);

createRoot(document.getElementById('root')!).render(<App />);
