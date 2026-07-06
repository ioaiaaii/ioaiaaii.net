// v-reveal — fade/rise elements in as they enter the scroll viewport.
// Observes against the app's inner scroll container (#scroll-root), since
// the shell scrolls an inner element, not the window.
const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const reveal = {
  mounted(el) {
    el.classList.add('reveal');

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      el.classList.add('in');
      return;
    }

    const root = document.getElementById('scroll-root') || null;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { root, threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
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

export default reveal;
