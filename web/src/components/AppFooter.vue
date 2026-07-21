<script setup>
import info from '@/data/info.json';

// Computed once at load, not hardcoded: the year was written out as 2026 and
// would have quietly gone stale on 1 January. The site is a static build, so it
// refreshes on the next deploy rather than at midnight — which is fine, and still
// strictly better than a literal.
const year = new Date().getFullYear();
</script>

<template>
  <div class="text-ink-soft text-footnote tracking-footer font-mono uppercase">
    © {{ info.name }} {{ year }}
  </div>
</template>
