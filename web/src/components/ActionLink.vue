<script setup>
// The cobalt "Buy / Listen / View ↗" link used by every ledger row.
// Extra attrs (aria-label, …) fall through to the anchor.
// Size and tracking are inherited from the row's links cell, which sets
// text-meta/tracking-meta for both the normal and dense variants — so this needs
// no size of its own. (A `dense` prop used to re-apply exactly those two classes;
// it computed to the identical value in every call site and was removed.)
defineProps({
  href: { type: String, required: true },
});
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    class="text-link border-link-soft hover:border-link border-b pb-px font-medium no-underline
           transition-[border-color] duration-220 after:inline-block
           after:transition-transform after:duration-280 after:ease-soft
           after:content-['_↗'] hover:after:translate-x-0.5 hover:after:-translate-y-0.5"
  >
    <slot />
  </a>
</template>
