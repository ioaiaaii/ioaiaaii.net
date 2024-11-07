<template>
  <!-- Main Navigation Container -->
  <div
    :class="[
      'fixed top-0 left-0 w-full z-50 bg-white',
      isLivePage ? 'bg-opacity-0' : 'bg-opacity-100 border-b border-slate-600'
    ]"
  >
    <!-- Top Bar: Left Conditional Text, Right Menu, and Option Button for Mobile -->
    <div class="flex items-center py-2 px-4 justify-between relative">
      <!-- Left-side: IOANNIS SAVVAIDIS on the homepage, IOAIAAII on other pages -->
      <button 
        v-if="isHomePage"
        class="menu-button-home"
      >
        IOANNIS SAVVAIDIS
      </button>
      <button 
        v-else
        class="menu-button"
        @click="navigateTo('/')"
      >
        IOAIAAII
      </button>

      <!-- Right-aligned menu items for large screens -->
      <div class="hidden lg:flex items-center space-x-4 lg:space-x-16 ml-auto">
        <button
          v-for="(item, index) in allMenuItems"
          :key="index"
          :class="[
            isActiveRoute(item.route) ? 'underline' : '',
            isLivePage ? 'menu-button-live' : 'menu-button'
          ]"
          @click="navigateTo(item.route)"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- Menu toggle button for small screens -->
      <div class="lg:hidden ml-auto">
        <button
          :class="[isLivePage ? 'menu-button-live' : 'menu-button']"
          @click="toggleMenu"
        >
          {{ isMenuOpen ? 'X ⋮⋮⋮' : '⋮⋮⋮' }}
        </button>
      </div>
    </div>
  </div>

  <!-- Full-screen Mobile Menu Overlay (visible when menu is toggled open) pt-10 md:pt-12 lg:pt-16-->
  <div 
    v-if="isMenuOpen" 
    class="fixed inset-0 bg-white flex flex-col items-center z-40 pt-10 md:pt-12 lg:pt-16"
  >
    <!-- Menu Items (Centered) -->
    <div class="items-center w-full">
      <button        
        v-for="(item, index) in allMenuItems"
        :key="index"
        :class="[
          'w-full text-left p-4 py-2 border-t border-gray-700 menu-button',
          isActiveRoute(item.route) ? 'underline' : ''
        ]"
        @click="navigateTo(item.route)"
      >
        {{ item.label }}        
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allMenuItems: [
        { label: 'Info', route: '/info' },
        { label: 'Projects', route: '/projects' },
        { label: 'Releases', route: '/releases' },
        { label: 'Live', route: '/live' },
        { label: 'Contact', route: '/contact' },        
      ],
      isMenuOpen: false,
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    },
    isLivePage() {
      return this.$route.path === '/live' || this.$route.path === '/releases';
    },
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
      this.isMenuOpen = false;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    isActiveRoute(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style>
/* Ensure no overflow when menu is open */
html, body {
  margin: 0;
  padding: 0;
}
</style>
