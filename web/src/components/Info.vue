<template>
  <div class="base-container flex justify-center">
    <div class="p-4 mt-4 lg:w-2/4">
      <!-- Profile Section -->
      <section v-if="resume.profile.length" class="mt-2">
        <h3 class="project-category">
          PROFILE
        </h3>
        <p class="resume-text">
          {{ resume.artistBio }}
        </p>
      </section>

      <!-- Artistic Approach Section -->
      <section v-if="resume.profile.length" class="mt-6">
        <h3 class="project-category">
          ARTISTIC APPROACH
        </h3>
        <p class="resume-text">
          {{ resume.artisticApproach }}
        </p>
      </section>

      <!-- Selected Works and Collaborations -->
      <section v-if="resume.experience.length" class="mt-6">
        <h3 class="project-category">
          SELECTED WORKS
        </h3>
        <ul class="list-disc list-outside pl-4 space-y-1">
          <li v-for="(project, index) in resume.selectedWorks" :key="index" class="resume-text">
            <a :href="project.link" target="_blank" class="resume-text">
              {{ project.title }}
            </a>
            <span v-if="project.link" class="mx-2"> / </span>
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="release-button"
            >
              LISTEN
            </a>            
          </li>
        </ul>

        <h3 class="project-category mt-6">
          COLLABORATIONS
        </h3>
        <ul class="list-disc list-outside pl-4 space-y-1">
          <li v-for="(project, index) in resume.collaborations" :key="index" class="resume-text">
            <a :href="project.link" target="_blank" class="resume-text">
              {{ project.title }}
            </a>
            <span v-if="project.link" class="mx-2"> / </span>
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="release-button"
            >
              VIEW
            </a>             
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resume: {
        name: '',
        title: '',
        email: '',
        linkedIn: '',
        gitHub: '',
        profile: '',
        experience: [],
        education: [],
        projects: [],
        skillGroups: [],
        references: [],        
      }
    };
  },
  created() {
    this.fetchContent();
  },
  methods: {
    fetchContent() {
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

<style>

</style>