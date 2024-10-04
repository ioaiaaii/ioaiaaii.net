import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Info from '@/components/Info.vue';
import Projects from '@/components/Projects.vue';
import Releases from '@/components/Releases.vue';
import ReleaseDetail from '@/components/ReleaseDetail.vue';
import Live from '@/components/Live.vue';
// import ProjectDetail from '@/components/ProjectDetail.vue'; // Generic component for project details


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/info', name: 'Info', component: Info },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/releases', name: 'Releases', component: Releases },
  { path: '/live', name: 'Live', component: Live },
  { path: '/releases/:title', name: 'ReleaseDetail', component: ReleaseDetail },
];

const router = createRouter({
  history: createWebHistory(), // This is the equivalent of `mode: 'history'` in Vue 2
  routes,
});

export default router;
