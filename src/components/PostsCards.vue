<template>
    <div v-for="post in posts" :key="post.id" class="post-card">
      <img :src="post.imagen_url" :alt="post.descripcion">
      <p>{{ post.descripcion }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';


defineProps({
  posts: {
    type: Array,
    required: true
  },
});

</script>

<style scoped>

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