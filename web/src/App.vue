<script setup>
import { RouterView, useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';
import AppNavigation from '@/components/AppNavigation.vue';
import AppFooter from '@/components/AppFooter.vue';
import { SCROLL_ROOT_ID } from '@/lib/dom';

const route = useRoute();
const scrollContainer = ref(null);

const showFooter = computed(() => route.name !== 'NotFound');

watch(
  () => route.fullPath,
  () => scrollContainer.value?.scrollTo({ top: 0, left: 0 }),
);
</script>

<template>
  <AppNavigation />

  <!-- The app scrolls this inner container, not the window. Column layout so the
       footer settles at the bottom on short pages (main grows to fill). -->
  <div
    :id="SCROLL_ROOT_ID"
    ref="scrollContainer"
    class="fixed inset-0 z-10 flex flex-col overflow-x-hidden overflow-y-auto overscroll-contain"
  >
    <!-- The page shell lives here, not in each route: there should be exactly one
         <main> landmark, and clearing the fixed header is a shell concern. This
         string used to be duplicated byte-for-byte in all four route components,
         so changing the header height meant four synchronised edits. -->
    <main
      class="pt-[84px] sm:pt-[100px] lg:pt-stage landscape-short:pt-16 shrink-0 grow basis-auto"
    >
      <RouterView />
    </main>

    <footer
      v-if="showFooter"
      class="px-edge pt-footer flex shrink-0 justify-end pb-[max(40px,env(safe-area-inset-bottom))]"
    >
      <AppFooter />
    </footer>
  </div>
</template>
