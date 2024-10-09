<template>
  <!-- Main container with flex settings for full height and column stacking -->
  <div class="base-container">
    <!-- Name and Profile Information -->
    <div class="p-4 sm:p-6 lg:p-8 mt-10 ">
      <h1 class="info-title">{{ resume.name }}</h1>
    </div>     

    <!-- Two-column Grid for Engineer and Composer Sections -->
    <div class="base-grid p-4 sm:p-6 lg:p-8 grow gap-4 md:gap-6">
      <!-- Engineer Column -->
      <div>
        <h2 class="info-heading mt-4">Engineer</h2>
        <p class="basic-text mr-2">
          {{ resume.profile }}
          {{ resume.profile }}          
        </p>
      </div>
      <!-- Composer Column -->
      <div>
        <h2 class="info-heading mt-4">Composer</h2>
        <p class="basic-text mr-2">
          {{ resume.profile }}
          {{ resume.profile }}          
        </p>
      </div>      
    </div>
    <img class="h-auto max-w-full sm:max-w-md mx-auto" src="/assets/images/home/profile.png" alt="Home Image">
    <!-- Footer Section -->
    <footer class="w-full p-4 mt-auto border-t border-gray-200 sticky top-full">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row justify-center gap-4 text-left">
        <!-- Contact Section -->
        <div>
          <h3 class="text-pretty tracking-widest font-semibold text-gray-600 uppercase">Contact</h3>
          <p class="text-pretty text-gray-600">{{ resume.email }}</p>
        </div>
        <!-- Profiles Section -->
        <div>
          <h3 class="text-pretty tracking-widest font-semibold text-gray-600 uppercase">Profiles</h3>
          <p class="text-pretty text-gray-600">
            <a :href="resume.linkedIn" target="_blank" class="hover:underline">LinkedIn</a> <br>
            <a :href="resume.gitHub" target="_blank" class="hover:underline">GitHub</a> <br>
            <a href="https://soundcloud.com/ioannis_savvaidis" target="_blank" class="hover:underline">SoundCloud</a>
          </p>         
        </div>
      </div>
      <div class="text-right text-xs uppercase text-gray-600 mt-4">
        © 2024 Ioannis Savvaidis
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  data() {
    return {
      resume: {
        name: '',
        email: '',
        linkedIn: '',
        gitHub: '',
        soundCloud: '',
        discogs: '',
        profile: '',
      }
    };
  },
  created() {
    this.fetchResume();
  },
  methods: {
    fetchResume() {
      fetch('/api/info')
        .then((response) => response.json())
        .then((data) => {
          this.resume = data;
        })
        .catch((error) => console.error('Error fetching resume content:', error));
    }
  },
};
</script>
