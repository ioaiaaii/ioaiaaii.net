<template>
  <!-- Responsive container with padding and vertical centering -->
  <div class="base-container min-h-screen flex flex-col justify-between">
    <!-- Name and Profile Information -->
    <div class="text-center">
      <h1 class="p-20 text-4xl sm:text-5xl font-bold mb-4">{{ resume.name }}</h1>
    </div>     

    <!-- Two-column Grid for Engineer and Composer Sections -->
    <div class="base-grid flex-grow">
      <!-- Engineer Column -->
      <div class="p-4 sm:p-6 lg:p-8">
        <h2 class="project-heading uppercase text-blue-900">Engineer</h2>
        <p class="text-lg sm:text-xl lg:text-2xl leading-relaxed text-justify">
          {{ resume.profile }}
        </p>
      </div>
      <!-- Composer Column -->
      <div class="p-4 sm:p-6 lg:p-8">
        <h2 class="project-heading uppercase text-blue-900">Composer</h2>
        <p class="text-lg sm:text-xl lg:text-2xl leading-relaxed text-justify">
          {{ resume.profile }}
        </p>
      </div>      
    </div>

    <!-- Footer with Contact and Profiles Section -->
    <footer class="w-full bg-slate-100 p-2 fixed bottom-0">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row justify-center gap-4 text-left">
        <!-- Contact Section -->
        <div>
          <h3 class="text-pretty font-semibold text-gray-800 uppercase">Contact</h3>
          <p class="text-pretty text-gray-700">{{ resume.email }}</p>
        </div>
        <!-- Profiles Section -->
        <div>
          <h3 class="text-pretty font-semibold text-gray-800 uppercase">Profiles</h3>
          <p class="text-pretty text-gray-700">
            <a :href="resume.linkedIn" target="_blank" class="hover:underline">LinkedIn</a> <br>
            <a :href="resume.gitHub" target="_blank" class="hover:underline">GitHub</a> <br>
            <a href="https://soundcloud.com/ioannis_savvaidis" target="_blank" class="hover:underline">SoundCloud</a> <br>
          </p>         
        </div>
      </div>
      <!-- Credits Section aligned to right -->
      <div class="text-right text-xs text-gray-600">
        © 2024 Ioannis Savvaidis. All rights reserved.
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
