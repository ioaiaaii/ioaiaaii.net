<template>
  <div class="base-container">
    <!-- Responsive Grid Layout for Info Sections -->
    <div class="base-grid">
      <!-- <div class="grid md:grid-cols-1 lg:grid-cols-2 auto-cols-fr"> -->
      <!-- Left Column: Experience and References -->
      <div class="p-4 sm:p-6 lg:p-8 lg:border-r border-gray-200 ">
        <!-- Experience Section -->
        <section
          v-if="resume.experience.length"
          class="mt-4"
        >
          <h3 class="resume-heading">
            Experience
          </h3>
          <ul class="list-inside space-y-2">
            <li
              v-for="(exp, index) in resume.experience"
              :key="index"
              class="resume-text"
            >
              <strong>[{{ exp.endDate }} - {{ exp.startDate }}] {{ exp.role }}, {{ exp.company }}</strong>, {{ exp.location }}
              <ul class="list-disc list-inside ml-1 space-y-1">
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
      <div class="p-4 sm:p-6 lg:p-8">
        <!-- Education Section -->
        <section
          v-if="resume.education.length"
          class="mt-4"
        >
          <h3 class="resume-heading">
            Education
          </h3>
          <ul class="list-inside space-y-2">
            <li
              v-for="(edu, index) in resume.education"
              :key="index"
              class="resume-text"
            >
              <strong>[{{ edu.endDate }}-{{ edu.startDate }}]</strong> {{ edu.degree }}, {{ edu.institution }}, {{ edu.location }}
            </li>
          </ul>
        </section>

        <!-- Projects Section -->
        <!-- <section v-if="resume.projects.length" class="mt-8">
          <h3 class="resume-heading">Projects</h3>
          <ul class="list-inside space-y-4">
            <li v-for="(proj, index) in resume.projects" :key="index" class="resume-text">
              <strong>{{ proj.title }}</strong> <br>
              {{ proj.description }}
            </li>
          </ul>
        </section> -->

        <!-- Skills Section -->
        <section
          v-if="resume.skillGroups.length"
          class="mt-8"
        >
          <h3 class="resume-heading">
            Skills
          </h3>
          <!-- Flex container to align items responsively -->
          <div class="flex flex-wrap -mx-2">
            <div
              v-for="(skillGroup, index) in resume.skillGroups"
              :key="index"
              class="resume-text w-full md:w-1/2 px-2 mb-4"
            >
              <strong>{{ skillGroup.category }}</strong>
              <ul class="list-inside ml-1 space-y-1 list-disc">
                <li
                  v-for="(skill, i) in skillGroup.skills"
                  :key="i"
                >
                  {{ skill }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- References Section -->
        <section class="mt-8">
          <h3 class="resume-heading">
            References
          </h3>
          <p class="resume-text">
            References for all experience and education are available upon request.
          </p>
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
