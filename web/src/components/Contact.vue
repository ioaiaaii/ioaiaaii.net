<template>
  <div class="min-h-screen p-4 flex flex-col relative items-center justify-center bg-ioai-300">
    <!-- Links centered vertically and horizontally -->
    <div class="flex flex-col text-left">
      <a
        :href="resume.linkedIn"
        target="_blank"
        class="contact-button"
      >├ LinkedIn</a>
      <a
        href="https://soundcloud.com/ioannis_savvaidis"
        target="_blank"
        class="contact-button"
      >├ SoundCloud</a>
      <a
        :href="'mailto:' + resume.email"
        class="contact-button lowercase"
      >
      └ {{ resume.email }}
      </a>      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resume: {
        email: '',
        linkedIn: '',
        gitHub: '',
        soundCloud: '',
      },
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
    },
  },
};
</script>

<style scoped>
/* Optional styling for the contact page */
</style>
