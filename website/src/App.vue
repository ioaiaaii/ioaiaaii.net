<template>
  <div id="app">
    <header v-if="$route.name !== 'NotFound'">
      <Navigation />
    </header>

    <main>
      <RouterView :key="$route.fullPath" />
    </main>

    <footer v-if="$route.name !== 'NotFound' && $route.path !== '/live' && $route.path !== '/contact'">
      <AppFooter />
    </footer>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import AppFooter from './components/AppFooter.vue'; // Updated import

export default {
  components: {
    Navigation,
    AppFooter,
  },
  methods: {
    goToContact() {
      this.$router.push('/contact')
    },
  }, 
};
</script>

<style>
/* Import global styles */
@import './assets/styles.css';
</style>
