<template>
  <div class="base-container">
    <!-- Split Columns for Classical Projects and Quantum Papers -->
    <div class="base-grid">
      <!-- Classical Computing Projects Column -->
      <div class="p-4 lg:border-r border-white">
        <h3 class="project-category mt-4">
          Classical Computing
        </h3>
        <div>
          <div 
            v-for="(project, index) in classicalProjects" 
            :key="index" 
            class="mt-4"
          >
            <p class="resume-item">
              {{ project.title }}
            </p>            
            <p class="project-text">
              {{ project.description }}
            </p>
            <span v-if="project.link"> </span>
            <a 
              :href="project.link" 
              target="_blank"
              rel="noopener noreferrer"
              class="release-button"
            > 
              READ
            </a>            
          </div>
        </div>
      </div>

      <!-- Quantum Computing Works Column -->
      <div class="p-4">
        <h2 class="mt-4 project-category">
          Quantum Computing
        </h2>
        <ul>
          <li 
            v-for="(project, index) in quantumDocuments" 
            :key="index"
            class="mt-4"
          >
            <p class="resume-item">
              {{ project.title }}
            </p>            
            <p class="project-text">
              {{ project.description }}
            </p>
            <span v-if="project.link"> </span>
            <a 
              :href="project.link" 
              target="_blank"
              rel="noopener noreferrer"
              class="release-button"
            > 
              READ
            </a>  
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classicalProjects: [],
      quantumDocuments: [],
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects() {
      fetch('/api/v1/projects')
        .then(response => response.json())
        .then(data => {
          // Categorize projects based on their type
          this.classicalProjects = data.filter(proj => proj.category === 'Classical');
          this.quantumDocuments = data.filter(proj => proj.category === 'Quantum');
        })
        .catch(error => console.error('Error fetching projects:', error));
    }
  }
};
</script>
