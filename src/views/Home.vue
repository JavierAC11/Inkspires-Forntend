<template>
  <main class="main-content">
    <h1>Bienvenido a Inkspires</h1>
    <p>Descubre el arte del tatuaje y conecta con artistas increíbles.</p>
    
    <div class="posts-grid">
    
      <PostsCards :posts="posts" />
      <div ref="loadingTrigger" class="loading-trigger">
        <p v-if="loading">Cargando más posts...</p>
    </div>
  </div>
  </main>
</template>

<script>
import PostsCards from '@/components/PostsCards.vue'
import { getPosts } from '@/helpers/getPosts'

export default {
  name: 'Home',
  components: {
    PostsCards
  },
  data() {
    return {
      posts: [],
      page: 1,
      loading: false,
      hasMore: true
    }
  },
  mounted() {
    this.loadPosts()
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
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
    handleScroll() {
      const loadingTrigger = this.$refs.loadingTrigger
      if (!loadingTrigger) return

      const rect = loadingTrigger.getBoundingClientRect()
      if (rect.top <= window.innerHeight && !this.loading && this.hasMore) {
        this.loadPosts()
      }
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
