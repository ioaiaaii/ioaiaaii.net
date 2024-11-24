<template>
  <!-- Main Navigation Container -->
  <nav
    :class="{
      'fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out': true,
      'translate-y-0': isNavbarVisible,
      '-translate-y-full': !isNavbarVisible,
      'bg-white border-b border-gray-700': isMenuOpen,
      'bg-white bg-opacity-0': isLivePage && !isMenuOpen,
      'bg-ioai-300': isInfo && !isMenuOpen,
      'bg-white bg-opacity-0': isHomePage && !isMenuOpen,
      'bg-white bg-opacity-100 border-b border-ioai-700': !isMenuOpen && !isLivePage && !isInfo && !isHomePage
    }"
  >
    <!-- Top Bar: Left Conditional Text, Right Menu, and Option Button for Mobile -->
    <div class="flex items-center py-2 px-4 justify-between relative">
      <!-- Logo or Home Link -->
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
      <ul class="hidden lg:flex items-center space-x-4 lg:space-x-16 ml-auto">
        <li v-for="(item, index) in allMenuItems" :key="index">
          <button
            :class="[
              isActiveRoute(item.route) ? 'underline' : '',
              isLivePage || isInfo ? 'menu-button-live' : 'menu-button'
            ]"
            @click="navigateTo(item.route)"
          >
            {{ item.label }}
          </button>
        </li>
      </ul>

      <!-- Menu toggle button for small screens -->
      <div class="lg:hidden ml-auto">
        <button
          :class="['menu-button']"
          @click="toggleMenu"
        >
          {{ isMenuOpen ? 'X ⋮⋮⋮' : '⋮⋮⋮' }}
        </button>
      </div>
    </div>
  </nav>

  <!-- Full-screen Mobile Menu Overlay (visible when menu is toggled open) -->
  <div 
    v-if="isMenuOpen" 
    class="fixed inset-0 bg-white flex flex-col items-center z-40 pt-12 md:pt-12 lg:pt-16"
  >
    <!-- Menu Items for Mobile -->
    <ul class="items-center w-full">
      <li v-for="(item, index) in allMenuItems" :key="index">
        <button        
          :class="[
            'w-full text-left p-4 py-2 border-t border-gray-700 menu-button',
            isActiveRoute(item.route) ? 'underline' : ''
          ]"
          @click="navigateTo(item.route)"
        >
          {{ item.label }}        
        </button>
      </li>
    </ul>
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
      isNavbarVisible: true, // Controls navbar visibility
      lastScrollPosition: 0, // Tracks the last scroll position
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    },
    isLivePage() {
      return ['/live', '/releases', '/contact'].includes(this.$route.path);
    },
    isInfo() {
      return ['/info', '/projects'].includes(this.$route.path);
    },    
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY;
      // Show navbar when scrolling up or near the top, hide when scrolling down
      this.isNavbarVisible = currentScrollPosition < this.lastScrollPosition || currentScrollPosition < 10;
      this.lastScrollPosition = currentScrollPosition;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      // Toggle the no-scroll class on the body when the menu is opened or closed
      if (this.isMenuOpen) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    },
    navigateTo(route) {
      this.$router.push(route);
      this.isMenuOpen = false;
      document.body.classList.remove('no-scroll'); // Ensure no-scroll is removed when navigating
    },
    isActiveRoute(route) {
      return this.$route.path === route;
    },
  },
};
</script>


<style>
/* Prevent scrolling when applied to the body */
.no-scroll {
  overflow: hidden;
  height: 100vh; /* Prevents vertical scrolling */
}

</style>