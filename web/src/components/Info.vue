<template>
  <div class="base-container">
    <div class="base-grid mt-2">
      <div class="p-4 lg:border-r border-ioai-100">       
        <section
          v-if="resume.profile.length"
          class="mt-2"
        >
          <h3 class="project-category">
            ///
          </h3>
          <p class="resume-text">
            {{ resume.engineerBio }} 
          </p>
        </section>
        <section
          v-if="resume.education.length"
          class="mt-6"
        >
          <h3 class="resume-heading">
            Education
          </h3>
          <ul class="list-inside space-y-4">
            <li
              v-for="(edu, index) in resume.education"
              :key="index"
              class="resume-text"
            >
              <strong>
                <span
                  class="date"
                  style="font-style: italic;"
                >{{ edu.startDate }} - {{ edu.endDate }}</span><br>
                {{ edu.degree }}, {{ edu.institution }}, {{ edu.location }}
              </strong>
              <div class="resume-text">
                <span class="specialization">{{ edu.specialization }}</span><br>
                <span class="dissertation">{{ edu.dissertation }}</span>
              </div>
            </li>
          </ul>
        </section>
        <!-- Experience Section -->
        <section
          v-if="resume.experience.length"
          class="mt-6"
        >
          <h3 class="resume-heading">
            Professional Experience
          </h3>
          <ul class="list-inside space-y-4">
            <li
              v-for="(exp, index) in resume.experience"
              :key="index"
              class="resume-text"
            >
              <strong>
                <span
                  class="date"
                  style="font-style: italic;"
                >{{ exp.startDate }} - {{ exp.endDate }},</span>
                {{ exp.role }}, {{ exp.company }}, {{ exp.location }}
              </strong>
              <ul class="list-disc list-outside pl-4 space-y-1">
                <li
                  v-for="(desc, i) in exp.description"
                  :key="i"
                >
                  {{ desc }}
                </li>
              </ul>
            </li>
          </ul>
        </section>        
      </div>

      <!-- Right Column: Education, Projects, and Skills -->       
      <div class="p-4">     
        <section
          v-if="resume.profile.length"
          class="mt-2"
        >
          <h3 class="project-category">
            ⊕⊕⊕
          </h3>
          <p class="resume-text">
            {{ resume.artistBio }} 
          </p>
        </section>          
        <section
          v-if="resume.profile.length"
          class="mt-6"
        >
          <h3 class="resume-heading">
            Artistic Approach
          </h3>
          <p class="resume-text">
            {{ resume.artisticApproach }} 
          </p>
        </section> 
        <!-- Experience Section -->
        <section
          v-if="resume.experience.length"
          class="mt-6"
        >
          <h3 class="resume-heading">
            Selected Discography / Collaborations
          </h3>
          <ul class="list-disc list-outside pl-4 space-y-1">
            <li
              v-for="(index) in resume.selectedWorks"
              :key="index"
              class="resume-text"
            >
              {{ index }}
            </li>
          </ul>
        </section>        
      </div>
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