<template>
  <div class="base-container flex justify-center">
    <div class="w-full px-4 sm:px-6 md:px-8 lg:px-0 lg:w-2/3 xl:w-1/2 py-8 sm:py-10 md:py-12 pb-20">
      <h1 class="sr-only">Contact Information</h1>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-8">
        <p class="resume-text opacity-50">Loading contact info...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-600 text-base sm:text-lg">{{ error }}</p>
      </div>

      <!-- Content -->
      <div v-else>
        <div class="space-y-2">
          <a :href="'mailto:' + resume.email" class="flex justify-end py-4" aria-label="Send email">
            <span class="release-button">EMAIL</span>
          </a>
          <a v-if="resume.bandcamp" :href="resume.bandcamp" target="_blank" rel="noopener noreferrer" class="flex justify-end py-4" aria-label="Bandcamp profile, opens in new window">
            <span class="release-button">BANDCAMP</span>
          </a>
          <a v-if="resume.soundcloud" :href="resume.soundcloud" target="_blank" rel="noopener noreferrer" class="flex justify-end py-4" aria-label="SoundCloud profile, opens in new window">
            <span class="release-button">SOUNDCLOUD</span>
          </a>
          <a v-if="resume.engineeringProfile" :href="resume.engineeringProfile" target="_blank" rel="noopener noreferrer" class="flex justify-end py-4" aria-label="GitHub profile, opens in new window">
            <span class="release-button">ENGINEERING BLOG</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const resume = ref({
  email: '',
  bandcamp: '',
  soundcloud: '',
  engineeringProfile: '',
});
const isLoading = ref(true);
const error = ref(null);

async function fetchResume() {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await fetch('/api/v1/info');
    if (!response.ok) throw new Error('Failed to fetch contact info');
    resume.value = await response.json();
  } catch (err) {
    error.value = err.message;
    console.error('Error fetching contact info:', err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchResume);
</script>
