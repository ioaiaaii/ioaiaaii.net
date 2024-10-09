<template>
  <!-- Main Navigation Container -->
  <!-- Conditional opacity -->
  <div
    :class="[
      'fixed top-0 left-0 w-full z-50 bg-white',
      isLivePage ? 'bg-opacity-0' : 'bg-opacity-100 border-b border-slate-400'
    ]"
  >
    <!-- Top Bar: Menu Toggle, Left & Right Menus, and IOAIAAII Button -->
    <div :class="['flex items-center py-2 px-4', isMenuOpen ? 'justify-start' : 'justify-between']">
      
      <!-- Menu toggle for mobile view (Option button on the left in mobile view) -->
      <div class="lg:hidden">
        <button @click="toggleMenu" class="menu-button">
          Option
        </button>
      </div>

      <!-- Conditionally Centered IOAIAAII button (centered in large screens) -->
      <!-- The conditional ml-auto is applied only when isMenuOpen is true.
      The lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 classes ensure the "IOAIAAII" button is centered on large screens.        -->
      <button 
        v-if="showReturnButton"
        @click="navigateTo('/')" 
        :class="['menu-button-home', isMenuOpen ? 'ml-auto' : '', 'lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2']"
      >
        IOAIAAII
      </button>

      <!-- Left-aligned menu items (visible on larger screens) -->
      <div class="hidden lg:flex space-x-4 lg:space-x-16">
        <button
          v-for="(item, index) in leftMenuItems"
          :key="index"
          @click="navigateTo(item.route)"
          class="menu-button"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- Right-aligned menu items (visible on larger screens) -->
      <div class="hidden lg:flex space-x-4 lg:space-x-16">
        <button
          v-for="(item, index) in rightMenuItems"
          :key="index"
          @click="navigateTo(item.route)"
          class="menu-button"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <!-- Mobile menu (visible when menu is toggled open) -->
    <div 
      v-if="isMenuOpen" 
      class="flex flex-col shadow-md lg:hidden bg-slate-200"
    >
      <div class="px-4 py-2">
        <button
          v-for="(item, index) in allMenuItems"
          :key="index"
          @click="navigateTo(item.route)"
          class="menu-button w-full text-left"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftMenuItems: [
        { label: 'Info', route: '/info' },
        { label: 'Projects', route: '/projects' },
      ],
      rightMenuItems: [
        { label: 'Releases', route: '/releases' },
        { label: 'Live', route: '/live' },
      ],
      isMenuOpen: false,
    };
  },
  computed: {
    showReturnButton() {
      // Show IOAIAAII button only if not on landing page
      return this.$route.path !== '/';
    },
    isLivePage() {
    // Check if the current route is /live
    return this.$route.path === '/live';
    },
    allMenuItems() {
      // Concatenate left and right menu items for mobile view
      return [...this.leftMenuItems, ...this.rightMenuItems];
    },    
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
      // Close the menu on navigation
      this.isMenuOpen = false;
    },
    toggleMenu() {
      // Toggle the mobile menu open/close
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
