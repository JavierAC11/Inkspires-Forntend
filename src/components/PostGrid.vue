<template>
    <div class="post-grid">
      <PostsCards 
        v-for="post in posts" 
        :key="post.id" 
        :post="post" 
      />
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
import PostsCards from './PostsCards.vue';
  
  const props = defineProps({
    posts: {
      type: Array,
      required: true
    },
  });
  </script>
  
  <style scoped>
  .post-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    padding: 24px;
  }
  </style>
  