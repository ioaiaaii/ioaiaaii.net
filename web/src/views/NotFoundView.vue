<script setup>
import SectionLabel from '@/components/SectionLabel.vue';
import TextLink from '@/components/TextLink.vue';
</script>

<template>
  <div class="px-edge flex flex-col items-start gap-5">
    <!-- Here the label *is* the page heading, and the parent's gap-5 supplies the
         spacing the other call sites get from the label's own margin. -->
    <SectionLabel as="h1" :spaced="false">Error 404</SectionLabel>

    <p class="text-ink text-body leading-prose m-0 max-w-measure-short font-serif">
      The page you are looking for doesn’t exist or has been moved.
    </p>

    <TextLink to="/">Back to Info</TextLink>
  </div>
</template>
