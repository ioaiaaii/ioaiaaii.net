import { createRouter, createWebHistory } from 'vue-router';
import InfoView from '@/views/InfoView.vue';
import WorksView from '@/views/WorksView.vue';
import LiveView from '@/views/LiveView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const SITE = 'Ioannis Savvaidis';
const ORIGIN = 'https://ioaiaaii.net';
const HOME_DESCRIPTION =
  'Ioannis Savvaidis, composer working through the Abstraction/Representation relation in computing paradigms.';

// `name` is the route name, not the component name — Navigation matches its links
// against these, and App hides the footer on NotFound. They stay single words.
// `meta.title/description` drive the per-route <head> (see the afterEach hook below).
const routes = [
  {
    path: '/',
    name: 'Info',
    component: InfoView,
    meta: { title: `${SITE} — Composer`, description: HOME_DESCRIPTION },
  },
  {
    path: '/works',
    name: 'Works',
    component: WorksView,
    meta: {
      title: `Works — ${SITE}`,
      description: 'The discography and selected works of composer Ioannis Savvaidis.',
    },
  },
  {
    path: '/live',
    name: 'Live',
    component: LiveView,
    meta: {
      title: `Live — ${SITE}`,
      description: 'Live performances by composer Ioannis Savvaidis.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { title: `Not found — ${SITE}`, description: HOME_DESCRIPTION, noindex: true },
  },
];

// No scrollBehavior: the window never scrolls (body is overflow:hidden), so it would
// be a no-op. App.vue resets the inner scroll container on navigation instead.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Per-route <head>. This SPA serves ONE static index.html for every path, so without
// this, /works and /live would carry the home page's title and description. Google
// runs JS and picks these up; social scrapers read the static og: tags in index.html
// (a site-level card), which is fine. Canonical is set per route — never a single
// static root canonical, which would tell search engines the subpages are duplicates
// of the home page and de-index them.
function upsert(selector, make, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = make();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
  return el;
}
router.afterEach((to) => {
  document.title = to.meta.title || `${SITE} — Composer`;
  if (to.meta.description) {
    upsert('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }), 'content', to.meta.description);
  }
  upsert('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', ORIGIN + (to.path === '/' ? '/' : to.path));
  // Keep the 404 out of the index (it is served with a 200 by the SPA fallback).
  const robots = document.head.querySelector('meta[name="robots"]');
  if (to.meta.noindex) {
    upsert('meta[name="robots"]', () => Object.assign(document.createElement('meta'), { name: 'robots' }), 'content', 'noindex');
  } else if (robots) {
    robots.remove();
  }
});

export default router;
