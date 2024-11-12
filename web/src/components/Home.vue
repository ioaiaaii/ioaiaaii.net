<template>
  <!-- Main Full-Screen Container -->
  <div
    class="flex flex-col overflow-hidden relative"
    :style="{ height: 'calc(var(--vh) * 100)' }"
  >
    <!-- Text Overlay Container with Flex Layout -->
    <div class="absolute inset-0 flex flex-col p-4 lg:mt-2">
      <!-- Title Section -->
      <div class="home-heading w-full lg:w-1/2 text-left">
        <h1 class="mt-10">
          {{ resume.title }}
        </h1>
      </div>
    </div>

    <!-- Background Image Container with Full Height -->
    <div
      class="flex-grow bg-center bg-cover"
      style="background-image: url('https://storage.googleapis.com/ioaiaaii-website-static-content/assets/images/home/profile.png');"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isContactOpen: false,
      resume: {
        title: '',
        profile: '',
      },
    };
  },
  created() {
    this.fetchResume();
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
    fetchResume() {
      fetch('/api/v1/info')
        .then((response) => response.json())
        .then((data) => {
          this.resume = data;
        })
        .catch((error) => console.error('Error fetching resume content:', error));
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>

</style>
