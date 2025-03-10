<template>
  <div class="post-card" @click="navigateToPost(post.id)">
    <div class="post-image-container">
      <img :src="post.imgUrl" :alt="post.descripcion" class="post-image">
    </div>
    <div class="post-content">
      <h3 class="post-title">{{ truncateText(post.descripcion, 50) }}</h3>
      <p class="post-description">{{ truncateText(post.descripcion, 100) }}</p>
      <div class="post-meta">
        <span class="post-date">{{ formatDate(post.fechaCreacion) }}</span>
        <LikeButton :post="post" :likesCount="post.likes_count || 0" />
        <!--<span class="post-likes">{{ post.likes_count || 0 }}</span>-->
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import LikeButton from './LikeButton.vue';

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  components: {
    LikeButton,
  },
  setup() {
    const router = useRouter();

    const navigateToPost = (postId) => {
      router.push(`/post/${postId}`);
    };

    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      return text.substr(0, maxLength) + '...';
    };

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

@media (max-width: 640px) {
  .post-grid {
    grid-template-columns: 1fr;
  }
}
</style>
