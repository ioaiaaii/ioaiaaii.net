// v-reveal — fade/rise elements in as they enter the scroll viewport.
// Observes against the app's inner scroll container, since the shell scrolls an
// inner element, not the window.
import { SCROLL_ROOT_ID } from '@/lib/dom';

const reveal = {
  mounted(el) {
    el.classList.add('reveal');

    // Reduced motion is handled entirely by the .reveal utility's own media
    // query, which neutralises the animation. Doing it here as well was worse
    // than redundant: it was evaluated once at module load, so it could never
    // see the preference change.
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('in');
      return;
    }

    const root = document.getElementById(SCROLL_ROOT_ID) || null;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      // threshold 0: reveal as soon as any pixel enters (with the -40px bottom margin
      // for a slight delay). A ratio threshold would strand an element taller than
      // ~1/threshold viewports — it could never become that fraction visible — which
      // the Live list (one reveal block) risks as it grows a row a year.
      { root, threshold: 0, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    el._revealObserver = observer;
  },
  unmounted(el) {
    if (el._revealObserver) {
      el._revealObserver.disconnect();
      delete el._revealObserver;
    }
  },
};

// Show an element's reveal block at once, skipping the fade/rise. For a row reached by
// a link (/works#diataxis): it should already be there when the page lands, and the
// 12px rise would otherwise throw off the scroll to it, which measures the painted
// box, including the browser's own fragment jump on a fresh load. Forcing a reflow
// with the transition off commits the final state, so restoring it animates nothing.
// It runs even when the block is already `.in`: a section that has only just scrolled
// into view is still mid-rise, and turning the transition off snaps it to the end.
export function revealNow(el) {
  const block = el.closest('.reveal');
  if (!block) return;
  block.style.transition = 'none';
  block.classList.add('in');
  void block.offsetHeight;
  block.style.transition = '';
}

export default reveal;
