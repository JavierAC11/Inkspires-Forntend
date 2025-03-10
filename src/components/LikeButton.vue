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
  props: {
    post: Object,
    likesCount: Number,
  },
  data() {
    return {
      hasLike: null,
    };
  },
  computed: {
    ...mapState(useAuthStore, ['isLogin', 'token']),
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      if (!this.isLogin) return;
      
      try {
        const hasLike = await getHasLike(this.post.id, this.token);
        this.hasLike = hasLike;
      } catch (error) {
        console.error('Error al obtener el estado del like:', error);
      }
    },
    async handleLike(postId) {
      try {
        if (!this.hasLike) {
          await axios.post(`http://localhost/api/posts/${postId}/like`, {}, {
            headers: {
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }
          });
          this.post.likedByUser = true;
          this.post.likes_count++;
          this.hasLike = true;
        } else {
          await axios.delete(`http://localhost/api/posts/${postId}/like`, {
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
/*
button i {
  font-size: 1.2em;
  color: #007bff;
}

button i.fa-thumbs-down {
  color: #dc3545;
}*/
</style>
