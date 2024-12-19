<template>
  <!-- Main Full-Screen Container -->
  <div
    class="flex flex-col overflow-hidden relative"
    :style="{ height: 'calc(var(--vh) * 100)' }"
  >
    <!-- Background Image Container with Full Height -->
    <div
      class="flex-grow bg-center bg-cover"
      style="background-image: url('https://storage.googleapis.com/ioaiaaii-website-static-content/assets/images/home/profile_v2.webp');"
    />
  </div>
</template>

<script>
export default {
  created() {
    this.scrollToTop();
  },
  mounted() {
    // Set the viewport height variable for Mobile Safari
    const setViewportHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>

</style>
