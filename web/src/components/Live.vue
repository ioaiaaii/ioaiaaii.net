<template>
  <div
    class="relative w-full overflow-hidden bg-cover bg-center"
    :style="{ height: 'calc(var(--vh) * 100)' }"
    style="background-image: url('https://storage.googleapis.com/ioaiaaii-website-static-content/assets/images/live/studio_2024_3000_v1.jpg');"
  >
    <div class="min-h-12 h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 max-h-40"></div>

    <div class="relative h-full flex flex-col items-start justify-start p-4">
      <ul
        class="space-y-4 overflow-y-auto w-full scrollbar-hide"
        :style="{ maxHeight: 'calc(var(--vh) * 75)' }"
      >
        <li
          v-for="(performance, index) in performances"
          :key="index"
          class="live-text"
        >
          <div>
            {{ performance.date }} : {{ performance.title }}
            <span v-if="performance.event_link" class="mx-2"> + </span>
            <a
              v-if="performance.event_link"
              :href="performance.event_link"
              target="_blank"
              rel="noopener noreferrer"
              class="live-button"
            >
              Info
            </a>
            <span v-if="performance.listen_link" class="mx-2"> + </span>
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
    };
  },
  created() {
    this.fetchLive();
  },
  mounted() {
    // Set the viewport height variable for mobile Safari
    const setViewportHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
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
  },
};
</script>

<style scoped>

</style>
