<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import info from '@/data/info.json';
import releasesData from '@/data/releases.json';
import diataxis800 from '@/assets/images/works/diataxis-800.webp';
import diataxis1600 from '@/assets/images/works/diataxis-1600.webp';
import decPdc800 from '@/assets/images/works/dec-pdc-800.webp';
import decPdc1600 from '@/assets/images/works/dec-pdc-1600.webp';
import nsa800 from '@/assets/images/works/nsa-trusted-networks-800.webp';
import nsa1600 from '@/assets/images/works/nsa-trusted-networks-1600.webp';
import superluminal800 from '@/assets/images/works/superluminal-motion-800.webp';
import superluminal1600 from '@/assets/images/works/superluminal-motion-1600.webp';
import { buildWorks } from '@/lib/works';
import ActionLink from '@/components/ActionLink.vue';
import SectionLabel from '@/components/SectionLabel.vue';
import WorkRow from '@/components/WorkRow.vue';
import BandcampPlayer from '@/components/BandcampPlayer.vue';
import SoundCloudPlayer from '@/components/SoundCloudPlayer.vue';

// Plain const, not computed — both JSON imports are static and non-reactive.
const { works, collaborations } = buildWorks(info, releasesData);

// The rows that are open. Any number at once; a link to one work (/works#diataxis)
// opens that row, on load and whenever the hash changes, and App.vue lands on it.
const route = useRoute();
const openRows = reactive(new Set());
watch(
  () => route.hash,
  (hash) => {
    const id = hash?.slice(1);
    if (id && works.some((work) => work.id === id)) openRows.add(id);
  },
  { immediate: true },
);

// The row whose player (Bandcamp for a release, SoundCloud for a work) is open, if
// any. One at a time: opening another closes the first, which unmounts its frame and
// stops it playing. Closing a row closes its player too, so nothing plays unseen.
const openPlayer = ref(null);
const togglePlayer = (id) => (openPlayer.value = openPlayer.value === id ? null : id);
function toggleRow(id) {
  if (!openRows.has(id)) {
    openRows.add(id);
    return;
  }
  openRows.delete(id);
  if (openPlayer.value === id) openPlayer.value = null;
}

// The Listen toggle's arrow, after its label as Buy's ↗ is after its: ↘ while closed
// (the player opens here, below) and ↖ while open, each nudged its way on hover as ↗
// is. Full class strings, so Tailwind sees them.
const LISTEN_ARROW = "after:content-['_↘'] hover:after:translate-x-0.5 hover:after:translate-y-0.5";
const CLOSE_ARROW =
  "after:content-['_↖'] hover:after:-translate-x-0.5 hover:after:-translate-y-0.5";

// One image per work, keyed by its id (its link anchor), on the right of the open row
// (above its text on a phone). The releases' are the records: Diataxis's a render of
// the record and its sleeve, DEC/PDC's the real sleeve and label flattened onto a clear
// 7″, NSA's the two sides' labels. Superluminal Motion's is the plot of measured jet
// speeds it starts from, in its own proportions. Registry, not a glob, so the set is
// explicit. Two widths, WebP at quality 90: an image shows at most 480px wide (960px
// on a 2x screen) and full width on a phone, so 1600w covers a 2x screen and 800w the
// rest. width/height are the 1600w's, for the space the image keeps before it loads.
const image = (small, large, alt, width = 1600, height = 1200) => ({
  src: large,
  srcset: `${small} 800w, ${large} 1600w`,
  alt,
  width,
  height,
});
const COVERS = {
  diataxis: image(diataxis800, diataxis1600, 'Diataxis: the record with the front of its sleeve'),
  'dec-pdc': image(
    decPdc800,
    decPdc1600,
    'DEC/PDC: the clear 7″ record with its label, half out of its white sleeve',
  ),
  'nsa-trusted-networks': image(
    nsa800,
    nsa1600,
    'NSA Trusted Networks: side A and side B labels on black 12″ vinyl',
  ),
  'superluminal-motion': image(
    superluminal800,
    superluminal1600,
    'Superluminal Motion: a plot of the apparent jet speeds of radio galaxies, BL Lacs and quasars, from below 0.001 c to above 10 c, against their 15 GHz VLBA luminosity',
    1600,
    1108,
  ),
};

// A key that matches no row would leave that image unshown, silently. Surface it in
// dev (stripped from the production build), as WorkRow does for an unknown body.
if (import.meta.env.DEV) {
  const ids = new Set(works.map((work) => work.id));
  for (const id of Object.keys(COVERS)) {
    if (!ids.has(id)) console.warn(`[WorksView] Cover "${id}" matches no row — nothing shows it.`);
  }
}
</script>

<template>
  <h1 class="sr-only">Works</h1>

  <!-- One list: the releases, then the selected works. No visible label; the heading
       stays for screen readers. role="list": Preflight's list-style:none makes
       Safari/VoiceOver stop exposing a <ul> as a list, dropping the item count. -->
  <section v-reveal class="mb-section">
    <h2 class="sr-only">Releases and selected works</h2>
    <ul role="list">
      <WorkRow
        v-for="item in works"
        :key="item.id"
        :anchor="item.id"
        :year="item.year"
        :title="item.title"
        :meta="item.meta"
        :desc="item.desc"
        :terms="info.emphasis"
        :body="item.body"
        :open="openRows.has(item.id)"
        @toggle="toggleRow(item.id)"
      >
        <template v-if="COVERS[item.id]" #media>
          <img
            v-bind="COVERS[item.id]"
            sizes="(max-width: 759px) calc(100vw - 36px), 480px"
            loading="lazy"
            decoding="async"
            class="max-w-figure ml-auto block h-auto w-full max-md:ml-0"
          />
        </template>

        <!-- A release: LISTEN ↘ · BUY ↗. A work: LISTEN ↘ alone, its player linking to
             the set itself. Listen opens the player under the text and reads Close
             while it is open. aria-controls only while the player exists: it must name
             an element that is in the page. A <button> doesn't inherit text-transform,
             so it sets uppercase itself. -->
        <template #actions>
          <button
            v-if="item.player"
            type="button"
            class="action-link cursor-pointer"
            :class="openPlayer === item.id ? CLOSE_ARROW : LISTEN_ARROW"
            :aria-expanded="openPlayer === item.id ? 'true' : 'false'"
            :aria-controls="openPlayer === item.id ? `player-${item.id}` : null"
            :aria-label="`${openPlayer === item.id ? 'Close the player for' : 'Listen to'} ${item.title}`"
            @click="togglePlayer(item.id)"
          >
            {{ openPlayer === item.id ? 'Close' : 'Listen' }}
          </button>
          <ActionLink
            v-if="item.kind === 'release' && item.link"
            :href="item.link"
            :aria-label="`Buy ${item.title}`"
          >
            Buy
          </ActionLink>
          <ActionLink
            v-else-if="!item.player && item.link"
            :href="item.link"
            :aria-label="`Listen to ${item.title}`"
          >
            Listen
          </ActionLink>
        </template>

        <template v-if="item.player && openPlayer === item.id" #player>
          <BandcampPlayer
            v-if="item.player.kind === 'bandcamp'"
            :id="`player-${item.id}`"
            :album="item.player.id"
            :title="item.title"
            :height="item.player.height"
            :href="item.link"
            class="mt-[26px]"
          />
          <SoundCloudPlayer
            v-else-if="item.player.kind === 'soundcloud'"
            :id="`player-${item.id}`"
            :url="item.player.url"
            :title="item.title"
            :height="item.player.height"
            :href="item.link"
            class="mt-[26px]"
          />
        </template>
      </WorkRow>
    </ul>
  </section>

  <!-- Collaborations keeps its label, as these rows are other people's work. Each is
       one line, the title at the page edge under the label, then "TYPE, WHERE, YEAR", and
       VIEW ↗ at the right. -->
  <section v-reveal class="mb-section">
    <SectionLabel class="px-edge">Collaborations</SectionLabel>
    <ul role="list">
      <li
        v-for="collab in collaborations"
        :key="collab.year + '-' + collab.title"
        class="mx-edge group flex flex-wrap items-baseline gap-x-[18px] gap-y-1 py-4 max-md:py-3.5"
      >
        <span class="mono-title group-hover:text-link transition-colors duration-200">
          {{ collab.title }}
        </span>
        <span class="mono-meta">
          {{ [collab.type, collab.where, collab.year].filter(Boolean).join(', ') }}
        </span>
        <span v-if="collab.link" class="ml-auto">
          <ActionLink :href="collab.link" :aria-label="`View ${collab.title}`">View</ActionLink>
        </span>
      </li>
    </ul>
  </section>
</template>
