<script setup>
// The grey mono caps that head a section ("Collaborations", "Contact"), in the row
// details' style.
// This class string used to be pasted into four places and had already drifted:
// NotFound's copy dropped the margin (its parent uses a gap instead) and is an
// <h1>, since there the label *is* the page heading. Both differences are props
// now rather than divergent copies.
// The original carried `flex items-center gap-3` in every copy — inert on a
// heading whose only child is text, and most likely a fossil of a hairline rule
// that once sat beside the label. --color-rule, commented "hairlines" and unused
// by anything, was deleted alongside it.
defineProps({
  as: { type: String, default: 'h2' },
  spaced: { type: Boolean, default: true },
});
</script>

<template>
  <component :is="as" class="mono-label" :class="spaced ? 'mb-5' : ''">
    <slot />
  </component>
</template>
