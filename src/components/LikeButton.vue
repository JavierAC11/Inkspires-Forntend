<template>
    <div v-if="hasLike !== null">
      <button @click.stop="handleLike(post.id)" v-if="isLoggedIn">
        <i class="fa fa-thumbs-up" v-if="!hasLike">Dar like</i>
        <i class="fa fa-thumbs-down" v-else>Quitar like</i>
      </button>
      <p v-else>Por favor inicia sesión para dar like.</p>
    </div>
    <div v-else>
      Cargando...
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/store/authStore';
  import { getHasLike } from '@/helpers/getHasLike';
  
  const props = defineProps({
    post: Object,
  });
  
  const authStore = useAuthStore();
  
  const isLoggedIn = authStore.isLogin;
  
  const hasLike = ref(null);
  
  onMounted(async () => {
    if (!isLoggedIn) return;
    hasLike.value = await getHasLike(props.post.id, authStore.token);
  });
  
  const handleLike = async (postId) => {
    try {
      if (!hasLike.value) {
        // Dar like (POST)
        await axios.post(`http://localhost/api/posts/${postId}/like`, {}, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          }
        });
        props.post.likedByUser = true;
        props.post.likes_count++;
        hasLike.value = true;
      } else {
        // Quitar like (DELETE)
        await axios.delete(`http://localhost/api/posts/${postId}/like`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          }
        });
        props.post.likedByUser = false;
        props.post.likes_count--;
        hasLike.value = false;
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
  };
  </script>
  
<style scoped>
button {
background-color: transparent;
border: none;
cursor: pointer;
}

button i {
font-size: 1.2em;
color: #007bff;
}

button i.fa-thumbs-down {
color: #dc3545;
}
</style>
  