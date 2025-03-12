<template>
  <div class="post-grid">
    <PostsCards 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
      :show-delete-button="showDeleteButton"
      @delete-post="handleDeletePost"
    />
  </div>
</template>

<script>
import PostsCards from './PostsCards.vue';

export default {
  /**
   * Propiedades que recibe el componente
   * 
   * @prop {Array} posts - Posts a mostrar
   * @prop {Boolean} showDeleteButton - Indica si se muestra el botón de eliminar
   */
  props: {
    posts: {
      type: Array,
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
    PostsCards,
  }
  ,methods: {
    /**
     * Elimina un post
     * 
     * @param postId 
     */
    handleDeletePost(postId) {
      this.$emit('delete-post', postId);
    }
  }
}

</script>

<style scoped>
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Diseño flexible */
  gap: 24px; /* Espaciado entre las tarjetas */
  padding: 24px; /* Espaciado interno */
}

/* Ajustes para pantallas pequeñas */
@media (max-width: 768px) {
  .post-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Columnas más pequeñas */
    gap: 16px; /* Menor espaciado entre las tarjetas */
    padding: 16px; /* Menor espaciado interno */
  }
}

/* Ajustes para pantallas muy pequeñas (móviles) */
@media (max-width: 480px) {
  .post-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Una sola columna si es necesario */
    gap: 12px; /* Reducir aún más el espaciado */
    padding: 12px; /* Reducir el espaciado interno */
  }
}

</style>
