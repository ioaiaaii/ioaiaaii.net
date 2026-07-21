// The app scrolls an inner container rather than the window, so the header and the
// reveal directive both need to find it. Keep the id in one place instead of
// repeating the string across App.vue, Navigation.vue and directives/reveal.js.
export const SCROLL_ROOT_ID = 'scroll-root';
