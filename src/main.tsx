import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import './i18n';

import './styles/style.scss';

// After a deploy, a tab opened earlier still requests the previous build's chunks, which no longer
// exist, so the next lazy page fails to load and the app goes blank. Reload to get the current
// build, at most once per 10 s so a chunk that keeps failing (offline, blocked) cannot loop.
const CHUNK_RELOAD_KEY = 'chunk-reload-at';

window.addEventListener('vite:preloadError', () => {
  try {
    if (Date.now() - Number(sessionStorage.getItem(CHUNK_RELOAD_KEY)) < 10_000) return;
    sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
  } catch {
    return;
  }

  window.location.reload();
});

createRoot(document.getElementById('root')!).render(<App />);
