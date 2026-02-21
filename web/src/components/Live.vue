<template>
  <div class="base-container flex justify-center">
    <div class="w-full px-4 sm:px-6 md:px-8 lg:px-0 lg:w-2/3 xl:w-1/2 py-8 sm:py-10 md:py-12 pb-20">
      <h1 class="sr-only">Live Performances</h1>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-8">
        <p class="live-text opacity-50">Loading performances...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-600 text-base sm:text-lg">{{ error }}</p>
      </div>

      <!-- Content -->
      <div v-else class="space-y-2">
        <div
          v-for="(performance, index) in performances"
          :key="index"
          class="group py-4"
        >
          <!-- Mobile: stacked layout -->
          <div class="flex flex-col gap-1 sm:hidden">
            <span class="text-sm uppercase tracking-wide text-gray-500 font-semibold">{{ formatDate(performance.date) }}</span>
            <div class="flex items-center justify-between gap-4">
              <span class="text-base text-gray-900 font-medium tracking-wide">{{ performance.title }}</span>
              <div class="flex items-center gap-3">
                <a v-if="performance.event_link" :href="performance.event_link" target="_blank" rel="noopener noreferrer" class="release-button" aria-label="Event information, opens in new window">INFO</a>
                <a v-if="performance.listen_link" :href="performance.listen_link" target="_blank" rel="noopener noreferrer" class="release-button" aria-label="Listen to recording, opens in new window">LISTEN</a>
              </div>
            </div>
          </div>

          <!-- Desktop: single row with vertical line -->
          <div class="hidden sm:flex relative items-center gap-4">
            <span class="text-sm uppercase tracking-wide text-gray-500 font-semibold whitespace-nowrap w-24">{{ formatDate(performance.date) }}</span>
            <div class="absolute top-0 bottom-0 bg-black" style="width: 1px; left: 120px;"></div>
            <span class="text-base text-gray-900 font-medium tracking-wide flex-1 pl-8">{{ performance.title }}</span>
            <div class="flex items-center gap-3">
              <a v-if="performance.event_link" :href="performance.event_link" target="_blank" rel="noopener noreferrer" class="release-button" aria-label="Event information, opens in new window">INFO</a>
              <a v-if="performance.listen_link" :href="performance.listen_link" target="_blank" rel="noopener noreferrer" class="release-button" aria-label="Listen to recording, opens in new window">LISTEN</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const performances = ref([]);
const isLoading = ref(true);
const error = ref(null);

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

async function fetchLive() {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await fetch('/api/v1/live');
    if (!response.ok) throw new Error('Failed to fetch live performances');
    const data = await response.json();
    performances.value = data;
  } catch (err) {
    error.value = err.message;
    console.error('Error fetching live performances:', err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchLive);
</script>
