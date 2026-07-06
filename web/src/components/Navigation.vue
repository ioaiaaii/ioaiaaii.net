<template>
  <header class="site" :class="{ 'nav-hidden': !isNavbarVisible }">
    <router-link to="/" class="wordmark">Ioannis Savvaidis</router-link>
    <nav class="primary">
      <router-link to="/" :class="{ active: $route.name === 'Info' }">Info</router-link>
      <router-link to="/works" :class="{ active: $route.name === 'Works' }">Works</router-link>
      <router-link to="/live" :class="{ active: $route.name === 'Live' }">Live</router-link>
    </nav>
  </header>
</template>

<script>
const THRESHOLD = 6;    // ignore tiny jitters
const REVEAL_TOP = 80;  // always show near the very top

export default {
  data() {
    return {
      isNavbarVisible: true,
      lastScrollPosition: 0,
      scrollContainer: null,
    };
  },
  mounted() {
    this.scrollContainer = document.getElementById('scroll-root');
    if (this.scrollContainer) {
      this.scrollContainer.addEventListener('scroll', this.handleScroll, { passive: true });
    }
  },
  beforeUnmount() {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
    handleScroll() {
      if (!this.scrollContainer) return;
      const current = this.scrollContainer.scrollTop;
      const delta = current - this.lastScrollPosition;
      if (Math.abs(delta) <= THRESHOLD) return;
      this.isNavbarVisible = delta < 0 || current < REVEAL_TOP;
      this.lastScrollPosition = current;
    },
  },
};
</script>
