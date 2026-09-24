<script setup>
import {
  NavigationFailureType,
  RouterView,
  isNavigationFailure,
  useRoute,
  useRouter,
} from 'vue-router';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import AppNavigation from '@/components/AppNavigation.vue';
import AppFooter from '@/components/AppFooter.vue';
import { ANCHOR_JUMP_EVENT, SCROLL_ROOT_ID } from '@/lib/dom';
import { revealNow } from '@/directives/reveal';

const route = useRoute();
const router = useRouter();
const scrollContainer = ref(null);

const showFooter = computed(() => route.name !== 'NotFound');

// A link to one work (/works#diataxis) lands on that row; every other navigation
// starts at the top. The browser's own fragment jump can't be relied on: the row only
// exists once the app has rendered, and clicking a title or row is a router
// navigation, which never triggers it. `post` runs this after the new view has
// rendered, and the nextTick waits out the rest of that flush, so the row exists and
// its v-reveal has mounted by the time revealNow looks for it. route.hash arrives
// already decoded; an unknown or malformed one finds nothing and the page goes to the top.
let navigation = 0;

// Put the row at its scroll-margin, near the top of the screen, and tell the header it
// was a jump, so it slides away instead of covering the row.
function land(target) {
  target.scrollIntoView({ block: 'start' });
  scrollContainer.value?.dispatchEvent(new Event(ANCHOR_JUMP_EVENT));
}

async function landOnRoute() {
  const current = ++navigation;
  await nextTick();
  if (current !== navigation) return;
  const container = scrollContainer.value;
  const target = route.hash ? document.getElementById(route.hash.slice(1)) : null;
  if (!target) {
    container?.scrollTo({ top: 0, left: 0 });
    return;
  }
  revealNow(target);
  interacted = false;
  land(target);
  // On a first visit the web fonts arrive a moment after the first render, even from
  // cache, and the reflow pushes the row off its mark. The browser's own fragment
  // jump may follow it, but that scroll reads to the header as a scroll-up and brings
  // it back over the row. Once the fonts are in, land again (row and header both),
  // unless the visitor has touched the page since or navigated elsewhere. Input, not
  // scrollTop, is the test: the browser's re-scroll changes scrollTop too.
  document.fonts?.ready.then(() => {
    if (current === navigation && !interacted) land(target);
  });
}

// Any input since the last landing means the visitor is in charge of the scroll now.
let interacted = false;
const INPUT_EVENTS = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
const markInteracted = () => (interacted = true);
onMounted(() => {
  for (const type of INPUT_EVENTS) {
    window.addEventListener(type, markInteracted, { capture: true, passive: true });
  }
});
onUnmounted(() => {
  for (const type of INPUT_EVENTS) {
    window.removeEventListener(type, markInteracted, { capture: true });
  }
});

watch(() => route.fullPath, landOnRoute, { flush: 'post' });

// Clicking the row the URL already names is a duplicate navigation: the router drops
// it and fullPath doesn't change, so the watcher never runs. Land on it anyway, like a
// heading link clicked a second time. afterEach still fires, with the failure.
const removeDuplicateHook = router.afterEach((to, from, failure) => {
  if (to.hash && isNavigationFailure(failure, NavigationFailureType.duplicated)) {
    landOnRoute();
  }
});
onUnmounted(removeDuplicateHook);
</script>

<template>
  <AppNavigation />

  <!-- The app scrolls this inner container, not the window. Column layout so the
       footer settles at the bottom on short pages (main grows to fill).
       overflow-anchor:none: Chrome and Firefox otherwise shift scrollTop themselves
       when content above the viewport reflows (web fonts swapping in), knocking a
       linked row off its landing before the re-land in the script puts it back. -->
  <div
    :id="SCROLL_ROOT_ID"
    ref="scrollContainer"
    class="fixed inset-0 z-10 flex flex-col overflow-x-hidden overflow-y-auto overscroll-contain [overflow-anchor:none]"
  >
    <!-- The page shell lives here, not in each route: there should be exactly one
         <main> landmark, and clearing the fixed header is a shell concern. This
         string used to be duplicated byte-for-byte in all four route components,
         so changing the header height meant four synchronised edits.
         --clearance is that clearance, one value per breakpoint; <main> pads by it. --anchor-offset is where a linked Works row lands (WorkRow's
         scroll-margin): at the top of the screen, like a heading link, with a small
         gap. The header slides away after the jump (see AppNavigation), so this
         doesn't have to clear it. -->
    <main
      class="landscape-short:[--clearance:--spacing(16)] pt-(--clearance) shrink-0 grow basis-auto [--anchor-offset:16px] [--clearance:84px] sm:[--anchor-offset:24px] sm:[--clearance:100px] lg:[--clearance:var(--spacing-stage)]"
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
