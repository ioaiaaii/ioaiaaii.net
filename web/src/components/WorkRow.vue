<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { splitTerms } from '@/lib/terms';
import SuperluminalMotionBody from '@/components/SuperluminalMotionBody.vue';

// A work whose description is richer than a string (prose + typeset maths) supplies
// its own body component here instead of `desc`. Registry, not a dynamic import, so
// the set is explicit and tree-shakeable.
const BODY_COMPONENTS = {
  'superluminal-motion': SuperluminalMotionBody,
};

// One ledger row, shared by Works and Live.
// `dense` is the Live variant: the same year track and column gap as Works (so the
// titles line up across pages), its own wide tracks, tighter rows, a smaller
// non-uppercase title, no description.
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
  // The row's link anchor (/works#diataxis). Set, the row takes it as its id and its
  // title links to it, so clicking the title, or anywhere in the row, puts that work's
  // link in the address bar.
  anchor: { type: String, default: null },
});

const bodyComponent = computed(() => (props.body ? (BODY_COMPONENTS[props.body] ?? null) : null));

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

// The row's link, and whether the current URL points at it: that row is tinted and
// its title marked aria-current, so a visitor arriving from a shared link sees which
// work it meant.
const route = useRoute();
const router = useRouter();
const to = computed(() => ({ hash: `#${props.anchor}` }));
const current = computed(() => !!props.anchor && route.hash === to.value.hash);

// The whole row is a click target for its link, as a mouse convenience; the title
// stays the real link for keyboard and screen readers. Clicks on the row's own links
// (the title, Buy/Listen), modified clicks, and a click that ends a text selection are
// left alone, so those still work and a visitor can select part of a description.
function onRowClick(event) {
  if (event.target.closest('a')) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (window.getSelection()?.toString()) return;
  router.push(to.value);
}
</script>

<template>
  <!-- <li>, not <article>: a ledger row is an item in a list, not independently
       distributable content. The <ul> in Works/Live gives a screen reader the
       count and item-by-item navigation. -->
  <!-- The hover tint bleeds past the text: to the screen edges on phones, and a fixed
       16px either side from `md` up. The row's own padding cancels the negative
       margin, so the text never moves. -->
  <!-- An anchored row scrolls in by <main>'s --anchor-offset (set in App.vue), so a
       linked work lands at the top of the screen, like a heading link, as the
       header slides away.
       Only an anchored row gets the click listener: a listener on Live and
       Collaborations rows would have screen readers announce them as clickable. -->
  <li
    :id="anchor"
    v-on="anchor ? { click: onRowClick } : {}"
    class="hover:bg-row-hover -mx-edge px-edge grid-cols-work-stack gap-x-row grid items-baseline transition-colors duration-200 md:-mx-4 md:px-4"
    :class="[
      dense
        ? 'gap-y-1 py-[18px] lg:grid-cols-work-dense lg:gap-y-0'
        : 'gap-y-2.5 py-[26px] lg:grid-cols-work-narrow',
      { 'scroll-mt-(--anchor-offset) cursor-pointer': anchor, 'bg-row-hover': current },
    ]"
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
          ? 'text-meta tracking-meta leading-dense font-normal'
          : 'text-title tracking-title leading-title font-medium uppercase'
      "
    >
      <!-- RouterLink marks every title aria-current="page": its active check ignores the
           hash, and every title links to /works. Overridden so only the row the URL
           points at is marked, as the current location within the page. -->
      <RouterLink
        v-if="anchor"
        :to="to"
        :aria-current="current ? 'location' : null"
        class="hover:text-link transition-colors duration-200"
      >
        {{ title }}
      </RouterLink>
      <template v-else>{{ title }}</template>
    </div>

    <!-- Runs from the title column through the links column to the row's end, on its
         own line. Year/title/links are a header; the description is prose and wants
         the full measure, which it cannot reach boxed into the title's column. It
         precedes the links in the DOM so it claims the row under the title — the
         links then explicitly return to row 1 once the third column exists. -->
    <p v-if="desc" class="prose col-start-2 col-end-[-1]">
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
      class="text-ink-soft text-meta tracking-meta col-start-2 col-end-[-1] flex items-baseline font-mono uppercase lg:col-start-3 lg:col-end-auto lg:row-start-1"
      :class="dense ? 'gap-side-dense' : 'gap-side pt-px'"
    >
      <span v-if="meta" class="text-muted" :class="dense ? 'min-w-[52px]' : ''">{{ meta }}</span>
      <slot name="links" />
    </div>
  </li>
</template>
