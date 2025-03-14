<template>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="tattoo-info-container">
    <div class="tattoo-section">
    <h2>Información del Tatuaje</h2>
    <img :src="tattoo.imgUrl" :alt="tattoo.descripcion" class="tattoo-image">
    <div class="tattoo-details">
    <h3>{{ tattoo.titulo }}</h3>
    <p>{{ tattoo.descripcion }}</p>
    <ul>
    <li><strong>Estilo:</strong> {{ tattoo.estilo }}</li>
    <li><strong>Tamaño:</strong> {{ tattoo.tamaño }}</li>
    <li><strong>Fecha:</strong> {{ formatDate(tattoo.fechaCreacion) }}</li>
    </ul>

    </div>
    </div>
    
    <div class="artist-section">
    <h2>Información del usuario</h2>
    <div class="artist-details">
    <h3>{{ tattoo.user.nombre }}</h3>
    <p>{{ tattoo.user.descripcion }}</p>
    <ul v-if="tattoo.user.esTatuador">
    <li><strong>Descripción:</strong> {{ tattoo.user.tatuador.descripcion }}</li>
    <li><strong>Especialidad:</strong> {{ tattoo.user.tatuador.estilo }}</li>
    <li><strong>Precio medio:</strong> ${{ tattoo.user.tatuador.precioMedio }}</li>
    <li><strong>Ubicación:</strong> {{ tattoo.user.tatuador.ubicacion }}</li>
    <li><strong>Email:</strong> {{ tattoo.user.email }}</li>
    <button class="portfolio-button" @click="navigateToPortfolio">Portafolio</button>    
</ul>
    


</div>
    </div>
    </div>
    </template>
    
    <script>
    import axios from 'axios';
    
    export default {
    name: 'TattooAndArtistInfo',
    /**
     * Propiedades del componente
     * @returns {Object}
     *  @property {Object} tattoo - Información del tatuaje
     * @property {Boolean} loading - Indica si se está cargando la información
     * @property {String} error - Mensaje de error
     * @property {String} apiUrl - URL de la API
     */
    data() {
    return {
    tattoo: null,
    loading: true,
    error: null,
    apiUrl: import.meta.env.VITE_API_URL
    }
    },
    /**
     * Método que se ejecuta al montar el componente
     * @returns {Promise<void>}
     * @throws {Error} - Error al cargar la información del tatuaje
     */
    mounted() {
    this.fetchTattooInfo();
    },
    methods: {
    /**
     * Obtiene la información del tatuaje
     * @returns {Promise<void>}
     * @throws {Error} - Error al cargar la información del tatuaje
     */
    async fetchTattooInfo() {
    try {
    const tattooId = this.$route.params.id; // Asume que el ID del tatuaje está en la ruta
    const response = await axios.get(`${this.apiUrl}/posts/${tattooId}`);
    console.log(response.data);
    this.tattoo = response.data.data;
    console.log(JSON.stringify(this.tattoo) );
    this.loading = false;
    } catch (error) {
    console.error('Error fetching tattoo info:', error);
    this.error = 'No se pudo cargar la información del tatuaje.';
    this.loading = false;
    }
    },
    /**
     * Formatea una fecha en formato local
     * @param {String} dateString - Fecha en formato ISO
     * @returns {String} - Fecha formateada
     */
    formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
    },
    /**
     * Navega a la página de portafolio del tatuador
     */
    navigateToPortfolio() {
    this.$router.push(`/portfolio/${this.tattoo.user.id}`);
    
    }
    }
    }
    </script>
    
    <style scoped>
 .tattoo-info-container {
  min-width: none;
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    /*max-width: 968px;*/
    padding: 40px 20px;
    gap: 40px;
    min-height: 74.5vh;     /* Asegura una altura mínima para el contenedor */
}

    
    .tattoo-section, .artist-section {
    flex: 1;
    background-color: #f9f9f9;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    max-width: 400px;
    max-height: 75%;
    }
    
    .tattoo-section:hover, .artist-section:hover {
    transform: translateY(-5px);
    }
    
    .tattoo-image, .artist-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 24px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
    }
    
    h3 {
    color: #555;
    margin-bottom: 15px;
    font-size: 20px;
    }
    
    ul {
    list-style-type: none;
    padding: 0;
    }
    
    li {
    margin-bottom: 12px;
    line-height: 1.6;
    color: #666;
    }
    
    .loading, .error {
    text-align: center;
    padding: 40px;
    font-size: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin: 20px auto;
    max-width: 400px;
    }
    
    .error {
    color: #d32f2f;
    border: 1px solid #ffa4a2;
    background-color: #fff5f5;
    }
    
    @media (max-width: 968px) {
    .tattoo-info-container {
    flex-direction: column;
    }
    
    .tattoo-section, .artist-section {
    width: 100%;
    margin-bottom: 30px;
    }
    }
    
    @media (max-width: 480px) {
    .tattoo-info-container {
    padding: 20px 10px;
    }
    
    .tattoo-section, .artist-section {
    padding: 20px;
    }
    
    h2 {
    font-size: 20px;
    }
    
    h3 {
    font-size: 18px;
    }
    }
    .portfolio-button {
  background-color: #1a1a1a; /* Color de fondo */
  color: white; /* Color del texto */
  padding: 10px 20px; /* Espacio interno del botón */
  border: none; /* Borde del botón */
  border-radius: 4px; /* Esquinas redondeadas */
  cursor: pointer; /* Cambiar el cursor a mano */
  font-size: 16px; /* Tamaño de la fuente */
  font-weight: bold; /* Negrita */
  transition: background-color 0.3s ease; /* Transición al hacer hover */
}

.portfolio-button:hover {
  background-color: #333; /* Color de fondo al hacer hover */
}

.portfolio-button:active {
  transform: translateY(2px); /* Efecto de presión */
}

@media screen and (max-width: 968px) {
  .tattoo-section, .artist-section {
    max-width: 90%;
    padding: 20px; /* Espacio interno de las secciones */
  }
  
  .portfolio-button {
    padding: 8px 16px; /* Espacio interno del botón */
    font-size: 14px; /* Tamaño de la fuente */
  }
  
}

    </style>