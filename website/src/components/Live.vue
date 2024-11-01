<template>
  <div class="relative w-full h-screen overflow-hidden">
    <!-- Image Section as Background Cover -->
    <div class="absolute inset-0 w-full h-full">
      <img
        src="/assets/images/live/studio_2024.jpg"
        loading="lazy"
        alt="Profile Image"
        :class="[
          'absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 delay-200',
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        ]"
        sizes="100vw"
        @load="handleImageLoad"
      > 
    </div>

    <!-- Text Overlay for Live Performances with top margin to start after the menu bar -->
    <div
      :class="[
        'relative h-full flex items-start justify-center mt-10 p-4 sm:p-6 md:p-6 transition-opacity',
        isImageLoaded ? 'opacity-100' : 'opacity-0'
      ]"
    >
      <!-- Scrollable container for live performances with fixed max height -->
      <ul class="space-y-2 text-pretty max-h-[75vh] overflow-y-auto">
        <li
          v-for="(performance, index) in performances"
          :key="index"
          class="live-text"
        >
          <div>
            {{ performance.date }} / {{ performance.title }}
            <span
              v-if="performance.event_link"
              class="mx-2"
            > + </span>
            <a
              v-if="performance.event_link"
              :href="performance.event_link"
              target="_blank"
              rel="noopener noreferrer"
              class="live-button"
            >
              Info
            </a>
            <span
              v-if="performance.listen_link"
              class="mx-2"
            > + </span>
            <a
              v-if="performance.listen_link"
              :href="performance.listen_link"
              target="_blank"
              rel="noopener noreferrer"
              class="live-button"
            >
              Listen
            </a>
          </div>              
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      performances: [], // Holds the fetched performances
      isImageLoaded: false, // Tracks if the image has fully loaded
    };
  },
  created() {
    this.fetchLive();
  },
  methods: {
    fetchLive() {
      fetch('/api/v1/live')
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched data:', data); // Debugging log to confirm data fetching
          this.performances = data;
        })
        .catch((error) => console.error('Error fetching live performances:', error));
    },
    handleImageLoad() {
      this.isImageLoaded = true; // Set to true when image is fully loaded
    },
  },
};
</script>
