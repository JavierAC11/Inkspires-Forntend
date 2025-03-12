<template>
  <button @click.stop="handleLike(post.id)" v-if="isLogin">
    <div v-if="hasLike !== null">
      
      <i class="fa fa-thumbs-up" v-if="!hasLike">{{ likesCount }} <v-icon name="fc-like-placeholder" /></i>
      <i class="fa fa-thumbs-down" v-else>{{ likesCount }} <v-icon name="fc-like" /></i>
    </div>
    <div v-else>
      Cargando...
    </div>
  </button>
  <i v-else>{{ likesCount }} <v-icon name="fc-like" />
  <p>Para dar like inicia sesion</p>
  </i>

</template>

<script>
import axios from 'axios';
import { getHasLike } from '@/helpers/getHasLike';
import { useAuthStore } from '@/store/authStore';
import { mapState } from 'pinia';
import { OhVueIcon } from "oh-vue-icons";
import { AiAcademiaSquare } from "oh-vue-icons/icons";

export default {
  /**
   * Propiedades del componente
   * @returns {Object}
   * @property {Object} post - Post al que se le dará like
   * @property {Number} likesCount - Cantidad de likes del post
   */
  props: {
    post: Object,
    likesCount: Number,
  },
  /**
   * Propiedades del componente
   * @returns {Object}
   * @property {Boolean} hasLike - Indica si el usuario ha dado like al post
   * @property {String} apiUrl - URL de la API
   * @property {Boolean} isLogin - Indica si el usuario está logueado
   * @property {String} token - Token de autenticación
   */
  data() {
    return {
      hasLike: null,
      apiUrl: import.meta.env.VITE_API_URL

    };
  },
  computed: {
    ...mapState(useAuthStore, ['isLogin', 'token']),
  },

  /**
   * Método que se ejecuta al montar el componente
   * Obtiene el estado del like del post
   */
  async mounted() {
    await this.init();
  },
  methods: {
    /**
     * Inicializa el componente
     * Obtiene el estado del like del post
     * @returns {Promise<void>}
     * @throws {Error} - Error al obtener el estado del like
     */
    async init() {
      if (!this.isLogin) return;
      
      try {
        const hasLike = await getHasLike(this.post.id, this.token);
        this.hasLike = hasLike;
      } catch (error) {
        console.error('Error al obtener el estado del like:', error);
      }
    },
    /**
     * Maneja el like del post
     * @param postId - ID del post
     * @returns {Promise<void>}
     * @throws {Error} - Error al dar/quitar like
     * @throws {Error} - El usuario ya ha dado like a este post
     */
    async handleLike(postId) {
      try {
        if (!this.hasLike) {
          await axios.post(`${this.apiUrl}/posts/${postId}/like`, {}, {
            headers: {
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }
          });
          this.post.likedByUser = true;
          this.post.likes_count++;
          this.hasLike = true;
        } else {
          await axios.delete(`${this.apiUrl}/posts/${postId}/like`, {
            headers: {
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }
          });
          this.post.likedByUser = false;
          this.post.likes_count--;
          this.hasLike = false;
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          console.log('El usuario ya ha dado like a este post.');
          alert('Ya has dado like a este post.');
        } else {
          console.error('Error al dar/quitar like:', error);
          alert('Hubo un problema al intentar dar/quitar like.');
        }
      }
    },
  },
  /**
   * Componentes que utiliza el componente
   * @returns {Object}
   * @property {Object} v-icon - Iconos de OhVue
   */
  components: {
    "v-icon": OhVueIcon,
  },
};
</script>

<style scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

</style>
