<template>

  <div class="base-container flex justify-center">
    <div class="w-full px-4 sm:px-6 md:px-8 lg:px-0 lg:w-2/3 xl:w-1/2 py-8 sm:py-10 md:py-12 pb-20">

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-4">
      <p class="resume-text opacity-50">Loading profile...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-4">
      <p class="text-red-600 text-base sm:text-lg">{{ error }}</p>
    </div>

    <!-- Content -->
    <div v-else>
    <!-- Profile Section -->
    <section v-if="resume.profile.length">
      <h2 class="project-category">PROFILE</h2>
      <p class="resume-text">
        {{ resume.artistBio }}
      </p>
    </section>

    <!-- Artistic Approach Section -->
    <section v-if="resume.profile.length" class="mt-20 sm:mt-24">
      <h2 class="project-category">ARTISTIC APPROACH</h2>
      <p class="resume-text">
        {{ resume.artisticApproach }}
      </p>
    </section>

    <!-- Selected Works and Collaborations -->
    <section v-if="resume.selectedWorks.length" class="mt-20 sm:mt-24">
      <h2 class="project-category">SELECTED WORKS</h2>
      <div class="space-y-4">
        <div v-for="(project, index) in resume.selectedWorks" :key="index" class="py-4">
          <!-- Mobile -->
          <div class="flex flex-col gap-1 sm:hidden">
            <span class="text-sm uppercase tracking-wide text-gray-600 font-semibold">{{ project.date }}</span>
            <div class="flex items-center justify-between gap-4">
              <span class="text-base text-gray-900 font-medium tracking-wide">{{ project.title }}</span>
              <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="release-button" aria-label="Listen to track, opens in new window">LISTEN</a>
            </div>
            <span class="text-sm text-gray-600 font-medium">{{ project.released }}</span>
            <p class="text-sm text-gray-900 leading-relaxed mt-1">{{ project.description }}</p>
          </div>
          <!-- Desktop -->
          <div class="hidden sm:block">
            <div class="flex relative items-center gap-4">
              <span class="text-sm uppercase tracking-wide text-gray-600 font-semibold whitespace-nowrap w-24">{{ project.date }}</span>
              <div class="absolute top-0 bottom-0 bg-black" style="width: 1px; left: 100px;"></div>
              <span class="text-base text-gray-900 font-medium tracking-wide flex-1 pl-6">{{ project.title }}</span>
              <span class="text-sm uppercase tracking-wide text-gray-600 font-medium whitespace-nowrap">{{ project.released }}</span>
              <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="release-button" aria-label="Listen to track, opens in new window">LISTEN</a>
            </div>
            <p class="text-sm text-gray-900 leading-relaxed mt-2 ml-[136px]">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="resume.collaborations.length" class="mt-20 sm:mt-24">
      <h2 class="project-category">COLLABORATIONS</h2>
      <div class="space-y-4">
        <div v-for="(project, index) in resume.collaborations" :key="index" class="py-4">
          <!-- Mobile -->
          <div class="flex flex-col gap-1 sm:hidden">
            <span class="text-sm uppercase tracking-wide text-gray-600 font-semibold">{{ project.date }}</span>
            <div class="flex items-center justify-between gap-4">
              <span class="text-base text-gray-900 font-medium tracking-wide">{{ project.title }}</span>
              <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="release-button" aria-label="View project, opens in new window">VIEW</a>
            </div>
            <span class="text-sm text-gray-600 font-medium">{{ project.type }} @ {{ project.where }}</span>
          </div>
          <!-- Desktop -->
          <div class="hidden sm:flex relative items-center gap-4">
            <span class="text-sm uppercase tracking-wide text-gray-600 font-semibold whitespace-nowrap w-24">{{ project.date }}</span>
            <div class="absolute top-0 bottom-0 bg-black" style="width: 1px; left: 100px;"></div>
            <span class="text-base text-gray-900 font-medium tracking-wide flex-1 pl-6">{{ project.title }}</span>
            <span class="text-sm text-gray-600 font-medium whitespace-nowrap">{{ project.type }} @ {{ project.where }}</span>
            <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="release-button" aria-label="View project, opens in new window">VIEW</a>
          </div>
        </div>
      </div>
    </section>

    <section v-if="releases.releases.length" class="mt-20 sm:mt-24">
      <h2 class="project-category">RELEASES</h2>
      <div class="space-y-4">
        <div v-for="(release, index) in releases.releases" :key="index" class="py-4">
          <!-- Mobile -->
          <div class="flex flex-col gap-1 sm:hidden">
            <span class="text-sm uppercase tracking-wide text-gray-600 font-semibold">{{ release.releaseDate.slice(0, 4) }}</span>
            <div class="flex items-center justify-between gap-4">
              <span class="text-base text-gray-900 font-medium tracking-wide">{{ release.artist }} - {{ release.title }}</span>
              <a v-if="release.bandcamp_link" :href="release.bandcamp_link" target="_blank" rel="noopener noreferrer" class="release-button" aria-label="Listen to release, opens in new window">LISTEN</a>
            </div>
            <span class="text-sm text-gray-600 font-medium">{{ release.label }}</span>
            <p class="text-sm text-gray-900 leading-relaxed mt-1">{{ release.description }}</p>
          </div>
          <!-- Desktop -->
          <div class="hidden sm:block">
            <div class="flex relative items-center gap-4">
              <span class="text-sm uppercase tracking-wide text-gray-600 font-semibold whitespace-nowrap w-24">{{ release.releaseDate.slice(0, 4) }}</span>
              <div class="absolute top-0 bottom-0 bg-black" style="width: 1px; left: 100px;"></div>
              <span class="text-base text-gray-900 font-medium tracking-wide flex-1 pl-6">{{ release.artist }} - {{ release.title }}</span>
              <span class="text-sm uppercase tracking-wide text-gray-600 font-medium whitespace-nowrap">{{ release.label }}</span>
              <a v-if="release.bandcamp_link" :href="release.bandcamp_link" target="_blank" rel="noopener noreferrer" class="release-button" aria-label="Listen to release, opens in new window">LISTEN</a>
            </div>
            <p class="text-sm text-gray-900 leading-relaxed mt-2 ml-[136px]">{{ release.description }}</p>
          </div>
        </div>
      </div>
    </section>
    </div>
    <!-- End Content -->

  </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

// state ─────────────────────────────────────────────
const resume = reactive({
  name: '',
  title: '',
  email: '',
  linkedIn: '',
  gitHub: '',
  profile: '',
  artistBio: '',
  artisticApproach: '',
  selectedWorks: [],
  collaborations: []
})

const releases = reactive({ releases: [] })
const isLoading = ref(true)
const error = ref(null)

// methods ───────────────────────────────────────────
async function fetchContent () {
  try {
    const res = await fetch('/api/v1/info')
    if (!res.ok) throw new Error('Failed to fetch profile info')
    const data = await res.json()
    Object.assign(resume, data)
  } catch (err) {
    error.value = err.message
    console.error('Error fetching resume content:', err)
  }
}

async function fetchReleases () {
  try {
    const res = await fetch('/api/v1/releases')
    if (!res.ok) throw new Error('Failed to fetch releases')
    const data = await res.json()
    Object.assign(releases, { releases: data })
  } catch (err) {
    error.value = err.message
    console.error('Error fetching releases:', err)
  }
}

async function fetchAllData() {
  isLoading.value = true
  error.value = null
  await Promise.all([fetchContent(), fetchReleases()])
  isLoading.value = false
}

// lifecycle ─────────────────────────────────────────
onMounted(fetchAllData)
</script>
