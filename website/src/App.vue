<template>
  <div id="app">
    <header v-if="showHeader">
      <Navigation />
    </header>

    <main>
      <router-view :key="$route.fullPath" />
    </main>

    <footer v-if="showFooter">
      <AppFooter />
    </footer>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  components: {
    Navigation,
    AppFooter,
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'NotFound';
    },
    showFooter() {
      // Exclude routes where the footer shouldn't display
      return this.$route.name !== 'NotFound' && !['/live', '/contact'].includes(this.$route.path);
    },
  },
};
</script>


<style>
/* Import global styles */
@import './assets/styles.css';
</style>
