<script setup>
import { computed } from 'vue';
import { splitTerms } from '@/lib/terms';
import SuperluminalMotionBody from '@/components/SuperluminalMotionBody.vue';

// A work whose description is richer than a string (prose + typeset maths) supplies
// its own body component here instead of `desc`. Registry, not a dynamic import, so
// the set is explicit and tree-shakeable.
const BODY_COMPONENTS = {
  'superluminal-motion': SuperluminalMotionBody,
};

// One Works row, a + disclosure. Closed, it is one line: the + sign, the title, then
// "META, YEAR" (a release's label, a work's "Unreleased": "JUNE RECORDS, 2019"). The
// line is a button that opens the row's body: its description (or rich body), its actions and, once Listen
// is pressed, its player on the left, and its image on the right. The parent owns
// which rows are open (`open`) and hears `toggle`, so it can open the row a link names
// and close a row's player with it.
const props = defineProps({
  // The row's link anchor (/works#diataxis): its id, and the base of its body's id.
  anchor: { type: String, required: true },
  year: { type: String, required: true },
  title: { type: String, required: true },
  meta: { type: String, default: null },
  desc: { type: String, default: null },
  // Phrases to italicise in `desc`: the same site-wide list Info uses.
  terms: { type: Array, default: () => [] },
  // A key into BODY_COMPONENTS, for works with a rich body instead of a plain desc.
  body: { type: String, default: null },
  open: { type: Boolean, default: false },
});

defineEmits(['toggle']);

const bodyComponent = computed(() => (props.body ? (BODY_COMPONENTS[props.body] ?? null) : null));

// A `body` key with no registered component would render nothing, silently. Surface
// it in dev (stripped from the production build) so a typo in the data is caught.
if (import.meta.env.DEV && props.body && !BODY_COMPONENTS[props.body]) {
  console.warn(
    `[WorkRow] Unknown body "${props.body}" — nothing renders. Known: ${Object.keys(BODY_COMPONENTS).join(', ')}.`,
  );
}

const descSegments = computed(() => (props.desc ? splitTerms(props.desc, props.terms) : []));
const metaLine = computed(() => [props.meta, props.year].filter(Boolean).join(', '));
const bodyId = computed(() => `${props.anchor}-body`);

// Greek drops its accents when uppercased — Δέσμη Φωτός sets as ΔΕΣΜΗ ΦΩΤΟΣ. The
// browser only applies that rule when it knows the text is Greek; under the page's
// lang="en" it uppercases per default Unicode mapping and keeps them (ΔΈΣΜΗ ΦΩΤΌΣ),
// which reads as misspelt. Titles are uppercased in CSS, so the source string keeps
// its accents and only the rendering needs the hint. It also stops a screen reader
// from reading Greek as if it were English.
const titleLang = computed(() => (/[Ͱ-Ͽ]/.test(props.title) ? 'el' : null));
</script>

<template>
  <!-- <li>, not <article>: a row is an item in a list; the <ul> in Works gives a screen
       reader the count. A linked row scrolls in by <main>'s --anchor-offset (App.vue),
       so it lands at the top of the screen, like a heading link. -->
  <li :id="anchor" class="mx-edge scroll-mt-(--anchor-offset)">
    <!-- The head. The title is link blue, so the row reads as clickable; the + turns 90° on hover, 45°
         (an ×) when open, and 135° on hover when open. The + keeps its own column, so
         when a long title pushes "META, YEAR" onto a second line (on a phone), that
         line starts under the title, not under the +. The title starts 31px in: the
         11px sign and a 20px gap (--spacing-indent). -->
    <button
      type="button"
      class="group flex w-full cursor-pointer items-start gap-x-5 py-4 text-left max-md:py-3.5"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-controls="bodyId"
      @click="$emit('toggle')"
    >
      <!-- The + sign: two 1px bars, centred on the title's first line (its box is one
           title line tall). -->
      <span
        aria-hidden="true"
        class="flex h-[calc(var(--text-row)*var(--leading-title))] flex-none items-center"
      >
        <span
          class="text-link ease-soft relative size-[11px] transition-transform duration-400 before:absolute before:top-1/2 before:left-1/2 before:h-px before:w-[11px] before:-translate-1/2 before:bg-current before:content-[''] after:absolute after:top-1/2 after:left-1/2 after:h-[11px] after:w-px after:-translate-1/2 after:bg-current after:content-[''] motion-reduce:transition-none"
          :class="open ? 'rotate-45 group-hover:rotate-[135deg]' : 'group-hover:rotate-90'"
        />
      </span>
      <span class="flex min-w-0 flex-wrap items-baseline gap-x-[18px] gap-y-1">
        <span :lang="titleLang" class="mono-title text-link min-w-0">
          {{ title }}
        </span>
        <span class="mono-meta">{{ metaLine }}</span>
      </span>
    </button>

    <!-- The body opens by its grid row, 0fr → 1fr, and its content fades in a moment
         after, rising 6px. Closed, it is inert: out of the tab order and hidden from
         screen readers, and its lazy image isn't fetched. -->
    <div
      :id="bodyId"
      class="ease-soft grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none"
      :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      :inert="open ? null : true"
    >
      <div class="min-h-0 overflow-hidden">
        <!-- Text | image. Set in the prose font, so the text column is the prose
             measure (66ch); the image column takes the rest, at least 240px, so on a
             narrower window the text gives way first. The text starts after the + sign
             (pl-indent). On a phone, one column, the image first, no indent. -->
        <div
          class="gap-x-column pl-indent text-body grid grid-cols-[minmax(0,var(--container-measure))_minmax(240px,1fr)] pt-2.5 pb-12 font-serif [transition:opacity_400ms_ease,translate_500ms_var(--ease-soft)] max-md:grid-cols-1 max-md:pb-10 motion-reduce:transition-none"
          :class="
            open
              ? 'translate-y-0 opacity-100 [transition-delay:80ms]'
              : '-translate-y-1.5 opacity-0'
          "
        >
          <div class="min-w-0">
            <p v-if="desc" class="prose">
              <template v-for="(segment, i) in descSegments" :key="i">
                <span v-if="segment.term" class="italic">{{ segment.text }}</span>
                <template v-else>{{ segment.text }}</template>
              </template>
            </p>
            <component :is="bodyComponent" v-else-if="bodyComponent" />

            <div v-if="$slots.actions" class="mt-[30px] flex flex-wrap gap-x-[26px] gap-y-3">
              <slot name="actions" />
            </div>

            <slot name="player" />
          </div>

          <div v-if="$slots.media" class="min-w-0 max-md:order-first max-md:mb-6">
            <slot name="media" />
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
