<template>
  <!-- Main Full-Screen Container -->
  <div class="h-screen flex flex-col overflow-hidden relative">
    <!-- Text Overlay Container with Flex Layout pt-6 sm:pt-6 md:pt-8 lg:pt-8 xl:pt-8-->  
    <div class="absolute inset-0 flex flex-col p-4 lg:mt-2">
      <!-- Title Section -->
      <div class="home-heading w-full lg:w-1/2 text-left">
        <h1 class="mt-10">
          {{ resume.title }}
        </h1>
      </div>
    </div>

    <!-- Sitemap placed at the right of the screen -->
    <div class="home-subheading absolute right-4 bottom-8 px-2">
      <ul class="list-inside">
        <li>├─ <span>/info</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CV ⊕ Resume</li>
        <li>├─ <span>/projects</span> &nbsp;&nbsp;&nbsp;Classical ⊕ Quantum</li>
        <li>├─ <span>/releases</span> &nbsp;&nbsp;&nbsp;Music Catalog</li>
        <li>├─ <span>/live</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performances</li>
        <li>└─ <span>/contact</span> &nbsp;&nbsp;&nbsp;&nbsp; Details</li>
      </ul>
    </div>

    <!-- Background Image Container with Full Height -->
    <div
      class="flex-grow bg-cover bg-center"
      style="background-image: url('/assets/images/home/profile.png');"
    />
  </div>
</template>


<script>
export default {
  data() {
    return {
      isContactOpen: false, // Controls the display of contact info overlay
      resume: {
        title: '',
        profile: '',
      }
    };
  },
  created() {
    this.fetchResume();
  },
  methods: {
    fetchResume() {
      fetch('/api/v1/info')
        .then(response => response.json())
        .then(data => {
          this.resume = data;
        })
        .catch(error => console.error('Error fetching resume content:', error));
    },
    toggleContact() {
      this.isContactOpen = !this.isContactOpen;
      // Prevent page scroll when the overlay is open
      document.documentElement.style.overflow = this.isContactOpen ? 'hidden' : '';
      document.body.style.overflow = this.isContactOpen ? 'hidden' : '';
    }
  }
};
</script>

<style>
/* Background styling to ensure the image covers and stays centered */
.bg-cover {
  background-size: cover;
}
.bg-center {
  background-position: center;
}
.sitemap-item {
    margin-left: 20px; /* Adjust as needed */
}
</style>
