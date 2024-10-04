<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <!-- Grid Layout for Release Cards -->
    <div class="relative group flex flex-col md:flex-row items-center">
      <!-- Release Card -->
      <div
        v-for="release in releases"
        :key="release.title"
        @click="goToRelease(release.title)"
        class="cursor-pointer transition-shadow duration-300"
      >
        <!-- Display First Image -->
        <div class="overflow-hidden">
          <img
            v-if="release.image && release.image.length"
            :src="release.image[0]"
            :alt="release.title"
            class="w-full h-full object-cover"
          />
        </div>
        <!-- Release Info -->
        <div class="p-4">
          <h3 class="text-xl font-semibold">{{ release.title }}</h3>
          <p class="text-sm text-gray-500">{{ release.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      releases: [],
    };
  },
  created() {
    // Fetch releases data on component creation
    fetch('/api/releases')
      .then((response) => response.json())
      .then((data) => {
        this.releases = data;
      })
      .catch((error) => console.error('Error fetching releases:', error));
  },
  methods: {
    goToRelease(title) {
      // Navigate to a new URI for the selected release
      this.$router.push(`/releases/${title}`);
      // Or if you're not using Vue Router and just want to redirect to another URL:
      // window.location.href = `/releases/${title}`;
    },
  },
};
</script>

<style scoped>
/* Add any custom styles for hover effects, transitions, etc. */
.cursor-pointer {
  cursor: pointer;
}
</style>
