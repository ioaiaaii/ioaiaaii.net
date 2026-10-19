<script setup>
import live from '@/data/live.json';
import ActionLink from '@/components/ActionLink.vue';

// The date as "DD.MM.YYYY" ("16.04.2026"), first on its row. Monospace and zero-padded,
// so every date is the same width, even one written "2021-12-3", and the event names
// line up after them. Split "YYYY-MM-DD" by hand
// rather than `new Date(str)`, which reads it as UTC midnight and shifts the day one
// back in negative-offset zones — an Apr 16 gig would show as Apr 15 in the Americas.
const pad = (n) => String(n).padStart(2, '0');
const performances = (live.performances || []).map((p) => {
  const [y, m, d] = String(p.date).split('-');
  return { ...p, when: `${pad(d)}.${pad(m)}.${y}` };
});
</script>

<template>
  <h1 class="sr-only">Live</h1>

  <!-- Date, the event, then INFO ↗ / LISTEN ↗ at the right edge, as Collaborations'
       VIEW ↗ is, newest first, all in one style. The dates start at the page edge, and
       are all one width, so the events line up. When the links don't
       fit beside the event (a long name, a phone), they wrap onto a line of their own,
       still at the right, so the name keeps the column's full width. The list's heading
       is for screen readers only. role="list": see WorksView. -->
  <section v-reveal class="mx-edge">
    <h2 class="sr-only">Performances</h2>
    <ul role="list">
      <li
        v-for="performance in performances"
        :key="performance.date + '-' + performance.title"
        class="grid grid-cols-[max-content_minmax(0,1fr)] items-baseline gap-x-[18px] py-4 max-md:py-3.5"
      >
        <span class="mono-meta">{{ performance.when }}</span>
        <span class="flex min-w-0 flex-wrap items-baseline gap-x-[18px] gap-y-1">
          <span class="mono-title text-ink">{{ performance.title }}</span>
          <span
            v-if="performance.event_link || performance.listen_link"
            class="ml-auto flex gap-[18px]"
          >
            <ActionLink
              v-if="performance.event_link"
              :href="performance.event_link"
              :aria-label="`Info about ${performance.title}`"
            >
              Info
            </ActionLink>
            <ActionLink
              v-if="performance.listen_link"
              :href="performance.listen_link"
              :aria-label="`Listen to ${performance.title}`"
            >
              Listen
            </ActionLink>
          </span>
        </span>
      </li>
    </ul>
  </section>
</template>
