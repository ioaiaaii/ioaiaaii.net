<template>
  <div class="base-container p-0">
    <!-- Grid Layout for Release Cards -->
    <div
      v-for="release in releases"
      :key="release.title"
      class="base-grid"
    >
      <!-- Image -->
      <div class="relative w-full overflow-hidden">
        <img
          v-if="release.image && release.image.length"
          :src="release.image[0]"
          :alt="release.title"
          class="w-full object-cover aspect-square lg:h-screen"
          loading="lazy"
        >
      </div>
  
      <!-- Details -->
      <div class="flex flex-col flex-grow p-4 border-b border-gray-200 border-solid justify-center bg-gray-400">
        <h3 class="mt-2 release-title">
          {{ release.artist }} - {{ release.title }}
        </h3>
        <p class="release-subtitle">
          {{ release.label }}, {{ release.releaseDate }}
        </p>
        <p class="release-text mt-4">
          {{ release.description }}
        </p>        
        <div class="mt-4">
          <div class="flex space-x-4">
            <!-- Bandcamp Link -->
            <span v-if="release.bandcamp_link">
              <a
                :href="release.bandcamp_link"
                target="_blank"
                rel="noopener noreferrer"
                class="release-button"
                aria-label="Bandcamp link for {{ release.title }}"
              >
                LISTEN
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  data() {
    return {
      releases: [], // Initialize releases array
    };
  },
  created() {
    // Fetch releases data on component creation
    fetch('/api/v1/releases')
      .then((response) => response.json())
      .then((data) => {
        this.releases = data; // Directly assign the data
      })
      .catch((error) => console.error('Error fetching releases:', error));
  },
};
</script>

<style scoped>
/* You can add any additional styles here */
</style>
