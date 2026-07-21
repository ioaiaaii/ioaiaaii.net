<script setup>
// The underlined sans link: the contact email, and the 404's way back.
// Three tokens exist only to serve these two call sites (--text-email,
// --leading-email, --tracking-email, each commented "contact email + the 404
// link"). The values were centralised but the composition was not, so the same
// thirteen classes were pasted in both places — the tokens could not protect the
// thing they were made for.
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
    class="text-ink text-email border-link-soft hover:text-link hover:border-link leading-email
           tracking-email inline-block border-b pb-0.5 font-sans font-normal no-underline
           transition-[color,border-color] duration-180"
  >
    <slot />
  </component>
</template>
