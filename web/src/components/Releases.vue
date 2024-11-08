<template>
  <div class="base-container p-0">
    <!-- Grid Layout for Release Cards -->
    <div
      v-for="(release, releaseIndex) in releases"
      :key="release.title"
      class="base-grid"
    >
      <!-- Image Carousel with Larger Navigation Buttons -->
      <div class="relative w-full overflow-hidden">
        <img
          v-if="release.image && release.image.length"
          :src="release.image[release.currentImageIndex]"
          :alt="release.title"
          class="w-full object-cover aspect-square lg:h-screen"
          loading="lazy"
        />
        
        <!-- Navigation Controls -->
        <button
          v-if="release.image && release.image.length > 1"
          @click="prevImage(releaseIndex)"
          class="absolute top-1/2 left-2 transform -translate-y-1/2 text-4xl lg:text-5xl text-gray-400 hover:scale-110 focus:outline-none animate-pulse"
          aria-label="Previous image"
        >
          <
        </button>
        <button
          v-if="release.image && release.image.length > 1"
          @click="nextImage(releaseIndex)"
          class="absolute top-1/2 right-2 transform -translate-y-1/2 text-4xl lg:text-5xl text-gray-400 hover:scale-110 focus:outline-none animate-pulse"
          aria-label="Next image"
        >
          >
        </button>
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
        // Initialize each release with a currentImageIndex
        this.releases = data.map(release => ({
          ...release,
          currentImageIndex: 0, // Start with the first image
        }));
      })
      .catch((error) => console.error('Error fetching releases:', error));
  },
  methods: {
    nextImage(releaseIndex) {
      const release = this.releases[releaseIndex];
      if (release.image && release.image.length > 1) {
        // Go to the next image, or wrap around to the first one
        release.currentImageIndex = (release.currentImageIndex + 1) % release.image.length;
      }
    },
    prevImage(releaseIndex) {
      const release = this.releases[releaseIndex];
      if (release.image && release.image.length > 1) {
        // Go to the previous image, or wrap around to the last one
        release.currentImageIndex =
          (release.currentImageIndex - 1 + release.image.length) % release.image.length;
      }
    },
  },
};
</script>

<style scoped>
/* No custom styles required */
</style>
