<script setup>
// The cobalt action link of every row: BUY ↗, VIEW ↗, INFO ↗, LISTEN ↗, and the Info
// page's BANDCAMP ↗ · SOUNDCLOUD ↗ · IOAIAAII ↗. Mono caps, underlined in the soft
// link colour, full colour on hover, its ↗ nudged up and right. It leaves the site, so
// it opens a new tab. Extra attrs (aria-label, …) fall through to the anchor.
defineProps({
  href: { type: String, required: true },
});
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    class="action-link after:content-['_↗'] hover:after:translate-x-0.5 hover:after:-translate-y-0.5"
  >
    <slot />
  </a>
</template>
