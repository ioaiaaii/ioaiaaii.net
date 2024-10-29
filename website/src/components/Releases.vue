<template>
  <div class="base-container pt-10 lg:pt-14 xl:pt-14">
    <!-- Grid Layout for Release Cards -->
    <div
      v-for="(release, index) in releases"
      :key="release.title"
      class="base-grid "
    >
      <!-- Left Column: Image -->
      <div 
        class="relative w-full overflow-hidden"
        @mouseover="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      >
        <img
          v-if="release.image && release.image.length"
          :src="hoveredIndex === index && release.image[1] ? release.image[1] : release.image[0]"
          :alt="release.title"
          class="w-full h-auto object-cover aspect-w-16 aspect-h-9"
        >
      </div>
  
      <!-- Right Column: Details -->
      <div class="flex flex-col flex-grow p-4 sm:p-6 md:p-8 border-b border-gray-200 border-solid">
        <!-- Title and Description -->
        <div>
          <h3 class="release-title">
            {{ release.title }}
          </h3>
          <p class="release-text">
            {{ release.description }}
          </p>
        </div>
                
        <!-- Links -->
        <div class="mt-center pt-4">
          <div class="flex space-x-4">
            <!-- Discogs Link -->
            <span v-if="release.discogs_link">
              <a
                :href="release.discogs_link"
                target="_blank"
                rel="noopener noreferrer"
                class="release-button"
                aria-label="Discogs link for {{ release.title }}"
              >
                Discogs
              </a>
            </span>
            <!-- Bandcamp Link -->
            <span v-if="release.bandcamp_link">
              <a
                :href="release.bandcamp_link"
                target="_blank"
                rel="noopener noreferrer"
                class="release-button"
                aria-label="Bandcamp link for {{ release.title }}"
              >
                Bandcamp
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
      releases: [],
      hoveredIndex: null, // Track which release is being hovered
    };
  },
  created() {
    // Fetch releases data on component creation
    fetch('/api/v1/releases')
      .then((response) => response.json())
      .then((data) => {
        this.releases = data;
      })
      .catch((error) => console.error('Error fetching releases:', error));
  },
};
</script>
