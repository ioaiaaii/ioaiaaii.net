<template>
    <div class="base-container mx-auto p-4 sm:p-6 lg:p-8 mt-4 text-center">
      <!-- Heading -->
      <h1 class="info-title text-3xl sm:text-4xl lg:text-5xl font-bold text-red-800 mb-4">
        Whooops 404
      </h1>
  
      <!-- Subheading -->
      <p class="basic-text text-lg sm:text-xl lg:text-2xl text-gray-700 mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>
  
      <!-- Link to Navigate Home -->
      <router-link to="/" class="home-link inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
        Go Back to Home
      </router-link>
    </div>
</template>
  
<script>
export default {
name: 'NotFound'
};
</script>
  
