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
      <div class="absolute inset-0 flex items-center justify-center">
        <!-- Display live performances line by line -->
        <ul class="space-y-2">
          <li v-for="(performance, index) in livePerformances" :key="index" class="live-text">
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
      livePerformances: [], // Holds the fetched performances
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
          if (data.performances) {
            this.livePerformances = data.performances;
          }
        })
        .catch((error) => console.error('Error fetching live performances:', error));

      // Mock data for testing purposes - comment this out when API works
      this.livePerformances = [
        {
          title: "Ambient Night at The Loft",
          date: "2023-04-15",
          event_link: "https://example.com/event/ambient-night",
          listen_link: "https://example.com/listen/ambient-night"
        },
        {
          title: "Soundscapes at Open Air Festival",
          date: "2022-08-21"
        },
        {
          title: "Experimental Session at Art House",
          date: "2021-11-12",
          event_link: "https://example.com/event/art-house-session"
        }
      ];
    },
  },
};
</script>
