<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navigation from '@/components/Navigation.vue';
import AppFooter from '@/components/AppFooter.vue';
import LiquidBackground from '@/components/insprira/LiquidBackground.vue';
import { computed, watch, ref } from 'vue';

const route = useRoute();
const scrollContainer = ref(null);

const showFooter = computed(() => {
  return route.name !== 'NotFound';
});

watch(() => route.fullPath, () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, left: 0 });
  }
});

</script>
<template>
  <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <LiquidBackground />
  </div>
  <div ref="scrollContainer" class="fixed inset-0 z-10 overflow-y-auto overflow-x-hidden overscroll-contain">
    <Navigation />
    <RouterView :key="$route.fullPath" />
    <footer v-if="showFooter">
      <AppFooter />
    </footer>
  </div>
</template>
