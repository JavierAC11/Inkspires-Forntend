<template>
  <div class="user-profile" v-if="user">
    <h2>Perfil de {{ user.nombre }}</h2>
    
    <div class="profile-section">
      <h3>Información básica</h3>
      <p><strong>Nombre:</strong> {{ user.nombre }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>

    <div v-if="user.is_tatuador" class="profile-section">
      <h3>Información del tatuador</h3>
      <p><strong>Estilos:</strong> {{ user.estilos }}</p>
      <p><strong>Precio medio:</strong> ${{ user.precio_medio }}</p>
      <p><strong>Ubicación:</strong> {{ user.ubicacion }}</p>
      <p><strong>Descripción:</strong> {{ user.descripcion }}</p>
    </div>

    <!--<div class="profile-actions">
      <button @click="editProfile">Editar perfil</button>
    </div>-->

    <div class="user-posts">
      <h3>Mis Posts</h3>
      <div v-if="userPosts.length > 0" class="posts-grid">
        <PostsCards :posts="userPosts" />
        <!--<div v-for="post in userPosts" :key="post.id" class="post-card">
          <img :src="post.imagen_url" :alt="post.descripcion">
          <p>{{ post.descripcion }}</p>
        </div>-->
      </div>
      <p v-else>Aún no has publicado ningún post.</p>
      <div ref="loadingTrigger" class="loading-trigger">
        <p v-if="loading">Cargando más posts...</p>
        <p v-if="!hasMore && userPosts.length > 0">No hay más posts para mostrar.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getMe } from '@/helpers/getMe';
import PostsCards from '@/components/PostsCards.vue';
import { getMyPosts } from '@/helpers/getMyPosts';

export default {
  name: 'UserProfile',
  data() {
    return {
      user: null,
      userPosts: [],
      page: 1,
      loading: false,
      hasMore: true
    }
  },
  mounted() {
    this.loadUserData();
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async loadUserData() {
      try {
        this.user = await getMe();
        this.loadUserPosts();
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }
    },
    async loadUserPosts() {
      if (this.loading || !this.hasMore) return;

      this.loading = true;
      try {
        const response = await getMyPosts(this.user.id, this.page);
        const newPosts = response.data;
        this.userPosts = [...this.userPosts, ...newPosts];
        this.page++;
        this.hasMore = response.links.next !== null;
        
        if (!this.hasMore) {
          console.log('No hay más posts para cargar');
        }
      } catch (error) {
        console.error('Error al cargar los posts del usuario:', error);
      } finally {
        this.loading = false;
      }
    },
    handleScroll() {
      const loadingTrigger = this.$refs.loadingTrigger;
      if (!loadingTrigger) return;

      const rect = loadingTrigger.getBoundingClientRect();
      if (rect.top <= window.innerHeight && !this.loading && this.hasMore) {
        this.loadUserPosts();
      }
    },
    editProfile() {
      this.$router.push('/edit-profile');
    }
  },
  components: {
    PostsCards
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 100%;
  margin: 10px;
  padding: 20px;
  min-height: 70vh;
}

.profile-section {
  margin-bottom: 20px;
}

h2, h3 {
  color: #333;
}

p {
  margin: 10px 0;
}

.profile-actions {
  margin-top: 20px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #1a1a1a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #333;
}

.posts-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.loading-trigger {
  text-align: center;
  padding: 20px;
}
</style>
