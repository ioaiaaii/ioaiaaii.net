<script setup>
import info from '@/data/info.json';
import releasesData from '@/data/releases.json';
import studio from '@/assets/images/studio.webp';
import { buildSections } from '@/lib/works';
import ActionLink from '@/components/ActionLink.vue';
import SectionLabel from '@/components/SectionLabel.vue';
import WorkRow from '@/components/WorkRow.vue';

// Plain const, not computed — both JSON imports are static and non-reactive.
const sections = buildSections(info, releasesData);
</script>

<template>
  <h1 class="sr-only">Works — releases, selected works and collaborations</h1>

  <div class="px-edge gap-column-stacked md:gap-column md:grid-cols-page-ledger grid items-start">
    <!-- Left: the works sections -->
    <div class="gap-section flex min-w-0 flex-col">
      <div v-for="section in sections" :key="section.label" v-reveal>
        <SectionLabel>{{ section.label }}</SectionLabel>

        <ul class="flex min-w-0 list-none flex-col p-0">
          <WorkRow
            v-for="item in section.items"
            :key="item.year + '-' + item.title"
            :year="item.year"
            :title="item.title"
            :desc="item.desc"
            :meta="item.meta"
            :terms="info.emphasis"
            :body="item.body"
          >
            <template #links>
              <ActionLink
                v-if="item.link"
                :href="item.link"
                :aria-label="`${section.action} ${item.title}`"
              >
                {{ section.action }}
              </ActionLink>
            </template>
          </WorkRow>
        </ul>
      </div>
    </div>

    <!-- Right: studio photo, sticky once the layout goes two-column -->
    <aside class="md:top-sticky md:sticky">
      <figure class="m-0">
        <img
          :src="studio"
          alt="Ioannis Savvaidis' studio"
          width="3453"
          height="2557"
          decoding="async"
          class="block h-auto w-full"
        />
      </figure>
    </aside>
  </div>
</template>
