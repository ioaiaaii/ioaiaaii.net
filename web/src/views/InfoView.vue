<script setup>
import portrait from '@/assets/images/info/portrait.jpg';
</script>

<template>
  <h1 class="sr-only">Ioannis Savvaidis — composer</h1>

  <!-- The photo alone, centred, framed by the menu and the footer (contact is there,
       in AppFooter). No text and no caption: the profile text is kept in info.json but
       not shown (the user's pick, 2026-11-07).
       The live photo (4:3), at most 480px wide (--container-figure, the widest a Works
       image gets), so 360px tall, centred in the height between the menu and the
       footer (the page takes all of it: flex-1 in <main>, a column). On a short screen
       it shrinks to fit: <main>'s 100px above and its one space below (49px), and the
       footer line (about 55px), 210px in all with a little to spare, so its width is at
       most four thirds of what is left. At its own proportions, never cropped. -->
  <div class="px-edge flex flex-1 flex-col justify-center">
    <figure>
      <img
        :src="portrait"
        alt="Ioannis Savvaidis performing live with synthesizers"
        width="753"
        height="565"
        decoding="async"
        class="mx-auto block h-auto w-full max-w-[min(var(--container-figure),calc((100svh-210px)*4/3))]"
      />
    </figure>
  </div>
</template>
