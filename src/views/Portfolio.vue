<!-- PortfolioView.vue -->
<template>
    <div class="portfolio-page">
      <h1>Portafolio de {{ usuario.nombre }}</h1>
      
      <!-- Sección de información del tatuador -->
      <div class="tattooer-info">
        <h2>Información del tatuador</h2>
        <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
        <p><strong>Email:</strong> {{ usuario.email }}</p>
        <p><strong>Descripción:</strong> {{ tatuador.descripcion }}</p>
        <p><strong>Estilo:</strong> {{ tatuador.estilo }}</p>
        <p><strong>Ubicación:</strong> {{ tatuador.ubicacion }}</p>
        <p><strong>Precio medio:</strong> ${{ tatuador.precioMedio }}</p>
      </div>
      
      <div>
        <h2>Trabajos del portafolio</h2>
          <PostGrid :posts="portfolioWorks" />
        
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  import PostGrid from '@/components/PostGrid.vue';

export default {
  name: 'PortfolioView',
  /**
   * Propiedades del componente
   * @returns {Object}
   * @property {Object} tatuador - Información del tatuador
   * @property {Object} usuario - Información del usuario
   * @property {Array} portfolioWorks - Trabajos del portafolio
   * @property {String} apiUrl - URL de la API
   */
  data() {
    return {
      tatuador: {},
      usuario: {},
      portfolioWorks: [],
      apiUrl: import.meta.env.VITE_API_URL
    }
  },
  /**
   * Método que se ejecuta al montar el componente
   * Carga la información del tatuador y sus trabajos del portafolio
   */
  async mounted() {
    const tattooerId = this.$route.params.id;
    
    try {
      // Cargar información del tatuador
      const responseTattooer = await axios.get(`${this.apiUrl}/users/${tattooerId}`);
      this.usuario = responseTattooer.data.data;
      this.tatuador = responseTattooer.data.data.tatuador;
      console.log(this.usuario);
      
      // Cargar trabajos del portafolio
      const responseWorks = await axios.get(`${this.apiUrl}/users/${tattooerId}/posts`);
      this.portfolioWorks = responseWorks.data.data;
      console.log(this.portfolioWorks)
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  },
  /**
   * Componentes del componente
   */
  components: {
    PostGrid
  }
}
</script>
<style>
.portfolio-page {
  margin: 20px;
  padding: 20px;
}

.tatuador-info {
  margin-bottom: 40px;
}

.tatuador-info p {
  margin-bottom: 10px;
}

.portfolio-works {
  margin-top: 40px;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.work-card {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.work-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

.work-card p {
  margin-top: 10px;
}

</style>
  