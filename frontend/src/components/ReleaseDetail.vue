<template>
    <div class="container mx-auto my-12 px-4">
      <!-- Check if release data is available -->
      <div v-if="release">
        <!-- Title and Basic Information -->
        <h1 class="text-3xl font-bold mb-4">{{ release.title }}</h1>
        <p class="text-lg text-gray-600 mb-4">{{ release.label }}</p>
        <p class="text-sm text-gray-500 mb-8">{{ release.date }}</p>
        
        <!-- Release Description or Content -->
        <div class="mb-8">
          <p class="text-base text-gray-700">{{ release.description }}</p>
        </div>
  
        <!-- Display Images if Available -->
        <div v-if="release.images && release.images.length" class="grid grid-cols-2 gap-4 mb-8">
          <img
            v-for="(image, index) in release.images"
            :key="index"
            :src="image"
            :alt="release.title"
            class="w-full h-auto object-cover rounded-md shadow-md"
          />
        </div>
  
        <!-- Display Other Details as Needed -->
        <div v-if="release.items && release.items.length">
          <h2 class="text-2xl font-semibold mb-4">Items</h2>
          <ul class="list-disc ml-8">
            <li v-for="(item, index) in release.items" :key="index" class="text-gray-700">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Loading State or Error Message -->
      <div v-else>
        <p class="text-center text-gray-500">Loading release details...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        release: null, // Holds the fetched release details
      };
    },
    created() {
      // Fetch the release details based on the route parameter
      const title = this.$route.params.title;
      this.fetchReleaseDetails(title);
    },
    methods: {
      fetchReleaseDetails(title) {
        fetch(`/api/releases/${title}`)
          .then((response) => response.json())
          .then((data) => {
            this.release = data; // Store the fetched release details
          })
          .catch((error) => {
            console.error('Error fetching release details:', error);
            // Handle error case (optional)
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles as needed */
  .container {
    max-width: 800px;
  }
  </style>
  