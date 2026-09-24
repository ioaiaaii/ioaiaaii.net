// The app scrolls an inner container rather than the window, so the header and the
// reveal directive both need to find it. Keep the id in one place instead of
// repeating the string across App.vue, AppNavigation.vue and directives/reveal.js.
export const SCROLL_ROOT_ID = 'scroll-root';

// Fired on the scroll root after App.vue jumps to a linked Works row. The row lands at
// the top of the screen, like a heading link, so the header slides away whichever way
// the jump went (an upward jump would otherwise bring it back over the row) and takes
// the landed position as its baseline.
export const ANCHOR_JUMP_EVENT = 'anchorjump';
