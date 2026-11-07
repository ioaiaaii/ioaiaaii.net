<script setup>
import info from '@/data/info.json';
import ActionLink from '@/components/ActionLink.vue';

// The footer, on every page, after the page: one centred line of links in the site's
// link style (the cobalt action link: mono caps at the row size, underlined in the soft
// blue). EMAIL opens a mail (the address shows on hover); Bandcamp, SoundCloud and the
// `ioaiaaii` blog leave the site with ↗ in a new tab (ActionLink).
// Bandcamp/SoundCloud are the composer identity; `ioaiaaii` is a deliberate cross-link
// to the engineer identity (the SRE blog) — see _comment_identity in info.json.
const links = [
  { label: 'Bandcamp', href: info.bandcamp },
  { label: 'SoundCloud', href: info.soundcloud },
  { label: 'ioaiaaii', href: info.engineeringBlog },
].filter((link) => link.href);
</script>

<template>
  <!-- After the page's last block by the site's one space (the page's own bottom
       padding, in App.vue), and at the bottom of the screen when the page is shorter.
       Never over the page. Tried and dropped on 2026-11-07: pinning it to the window, a
       rule above it, a copyright, a TOP link. Centred, the links 26px apart, as a row's
       actions are, and 16px on a phone, as the menu's are there: one line from a 390px
       phone up, two (still centred) on a narrower one. The header's 34px below it
       (14px on a phone, or the phone's safe area). "Email" has no arrow, so its
       (empty) ::after is hidden, or the arrow's gap would lengthen its underline. -->
  <footer
    class="px-edge flex flex-wrap items-baseline justify-center gap-x-[26px] gap-y-3 max-md:gap-x-4 pb-[34px] max-md:pb-[max(14px,env(safe-area-inset-bottom))]"
  >
    <a
      :href="'mailto:' + info.email"
      :title="info.email"
      :aria-label="`Email ${info.email}`"
      class="action-link after:hidden"
      >Email</a
    >
    <ActionLink v-for="link in links" :key="link.label" :href="link.href">
      {{ link.label }}
    </ActionLink>
  </footer>
</template>
