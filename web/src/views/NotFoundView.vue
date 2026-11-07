<script setup>
import SectionLabel from '@/components/SectionLabel.vue';
</script>

<template>
  <div class="px-edge flex flex-col items-start gap-5 pt-4">
    <!-- Here the label *is* the page heading, and the parent's gap-5 supplies the
         spacing the other call sites get from the label's own margin. -->
    <SectionLabel as="h1" :spaced="false">Error 404</SectionLabel>

    <p class="text-body leading-prose max-w-measure-short font-sans">
      The page you are looking for doesn’t exist or has been moved.
    </p>

    <!-- The way back: a text link at the prose size, in ink, underlined in the soft link
         colour, both turning blue on hover. -->
    <router-link
      to="/"
      class="text-ink text-body border-link-soft hover:text-link hover:border-link border-b pb-px font-sans leading-[normal] no-underline transition-[color,border-color] duration-200"
    >
      Back to Info
    </router-link>
  </div>
</template>
