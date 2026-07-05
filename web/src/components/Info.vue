<template>
  <main class="stage">
    <h1 class="sr-only">Ioannis Savvaidis — composer</h1>
    <section class="content">
      <div class="info-top">
        <!-- Left: Profile + Artistic approach -->
        <div class="info-top-text">
          <div v-reveal class="section" id="info">
            <div class="section-head"><h2 class="section-label">Profile</h2></div>
            <div class="section-body">
              <div class="prose"><p>{{ info.profile }}</p></div>
            </div>
          </div>

          <div v-reveal class="section">
            <div class="section-head"><h2 class="section-label">Artistic approach</h2></div>
            <div class="section-body">
              <div class="prose">
                <p v-for="(paragraph, i) in approachParagraphs" :key="i">
                  <template v-for="(segment, j) in paragraph" :key="j">
                    <span v-if="segment.term" class="term">{{ segment.text }}</span>
                    <template v-else>{{ segment.text }}</template>
                  </template>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: portrait + Contact (sticky) -->
        <div class="info-side">
          <figure class="info-photo">
            <img
              :src="portrait"
              alt="Ioannis Savvaidis performing live with synthesizers"
              width="753"
              height="565"
              decoding="async"
            />
          </figure>

          <div v-reveal class="section info-contact" id="contact">
            <div class="section-head"><h2 class="section-label">Contact</h2></div>
            <div class="section-body">
              <div class="contact">
                <a class="contact-email" :href="'mailto:' + info.email">{{ info.email }}</a>
                <div class="contact-row">
                  <a v-if="info.bandcamp" :href="info.bandcamp" target="_blank" rel="noopener">Bandcamp</a>
                  <a v-if="info.soundcloud" :href="info.soundcloud" target="_blank" rel="noopener">SoundCloud</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import info from '@/data/info.json';
import portrait from '@/assets/images/live-portrait.jpg';
import { splitTerms } from '@/lib/terms';

// Each approach paragraph is split so the phrases in `artisticApproachTerms`
// render as IBM Plex Serif italic inline.
const approachParagraphs = computed(() =>
  (info.artisticApproach || []).map((p) => splitTerms(p, info.artisticApproachTerms)),
);
</script>
