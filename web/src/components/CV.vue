<template>
  <div class="base-container">
    <div class="base-grid mt-2">
      <div class="p-4 lg:border-r border-white">       
        <section
          v-if="resume.profile.length"
          class="mt-2"
        >
          <h3 class="project-category">
            PROFILE
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
              <span
                class="date"
              >{{ edu.startDate }} - {{ edu.endDate }}</span><br>
              <span
                class="resume-item"
              >{{ edu.degree }}, {{ edu.institution }}, {{ edu.location }}</span>
            
              <div class="resume-text list-disc list-outside pl-4 space-y-1">
                <li>{{ edu.specialization }}</li>
                <li> {{ edu.dissertation }}</li>
                
              </div>
            </li>
          </ul>
        </section>
        <section
          v-if="resume.skillGroups.length"
          class="mt-6"
        >          
          <h3 class="resume-heading">
            Skills
          </h3>
          
          <!-- Grid Layout for Skill Groups -->
          <div class="grid grid-cols-2 md:grid-cols-4">
            <!-- Skill Groups List -->
            <div
              v-for="(group, index) in resume.skillGroups"
              :key="index"
              class="mb-6"
            >
              <!-- Category Name -->
              <h2 class="resume-text font-semibold italic">
                {{ group.category }}
              </h2>
              
              <!-- Skills List -->
              <ul class="list-disc list-outside pl-4 space-y-1">
                <li
                  v-for="(skill, i) in group.skills"
                  :key="i"
                  class="resume-text"
                >
                  {{ skill }}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column: Education, Projects, and Skills -->       
      <div class="p-4">     
        <!-- Experience Section -->
        <section
          v-if="resume.experience.length"
          class="mt-2"
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
              <span
                class="date"
              >{{ exp.startDate }} - {{ exp.endDate }}</span><br>
              <span
                class="resume-item"
              >{{ exp.role }}, {{ exp.company }}, {{ exp.location }}</span>

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