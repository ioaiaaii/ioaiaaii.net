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
  <!-- Fixed and blended over the content; slides away on scroll-down and after a jump
       to a linked work (without the slide for reduced motion). The bar itself is
       click-through, so children opt back into pointer events. -->
  <header
    class="pointer-events-none px-edge fixed top-0 right-0 left-0 z-50 flex items-center justify-between py-3.5 pt-[max(14px,env(safe-area-inset-top))] mix-blend-multiply transition-transform duration-380 ease-in-out will-change-transform motion-reduce:transition-none sm:items-baseline sm:py-[34px] sm:pt-[34px]"
    :class="{ '-translate-y-[115%]': !isNavbarVisible }"
    @focusin="isNavbarVisible = true"
  >
    <router-link
      to="/"
      class="text-nav tracking-nav pointer-events-auto font-mono font-medium whitespace-nowrap text-inherit uppercase no-underline"
    >
      Ioannis Savvaidis
    </router-link>

    <nav
      class="text-nav tracking-nav pointer-events-auto flex gap-3 font-mono uppercase xs:gap-4 sm:gap-[18px] lg:gap-9"
    >
      <router-link
        v-for="item in links"
        :key="item.name"
        :to="item.to"
        class="text-ink after:bg-link hover:text-link relative py-1.5 no-underline after:absolute after:right-full after:bottom-0 after:left-0 after:h-px after:transition-[right] after:duration-280 after:ease-soft after:content-[''] hover:after:right-0 sm:py-0 sm:pb-0.5"
        :class="{ 'opacity-40': $route.name === item.name }"
      >
        {{ item.label }}
      </router-link>
    </nav>
  </header>
</template>
