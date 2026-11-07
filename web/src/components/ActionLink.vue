<script setup>
// The cobalt action link that leaves the site: BUY ↗, VIEW ↗, INFO ↗, LISTEN ↗ in the
// rows, and the footer's links. Mono caps, underlined in the soft link colour, full
// colour on hover, its ↗ nudged up and right. It opens a new tab. Extra attrs
// (aria-label, …) fall through to the anchor.
defineProps({
  href: { type: String, required: true },
});
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    class="action-link after:content-['↗'] hover:after:translate-x-0.5 hover:after:-translate-y-0.5"
  >
    <slot />
  </a>
</template>
