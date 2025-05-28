<template>

  <div
    class="fixed inset-0 bg-cover bg-center -z-10 pointer-events-none"
    :style="{ backgroundImage: `url(${auroraBg})` }"
  ></div>
  
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
      <ul class="list-disc list-outside pl-4 space-y-4">
        <li v-for="(project, index) in resume.selectedWorks" :key="index" class="resume-text">
          <a :href="project.link" target="_blank" class="resume-text">
            {{ project.title }}
          </a>
          <br />          
          <span v-if="project.link"> </span>
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
      <ul class="list-disc list-outside pl-4 space-y-4">
        <li v-for="(project, index) in resume.collaborations" :key="index" class="resume-text">
          <a :href="project.link" target="_blank" class="resume-text">
            {{ project.title }}
          </a>
          <span v-if="project.link" class="mx-2"> </span>
          <br />          
          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="release-button inline-block"
          >
            VIEW
        </a>             
        </li>
      </ul>
    </section>

    <section v-if="releases.releases.length" class="mt-6">
      <h3 class="project-category">
        RELEASES
      </h3>
      <ul class="list-disc list-outside pl-4 space-y-4">
        <li v-for="(release, index) in releases.releases" :key="index" class="resume-text">
          <a :href="release.bandcamp_link" target="_blank" class="resume-text">
            {{ release.artist }} - {{ release.title }} 
          </a>
          <span class="mx-2">({{ release.label }}, {{ release.releaseDate.slice(0, 4) }}) </span>        
          <br />

          <a
            v-if="release.bandcamp_link"
            :href="release.bandcamp_link"
            target="_blank"
            rel="noopener noreferrer"
            class="release-button"
          >
            LISTEN
        </a>             
        </li>
      </ul>      
    </section>


    



  </div>      
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
const auroraBg = 'https://storage.googleapis.com/ioaiaaii-website-static-content/assets/images/bg.webp';

// state ─────────────────────────────────────────────
const resume = reactive({
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
  references: []
})

// methods ───────────────────────────────────────────
async function fetchContent () {
  try {
    const res   = await fetch('/api/v1/info')
    const data  = await res.json()
    Object.assign(resume, data)             // keep reactivity intact
  } catch (err) {
    console.error('Error fetching resume content:', err)
  }
}

const releases = reactive({ releases: [] })

async function fetchReleases () {
  const res = await fetch('/api/v1/releases')
  const data = await res.json()
  Object.assign(releases, { releases: data })
}

// lifecycle ─────────────────────────────────────────
onMounted(fetchContent)
onMounted(fetchReleases)
</script>
