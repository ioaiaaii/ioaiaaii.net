<script setup>
// One release's Bandcamp player. It is mounted only when its Listen is clicked, so
// nothing from Bandcamp (its code, its cookies) loads until someone wants to listen,
// and closing it unmounts the frame, which stops the playback.
// Bandcamp's large size with no artwork, on white with the site's link blue
// (--color-link, oklch(0.44 0.2 258)). With a height (the one from the release's embed
// code, which Bandcamp sizes to its tracks) it shows the tracklist; without one, the
// compact 120px player, since a guessed height would clip the list or leave a gap.
// The embed code's height is for a frame 350px wide or more. Narrower (a phone, or the
// text column around 800px), Bandcamp moves its buy/share links from the top line to
// a line of their own under the tracks, so the frame gets one row (33px) more; the
// container query reads the frame's own width, which is what Bandcamp's layout follows.
// The page's CSP allows exactly this origin as a frame (frame-src in public/_headers).
// The frame is sandboxed (PLAYER_SANDBOX), as SoundCloudPlayer's is.
import { PLAYER_SANDBOX } from '@/lib/players';

const props = defineProps({
  album: { type: String, required: true }, // the album id from its embed code (album=…)
  title: { type: String, required: true },
  height: { type: Number, default: null }, // px, from its embed code
  href: { type: String, default: null }, // the album page, for the no-frames fallback
});

const LINK = '0047bd';
</script>

<template>
  <div class="@container">
    <iframe
      :src="`https://bandcamp.com/EmbeddedPlayer/album=${album}/size=large/bgcol=ffffff/linkcol=${LINK}/tracklist=${props.height ? 'true' : 'false'}/artwork=none/transparent=true/`"
      :title="`${title} on Bandcamp`"
      :sandbox="PLAYER_SANDBOX"
      :style="props.height ? { '--player-height': `${props.height}px` } : null"
      class="block w-full border-0"
      :class="
        props.height
          ? 'h-(--player-height) @max-[350px]:h-[calc(var(--player-height)+33px)]'
          : 'h-[120px]'
      "
      seamless
    >
      <a v-if="href" :href="href">{{ title }} on Bandcamp</a>
    </iframe>
  </div>
</template>
