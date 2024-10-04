<template>
  <div class="base-container">
    <!-- Grid Layout for Release Cards -->
    <div
      v-for="(release, index) in releases"
      :key="release.title"
      class="base-grid"
    >
      <!-- Left Column: Image -->
      <div 
        class="relative w-full overflow-hidden aspect-w-16 aspect-h-9"
        @mouseover="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      >
        <img
          v-if="release.image && release.image.length"
          :src="hoveredIndex === index && release.image[1] ? release.image[1] : release.image[0]"
          :alt="release.title"
          class="w-full h-full object-cover"
        />
      </div>
      
      <!-- Right Column: Details -->
      <div class="flex flex-col sm:px-4 sm:py-6 md:px-8 md:py-8 justify-between">
        <!-- Title and Description -->
        <div>
          <h3 class="release-title">{{ release.title }}</h3>
          <p class="basic-text">{{ release.description }}</p>
        </div>
        
        <!-- Links -->
        <div class="mt-auto">
          <div v-if="release.discogs_link" class="mb-2">
            <a
              :href="release.discogs_link"
              target="_blank"
              rel="noopener noreferrer"
              class="release-button"
              aria-label="Discogs link for {{ release.title }}"
            >
              Discogs
            </a>
          </div>
          <div v-if="release.bandcamp_link">
            <a
              :href="release.bandcamp_link"
              target="_blank"
              rel="noopener noreferrer"
              class="release-button"
              aria-label="Bandcamp link for {{ release.title }}"
            >
              Bandcamp
            </a>
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
      releases: [],
      hoveredIndex: null, // Track which release is being hovered
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
};
</script>
