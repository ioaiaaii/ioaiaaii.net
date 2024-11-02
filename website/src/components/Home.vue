<template>
  <!-- Main Full-Screen Container -->
  <div class="h-screen flex flex-col overflow-hidden">
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
        email: '',
        linkedIn: '',
        gitHub: '',
        soundCloud: '',
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

</style>
