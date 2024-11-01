<template>
  <!-- Main container with flex column for full height and sticky footer -->
  <div class="base-container flex flex-col min-h-screen mx-auto">
    <!-- Name and Profile Information -->
    <div class="p-4 mt-4">
      <h1 class="info-title">
        {{ resume.name }}
      </h1>
      <h2 class="info-subtitle">
        {{ resume.profile }}
      </h2>
    </div>     

    <!-- Two-column Grid for Engineer and Composer Sections -->
    <div class="base-grid p-4 grow gap-2 md:gap-4">
      <!-- Engineer Column -->
      <div>
        <h2 class="info-heading">
          Engineer
        </h2>
        <p class="basic-text mr-2">
          {{ resume.engineerBio }}
        </p>
      </div>
      <!-- Composer Column -->
      <div>
        <h2 class="info-heading mt-4 text-xl sm:text-2xl font-semibold">
          Composer
        </h2>
        <p class="basic-text mr-2">
          {{ resume.artistBio }}
        </p>
      </div>      
    </div>

    <!-- Responsive Image (Non-growing) -->
    <img
      class="h-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto object-contain flex-none"
      src="/assets/images/home/profile.png"
      alt="Home Image"
    >
    
    <!-- Footer Section (Sticky to Bottom) -->
    <footer class="w-full p-4 mt-auto border-t border-gray-500">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row justify-center gap-4 text-left">
        <!-- Contact Section -->
        <div>
          <h3 class="text-pretty tracking-widest font-semibold text-gray-600 uppercase">
            Contact
          </h3>
          <p class="text-pretty text-gray-600">
            <a
              :href="'mailto:' + resume.email"
              target="_blank"
              class="hover:underline"
            >{{ resume.email }}</a> <br>
          </p>
        </div>
        <!-- Profiles Section -->
        <div>
          <h3 class="text-pretty tracking-widest font-semibold text-gray-600 uppercase">
            Profiles
          </h3>
          <p class="text-pretty text-gray-600">
            <a
              :href="resume.linkedIn"
              target="_blank"
              class="hover:underline"
            >LinkedIn</a> <br>
            <a
              :href="resume.gitHub"
              target="_blank"
              class="hover:underline"
            >GitHub</a> <br>
            <a
              href="https://soundcloud.com/ioannis_savvaidis"
              target="_blank"
              class="hover:underline"
            >SoundCloud</a>
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
        artistBio: '',
        engineerBio: '',
      }
    };
  },
  created() {
    this.fetchResume();
  },
  methods: {
    fetchResume() {
      fetch('/api/v1/info')
        .then((response) => response.json())
        .then((data) => {
          this.resume = data;
        })
        .catch((error) => console.error('Error fetching resume content:', error));
    }
  },
};
</script>
