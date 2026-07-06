<template>
  <main class="stage">
    <section class="content">
      <div class="notfound">
        <h1 class="section-label">Error 404</h1>
        <p class="notfound-lead">The page you are looking for doesn’t exist or has been moved.</p>
        <router-link to="/" class="contact-email">Back to Info</router-link>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.notfound {
  padding: 0 var(--edge);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.notfound-lead {
  font-family: var(--font-serif);
  font-size: 17px;
  line-height: 1.62;
  color: var(--color-ink);
  max-width: 48ch;
  margin: 0;
}
</style>
