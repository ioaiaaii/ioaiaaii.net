import { createRouter, createWebHistory } from 'vue-router'
import Info from '@/components/Info.vue';
import Works from '@/components/Works.vue';
import Live from '@/components/Live.vue';
import NotFound from '@/components/NotFound.vue';

const routes = [
  { path: '/', name: 'Info', component: Info },
  { path: '/works', name: 'Works', component: Works },
  { path: '/live', name: 'Live', component: Live },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
})

export default router
