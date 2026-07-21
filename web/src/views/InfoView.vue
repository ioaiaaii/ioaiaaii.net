<script setup>
import info from '@/data/info.json';
import portrait from '@/assets/images/live-portrait.jpg';
import { splitTerms } from '@/lib/terms';
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

  <div class="px-edge gap-column-stacked md:gap-column md:grid-cols-page grid items-start">
    <!-- Left: profile + artistic approach -->
    <div class="gap-stack flex flex-col">
      <div v-reveal>
        <SectionLabel>Profile</SectionLabel>
        <p
          v-for="(paragraph, i) in paragraphs"
          :key="i"
          class="text-body leading-prose mb-paragraph max-w-measure text-justify font-serif
                 tracking-normal hyphens-auto last:mb-0"
        >
          <template v-for="(segment, j) in paragraph" :key="j">
            <span v-if="segment.term" class="italic">{{ segment.text }}</span>
            <template v-else>{{ segment.text }}</template>
          </template>
        </p>
      </div>
    </div>

    <!-- Right: portrait + contact, sticky once two-column -->
    <div class="gap-aside md:top-sticky order-first flex flex-col md:sticky md:order-none">
      <figure class="m-0">
        <img
          :src="portrait"
          alt="Ioannis Savvaidis performing live with synthesizers"
          width="753"
          height="565"
          decoding="async"
          class="block h-auto w-full [filter:grayscale(0.15)_contrast(1.02)]"
        />
      </figure>

      <div v-reveal>
        <SectionLabel>Contact</SectionLabel>

        <TextLink :href="'mailto:' + info.email">{{ info.email }}</TextLink>

        <div class="mt-[clamp(8px,1vw,12px)] flex flex-wrap gap-x-3 gap-y-2">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener"
            class="text-ink-soft text-social tracking-meta hover:text-link after:text-link
                   font-mono uppercase no-underline transition-colors duration-160
                   after:ml-[0.4em] after:text-[0.83em] after:opacity-55
                   after:transition-opacity after:duration-160 after:content-['↗']
                   hover:after:opacity-100"
          >
            {{ social.label }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
