<template>
    <main class="main-content">
      <!-- Aquí irá el contenido principal de tu página -->
      <h1>Bienvenido a Inkspires</h1>
      <p>Descubre el arte del tatuaje y conecta con artistas increíbles.</p>
    </main>
</template>
  
  <script>
  export default {
    name: 'Home'
  }
  </script>
  
  <style scoped>
  .main-content {
    min-height: calc(90vh - 120px); /* Ajusta este valor según la altura de tu header y footer */
    padding: 2rem;
    background-color: #f5f5f5; /* Un fondo claro para contrastar con el header y footer oscuros */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  
  h1 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    text-align: center;
    max-width: 600px;
  }
  </style>
  