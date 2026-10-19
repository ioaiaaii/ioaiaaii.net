<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ANCHOR_JUMP_EVENT, SCROLL_ROOT_ID } from '@/lib/dom';

const THRESHOLD = 6; // ignore tiny jitters
const REVEAL_TOP = 80; // always show near the very top

const links = [
  { name: 'Info', label: 'Info', to: '/' },
  { name: 'Works', label: 'Works', to: '/works' },
  { name: 'Live', label: 'Live', to: '/live' },
];

const isNavbarVisible = ref(true);

// Plain locals, not refs — nothing renders from them.
let scrollContainer = null;
let lastScrollPosition = 0;

function handleScroll() {
  if (!scrollContainer) return;
  const current = scrollContainer.scrollTop;
  const delta = current - lastScrollPosition;
  if (Math.abs(delta) <= THRESHOLD) return;
  isNavbarVisible.value = delta < 0 || current < REVEAL_TOP;
  lastScrollPosition = current;
}

// After a jump to a linked work: slide away so the row sits at the top of the screen,
// and take the landed position as the baseline so the jump's own scroll event reads as
// no movement. Scrolling up brings the header back as usual. Unlike a scroll, a jump
// ignores REVEAL_TOP: a row that lands near the top (the first release, on a short
// landscape phone) would otherwise sit under the header. Only a jump that leaves the
// page at the very top keeps it, since nothing was scrolled under it then.
function handleAnchorJump() {
  lastScrollPosition = scrollContainer.scrollTop;
  isNavbarVisible.value = lastScrollPosition <= 0;
}

onMounted(() => {
  scrollContainer = document.getElementById(SCROLL_ROOT_ID);
  scrollContainer?.addEventListener('scroll', handleScroll, { passive: true });
  scrollContainer?.addEventListener(ANCHOR_JUMP_EVENT, handleAnchorJump);
});

onBeforeUnmount(() => {
  scrollContainer?.removeEventListener('scroll', handleScroll);
  scrollContainer?.removeEventListener(ANCHOR_JUMP_EVENT, handleAnchorJump);
});
</script>

<template>
  <!-- Fixed over the content, white at 92% and lightly frosted, so it never sits on top
       of text or an image unreadably. Slides away on scroll-down (past 80px) and after
       a jump to a linked work, and back on scroll-up: 380ms on the standard curve
       (ease-in-out). No slide for reduced motion. The current page is underlined in
       the link blue; hover turns a link blue. -->
  <header
    class="px-edge bg-bg/92 text-nav tracking-mono fixed leading-[normal] top-0 right-0 left-0 z-50 flex items-baseline justify-between py-[34px] font-mono uppercase backdrop-blur-sm transition-transform duration-380 ease-in-out will-change-transform motion-reduce:transition-none max-md:py-3.5 max-md:pt-[max(14px,env(safe-area-inset-top))]"
    :class="isNavbarVisible ? 'translate-y-0' : '-translate-y-[115%]'"
    :data-hidden="isNavbarVisible ? null : ''"
    @focusin="isNavbarVisible = true"
  >
    <router-link to="/" class="text-ink whitespace-nowrap no-underline">
      Ioannis Savvaidis
    </router-link>

    <nav class="flex gap-9 max-md:gap-4">
      <router-link
        v-for="item in links"
        :key="item.name"
        :to="item.to"
        class="text-ink hover:text-link no-underline transition-colors duration-200"
        :class="{ 'pb-[3px] shadow-[inset_0_-1px_0_var(--color-link)]': $route.name === item.name }"
      >
        {{ item.label }}
      </router-link>
    </nav>
  </header>
</template>
