<template>
  <!-- Top Menu Bar -->
  <nav
    :class="{
      'bg-opacity-0 fixed left-0 w-full z-50 transition-transform duration-300 ease-in-out': true,
      'translate-y-0': isNavbarVisible,
      '-translate-y-full': !isNavbarVisible,
    }"
  >
    <div class="w-full p-4">
      <!-- Desktop Menu - hidden on mobile -->
      <nav class="hidden md:flex md:items-center md:justify-between w-full gap-2">
        <div>
          <router-link to="/" class="footer-link hover:opacity-70 transition-opacity">
            IOANNIS SAVVAIDIS
          </router-link>
        </div>
        <div class="flex flex-wrap items-center gap-3 sm:gap-4">
          <router-link
            to="/info"
            class="footer-link"
            :class="{ 'opacity-50': $route.path === '/info' }"
          >
            Info
          </router-link>
          <router-link
            to="/live"
            class="footer-link"
            :class="{ 'opacity-50': $route.path === '/live' }"
          >
            Live
          </router-link>
          <router-link
            to="/contact"
            class="footer-link"
            :class="{ 'opacity-50': $route.path === '/contact' }"
          >
            Contact
          </router-link>
        </div>
      </nav>

      <!-- Mobile Header - visible only on mobile -->
      <div class="md:hidden flex items-center justify-between w-full">
        <router-link to="/" class="footer-link hover:opacity-70 transition-opacity">
          IOANNIS SAVVAIDIS
        </router-link>
        <button
          @click="toggleMenu"
          class="footer-link"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        >
          {{ isMenuOpen ? "×" : "≡" }}
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu Overlay -->
  <transition name="menu-fade">
    <div v-if="isMenuOpen" class="fixed inset-0 z-40 md:hidden">
      <div class="absolute inset-0">
        <LiquidBackground />
      </div>
      <div class="relative flex flex-col items-center justify-center h-full px-4">
        <nav class="space-y-8">
          <router-link
            to="/info"
            @click="closeMenu"
            class="block text-center footer-link text-2xl"
            :class="{ 'opacity-50': $route.path === '/info' }"
          >
            Info
          </router-link>
          <router-link
            to="/live"
            @click="closeMenu"
            class="block text-center footer-link text-2xl"
            :class="{ 'opacity-50': $route.path === '/live' }"
          >
            Live
          </router-link>
          <router-link
            to="/contact"
            @click="closeMenu"
            class="block text-center footer-link text-2xl"
            :class="{ 'opacity-50': $route.path === '/contact' }"
          >
            Contact
          </router-link>
        </nav>
      </div>
    </div>
  </transition>
</template>

<script>
import LiquidBackground from '@/components/insprira/LiquidBackground.vue';

export default {
  components: {
    LiquidBackground,
  },
  data() {
    return {
      isNavbarVisible: true,
      lastScrollPosition: 0,
      scrollContainer: null,
      isMenuOpen: false,
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    },
  },
  mounted() {
    this.scrollContainer = document.querySelector('.fixed.inset-0.overflow-y-auto');
    if (this.scrollContainer) {
      this.scrollContainer.addEventListener("scroll", this.handleScroll);
    }
  },
  beforeUnmount() {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener("scroll", this.handleScroll);
    }
  },
  methods: {
    handleScroll() {
      if (!this.scrollContainer) return;
      const currentScroll = this.scrollContainer.scrollTop;
      this.isNavbarVisible = currentScroll < this.lastScrollPosition || currentScroll < 10;
      this.lastScrollPosition = currentScroll;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>
