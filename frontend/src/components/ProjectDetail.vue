<template>
  <div class="container mx-auto my-12 px-4 lg:px-8">
    <!-- Page Title -->
    <h1 class="text-3xl font-bold text-center mb-8">{{ project.title }}</h1>

    <!-- Project Description -->
    <p class="text-gray-700 text-lg mb-6">{{ project.description }}</p>

    <!-- Redirect to PDF on GitHub -->
    <div class="mt-8 flex justify-center">
      <a 
        :href="project.pdfLink" 
        target="_blank" 
        class="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      >
        View PDF on GitHub
      </a>
    </div>

    <!-- Links to GitHub repo if available -->
    <div class="mt-8 flex justify-center space-x-4" v-if="project.repoLink">
      <a :href="project.repoLink" target="_blank" class="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
        View Repository
      </a>
    </div>
  </div>
</template>

<script>
import { classicalProjects, latexDocuments } from '@/config.js';

export default {
  props: ['projectName'],
  data() {
    return {
      project: {},
    };
  },
  created() {
    const allProjects = [...classicalProjects, ...latexDocuments];
    this.project = allProjects.find(p => p.routeName === this.projectName) || {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    };
  },
};
</script>
