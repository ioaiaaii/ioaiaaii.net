// Self-hosted fonts (IBM Plex fusion + Schibsted Grotesk, loaded but unused).
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-serif/400.css';
import '@fontsource/ibm-plex-serif/400-italic.css';
import '@fontsource/ibm-plex-serif/500.css';
import '@fontsource/ibm-plex-sans/300.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/schibsted-grotesk/400.css';
import '@fontsource/schibsted-grotesk/500.css';

import './assets/css/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import reveal from './directives/reveal';

const app = createApp(App);

app.directive('reveal', reveal);
app.use(router);
app.mount('#app');
