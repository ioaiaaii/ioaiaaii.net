<template>
  <div class="base-container p-0">
    <!-- Grid Layout for Release Cards -->
    <div
      v-for="(release, releaseIndex) in releases"
      :key="release.title"
      class="base-grid min-h-screen"
    >
      <!-- Image Carousel with Slider Effect -->
      <div class="relative w-full overflow-hidden">
        <div
          class="flex ease-in-out transition-transform duration-700"
          :style="{ transform: `translateX(-${release.currentImageIndex * 100}%)` }"
        >
          <img
            v-for="(imgSrc, imgIndex) in release.image"
            :key="imgIndex"
            :src="imgSrc"
            @load="release.imagesLoaded.splice(imgIndex, 1, true)"
            class="aspect-square object-contain opacity-0 transition-opacity duration-700 md:min-h-screen"
            :class="{ 'opacity-100': release.imagesLoaded[imgIndex] }"
            loading="lazy"
          />
        </div>

        <!-- Navigation Controls -->
        <button
          v-if="release.image && release.image.length > 1"
          @click="prevImage(releaseIndex)"
          class="absolute top-1/2 left-2 transform -translate-y-1/2 text-4xl lg:text-5xl text-gray-400 hover:scale-110 focus:outline-none animate-pulse"
          aria-label="Previous image"
        >
          < <!-- Unicode for left arrow (◀) -->
        </button>
        <button
          v-if="release.image && release.image.length > 1"
          @click="nextImage(releaseIndex)"
          class="absolute top-1/2 right-2 transform -translate-y-1/2 text-4xl lg:text-5xl text-gray-400 hover:scale-110 focus:outline-none animate-pulse"
          aria-label="Next image"
        >
          > <!-- Unicode for right arrow (▶) -->
        </button>
      </div>

      <!-- Details -->
      <div class="flex flex-col flex-grow p-4 justify-center">
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
    fetch('/api/v1/releases')
      .then((response) => response.json())
      .then((data) => {
        this.releases = data.map((release) => ({
          ...release,
          currentImageIndex: 0,
          imagesLoaded: Array(release.image.length).fill(false), // Track load state for each image
        }));
      })
      .catch((error) => console.error('Error fetching releases:', error));
  },
  methods: {
    nextImage(releaseIndex) {
      const release = this.releases[releaseIndex];
      if (release.image && release.image.length > 1) {
        release.currentImageIndex = (release.currentImageIndex + 1) % release.image.length;
      }
    },
    prevImage(releaseIndex) {
      const release = this.releases[releaseIndex];
      if (release.image && release.image.length > 1) {
        release.currentImageIndex =
          (release.currentImageIndex - 1 + release.image.length) % release.image.length;
      }
    },
    setImage(releaseIndex, imgIndex) {
      this.releases[releaseIndex].currentImageIndex = imgIndex;
    },
  },
};
</script>

<style scoped>
/* Styling for indicator dots */
.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
