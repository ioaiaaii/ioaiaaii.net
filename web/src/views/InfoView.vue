<script setup>
import info from '@/data/info.json';
import portrait from '@/assets/images/info/portrait.jpg';
import { splitTerms } from '@/lib/terms';
import ActionLink from '@/components/ActionLink.vue';
import SectionLabel from '@/components/SectionLabel.vue';
import TextLink from '@/components/TextLink.vue';

// The profile and the approach paragraphs read as one block and share the same
// emphasis terms, so split them together: phrases in `emphasis` render as
// Newsreader italic inline. The profile used to render raw, which meant any term
// living in it could never italicise.
// Plain const, not computed: `info` is a static JSON import and is not reactive,
// so a computed here would have no dependencies to track — it would evaluate once
// and cache forever, while implying it recomputes.
const paragraphs = [info.profile, ...(info.artisticApproach || [])]
  .filter(Boolean)
  .map((p) => splitTerms(p, info.emphasis));

// Bandcamp/SoundCloud are the composer identity; `ioaiaaii` is a deliberate
// cross-link to the engineer identity (the SRE blog) — see _comment_identity.
const socials = [
  { label: 'Bandcamp', href: info.bandcamp },
  { label: 'SoundCloud', href: info.soundcloud },
  { label: 'ioaiaaii', href: info.engineeringBlog },
].filter((s) => s.href);
</script>

<template>
  <h1 class="sr-only">Ioannis Savvaidis — composer</h1>

  <!-- Text | side column. Set in the prose font, so the text column is the prose
       measure (66ch); the side column takes the rest, at least 260px. The text starts
       where the works' titles do (pl-indent). On a phone, one column: the portrait,
       the profile, then contact. -->
  <div
    class="mx-edge pl-indent gap-x-column text-body grid grid-cols-[minmax(0,var(--container-measure))_minmax(260px,1fr)] items-start pt-4 font-serif max-md:grid-cols-1"
  >
    <!-- Left: profile + artistic approach. Its label is for screen readers only. -->
    <div v-reveal>
      <SectionLabel class="sr-only">Profile</SectionLabel>
      <p v-for="(paragraph, i) in paragraphs" :key="i" class="prose mb-paragraph">
        <template v-for="(segment, j) in paragraph" :key="j">
          <span v-if="segment.term" class="italic">{{ segment.text }}</span>
          <template v-else>{{ segment.text }}</template>
        </template>
      </p>
    </div>

    <!-- Right: portrait, then contact, sticky. On a phone the column dissolves
         (`contents`) so its two children order independently in the page grid:
         portrait first, the profile, then contact last. No caption. -->
    <div class="top-sticky contents md:sticky md:flex md:flex-col md:gap-9">
      <figure class="order-first max-md:mb-10 md:order-none">
        <img
          :src="portrait"
          alt="Ioannis Savvaidis performing live with synthesizers"
          width="753"
          height="565"
          decoding="async"
          class="max-w-figure block h-auto w-full md:ml-auto"
        />
      </figure>

      <div v-reveal class="max-w-figure flex w-full flex-col gap-3.5 max-md:mt-10 md:ml-auto">
        <SectionLabel :spaced="false">Contact</SectionLabel>
        <TextLink :href="'mailto:' + info.email">{{ info.email }}</TextLink>
        <div class="flex flex-wrap gap-x-[26px] gap-y-3">
          <ActionLink v-for="social in socials" :key="social.label" :href="social.href">
            {{ social.label }}
          </ActionLink>
        </div>
      </div>
    </div>
  </div>
</template>
