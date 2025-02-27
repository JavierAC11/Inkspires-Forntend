<template>
    <div v-for="post in userPosts" :key="post.id" class="post-card">
            <img :src="post.imagen_url" :alt="post.descripcion">
            <p>{{ post.descripcion }}</p>
    </div>
</template>

<script>

export default {
    name: 'PostCard',
    props: {
        userPosts: {
            type: Object,
            required: true
        }
    }
}



</script>