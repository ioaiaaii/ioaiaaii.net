<!-- src/views/Contact.vue -->
<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white p-6">
    <div class="flex flex-col items-center space-y-2">
      <a
        :href="resume.linkedIn"
        target="_blank"
        class="menu-button  hover:underline"
      > LinkedIn</a>
      <a
        :href="resume.gitHub"
        target="_blank"
        class="menu-button hover:underline"
      >GitHub</a>
      <a
        href="https://soundcloud.com/ioannis_savvaidis"
        target="_blank"
        class="menu-button hover:underline"
      >SoundCloud</a>
      <a
        :href="'mailto:' + resume.email"
        class="menu-button hover:underline lowercase"
      >
        {{ resume.email }}
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
