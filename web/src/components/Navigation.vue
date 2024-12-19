<template>
  <!-- Main Navigation Container -->
  <nav
    :class="{
      'fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out': true,
      'translate-y-0': isNavbarVisible,
      '-translate-y-full': !isNavbarVisible,
      'bg-white border-b border-gray-700': isMenuOpen,
      'bg-white bg-opacity-0': isComposer && !isMenuOpen,
      'bg-white border-b border-ioai-300': isEngineer && !isMenuOpen,
      'bg-white bg-opacity-0': isHomePage && !isMenuOpen,
      'bg-white bg-opacity-100 border-b border-ioai-300': !isMenuOpen && !isComposer && !isEngineer && !isHomePage,
    }"
  >
    <!-- Top Bar: Left Conditional Text, Right Menu, and Option Button for Mobile -->
    <div class="flex py-2 px-4 relative justify-between">
      <!-- Logo or Home Link -->
      <button v-if="isHomePage" class="menu-button-home">IOANNIS SAVVAIDIS</button>
      <button v-else class="menu-button" @click="navigateTo('/')">IOAIAAII</button>

      <!-- Right-aligned menu items for large screens -->
      <!-- Large Screen Menu -->
      <ul class="hidden lg:flex space-x-4 lg:space-x-16 menu-button">
        <li
          v-for="(category, index) in groupedMenuItems"
          :key="index"
          class="relative"
          @mouseenter="showDropdown(index)"
          @mouseleave="hideDropdown"
        >
          <button class="menu-button">
            {{ category.label }}
          </button>

          <!-- Submenus -->
          <ul
            v-if="activeMenu === index"
            class="absolute left-0 top-full mt-2 w-48"
          >
            <li v-for="(item, idx) in category.items" :key="idx">
              <button
                :class="[
                  'block w-full text-left py-2 menu-button hover:text-ioai-300',
                  isActiveRoute(item.route) ? 'text-ioai-300' : '',
                ]"
                @click="navigateTo(item.route)"
              >
              {{ item.label }}
              </button>
            </li>
          </ul>
        </li>
        <!-- Contact -->
        <!-- <li>
          <button class="menu-button" @click="navigateTo('/contact')">Contact</button>
        </li> -->
      </ul>

      <!-- Mobile Menu Button -->
      <div class="lg:hidden ml-auto">
        <button @click="toggleMenu" class="menu-button-mobile animate-pulse font-medium">
          {{ isMenuOpen ? "X" : "///" }}
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu -->
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
                'w-full text-left py-2 px-4 hover:bg-gray-100 sub-menu-button-mobile',
                isActiveRoute(item.route) ? 'underline' : ''
              ]"
              @click="navigateTo(item.route)"
            >
              /{{ item.label }}
            </button>
          </li>
        </ul>
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
            { label: "Contact", route: "/contact" },
          ],
        },
        {
          label: "Composer",
          items: [
            { label: "Info", route: "/info" },
            { label: "Releases", route: "/releases" },
            { label: "Live", route: "/live" },
            { label: "Contact", route: "/contact" },
          ],
        },
      ],
      isMenuOpen: false, // Mobile menu toggle
      activeMenu: -1, // Tracks hovered menu index for desktop
      activeMobileMenu: null, // Tracks submenu toggle for mobile
      dropdownTimer: null, // Timer for delayed dropdown
      isNavbarVisible: true,
      lastScrollPosition: 0,
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    },
    isComposer() {
      return ["/live", "/contact", "/projects", "/cv", "/releases", "/info" ].includes(this.$route.path);
    },
    isEngineer() {
      return [ ].includes(this.$route.path);
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
    showDropdown(index) {
      clearTimeout(this.dropdownTimer);
      this.activeMenu = index;
    },
    hideDropdown() {
      this.dropdownTimer = setTimeout(() => {
        this.activeMenu = -1;
      }, 200); // Delay to prevent flicker
    },
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
