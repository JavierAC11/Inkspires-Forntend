<template>
  <div class="post-grid">
    <PostsCards 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
    />
  </div>
</template>

<script>
import PostsCards from './PostsCards.vue';

export default {
  props: {
    posts: {
      type: Array,
      required: true
    },
  },
  components: {
    PostsCards,
  },
};
</script>

<style scoped>
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px;
}
</style>
