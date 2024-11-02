<template>
  <div id="app">
    <Navigation v-if="$route.name !== 'NotFound'" />
    <router-view />
  </div>
  <!-- Footer (Visible on all pages except NotFound) -->
  <footer
    v-if="$route.name !== 'NotFound'"
    class="w-full p-4 border-t border-gray-500 mt-auto"
  >
    <div class="flex justify-between items-center">
      <!-- CONTACT Button that navigates to the Contact page -->
      <router-link
        to="/contact"
        class="text-xs md:text-sm tracking-widest font-semibold text-gray-600 uppercase hover:underline"
      >
        Contact
      </router-link>
      
      <!-- COPYRIGHT Text, aligned to the far right -->
      <div class="text-right text-xs md:text-sm uppercase text-gray-600">
        © 2024 Ioannis Savvaidis
      </div>
    </div>
  </footer>  
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
