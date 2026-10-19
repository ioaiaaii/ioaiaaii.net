<script setup>
// The underlined serif link: the contact email, and the 404's way back. Newsreader in
// the ink colour, underlined in the soft link colour, both turning blue on hover. A
// long address breaks anywhere rather than pushing the column wider.
// `to` routes internally, `href` leaves the site.
defineProps({
  href: { type: String, default: null },
  to: { type: [String, Object], default: null },
});
</script>

<template>
  <component
    :is="to ? 'router-link' : 'a'"
    :to="to ?? undefined"
    :href="href ?? undefined"
    class="text-ink text-email border-link-soft hover:text-link hover:border-link self-start border-b pb-px font-serif leading-[normal] font-normal [overflow-wrap:anywhere] no-underline transition-[color,border-color] duration-200"
  >
    <slot />
  </component>
</template>
