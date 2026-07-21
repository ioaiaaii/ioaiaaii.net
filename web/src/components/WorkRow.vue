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

// One ledger row, shared by Works and Live.
// `dense` is the Live variant: tighter grid, smaller non-uppercase title, no description.
const props = defineProps({
  year: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, default: null },
  meta: { type: String, default: null },
  dense: { type: Boolean, default: false },
  // Phrases to italicise in `desc` — the same site-wide list Info uses. Empty for
  // Live, which has no descriptions.
  terms: { type: Array, default: () => [] },
  // A key into BODY_COMPONENTS, for works with a rich body instead of a plain desc.
  body: { type: String, default: null },
});

const bodyComponent = computed(() => (props.body ? BODY_COMPONENTS[props.body] ?? null : null));

// A `body` key with no registered component would render nothing, silently. Surface
// it in dev (stripped from the production build) so a typo in the data is caught.
if (import.meta.env.DEV && props.body && !BODY_COMPONENTS[props.body]) {
  console.warn(
    `[WorkRow] Unknown body "${props.body}" — nothing renders. Known: ${Object.keys(BODY_COMPONENTS).join(', ')}.`,
  );
}

const descSegments = computed(() => (props.desc ? splitTerms(props.desc, props.terms) : []));

// Greek drops its accents when uppercased — Δέσμη Φωτός sets as ΔΕΣΜΗ ΦΩΤΟΣ. The
// browser only applies that rule when it knows the text is Greek; under the page's
// lang="en" it uppercases per default Unicode mapping and keeps them (ΔΈΣΜΗ ΦΩΤΌΣ),
// which reads as misspelt. Titles are uppercased in CSS, so the source string keeps
// its accents and only the rendering needs the hint. It also stops a screen reader
// from reading Greek as if it were English.
const titleLang = computed(() => (/[Ͱ-Ͽ]/.test(props.title) ? 'el' : null));
</script>

<template>
  <!-- <li>, not <article>: a ledger row is an item in a list, not independently
       distributable content. The <ul> in Works/Live gives a screen reader the
       count and item-by-item navigation. -->
  <li
    class="hover:bg-row-hover grid items-baseline transition-colors duration-200"
    :class="
      dense
        ? 'grid-cols-work-stack-dense px-edge gap-x-[18px] gap-y-1 py-[18px] lg:grid-cols-work-dense lg:gap-x-row-dense lg:gap-y-0'
        : 'grid-cols-work-stack gap-x-5 gap-y-2.5 py-[26px] lg:grid-cols-work-narrow lg:gap-x-row'
    "
  >
    <div
      class="text-ink-soft text-meta tracking-meta font-mono uppercase"
      :class="{ 'pt-px': !dense }"
    >
      {{ year }}
    </div>

    <div
      :lang="titleLang"
      class="min-w-0 font-mono"
      :class="
        dense
          ? 'text-ink text-meta tracking-meta leading-dense font-normal'
          : 'text-title tracking-title leading-title font-medium uppercase'
      "
    >
      {{ title }}
    </div>

    <!-- Runs from the title column through the links column to the row's end, on its
         own line. Year/title/links are a header; the description is prose and wants
         the full measure, which it cannot reach boxed into the title's column. It
         precedes the links in the DOM so it claims the row under the title — the
         links then explicitly return to row 1 once the third column exists. -->
    <p
      v-if="desc"
      class="text-ink text-body leading-prose col-start-2 col-end-[-1] m-0 max-w-measure
             text-justify font-serif hyphens-auto"
    >
      <template v-for="(segment, i) in descSegments" :key="i">
        <span v-if="segment.term" class="italic">{{ segment.text }}</span>
        <template v-else>{{ segment.text }}</template>
      </template>
    </p>

    <!-- Rich body (prose + typeset maths) in the description's slot, for the one work
         that needs it. Never in the dense (Live) variant. -->
    <component
      :is="bodyComponent"
      v-if="bodyComponent && !dense"
      class="col-start-2 col-end-[-1]"
    />

    <div
      class="text-ink-soft text-meta tracking-meta col-start-2 col-end-[-1] flex items-baseline
             font-mono uppercase lg:col-start-3 lg:col-end-auto lg:row-start-1"
      :class="dense ? 'gap-side-dense' : 'gap-side pt-px'"
    >
      <span v-if="meta" class="text-muted" :class="dense ? 'min-w-[52px]' : ''">{{ meta }}</span>
      <slot name="links" />
    </div>
  </li>
</template>
