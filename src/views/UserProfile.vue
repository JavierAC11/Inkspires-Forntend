<template>
    <div class="user-profile">
      <h2>Perfil de {{ user.name }}</h2>
      
      <div class="profile-section">
        <h3>Información básica</h3>
        <p><strong>Nombre:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
  
      <div v-if="user.is_tatuador" class="profile-section">
        <h3>Información del tatuador</h3>
        <p><strong>Estilos:</strong> {{ user.estilos }}</p>
        <p><strong>Precio medio:</strong> ${{ user.precio_medio }}</p>
        <p><strong>Ubicación:</strong> {{ user.ubicacion }}</p>
        <p><strong>Descripción:</strong> {{ user.descripcion }}</p>
      </div>
  
      <div class="profile-actions">
        <button @click="editProfile">Editar perfil</button>
      </div>
  
      <div class="user-posts">
        <h3>Mis Posts</h3>
        <div v-if="userPosts.length > 0" class="posts-grid">
          <div v-for="post in userPosts" :key="post.id" class="post-card">
            <img :src="post.imagen_url" :alt="post.descripcion">
            <p>{{ post.descripcion }}</p>
          </div>
        </div>
        <p v-else>Aún no has publicado ningún post.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserProfile',
    data() {
      return {
        user: this.$getters.currentUser(),
        userPosts: [] // Aquí almacenaremos los posts del usuario
      }
    },
    mounted() {
      this.fetchUserPosts()
    },
    methods: {
      editProfile() {
        this.$router.push('/edit-profile')
      },
      fetchUserPosts() {
        this.userPosts = [
          { id: 1, imagen_url: 'https://placehold.co/200x200', descripcion: 'Mi primer tatuaje' },
          { id: 2, imagen_url: 'https://placehold.co/200x200', descripcion: 'Diseño personalizado' },
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .user-profile {
    max-width: 800px;
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .post-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .post-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .post-card p {
    padding: 10px;
    margin: 0;
  }
  </style>
  