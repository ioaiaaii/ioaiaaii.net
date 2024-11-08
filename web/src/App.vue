<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navigation from '@/components/Navigation.vue';
import AppFooter from '@/components/AppFooter.vue';
import { computed } from 'vue';

const route = useRoute();

const showHeader = computed(() => route.name !== 'NotFound');

const showFooter = computed(() => {
  // Exclude routes where the footer shouldn't display
  return route.name !== 'NotFound' && !['/live', '/contact'].includes(route.path);
});

</script>
<template>

  <nav v-if="showHeader">
    <Navigation />
  </nav>

  <RouterView :key="$route.fullPath" />

  <footer v-if="showFooter">
    <AppFooter />
  </footer>
</template>
