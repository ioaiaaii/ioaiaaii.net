<script setup>
import live from '@/data/live.json';
import ActionLink from '@/components/ActionLink.vue';
import WorkRow from '@/components/WorkRow.vue';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Split "YYYY-MM-DD" by hand rather than `new Date(str)`, which reads it as UTC
// midnight and shifts the day one back in negative-offset zones — an Apr 16 gig
// would show as Apr 15 in the Americas. MONTHS is fixed so the label is "Apr" for
// every visitor, not locale-dependent. year is stringified for WorkRow's String prop.
const performances = (live.performances || []).map((p) => {
  const [y, m, d] = String(p.date).split('-').map(Number);
  return { ...p, year: String(y), meta: `${String(d).padStart(2, '0')} ${MONTHS[m - 1]}` };
});
</script>

<template>
  <h1 class="sr-only">Live performances</h1>

  <!-- reveal the list as one block, like Works reveals each section. It goes on
       the <ul>, not on WorkRow: the row carries a hover-colour transition, and two
       transitions on one element don't merge (one wins, dropping the fade). The
       <ul> has no such transition, so the reveal plays — and WorkRow stays a plain
       shared component with no animation knowledge. -->
  <ul v-reveal class="flex list-none flex-col p-0">
    <WorkRow
      v-for="performance in performances"
      :key="performance.date + '-' + performance.title"
      dense
      :year="performance.year"
      :title="performance.title"
      :meta="performance.meta"
    >
      <template #links>
        <span v-if="performance.event_link || performance.listen_link" class="flex gap-3.5">
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
      </template>
    </WorkRow>
  </ul>
</template>
