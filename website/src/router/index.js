import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Info from '@/components/Info.vue';
import Projects from '@/components/Projects.vue';
import Releases from '@/components/Releases.vue';
import Live from '@/components/Live.vue';
import NotFound from '@/components/NotFound.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/info', name: 'Info', component: Info },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/releases', name: 'Releases', component: Releases },
  { path: '/live', name: 'Live', component: Live },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
