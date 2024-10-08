<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  components: {
    Navigation,
  },
};
</script>

<style>
/* Import global styles */
@import './assets/styles.css';
</style>
