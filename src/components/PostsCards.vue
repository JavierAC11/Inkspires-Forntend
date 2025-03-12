<template>
  <div class="post-card">
    <div class="post-image-container" @click="navigateToPost(post.id)">
      <img :src="post.imgUrl" :alt="post.descripcion" class="post-image">
    </div>
    <div class="post-content">
      <h3 class="post-title">{{ truncateText(post.descripcion, 50) }}</h3>
      <p class="post-description">{{ truncateText(post.descripcion, 100) }}</p>
      <div class="post-meta">
        <span class="post-date">{{ formatDate(post.fechaCreacion) }}</span>
        <LikeButton :post="post" :likesCount="post.likes_count || 0" />
      </div>
      <button v-if="showDeleteButton" class="btn-delete" @click="handleDelete(post.id)">Eliminar</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import LikeButton from './LikeButton.vue';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export default {
  /**
   * Propiedades del componente
   * @returns {Object}
   * @property {Object} post - Post a mostrar
   * @property {Boolean} showDeleteButton - Indica si se muestra el botón de eliminar
   * @property {String} apiUrl - URL de la API
   */
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL
    };
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    showDeleteButton: {
      type: Boolean,
      default: false
    }
  },
  /**
   * Componentes del componente
   */
  components: {
    LikeButton,
  },
  /**
   * Método que se ejecuta al montar el componente
   * @returns {Object}
   * @property {Function} navigateToPost - Navega a la página de un post
   * @property {Function} truncateText - Trunca un texto
   * @property {Function} formatDate - Formatea una fecha
   */
  setup() {
    const router = useRouter();

    /**
     * Navega a la página de un post
     * @param postId 
     */
    const navigateToPost = (postId) => {
      router.push(`/post/${postId}`);
    };

    /**
     * Trunca un texto
     * @param text 
     * @param maxLength 
     */
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      return text.substr(0, maxLength) + '...';
    };

    /**
     * Formatea una fecha
     * @param dateString 
     */
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return {
      navigateToPost,
      truncateText,
      formatDate,
    };
  },
  methods: {
    /**
     * Elimina un post
     * @param postId 
     * @returns {Promise<void>}
     * @throws {Error} - Error al eliminar el post
     */
    async handleDelete(postId) {

      const authStore = useAuthStore();
      
      try {
        await axios.delete(`${this.apiUrl}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      })
      this.$emit('delete-post', postId);

    }
    catch (error) {
      console.error('Error deleting post:', error);
    }
  }
}
};
</script>

<style scoped>
.post-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background-color: #ffffff;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.post-image-container {
  height: 200px;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .post-image {
  transform: scale(1.05);
}

.post-content {
  padding: 16px;
}

.post-title {
  margin: 0 0 8px;
  font-size: 1.2em;
  color: #333;
}

.post-description {
  margin: 0 0 12px;
  font-size: 0.9em;
  color: #666;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: #888;
}

.btn-delete {
  background-color: #1a1a1a;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #333;
}

@media (max-width: 640px) {
  .post-grid {
    grid-template-columns: 1fr;
  }
}
</style>
