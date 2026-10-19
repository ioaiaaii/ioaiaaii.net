// Self-hosted fonts. Two families do the work: Monaspace Neon for everything that is
// not prose (wordmark, nav, labels, list rows, links), always uppercase and never bold,
// so it needs its 400 only, and Newsreader for running prose. Newsreader is the
// variable build, so its optical-size axis (opsz 6..72) adapts the letterforms to the
// rendered size. Roman + italic only; prose never bolds.
import '@fontsource/monaspace-neon/400.css';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
// Newsreader ships no Greek subset either; Greek prose (ΨΥΧΥ) is caught by Literata
// ("Greek Serif", an @font-face in tailwind.css that points at its Greek file by
// path), so it needs no import here.
// IBM Plex Sans is the body default, and the last fallback for Greek in the mono stack
// (Monaspace Neon has Latin only; the system monospace comes first, see --font-mono).
// No visible Latin text is set in it, and nothing asks it for more than 400. Each
// @fontsource weight bundles every subset behind its own unicode-range, so the Greek
// comes with it.
import '@fontsource/ibm-plex-sans/400.css';

import './assets/css/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import reveal from './directives/reveal';

const app = createApp(App);

app.directive('reveal', reveal);
app.use(router);
app.mount('#app');
