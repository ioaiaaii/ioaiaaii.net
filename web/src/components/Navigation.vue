<template>
  <!-- Main Navigation Container -->
  <nav
    :class="{
      'fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out': true,
      'translate-y-0': isNavbarVisible,
      '-translate-y-full': !isNavbarVisible,
      // Background based on state (adjust as desired)
      'bg-white border-b border-gray-700': isMenuOpen,
      'bg-white bg-opacity-0': isComposer && !isMenuOpen,
      'bg-white bg-opacity-0': isEngineer && !isMenuOpen,
      'bg-white bg-opacity-0': isHomePage && !isMenuOpen,
      'bg-white bg-opacity-100 border-b border-ioai-300': !isMenuOpen && !isComposer && !isEngineer && !isHomePage,
    }"
  >
    <!-- Top Bar: Left Logo and Right Hamburger -->
    <div class="flex py-2 px-4 relative">
      <!-- Left: Logo or Home Link -->
      <button v-if="isHomePage" class="menu-button-home">IOANNIS SAVVAIDIS</button>
      <button v-else class="menu-button" @click="navigateTo('/')">IOAIAAII</button>

      <!-- Right: Hamburger Toggle (always visible) -->
      <div class="ml-auto">
        <button @click="toggleMenu" class="menu-button-mobile animate-pulse">
          {{ isMenuOpen ? "X" : "///" }}
        </button>
      </div>
    </div>
  </nav>

  <!-- Unified Menu (Overlay for All Devices) -->
  <div v-if="isMenuOpen" class="fixed inset-0 bg-white z-40 flex flex-col pt-12">
    <ul class="w-full">
      <li
        v-for="(category, index) in groupedMenuItems"
        :key="index"
        class="border-t border-gray-700"
      >
        <button
          class="w-full text-left py-2 px-4 menu-button-mobile"
          @click="toggleSubmenu(index)"
        >
          {{ category.label }}
        </button>
        <ul v-if="activeMobileMenu === index">
          <li v-for="(item, idx) in category.items" :key="idx">
            <button
              :class="[
                'w-full text-left py-2 px-4 hover:bg-blue-800 hover:text-white sub-menu-button-mobile',
                isActiveRoute(item.route) ? 'underline' : ''
              ]"
              @click="navigateTo(item.route)"
            >
              /{{ item.label }}
            </button>
          </li>
        </ul>
      </li>
      <!-- Example Contact Item -->
      <li class="border-t border-gray-700">
        <button class="w-full text-left py-2 px-4 menu-button-mobile" @click="navigateTo('/contact')">
          Contact
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupedMenuItems: [
        {
          label: "Engineer",
          items: [
            { label: "CV", route: "/cv" },
            { label: "Projects", route: "/projects" },
          ],
        },
        {
          label: "Composer",
          items: [
            { label: "Info", route: "/info" },
            { label: "Releases", route: "/releases" },
            { label: "Live", route: "/live" },
          ],
        },
      ],
      isMenuOpen: false, // Toggle for menu overlay
      activeMenu: -1, // Used for desktop dropdown (no longer used)
      activeMobileMenu: null, // Tracks submenu toggle for mobile
      dropdownTimer: null, // Timer for delayed dropdown (desktop, not used now)
      isNavbarVisible: true,
      lastScrollPosition: 0,
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    },
    isComposer() {
      return ["/live", "/contact", "/projects", "/cv", "/releases", "/info"].includes(this.$route.path);
    },
    isEngineer() {
      return []; // Adjust if needed
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
      const currentScroll = window.scrollY;
      this.isNavbarVisible = currentScroll < this.lastScrollPosition || currentScroll < 10;
      this.lastScrollPosition = currentScroll;
    },
    // Desktop dropdown methods removed for simplicity

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.classList.toggle("no-scroll", this.isMenuOpen);
    },
    toggleSubmenu(index) {
      this.activeMobileMenu = this.activeMobileMenu === index ? null : index;
    },
    navigateTo(route) {
      this.$router.push(route);
      this.isMenuOpen = false;
      document.body.classList.remove("no-scroll");
    },
    isActiveRoute(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style>
.no-scroll {
  overflow: hidden;
  height: 100vh;
}
</style>
