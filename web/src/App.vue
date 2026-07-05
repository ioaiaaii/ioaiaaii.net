<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navigation from '@/components/Navigation.vue';
import AppFooter from '@/components/AppFooter.vue';
import { computed, watch, ref } from 'vue';

const route = useRoute();
const scrollContainer = ref(null);

const showFooter = computed(() => route.name !== 'NotFound');

watch(() => route.fullPath, () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, left: 0 });
  }
});
</script>

<template>
  <Navigation />
  <div
    id="scroll-root"
    ref="scrollContainer"
    class="fixed inset-0 z-10 overflow-y-auto overflow-x-hidden overscroll-contain"
  >
    <RouterView :key="$route.fullPath" />
    <footer v-if="showFooter" class="site-footer">
      <AppFooter />
    </footer>
  </div>
</template>
