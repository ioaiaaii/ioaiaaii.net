<template>
  <div class="fixed inset-0 -z-10">
    <LiquidBackground />
  </div>  
  <div class="min-h-screen p-4 flex flex-col relative items-center justify-center">
    <!-- Links centered vertically and horizontally -->
    <div class="flex flex-col text-left">
      <a
        :href="'mailto:' + resume.email"
        class="contact-button lowercase"
      >{{ resume.email }}</a>      
    </div>
  </div>
</template>

<script>
import LiquidBackground from '@/components/insprira/LiquidBackground.vue'

export default {
  components: {
    LiquidBackground,
  },  
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
