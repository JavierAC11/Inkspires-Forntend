<template>
  <main class="main-content">
    <h1>Bienvenido a Inkspires</h1>
    <p>Descubre el arte del tatuaje y conecta con artistas increíbles.</p>
    
    <Filtro @apply-filters="applyFiltersToPosts" />
    
    <div class="posts-grid">
  <div v-if="filteredPosts.length > 0 || (posts.length > 0 && !filtersApplied)">
    <PostGrid :posts="filteredPosts.length > 0 ? filteredPosts : posts" />
  </div>
  <div v-else-if="filtersApplied">
    <p>No hay posts disponibles después de aplicar los filtros.</p>
  </div>
  <div v-else>
    <p>No hay posts disponibles.</p>
  </div>
  <div ref="loadingTrigger" class="loading-trigger">
    <p v-if="loading">Cargando más posts...</p>
  </div>
</div>
  </main>
</template>


<script>
import PostGrid from '@/components/PostGrid.vue'
import Filtro from '@/components/Filtro.vue'
import { getPosts } from '@/helpers/getPosts'

export default {
  name: 'Home',
  /**
   * Componentes del componente
   */
  components: {
    
    PostGrid,
    Filtro
  },

  /**
   * Propiedades del componente
   * 
   * @prop {Array} posts - Posts a mostrar
   * @prop {Boolean} loading - Indica si se está cargando más posts
   * @prop {Boolean} hasMore - Indica si hay más posts para cargar
   * @prop {Number} page - Página actual
   * @prop {Array} filteredPosts - Posts filtrados
   * @prop {Boolean} filtersApplied - Indica si se han aplicado filtros
   */
  data() {

    return {
      posts: [],
      filteredPosts: [],
      page: 1,
      loading: false,
      hasMore: true,
      filtersApplied: false
    }
  },
  /**
   * Método que se ejecuta al montar el componente
   */
  mounted() {
    this.loadPosts()
    window.addEventListener('scroll', this.handleScroll)
  },
  /**
   * Método que se ejecuta al desmontar el componente
   */
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    /**
     * Carga los posts
     */
    async loadPosts() {
      if (this.loading || !this.hasMore) return

      this.loading = true
      try {
        const response = await getPosts(this.page)
        const newPosts = response.data
        this.posts = [...this.posts, ...newPosts]
        this.page++
        this.hasMore = response.links.next !== null
      } catch (error) {
        console.error('Error al cargar los posts:', error)
      } finally {
        this.loading = false
      }
    },
    /**
     * Maneja el scroll de la página
     */
    handleScroll() {
      const loadingTrigger = this.$refs.loadingTrigger
      if (!loadingTrigger) return

      const rect = loadingTrigger.getBoundingClientRect()
      if (rect.top <= window.innerHeight && !this.loading && this.hasMore) {
        this.loadPosts()
      }
    },
    /**
     * Aplica los filtros a los posts
     * 
     * @param {Object} filters - Filtros a aplicar
     */
    applyFiltersToPosts(filters) {
    console.log('Filtros aplicados:', filters);
    this.filteredPosts = this.posts.filter(post => {
      return (filters.estilo === '' || post.estilo === filters.estilo) &&
             (filters.tamaño === '' || post.tamaño === filters.tamaño)
    });
    this.filtersApplied = true;
  }
  }
}
</script>


<style scoped>
.main-content {
  min-height: calc(90vh - 120px);
  padding: 2rem;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}

.posts-grid {
  width: 100%;
  /*display: grid;*/
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

p {
  color: #666;
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
}

.posts-container {
  width: 100%;
  max-width: 800px;
}

.loading-trigger {
  text-align: center;
  padding: 20px 0;
}
</style>
