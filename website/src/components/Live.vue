<template>
  <div
    class="relative w-full h-screen overflow-hidden bg-cover bg-center"
    style="background-image: url('/assets/images/live/studio_2024.jpg');"
  >
    <!-- Spacer Div to Push Content Down -->
    <div class="h-16 md:h-20 lg:h-24" />

    <!-- Text Overlay for Live Performances -->
    <div class="relative h-full flex flex-col items-start justify-start p-4">
      <!-- Scrollable container with hidden scrollbar -->
      <ul class="space-y-4 overflow-y-auto max-h-[75vh] w-full scrollbar-hide">
        <li
          v-for="(performance, index) in performances"
          :key="index"
          class="live-text"
        >
          <div>
            {{ performance.date }} : {{ performance.title }}
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
      showScrollIndicator: true, // Controls visibility of scroll indicator
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
    handleScroll() {
      const scrollContainer = this.$refs.scrollContainer;
      // Hide the scroll indicator after the user scrolls down slightly
      if (scrollContainer.scrollTop > 10) {
        this.showScrollIndicator = false;
      } else {
        this.showScrollIndicator = true;
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Additional styles for positioning and appearance */
.bg-cover {
  background-size: cover;
}
.bg-center {
  background-position: center;
}

/* For smooth scrolling inside the list */
ul {
  scrollbar-width: thin;
}
</style>
