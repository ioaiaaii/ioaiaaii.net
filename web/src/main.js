// Self-hosted fonts. Two families do the work: IBM Plex Mono for the ledger
// (wordmark, nav, labels, titles, metadata) and Newsreader for running prose.
// Newsreader is the variable build, so its optical-size axis (opsz 6..72) adapts
// the letterforms to the rendered size. Roman + italic only — prose never bolds.
// IBM Plex Sans is the UI face (body default, contact email) and carries Greek for
// both other stacks — see below.
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
// Newsreader ships no Greek subset, so ΨΥΧΥ fell through to Georgia — a much
// heavier screen serif that read as bold beside the Latin. Plex Sans covers Greek
// and is already imported below (each @fontsource weight bundles every subset
// behind its own unicode-range), so it needs no extra import — only a place in
// the --font-serif stack, ahead of Georgia.
// 400 (body, contact link) and 500 only. 500 looks unused at first glance — no
// element asks Plex Sans for it — but the Greek work title does: it is font-mono
// font-medium, and Plex Mono has no Greek, so ΔΕΣΜΗ ΦΩΤΟΣ resolves to Plex Sans
// at weight 500 through the --font-mono stack.
// 300 and 600 were imported and never requested: nothing declares font-light or
// font-semibold. The Greek 300 *file* is still shipped — the "Plex Greek Light"
// face above points at it by path, which does not need the family imported.
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';

import './assets/css/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import reveal from './directives/reveal';

const app = createApp(App);

app.directive('reveal', reveal);
app.use(router);
app.mount('#app');
