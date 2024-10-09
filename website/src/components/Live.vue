<template>
  <!-- Responsive container with padding and margin-top for vertical spacing -->
  <div class="relative w-full h-screen overflow-hidden">
    <!-- Image Section -->
    <div class="relative w-full h-full">
      <!-- Responsive image -->
      <img
        src="/assets/images/live/studio_2024.jpg"
        alt="Profile Image"
        class="absolute inset-0 w-full h-full object-cover"
        sizes="100vw"
      >
      
      <!-- Text Overlay for Live Performances -->
      <div class="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <!-- Scrollable container for live performances -->
        <ul class="space-y-6 text-pretty max-h-[70vh] overflow-y-auto">
          <li v-for="(performance, index) in performances" :key="index" class="live-text">
            <!-- Title and Date -->
            <div>{{ performance.date }} / {{ performance.title }}
              <span v-if="performance.event_link" class="mx-2"> + </span> <!-- Separator if both links exist -->
              <a v-if="performance.event_link" :href="performance.event_link" target="_blank" rel="noopener noreferrer" class="live-button">
                Info
              </a>
              <span v-if="performance.listen_link" class="mx-2"> + </span> <!-- Separator if both links exist -->
              <a v-if="performance.listen_link" :href="performance.listen_link" target="_blank" rel="noopener noreferrer" class="live-button">
                Listen
              </a>
            </div>              
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      performances: [], // Holds the fetched performances
    };
  },
  created() {
    this.fetchLive();
  },
  methods: {
    fetchLive() {
      fetch('/api/live')
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched data:', data); // Debugging log to confirm data fetching
          // Assuming data has structure { performances: [ { title, date, event_link?, listen_link? } ] }
          this.performances = data;
        })
        .catch((error) => console.error('Error fetching live performances:', error));
    },
  },
};
</script>
