// The sandbox for the Works players (Bandcamp and SoundCloud frames). A sandbox starts
// from nothing allowed; these let a player do its job and no more:
// - allow-scripts, allow-same-origin: run its own code under its own origin, for its
//   own storage and requests. Both frames are another origin than the page, so this
//   gives them no reach into it.
// - allow-popups, allow-popups-to-escape-sandbox: open its links (Bandcamp's buy and
//   share, the album and artist pages) in a new tab, which then runs unsandboxed, so
//   buying on Bandcamp works as on Bandcamp.
// Everything else stays blocked: navigating or replacing this page (no
// allow-top-navigation), forms, alert/confirm dialogs, downloads, pointer lock.
export const PLAYER_SANDBOX =
  'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox';

// The players' link colour, in the hex their embed URLs take: --color-link,
// oklch(0.44 0.2 258), converted to sRGB. A frame can't read the page's CSS, so change
// both together.
export const PLAYER_LINK_COLOR = '0047bd';
