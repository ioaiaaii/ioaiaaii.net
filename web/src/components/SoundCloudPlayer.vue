<script setup>
// A work's SoundCloud player, the counterpart of BandcampPlayer: mounted only when its
// Listen is clicked, so nothing from SoundCloud loads until then, and unmounted on
// Close, which stops the playback. The classic player (not the artwork one), with the
// site's link blue (--color-link) for its play button and progress, and nothing around
// the tracks (no user, comments, reposts or teaser). A private set plays through its
// secret_token, which is part of `url` and so public once it is on the page.
// The page's CSP allows exactly this origin as a frame (frame-src in public/_headers).
// The frame is sandboxed (PLAYER_SANDBOX), as BandcampPlayer's is.
import { computed } from 'vue';
import { PLAYER_LINK_COLOR, PLAYER_SANDBOX } from '@/lib/players';

const props = defineProps({
  url: { type: String, required: true }, // the url=… from its embed code, decoded
  title: { type: String, required: true },
  height: { type: Number, default: null }, // px, from its embed code
  href: { type: String, default: null }, // the set's page, for the no-frames fallback
});

const DEFAULT_HEIGHT = 450; // SoundCloud's own for a set
const src = computed(() => {
  const params = new URLSearchParams({
    url: props.url,
    color: `#${PLAYER_LINK_COLOR}`,
    auto_play: 'false',
    hide_related: 'false',
    show_comments: 'false',
    show_user: 'false',
    show_reposts: 'false',
    show_teaser: 'false',
  });
  return `https://w.soundcloud.com/player/?${params}`;
});
</script>

<template>
  <iframe
    :src="src"
    :title="`${title} on SoundCloud`"
    :sandbox="PLAYER_SANDBOX"
    :style="{ height: `${props.height || DEFAULT_HEIGHT}px` }"
    class="block w-full border-0"
    allow="autoplay; encrypted-media"
  >
    <a v-if="href" :href="href">{{ title }} on SoundCloud</a>
  </iframe>
</template>
