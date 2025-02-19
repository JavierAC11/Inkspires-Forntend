<template>
  <footer class="footer">
    <p>© {{ currentYear }} Inkspires. Conectando artistas y amantes del tatuaje</p>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #1a1a1a;
  color: #ffffff;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
}
</style>
