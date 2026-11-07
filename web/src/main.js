// The fonts (Mona Sans, Mona Sans Mono, and IBM Plex Sans for Greek) are all declared
// by @font-face in tailwind.css, so they need no import here.
import './assets/css/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import reveal from './directives/reveal';

const app = createApp(App);

app.directive('reveal', reveal);
app.use(router);
app.mount('#app');
