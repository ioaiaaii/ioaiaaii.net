<script setup>
import {
  NavigationFailureType,
  RouterView,
  isNavigationFailure,
  useRoute,
  useRouter,
} from 'vue-router';
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import AppNavigation from '@/components/AppNavigation.vue';
import { ANCHOR_JUMP_EVENT, SCROLL_ROOT_ID } from '@/lib/dom';
import { revealNow } from '@/directives/reveal';

const route = useRoute();
const router = useRouter();
const scrollContainer = ref(null);
const mainEl = ref(null);

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

// The keyboard (Page Down, the arrows, space) scrolls whatever holds focus, and the
// page scrolls this inner container, not the document. With focus on <body> after a
// load, or on the header link just clicked, the keys went to the document, which
// never scrolls, and did nothing until a click inside the page. So after a load and
// every navigation, focus <main> unless focus is already inside it: the keys then
// scroll the container, and a screen reader starts at the new page. A row picked on
// Works holds focus inside <main> already, so it stays where the visitor put it.
// preventScroll, so it never moves the view.
function focusMain() {
  const main = mainEl.value;
  if (main && !main.contains(document.activeElement)) main.focus({ preventScroll: true });
}
onMounted(focusMain);
watch(() => route.fullPath, focusMain, { flush: 'post' });

// Clicking the row the URL already names is a duplicate navigation: the router drops
// it and fullPath doesn't change, so the watcher never runs. Land on it anyway, like a
// heading link clicked a second time. afterEach still fires, with the failure.
const removeDuplicateHook = router.afterEach((to, from, failure) => {
  if (!isNavigationFailure(failure, NavigationFailureType.duplicated)) return;
  // The header link for the page already open: nothing navigates, but focus is on
  // that link now, so bring it back into the page (see focusMain).
  focusMain();
  if (to.hash) landOnRoute();
});
onUnmounted(removeDuplicateHook);
</script>

<template>
  <AppNavigation />

  <!-- The app scrolls this inner container, not the window.
       overflow-anchor:none: Chrome and Firefox otherwise shift scrollTop themselves
       when content above the viewport reflows (web fonts swapping in), knocking a
       linked row off its landing before the re-land in the script puts it back. -->
  <div
    :id="SCROLL_ROOT_ID"
    ref="scrollContainer"
    class="fixed inset-0 z-10 overflow-x-hidden overflow-y-auto overscroll-contain [overflow-anchor:none]"
  >
    <!-- The page shell lives here, not in each route: there should be exactly one
         <main> landmark, and clearing the fixed header is a shell concern: 148px
         above the page (84px on a phone), 120px below (96px). --anchor-offset is
         where a linked Works row lands (WorkRow's scroll-margin): at the top of the
         screen, like a heading link, with a small gap. The header slides away after
         the jump (see AppNavigation), so this doesn't have to clear it.
         tabindex="-1" lets the script focus it (see focusMain) without adding a tab
         stop; outline-none, as it is a container, not a control. No footer. -->
    <main
      ref="mainEl"
      tabindex="-1"
      class="pt-[148px] pb-[120px] outline-none [--anchor-offset:16px] max-md:pt-[84px] max-md:pb-[96px] md:[--anchor-offset:24px]"
    >
      <RouterView />
    </main>
  </div>
</template>
