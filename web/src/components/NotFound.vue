<template>
  <div class="base-container mx-auto p-4 sm:p-6 lg:p-8 mt-4 text-center">
    <!-- Heading -->
    <h1 class="project-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-800 mb-4">
      Whooops! 404
    </h1>

    <!-- Subheading -->
    <p class="basic-text text-lg sm:text-xl lg:text-2xl text-gray-700 mb-4">
      The page you are looking for doesn’t exist or has been moved.
    </p>

    <!-- Additional Message -->
    <p class="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 italic">
      Nothing to do here.
    </p>

    <!-- Link to Navigate Home -->
    <router-link 
      to="/" 
      class="project-button inline-block bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
    >
      Go Back to Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>
